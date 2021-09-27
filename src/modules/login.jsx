import React from "react";
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

  // onFileChange = (e) => {
  //     this.setState({ profile_pic: URL.createObjectURL(e.target.files[0])})
  // };

  onCancel = (e)=>{
      this.setState({ 
          email_id: '',
          password:'',
          submitted: false,
      })
  }

  onContinue = (e)=>{
    console.log(e);
      this.setState({ submitted: true });

      const { email_id, password } = this.state;

      if (!email_id || !password) {
          return;
      } else {
          this.onCancel();
          ToastAlert('success', "Submitted Successfully");
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
                  <input type="email" name="email_id"class={"form-control " + ((submitted && !email_id) ? "is-invalid" : "")} placeholder="Email" onChange={this.onChange} />
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
                    {/* <button type="submit" class="btn btn-primary btn-block">Sign In</button> */}
                  </div>
                </div>
              {/* </form> */}

              {/* <div class="social-auth-links text-center mb-3">
                <p>- OR -</p>
                <a href="#" class="btn btn-block btn-primary">
                  <i class="fab fa-facebook mr-2"></i> Sign in using Facebook
                </a>
                <a href="#" class="btn btn-block btn-danger">
                  <i class="fab fa-google-plus mr-2"></i> Sign in using Google+
                </a>
              </div>


              <p class="mb-1">
                <a href="forgot-password.html">I forgot my password</a>
              </p>
              <p class="mb-0">
                <a href="register.html" class="text-center">Register a new membership</a>
              </p> */}
            </div>
          </div>
        </div>
        </body>
      );
	}
}


export default Login;
