
from flask import Flask, request,jsonify
from flask_restful import Api, Resource, reqparse
from db import DBconfig
from datetime import date
import datetime
import json
import os,time
from werkzeug.utils import secure_filename
from requests import put, get
from models import Expense


class Expenses(Resource):
  def get(self):
    """Get the expense details for using this function

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
        expenses = Expense.objects(status=1).paginate(page=page,per_page=limit)
    except Exception as e:
        
        return jsonify({'error': " Sales Object Doesn't exsist"})
    if not expenses:
        return jsonify({'error': 'data not found'})
    else:
        return jsonify([u.to_json() for u in expenses.items])

  def post(self):

    """Create the expense for using this function

    Returns
    -------
    json
        a status of function return json format
    """

    expense_flag , email_flag = False , False
    
    expense = request.form #expense form
    
    expensename_exist = Expense.objects(expensename=expense['expensename']).first()

    if expensename_exist:
        return jsonify({'status': 'failed','messgage':'expensename Already exsist, Please try different!.'})
    

    created_at = datetime.datetime.now()
    
    expense = Expense(expense_name = expense['expense_name'],
                quantity = expense['quantity'],
                price = expense['price'],
                created_at = created_at,
                updated_at = created_at,
                status=1)
    expense.save()

    return jsonify({'status': 'success','messgage':'expense created Successfully!.'})


  def put(self):

    """Update the expense for using this function

    Returns
    -------
    json
        a status of function return json format
    """

    expense = request.form

    if 'id' not in expense:
        return jsonify({'error':"Id is must to Edit the data!."})

    record = Expense.objects(id=expense['id']).first()


    if not record:
        return jsonify({'status': 'failed','error': 'expense not found'})
    else:
        
        record.update(updated_at=datetime.datetime.now(), **expense)
        record = Expense.objects(id=expense['id']).first()

    return jsonify({'status': 'success','messgage':'expense data Updated Successfully!.'})


  def delete(self):
    """Deleting the expense for using this function

    Returns
    -------
    json
        a status of function return json format
    """


    expense = request.form

    if 'id' not in expense:
        return jsonify({'error':"Id is Must to Delete the data!."})

    expense = Expense.objects(id=expense['id']).first()
    if not expense:
        return jsonify({'status': 'failed','error': 'data not found'})
    else:
        Expense.update(status=2)
    return jsonify({'status':'success',"message":"expense Deleted Successfully!."})
