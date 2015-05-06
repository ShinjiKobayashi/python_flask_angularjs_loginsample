# -*- coding=utf-8 -*-
__author__ = 'skobayashi'


from main import db


class User(db.Model):
    """
    Table Name: user
    Column:
      id(Integer, UserId)
      first_name(String)
      last_name(String)
      user_name(String)
      password(String)
      nfc_key(String, unique)
    """
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(128), nullable=False)
    last_name = db.Column(db.String(128), nullable=False)
    user_name = db.Column(db.String(128), nullable=False, unique=True)
    password = db.Column(db.String(128), nullable=False)
    nfc_key = db.Column(db.String(128), nullable=False, unique=True)

    def __init__(self, first_name, last_name, user_name, password, nfc_key):
        self.first_name = first_name
        self.last_name = last_name
        self.user_name = user_name
        self.password = password
        self.nfc_key = nfc_key

    def __repr__(self):
        return "<User user_name:{} nfc_key:{}>".format(self.user_name, self.nfc_key)
