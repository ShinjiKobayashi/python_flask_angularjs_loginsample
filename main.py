# -*- coding=utf-8 -*-
from os import path

from flask import Flask, jsonify, request, Response, json
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError


_app = Flask(__name__)
_app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////' + path.join(path.dirname(__file__), "app",
                                                                   "database", "app.db")
db = SQLAlchemy(_app)


@_app.route('/api/user/register', methods=['POST'])
def user_register():
    """
    User登録を行う
    curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"firstname": "Shinji", "lastname": "Kobayashi", "username": "kobashin", "password": "abcd", "nfckey": "qwerty0987"}' http://localhost:5050/api/user/register
    :input: json {firstname: "", lastname: "", username: "", password: "", nfckey: ""}
    :return: json {result: resultCode}
    """
    json_data = request.json
    user = User(json_data['firstname'], json_data['lastname'], json_data['username'], json_data['password'], json_data['nfckey'])
    print "create new user:", user
    result = {}
    try:
        db.session.add(user)
        db.session.commit()
        result['result'] = 0
    except IntegrityError:
        result['result'] = -2
    except:
        print 'error in db.session'
        result['result'] = -1
    finally:
        db.session.close()

    return jsonify(result)


@_app.route('/api/user/login', methods=['POST'])
def user_login():
    """
    login to this Service
    TODO: hash-password login
    :input: json {username: "", password: ""}
    :return: json {user: UserObject, result: resultCode}
    """
    json_data = request.json
    print json_data
    user = db.session.query(User).filter_by(user_name=json_data['username']).first()
    result = {}
    if user is None:
        print "unknown user"
        result["result"] = -1
    else:
        print user
        if user.password == json_data["password"]:
            result["user"] = {
                "firstname": user.first_name,
                "lastname": user.last_name,
                "username": user.user_name,
                "nfckey": user.nfc_key
            }
            result["result"] = 0
        else:
            # invalid password
            result["result"] = -2

    db.session.close()
    return jsonify(result)


@_app.route('/')
def index():
    return _app.send_static_file('index.html')


if __name__ == '__main__':
    from app.models.Models import User
    _app.run(host='0.0.0.0', port=5050)
