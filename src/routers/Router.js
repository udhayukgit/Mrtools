import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { Redirect } from 'react-router';

import RTHandler from "./RTHandler";

import Login from '../modules/login';
import Dashboard from '../layouts/Dashboard';
import ProductList from "../modules/Product/product_list";
import Product from "../modules/Product/product";
import PurchaseList from "../modules/Purchase/purchase_list";
import Purchase from "../modules/Purchase/purchase";
import SalesList from "../modules/Sales/sales_list";


/**
 * Parent App component with routing
 */
const AppRoute = () => {
  return (

    <Router basename="/">
      <Redirect exact from="/" to="login" />
      <RTHandler
        exact
        path="/login"
        component={Login} 
        />
      <RTHandler
        exact
        path="/dashboard"
        component={Dashboard} 
        />
      <RTHandler
        exact
        path="/product_list"
        component={ProductList}
      />  
      <RTHandler
        exact
        path="/purchase_list"
        component={PurchaseList}
      />
      <RTHandler
        exact
        path="/sales_list"
        component={SalesList}
      >   
      </RTHandler>
    </Router>
  );
};

export default AppRoute;
