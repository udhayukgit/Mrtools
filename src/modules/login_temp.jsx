import React from "react";
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom';
import Dashboard from "../layouts/Dashboard";
import { ToastAlert } from '../utils/sweetalert2';

/**
 * Stock Component
 */
class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            email_id: '',
            password:'',
            submitted: false,
		};
	}

  onChange = (e) => {
    console.log(e);
      this.setState({ [e.target.name]: e.target.value })
  }

  onCancel = (e)=>{
      this.setState({ 
          email_id: '',
          password:'',
          submitted: false,
      })
  }

  onContinue = (e)=>{
    this.props.history.push('/dashboard')
    console.log(e);
      this.setState({ submitted: true });

      const { email_id, password } = this.state;

      if (!email_id || !password) {
          return;
      } 
      else {
      axios.post('/api/login', {
        email: email_id,
        password: password
      }).then(result => {
        localStorage.setItem('token', result.data.token)
        // props.addUser(result.data.user)
      }).catch(error => {
        // setError(true)
        // setLoading(false)
      })
        // this.onCancel();
        // return <Dashboard {...props} />
        // ToastAlert('success', "Login Success");
      }
  }
	

    /**
     * main render
     * @returns 
     */
	render() {
    const { email_id, password, submitted } = this.state;
		return (
      
      <body class="hold-transition login-page">
        <div class="login-box">
          <div class="login-logo">
            <a href="../../index2.html"><b>MR</b> TOOLS</a>
          </div>

          <div class="card">
            <div class="card-body login-card-body">
              <p class="login-box-msg">Sign in to start your session</p>

              {/* <form action="" method="post"> */}
                <div class="input-group mb-3">
                  <input type="email" name="email_id" class={"form-control " + ((submitted && !email_id) ? "is-invalid" : "")} placeholder="Email" onChange={this.onChange} />
                  {submitted && !email_id && (
                  <span id="email-error" className="error invalid-feedback" >Email id is Required</span>
                  )}
                  <div class="input-group-append">
                    <div class="input-group-text">
                      <span class="fas fa-envelope"></span>
                    </div>
                  </div>
                </div>
                <div class="input-group mb-3">
                  <input type="password" name="password" class={"form-control " + ((submitted && !password) ? "is-invalid" : "")} placeholder="Password" onChange={this.onChange} />
                  {submitted && !password && (
                  <span id="email-error" className="error invalid-feedback" >Password id is Required</span>
                  )}
                  <div class="input-group-append">
                    <div class="input-group-text">
                      <span class="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-8">
                    <div class="icheck-primary">
                      <input type="checkbox" id="remember"/>
                      <label for="remember">
                        Remember Me
                      </label>
                    </div>
                  </div>
                  <div class="col-4">
                  <button 
                    onClick={(e) => { 
                      console.log(e);
                    e.currentTarget.blur();
                    this.onContinue();
                    }} 
                  class="btn btn-primary btn-block"
                  >
                  Sign In
                  </button>
                  </div>
                </div>
              {/* </form> */}
            </div>
          </div>
        </div>
        </body>
      );
	}
}


export default Login;
