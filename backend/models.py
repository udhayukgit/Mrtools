from db import DBconfig
from datetime import date
import datetime
import json
import os,time


db = DBconfig()

#User Model
class User(db.Document):
    username = db.StringField()
    password = db.StringField()
    email = db.StringField()
    created_at = db.DateTimeField(default=datetime.datetime.now)
    updated_at = db.DateTimeField()
    status = db.IntField()


    def to_json(self):
        return {"username": self.username,
                "password":self.password,
                "email": self.email,
                 "created_at":self.created_at,
                 "updated_at":self.updated_at

                }
#Product Model
class Product(db.Document):
    productname = db.StringField()
    created_at = db.DateTimeField(default=datetime.datetime.now)
    updated_at = db.DateTimeField()
    status = db.IntField()


    def to_json(self):
        return {"productname": self.productname,
                 "created_at":self.created_at,
                 "updated_at":self.updated_at

                }


#Stock Model
class Stock(db.Document):
    productname = db.StringField()
    price = db.IntField()
    quantity = db.IntField()
    purchase_date = db.DateTimeField()
    created_at = db.DateTimeField(default=datetime.datetime.now)
    updated_at = db.DateTimeField()
    status = db.IntField()


    def to_json(self):
        return {"productname": self.productname,
                 "created_at":self.created_at,
                 "updated_at":self.updated_at

                }

#Stock Model
class Sales(db.Document):
    productname = db.StringField()
    price = db.IntField()
    quantity = db.IntField()
    total = db.IntField()
    purchase_date = db.DateTimeField()

    created_at = db.DateTimeField(default=datetime.datetime.now)
    updated_at = db.DateTimeField()
    status = db.IntField()


    def to_json(self):
        return {"productname": self.productname,
                 "created_at":self.created_at,
                 "updated_at":self.updated_at

                }