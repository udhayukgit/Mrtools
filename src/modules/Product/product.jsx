import React, { useState } from 'react'
import axios from 'axios'
import { ReactReduxContext } from 'react-redux';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Field, reduxForm } from 'redux-form'
import Spinner from 'react-bootstrap/Spinner'
import "../custom_validation.js";
import "../custom.css";
// import { CustomValidation } from '../custom_validation';

{/* <CustomValidation></CustomValidation> */}

const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} class="form-control"/>
      {touched && ((error && <span class ="error"> {error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const FieldLevelValidationForm = (props) => {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [productName, setproductName] = useState('')
  const [errorKeys, setErrorKeys] = useState([])
  const [error, setError] = useState([])
  const handleClose = () => setShow(false)

  const handleShow = () => {
      setShow(true)
  }

  function handleSubmit(e) {
      
    e.preventDefault()
    setLoading(true)
    axios.post('/api/register', {
        product_name:productName,
        
    }).then(result => {
        localStorage.setItem('token', result.data.token)
        // props.addUser(result.data.user)
    }).catch(err => {
        setErrorKeys(Object.keys(JSON.parse(err.response.data)))
        setError(JSON.parse(err.response.data))
        setLoading(false)
    })
  }

  const {pristine, reset, submitting } = props
  return (
    <>
    <Button variant="primary" onClick={handleShow}>
      Add Product
    </Button>
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title className="auth-title">
        Purchase Form
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <Field name="product_name" type="text"
          component={renderField} label="Product Name"
          validate={[ required, maxLength15 ]}
          />
          {/* <Field name="email" type="email"
          component={renderField} label="Email"
          validate={email}
          warn={aol}
          />
          <Field name="age" type="number"
          component={renderField} label="Age"
          validate={[ required, number, minValue18 ]}
          warn={tooOld}
          /> */}
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
          {/* <div>
          <button type="submit">Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
          </div> */}
        </form>
      </Modal.Body>
    </Modal>

    </>
  )
}

export default reduxForm({
  form: 'fieldLevelValidation' // a unique identifier for this form
})(FieldLevelValidationForm)