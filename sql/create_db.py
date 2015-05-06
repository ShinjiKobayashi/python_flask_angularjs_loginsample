# -*- coding=utf-8 -*-
__author__ = 'skobayashi1'

"""
You can create app.db by this script.
to run below commands,
  $ python sql/create_db.py
"""


import sys, os

sys.path.append(os.path.abspath(os.path.dirname(__file__))[:-4])

from main import *
from app.models.Models import *


def main():
    db.create_all()


if __name__ == "__main__":
    main()
