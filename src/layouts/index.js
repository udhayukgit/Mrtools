import React from "react";
import Header from '../layouts/Header';
import Menu from '../layouts/Menu';
import Footer from '../layouts/Footer';

class CommonLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // console.log(this.props);
    return (
      <div class="wrapper">
      <Header name="yogesh" />
      <Menu {...this.props} />
      {React.cloneElement(this.props.children, { ...this.props })} {/*when click link in nav bar*/}
      <Footer {...this.props} />
    </div>
    );
  }
}

export default CommonLayout;