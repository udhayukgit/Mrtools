import React, { useState } from 'react'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import { useForm } from "react-hook-form";

function Purchase() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const intialValues = {
    // firstName: "bill",
    lastName: "",
    // email: "bluebill1049@hotmail.com",
    // age: -1
  };
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [purchaseDate, setPurchaseDate] = useState('')
  const [purchaseProduct, setPurchaseProduct] = useState('')
  const [purchaseQuantity, setPurchaseQuantity] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [purchaseTotal, setPurchaseTotal] = useState('')
  const [errorKeys, setErrorKeys] = useState([])
  const [error, setError] = useState([])
  const handleClose = () => setShow(false)
  
  const handleShow = () => {
      setShow(true)
  }

  // function handleSubmit(e) {
      
  //     e.preventDefault()
  //     setLoading(true)
  //     axios.post('/api/register', {
  //         purchase_date: purchaseDate,
  //         purchase_product: purchaseProduct,
  //         purchase_quantity: purchaseQuantity,
  //         purchase_price: purchasePrice,
  //         purchase_total: purchaseTotal,
          
  //     }).then(result => {
  //         localStorage.setItem('token', result.data.token)
  //         // props.addUser(result.data.user)
  //     }).catch(err => {
  //         setErrorKeys(Object.keys(JSON.parse(err.response.data)))
  //         setError(JSON.parse(err.response.data))
  //         setLoading(false)
  //     })
  // }

  function handleChange(e) {
      if(e.target.name == 'purchase_date')
      setPurchaseDate(e.target.value) 
      if(e.target.name == 'purchase_product')
      setPurchaseProduct(e.target.value) 
      if(e.target.name == 'purchase_quantity')
      setPurchaseQuantity(e.target.value) 
      if(e.target.name == 'purchase_price')
      setPurchasePrice(e.target.value) 
      if(e.target.name == 'purchase_total')
      setPurchaseTotal(e.target.value) 
  }

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                <label>Purchase Date</label>
                  <div class="input-group date" id="reservationdate" data-target-input="nearest">
                      <input type="text" name="purchase_date" placeholder="Enter Purchase Date" class="form-control datetimepicker-input" data-target="#reservationdate"/>
                      <input
        defaultValue={intialValues.lastName}
        placeholder="luo"
        {...register("lastName", {
          validate: (value) => value.length > 3
        })}
      />
      {errors.lastName && <p>Your name is not bill</p>}
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
          <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>

            <input type="submit" />
            <button type="submit" className="submit btn btn-primary">
              { loading ?
                  <div className="align-middle">
                      <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                      />
                      <span>Saving...</span>
                  </div>
                  :
                  <span>save</span>}
              </button>
          </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Purchase

