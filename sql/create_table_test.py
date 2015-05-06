# -*- coding=utf-8 -*-
__author__ = 'skobayashi1'

import sys, os

sys.path.append(os.path.abspath(os.path.dirname(__file__))[:-4])

from main import *
from app.models.Models import *


def main():
    user1 = User("Shinji", "Kobayashi", "kobashin", "abcd", "qwerty1234")
    user2 = User("Shinji", "Kobayashi", "kobashin", "abcd", "qwerty1234")
    db.session.add(user1)
    db.session.add(user2)
    db.session.commit()


if __name__ == "__main__":
    main()
