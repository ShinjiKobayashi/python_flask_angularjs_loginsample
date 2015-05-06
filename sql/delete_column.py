# -*- coding=utf-8 -*-
__author__ = 'skobayashi1'

import sys, os

sys.path.append(os.path.abspath(os.path.dirname(__file__))[:-4])

from main import *
from app.models.Models import *


def main():
    users = User.query.all()
    for user in users:
        print "delete", user
        db.session.delete(user)

    db.session.commit()


if __name__ == "__main__":
    main()
