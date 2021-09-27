import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import RTHandler from "./RTHandler";

import Login from '../modules/login';
import Dashboard from '../layouts/Dashboard';
import ProductList from "../modules/Product/product_list";
import Product from "../modules/Product/create_product";
import StockList from "../modules/Stock/stock_list";
import Stock from "../modules/Stock/create_stock";

/**
 * Parent App component with routing
 */
const AppRoute = () => {
  return (

    <Router basename="/">
      <Route path="/login">
      <Login />
      </Route>
        <RTHandler
          exact
          path="/dashboard"
          component={Dashboard} 
          />
        <RTHandler
          exact
          path="/create_product"
          component={Product} 
          />
        <RTHandler
          exact
          path="/product_list"
          component={ProductList}
        />  
        <RTHandler
          exact
          path="/create_stock"
          component={Stock} 
          />
        <RTHandler
          exact
          path="/stock_list"
          component={StockList}
        >  
        </RTHandler>
    </Router>
  );
};

export default AppRoute;
