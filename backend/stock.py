
from flask import Flask, request,jsonify
from flask_restful import Api, Resource, reqparse
from db import DBconfig
from datetime import date
import datetime
import json
import os,time
from werkzeug.utils import secure_filename

from models import Stock
from usermanagement import token_required



class Stock(Resource):
  @token_required
  def get(self):
    """Get the stock details for using this function

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
        stocks = Stocks.objects(status=1).paginate(page=page,per_page=limit)
    except Exception as e:
        
        return jsonify({'error': " Sales Object Doesn't exsist"})
    if not stocks:
        return jsonify({'error': 'data not found'})
    else:
        return jsonify([u.to_json() for u in stocks.items])

  @token_required
  def post(self):

    """Create the stock for using this function

    Returns
    -------
    json
        a status of function return json format
    """

    stock_flag , email_flag = False , False
    
    stock = request.get_json() #stock form
    
    productname_exist = Stock.objects(productname=stock['productname']).first()

    if productname_exist:
        return jsonify({'status': 'failed','messgage':'productname Already exsist, Please try different!.'})
    

    created_at = datetime.datetime.now()
    
    stock = stock(productname = stock['productname'],
                price=stock['price'],
                quantity = stock['quantity'],
                purchase_date = stock['purchase_date'],
                created_at = created_at,
                updated_at = created_at,
                status=1)
    Stock.save()

    return jsonify({'status': 'success','messgage':'stock created Successfully!.'})

  @token_required
  def put(self):

    """Update the stock for using this function

    Returns
    -------
    json
        a status of function return json format
    """
    
    stock = request.get_json()
    
    if 'id' not in stock:
        return jsonify({'error':"productname is must to Edit the data!."})

    record = Stock.objects(id=stock['id']).first()

    
    if not record:
        return jsonify({'status': 'failed','error': 'stock not found'})
    else:
        
        record.update(updated_at=datetime.datetime.now(), **stock)
        record = Stock.objects(id=stock['id']).first()
    
    return jsonify({'status': 'success','messgage':'stock data Updated Successfully!.'})

  @token_required
  def delete(self):
    """Deleting the stock for using this function

    Returns
    -------
    json
        a status of function return json format
    """

    
    stock = request.get_json()

    if 'id' not in stock:
        return jsonify({'error':"productname is Must to Delete the data!."})

    stock = Stock.objects(id=stock['id']).first()
    if not stock:
        return jsonify({'status': 'failed','error': 'data not found'})
    else:
        Stock.update(status=2)
    return jsonify({'status':'success',"message":"stock Deleted Successfully!."})
