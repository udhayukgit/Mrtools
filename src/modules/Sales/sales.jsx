import React, { useState } from 'react'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'

function Sales() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Purchase
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title className="auth-title">
          Purchase Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                <label>Purchase Date</label>
                  <div class="input-group date" id="reservationdate" data-target-input="nearest">
                      <input type="text" name="sales_date" placeholder="Enter Purchase Date" class="form-control datetimepicker-input" data-target="#reservationdate"/>
                      <div class="input-group-append" data-target="#reservationdate" data-toggle="datetimepicker">
                          <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label>Select Purchase Product</label>
                  <select class="form-control" name="purchase_product">
                    <option>option 1</option>
                    <option>option 2</option>
                    <option>option 3</option>
                    <option>option 4</option>
                    <option>option 5</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label>Quantity</label>
                  <input type="number" name="purchase_quantity" class="form-control" placeholder="Enter Quantity"/>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label>Purchase Price</label>
                  <input type="number" name="purchase_price" class="form-control" placeholder="Enter Purchase Price"/>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label>Total</label>
                  <input type="number" name="purchase_total" class="form-control" placeholder=""/>
                </div>
              </div>
            </div>
            {/* <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <input type="submit" type="submit" class="btn btn-primary" value="Submit"/>
                  <a href="/#" ><button  type="button" class="btn btn-primary">Cancel</button></a>
                </div>
              </div>
            </div> */}
          </form>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Sales

