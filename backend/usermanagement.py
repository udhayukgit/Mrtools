
from flask import Flask, request,jsonify,make_response
from flask_restful import Api, Resource, reqparse
from db import DBconfig
from datetime import date
import datetime
import json
import os,time
from werkzeug.utils import secure_filename

from werkzeug.security import generate_password_hash, check_password_hash
import uuid
import jwt
from functools import wraps

from models import User


app = Flask(__name__)
app.config['SECRET_KEY']='Th1s1ss3cr3t'


def token_required(f):
   @wraps(f)
   def decorator(current_user,*args, **kwargs):

      token = None

      if 'x-access-tokens' in request.headers:
         token = request.headers['x-access-tokens']


      
      if not token:
         return jsonify({'message': 'a valid token is missing'})

      token = str.replace(str(token), 'Bearer ', '')
      try:
         data = jwt.decode(token,app.config['SECRET_KEY'])
         current_user = User.objects(public_id=data['public_id']).first()
      except Exception as e:
         print(e)
         return jsonify({'message': 'token is invalid'})

      return f(current_user, *args, **kwargs)
   return decorator

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
    
        # user = request.get_json() #user form
        
        
        # logged_in_at = datetime.datetime.now()  #last login date update(recently login date)
        

        # record = User.objects(username=user['username'],password=user['password']).count()

        # if record:
        #     record.update(last_login=logged_in_at) #update last login
        #     status , message = 'success','User created Successfully!.'
        # else:
        #     status , message = 'failed', 'Invalid Credentials Username or Password!.'
        
        # return jsonify({'status': status,'messgage':message})


        auth = request.get_json()


        if not auth or not auth['username'] or not auth['password']:  
           return make_response('could not verify', 401, {'WWW.Authentication': 'Basic realm: "login required"'})    

        user = User.objects(username=auth['username']).first()   
             
        if check_password_hash(user.password, auth.password):  
            token = jwt.encode({'public_id': user['public_id'], 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])  
            
            return jsonify({'token' : str(token.decode('UTF-8'))})
            #return jsonify({'token' : token}) 

        return make_response('could not verify',  401, {'WWW.Authentication': 'Basic realm: "login required"'})



class UserManagement(Resource):

  @token_required
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

    
    user = request.get_json() #user form
    
    hashed_password = generate_password_hash(user['password'], method='sha256')

    username_exist = User.objects(username=user['username']).first()

    if username_exist:
        return jsonify({'status': 'failed','messgage':'Username Already exsist, Please try different!.'})
    
    email_exsist = User.objects(email=user['email']).first()

    if email_exsist:
        return jsonify({'status': 'failed','messgage':'Email Already exsist, Please try different!.'})

    created_at = datetime.datetime.now()
    

    #new_user = Users(public_id=str(uuid.uuid4()), name=data['name'], password=hashed_password, admin=False) 
    user = User(
                public_id=str(uuid.uuid4()),
                username = user['username'],
                email = user['email'],
                password = hashed_password,
                created_at = created_at,
                updated_at = created_at,
                status=1)
    user.save()

    return jsonify({'status': 'success','messgage':'User created Successfully!.'})

    @token_required
    def put(self):

        """Update the user for using this function

        Returns
        -------
        json
            a status of function return json format
        """
        
        user = request.get_json()
        
        if 'username' not in user:
            return jsonify({'error':"username is must to Edit the data!."})

        record = User.objects(username=user['username']).first()

        
        if not record:
            return jsonify({'status': 'failed','error': 'user not found'})
        else:
            
            record.update(updated_at=datetime.datetime.now(), **user)
            record = User.objects(username=user['username']).first()
        
        return jsonify({'status': 'success','messgage':'User data Updated Successfully!.'})

    @token_required
    def delete(self):
        """Deleting the user for using this function

        Returns
        -------
        json
            a status of function return json format
        """

        
        user = request.get_json()

        if 'username' not in user:
            return jsonify({'error':"Username is Must to Delete the data!."})

        user = User.objects(username=user['username']).first()
        if not user:
            return jsonify({'status': 'failed','error': 'data not found'})
        else:
            user.update(status=2)
        return jsonify({'status':'success',"message":"User Deleted Successfully!."})
