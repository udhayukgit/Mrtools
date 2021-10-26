from db import DBconfig
from datetime import date
import datetime
import json
import os,time
from bson import ObjectId

db = DBconfig()

#User Model
class User(db.Document):
    public_id = db.StringField()
    username = db.StringField()
    password = db.StringField()
    email = db.StringField()
    created_at = db.DateTimeField(default=datetime.datetime.now)
    updated_at = db.DateTimeField()
    status = db.IntField()


    def to_json(self):
        uid = str(self.id)
        return {
                "public_id":self.public_id,
                "id":uid,
                "username": self.username,
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
        pid = str(self.id)
        return {
                "id": pid,
                "productname": self.productname,
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
        sid = str(self.id)
        return {
                "sid":sid,
                "productname": self.productname,
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
        salesid = str(self.id)
        return {
                "sales_id":salesid,
                "productname": self.productname,
                 "created_at":self.created_at,
                 "updated_at":self.updated_at

                }