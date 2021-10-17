import json
import os,time
from flask import Flask, request, jsonify , flash,redirect 
from flask_restful import Resource, Api
from flask_mongoengine import MongoEngine
from datetime import date
import datetime
from werkzeug.utils import secure_filename
from usermanagement import UserManagement,login
from product import ProductManagement

app = Flask(__name__)
api = Api(app)
app.url_map.strict_slashes = False


api.add_resource(login, '/')
api.add_resource(UserManagement, '/user')
api.add_resource(ProductManagement, '/product')

if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0',port=8000)