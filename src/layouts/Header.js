
import React, { Component } from 'react'

export default class Header extends Component {

  constructor(props) {
		super(props);
    // console.log(props);
		this.state = {};
	}
    render() {
        return (
           <div>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
              {/* Left navbar links */}
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" data-widget="pushmenu" href="/#"><i className="fas fa-bars" /></a>
                </li>
                {/* <li className="nav-item d-none d-sm-inline-block">
                  <a href="index3.html" className="nav-link">Home</a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                  <a href="/#" className="nav-link">Contact</a>
                </li> */}
              </ul>
              {/* SEARCH FORM */}
              <form className="form-inline ml-3">
                {/* <div className="input-group input-group-sm">
                  <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                  <div className="input-group-append">
                    <button className="btn btn-navbar" type="submit">
                      <i className="fas fa-search" />
                    </button>
                  </div>
                </div> */}
              </form>
              {/* Right navbar links */}
              <ul className="navbar-nav ml-auto">
                {/* Messages Dropdown Menu */}

                {/* Notifications Dropdown Menu */}

                <li className="nav-item">
                  <a className="nav-link" onClick={() => { this.props.history.push("/login") }} data-widget="control-sidebar" data-slide="true" href="/#">
                    <i className="fas fa-sign-out-alt" />
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )
    }
}