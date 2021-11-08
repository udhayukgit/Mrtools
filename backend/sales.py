
from flask import Flask, request,jsonify
from flask_restful import Api, Resource, reqparse
from db import DBconfig
from datetime import date
import datetime
import json
import os,time
from werkzeug.utils import secure_filename

from models import Sales
from usermanagement import token_required

class Sales(Resource):
  @token_required
  def get(self):
    """Get the sales details for using this function

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
    
    try:
        getsales = Sales.objects(status=1).paginate(page=page,per_page=limit)
    except Exception as e:
        
        return jsonify({'error': " Sales Object Doesn't exsist"})
    
    if not getsales:
        return jsonify({'error': 'data not found'})
    else:
        return jsonify([u.to_json() for u in getsales.items])
  
  @token_required
  def post(self):

    """Create the sales for using this function

    Returns
    -------
    json
        a status of function return json format
    """

    sales_flag , email_flag = False , False
    
    sales = request.get_json() #sales form
    
    productname_exist = Sales.objects(productname=sales['productname']).first()

    if productname_exist:
        return jsonify({'status': 'failed','messgage':'productname Already exsist, Please try different!.'})
    

    created_at = datetime.datetime.now()
    
    sales = sales(productname = sales['productname'],
                price=sales['price'],
                quantity = sales['quantity'],
                sales_date = sales['sales_date'],
                total = sales['total'],
                created_at = created_at,
                updated_at = created_at,
                status=1)
    Sales.save()

    return jsonify({'status': 'success','messgage':'sales created Successfully!.'})

  @token_required
  def put(self):

    """Update the sales for using this function

    Returns
    -------
    json
        a status of function return json format
    """

    sales = request.get_json()

    if 'id' not in sales:
        return jsonify({'error':"Id is must to Edit the data!."})

    record = Sales.objects(id=sales['id']).first()


    if not record:
        return jsonify({'status': 'failed','error': 'sales not found'})
    else:
        
        record.update(updated_at=datetime.datetime.now(), **sales)
        record = Sales.objects(productname=sales['productname']).first()

    return jsonify({'status': 'success','messgage':'sales data Updated Successfully!.'})

  @token_required
  def delete(self):
    """Deleting the sales for using this function

    Returns
    -------
    json
        a status of function return json format
    """

    
    sales = request.get_json()

    if 'id' not in sales:
        return jsonify({'error':"productname is Must to Delete the data!."})

    sales = Sales.objects(id=sales['id']).first()
    if not sales:
        return jsonify({'status': 'failed','error': 'data not found'})
    else:
        Sales.update(status=2)
    return jsonify({'status':'success',"message":"sales Deleted Successfully!."})
