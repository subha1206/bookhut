import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './containers/home';
import Login from './containers/login';
import Register from './containers/register';
import ProductDetails from './containers/productDetails';
import Shipping from './containers/shipping';
import Cart from './containers/cart';
import Payment from './containers/payment';
import PlaceOrder from './containers/placeOrder';
import Order from './containers/order';
import Profile from './containers/profile';

import './App.css';

import Header from './components/common/header';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/products/:id" component={ProductDetails} />
        <Route path="/cart/:id?" component={Cart} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/shipping" component={Shipping} />
        <Route path="/payment" component={Payment} />
        <Route path="/order" component={PlaceOrder} exact />
        <Route path="/order/:id" component={Order} />
      </Switch>
    </Router>
  );
}

export default App;
