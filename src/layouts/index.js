import React from "react";
import Header from '../layouts/Header';
import Menu from '../layouts/Menu';
import Footer from '../layouts/Footer';

class CommonLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true
    };
  }

  render() {
    const renderComponent = () => {
      if (this.props.location.pathname!='/login') {
        return (
          <React.Fragment>
            <Header {...this.props}/>
            <Menu {...this.props}/>
          </React.Fragment>
        )
      }
    }
    // console.log(isLoggedIn);
    return (
      <div class="wrapper">
        {renderComponent()}
        {React.cloneElement(this.props.children, { ...this.props })} {/*when click link in nav bar*/}
        <Footer {...this.props} />
      </div>
    );
  }
}

export default CommonLayout;
