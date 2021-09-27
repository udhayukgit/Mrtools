import React from 'react'
class Menu extends React.Component {
  constructor(props) {
		super(props);
		this.state = {};
	}

render() {
    return (
          <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
              {/* Brand Logo */}
              <a href="index3.html" className="brand-link">
                <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
                <span className="brand-text font-weight-light">MR TOOLS</span>
              </a>
              {/* Sidebar */}
              <div className="sidebar">
                {/* Sidebar user panel (optional) */}
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                  <div className="image">
                    <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                  </div>
                  <div className="info">
                    <a href="/#" className="d-block">Admin</a>
                  </div>
                </div>
                {/* Sidebar Menu */}
                <nav className="mt-2">
                  <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    {/* Add icons to the links using the .nav-icon class
                    with font-awesome or any other icon font library */}
                    <li className="nav-item has-treeview menu-open">
                    <a className={(this.props.location.pathname.includes('/dashboard')) ? "nav-link active" : "nav-link"}
                    onClick={() => { this.props.history.push("/dashboard") }}>
                        <i className="nav-icon fas fa-tachometer-alt" />
                        <p>Dashboard</p>
                      </a>
                    </li>
                    <li class="nav-item">
                    
                    <a className={(this.props.location.pathname.includes('/product')) ? "nav-link active" : "nav-link"}
                    onClick={() => { this.props.history.push("/product_list") }}>
                        <i class="nav-icon fas fa-table"></i>
                        <p>
                          Products
                        </p>
                      </a>
                    </li>
                    <li class="nav-item">
                    <a className={(this.props.location.pathname.includes('/stock')) ? "nav-link active" : "nav-link"}
                    onClick={() => { this.props.history.push("/stock_list") }}>
                        <i class="nav-icon fas fa-table"></i>
                        <p>
                          Stocks
                        </p>
                      </a>
                    </li>
                    {/* <li class="nav-item">
                      <a href="gallery.html" class="nav-link">
                        <i class="nav-icon fas fa-table"></i>
                        <p>
                          Daily Sales
                        </p>
                      </a>
                    </li> */}

                  </ul>
                </nav>
                {/* /.sidebar-menu */}
              </div>
              {/* /.sidebar */}
            </aside>
          </div>
        );
    }
  }

export default Menu; 
