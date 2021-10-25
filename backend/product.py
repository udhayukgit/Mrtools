
from flask import Flask, request,jsonify
from flask_restful import Api, Resource, reqparse
from db import DBconfig
from datetime import date
import datetime
import json
import os,time
from werkzeug.utils import secure_filename
from requests import put, get
from models import Product


class ProductManagement(Resource):
  def get(self):
    """Get the product details for using this function

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
        products = Product.objects(status=1).paginate(page=page,per_page=limit)
    except Exception as e:
        
        return jsonify({'error': " Sales Object Doesn't exsist"})
    if not products:
        return jsonify({'error': 'data not found'})
    else:
        return jsonify([u.to_json() for u in products.items])

  def post(self):

    """Create the product for using this function

    Returns
    -------
    json
        a status of function return json format
    """

    product_flag , email_flag = False , False
    
    product = request.form #product form
    
    productname_exist = Product.objects(productname=product['productname']).first()

    if productname_exist:
        return jsonify({'status': 'failed','messgage':'productname Already exsist, Please try different!.'})
    

    created_at = datetime.datetime.now()
    
    product = Product(productname = product['productname'],
                created_at = created_at,
                updated_at = created_at,
                status=1)
    product.save()

    return jsonify({'status': 'success','messgage':'product created Successfully!.'})


  def put(self):

    """Update the product for using this function

    Returns
    -------
    json
        a status of function return json format
    """

    product = request.form

    if 'id' not in product:
        return jsonify({'error':"Id is must to Edit the data!."})

    record = Product.objects(id=product['id']).first()


    if not record:
        return jsonify({'status': 'failed','error': 'product not found'})
    else:
        
        record.update(updated_at=datetime.datetime.now(), **product)
        record = Product.objects(id=product['id']).first()

    return jsonify({'status': 'success','messgage':'product data Updated Successfully!.'})


  def delete(self):
    """Deleting the product for using this function

    Returns
    -------
    json
        a status of function return json format
    """


    product = request.form

    if 'id' not in product:
        return jsonify({'error':"Id is Must to Delete the data!."})

    product = Product.objects(id=product['id']).first()
    if not product:
        return jsonify({'status': 'failed','error': 'data not found'})
    else:
        Product.update(status=2)
    return jsonify({'status':'success',"message":"product Deleted Successfully!."})
