# import json
# import os,time
# from flask import Flask, request, jsonify , flash,redirect 
# from flask_mongoengine import MongoEngine
# from datetime import date
# import datetime
# from werkzeug.utils import secure_filename

# app = Flask(__name__)


# DB_URI = "mongodb+srv://Udhay_16:Udhaymongodb@cluster0.yxx4q.mongodb.net/test?retryWrites=true&w=majority"

# app.config["MONGODB_HOST"] = DB_URI

# db = MongoEngine(app)

# from flask import Flask, request
# from flask_restful import Resource, Api

# app = Flask(__name__)
# api = Api(app)







# @app.route('/', methods=['GET'])
# def users():

#     """Get the user details for using this function

#     Arguments
#     ---------
#     page
#         pagination page number

#     limit
#         how many records showed per page

#     Returns
#     -------
#     json
#         a status of function return json format
#     """
    
    
#     users = User.objects(status=1).paginate(page=page,per_page=limit)
#     if not users:
#         return jsonify({'error': 'data not found'})
#     else:
#         return jsonify([u.to_json() for u in users.items])


# @app.route('/login', methods=['POST'])
# def login():

#     """Get the login details for using this function

#     Arguments
#     ---------
#     username and password to verify


#     Returns
#     -------
#     json
#         a status of function return json format
#     """
    
#     user = request.form #user form
    
    
#     logged_in_at = datetime.datetime.now()  #last login date update(recently login date)

#     record = User.objects(username=user['username'],password=user['password']).count()

#     if record:
#         record.update(last_login=logged_in_at) #update last login
#         status , message = 'success','User created Successfully!.'
#     else:
#         status , message = 'failed', 'Invalid Credentials Username or Password!.'
    
#     return jsonify({'status': status,'messgage':message})



# #Create User
# @app.route('/user', methods=['POST'])
# def create_user():

#     """Create the user for using this function

#     Returns
#     -------
#     json
#         a status of function return json format
#     """

#     user_flag , email_flag = False , False
    
#     user = request.form #user form
    
#     username_exist = User.objects(username=user['username']).first()

#     if username_exist:
#         return jsonify({'status': 'failed','messgage':'Username Already exsist, Please try different!.'})
    
#     email_exsist = User.objects(email=user['email']).first()

#     if email_exsist:
#         return jsonify({'status': 'failed','messgage':'Email Already exsist, Please try different!.'})

#     created_at = datetime.datetime.now()
    
#     user = User(username = user['username'],
#                 email = user['email'],
#                 password = user['password'],
#                 created_at = created_at,
#                 updated_at = '',
#                 status=1)
#     user.save()

#     return jsonify({'status': 'success','messgage':'User created Successfully!.'})
    

# @app.route('/user', methods=['PUT'])
# def update_user():

#     """Update the user for using this function

#     Returns
#     -------
#     json
#         a status of function return json format
#     """
    
#     user = request.form
    
#     if 'username' not in user:
#         return jsonify({'error':"username is must to Edit the data!."})

#     record = User.objects(username=user['username']).first()

    
#     if not record:
#         return jsonify({'status': 'failed','error': 'user not found'})
#     else:
        
#         record.update(updated_at=datetime.datetime.now(), **user)
#         record = User.objects(username=user['username']).first()
    
#     return jsonify({'status': 'success','messgage':'User data Updated Successfully!.'})


# @app.route('/user', methods=['DELETE'])
# def delete_user():
#     """Deleting the user for using this function

#     Returns
#     -------
#     json
#         a status of function return json format
#     """

    
#     user = request.form

#     if 'username' not in user:
#         return jsonify({'error':"Username is Must to Delete the data!."})

#     user = User.objects(username=user['username']).first()
#     if not user:
#         return jsonify({'status': 'failed','error': 'data not found'})
#     else:
#         user.update(status=2)
#     return jsonify({'status':'success',"message":"User Deleted Successfully!."})



# api.add_resource(TodoSimple, '/<string:todo_id>')

# if __name__ == "__main__":
#     app.run(debug=True,host='0.0.0.0',port=8000)

from flask import Flask, request,jsonify
from flask_restful import Api, Resource, reqparse
from db import DBconfig
from datetime import date
import datetime
import json
import os,time
from werkzeug.utils import secure_filename

from models import User



class login(Resource):

    """Get the login details for using this function

    Arguments
    ---------
    username and password to verify


    Returns
    -------
    json
        a status of function return json format
    """

    def post(self):
    
        user = request.form #user form
        
        
        logged_in_at = datetime.datetime.now()  #last login date update(recently login date)
        print(logged_in_at)

        record = User.objects(username=user['username'],password=user['password']).count()

        if record:
            record.update(last_login=logged_in_at) #update last login
            status , message = 'success','User created Successfully!.'
        else:
            status , message = 'failed', 'Invalid Credentials Username or Password!.'
        
        return jsonify({'status': status,'messgage':message})



class UserManagement(Resource):
  def get(self):
    """Get the user details for using this function

    Arguments
    ---------
    page
        pagination page number

    limit
        how many records showed per page

    Returns
    -------
    json
        a status of function return json format
    """
    
    page = 1
    limit = 10
    
    users = User.objects(status=1).paginate(page=page,per_page=limit)
    if not users:
        return jsonify({'error': 'data not found'})
    else:
        return jsonify([u.to_json() for u in users.items])

  def post(self):

    """Create the user for using this function

    Returns
    -------
    json
        a status of function return json format
    """

    user_flag , email_flag = False , False
    
    user = request.form #user form
    
    username_exist = User.objects(username=user['username']).first()

    if username_exist:
        return jsonify({'status': 'failed','messgage':'Username Already exsist, Please try different!.'})
    
    email_exsist = User.objects(email=user['email']).first()

    if email_exsist:
        return jsonify({'status': 'failed','messgage':'Email Already exsist, Please try different!.'})

    created_at = datetime.datetime.now()
    
    user = User(username = user['username'],
                email = user['email'],
                password = user['password'],
                created_at = created_at,
                updated_at = '',
                status=1)
    user.save()

    return jsonify({'status': 'success','messgage':'User created Successfully!.'})


    def put(self):

        """Update the user for using this function

        Returns
        -------
        json
            a status of function return json format
        """
        
        user = request.form
        
        if 'username' not in user:
            return jsonify({'error':"username is must to Edit the data!."})

        record = User.objects(username=user['username']).first()

        
        if not record:
            return jsonify({'status': 'failed','error': 'user not found'})
        else:
            
            record.update(updated_at=datetime.datetime.now(), **user)
            record = User.objects(username=user['username']).first()
        
        return jsonify({'status': 'success','messgage':'User data Updated Successfully!.'})


    def delete(self):
        """Deleting the user for using this function

        Returns
        -------
        json
            a status of function return json format
        """

        
        user = request.form

        if 'username' not in user:
            return jsonify({'error':"Username is Must to Delete the data!."})

        user = User.objects(username=user['username']).first()
        if not user:
            return jsonify({'status': 'failed','error': 'data not found'})
        else:
            user.update(status=2)
        return jsonify({'status':'success',"message":"User Deleted Successfully!."})
