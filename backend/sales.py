
from flask import Flask, request,jsonify
from flask_restful import Api, Resource, reqparse
from db import DBconfig
from datetime import date
import datetime
import json
import os,time
from werkzeug.utils import secure_filename

from models import Sales


class Sales(Resource):
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
    
    getsales = sales.objects(status=1).paginate(page=page,per_page=limit)
    if not getsales:
        return jsonify({'error': 'data not found'})
    else:
        return jsonify([u.to_json() for u in getsales.items])

  def post(self):

    """Create the sales for using this function

    Returns
    -------
    json
        a status of function return json format
    """

    sales_flag , email_flag = False , False
    
    sales = request.form #sales form
    
    productname_exist = sales.objects(productname=sales['productname']).first()

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
    sales.save()

    return jsonify({'status': 'success','messgage':'sales created Successfully!.'})


    def put(self):

        """Update the sales for using this function

        Returns
        -------
        json
            a status of function return json format
        """
        
        sales = request.form
        
        if 'productname' not in sales:
            return jsonify({'error':"productname is must to Edit the data!."})

        record = sales.objects(productname=sales['productname']).first()

        
        if not record:
            return jsonify({'status': 'failed','error': 'sales not found'})
        else:
            
            record.update(updated_at=datetime.datetime.now(), **sales)
            record = sales.objects(productname=sales['productname']).first()
        
        return jsonify({'status': 'success','messgage':'sales data Updated Successfully!.'})


    def delete(self):
        """Deleting the sales for using this function

        Returns
        -------
        json
            a status of function return json format
        """

        
        sales = request.form

        if 'productname' not in sales:
            return jsonify({'error':"productname is Must to Delete the data!."})

        sales = sales.objects(productname=sales['productname']).first()
        if not sales:
            return jsonify({'status': 'failed','error': 'data not found'})
        else:
            sales.update(status=2)
        return jsonify({'status':'success',"message":"sales Deleted Successfully!."})
