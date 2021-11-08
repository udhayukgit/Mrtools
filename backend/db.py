
from flask import Flask, request, jsonify , flash,redirect 
from flask_mongoengine import MongoEngine
import jwt
from functools import wraps

app = Flask(__name__)


def DBconfig():
    DB_URI = "mongodb+srv://Udhay_16:Udhaymongodb@cluster0.yxx4q.mongodb.net/test?retryWrites=true&w=majority"

    app.config["MONGODB_HOST"] = DB_URI

    db = MongoEngine(app)

    return db

