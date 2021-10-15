import React, { useState } from 'react'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'

function Product() {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [product_name, setName] = useState('')
  const [errorKeys, setErrorKeys] = useState([])
  const [error, setError] = useState([])
  const handleClose = () => setShow(false)
  
  const handleShow = () => {
      setShow(true)
  }

  function handleSubmit(e) {
      
      e.preventDefault()
      setLoading(true)
      axios.post('/api/add_product', {
          name: product_name,
      }).then(result => {
          localStorage.setItem('token', result.data.token)
          // props.addUser(result.data.user)
      }).catch(err => {
          setErrorKeys(Object.keys(JSON.parse(err.response.data)))
          setError(JSON.parse(err.response.data))
          setLoading(false)
      })
  }

  function handleChange(e) {
    if(e.target.name == 'product_name')
        setName(e.target.value) 
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Product
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title className="auth-title">
          Product Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label>Product Name</label>
                  <input type="text" name="product_name" class="form-control" placeholder="Enter Product Name" onChange={handleChange}/>
                </div>
              </div>
            </div>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
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

export default Product

