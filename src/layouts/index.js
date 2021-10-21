import React from "react";
import Header from '../layouts/Header';
import Menu from '../layouts/Menu';
import Footer from '../layouts/Footer';
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { Provider } from 'react-redux'

const reducers = {
  // ... your other reducers here ...
  form: formReducer     // <---- Mounted at 'form'
}
const reducer = combineReducers(reducers)
const store = createStore(reducer)

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
          <Provider store={store}>
        {renderComponent()}
        {React.cloneElement(this.props.children, { ...this.props })} {/*when click link in nav bar*/}
        <Footer {...this.props} />
        </Provider>
      </div>
    );
  }
}

export default CommonLayout;
