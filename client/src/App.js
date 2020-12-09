import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './containers/home';
import Loader from './components/common/loader';
import './App.css';
import Header from './components/common/header';
import Order from './containers/order';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = React.lazy(() => import('./containers/login'));
const Register = React.lazy(() => import('./containers/register'));
const ProductDetails = React.lazy(() => import('./containers/productDetails'));
const Shipping = React.lazy(() => import('./containers/shipping'));
const Cart = React.lazy(() => import('./containers/cart'));
const PlaceOrder = React.lazy(() => import('./containers/placeOrder'));
const Profile = React.lazy(() => import('./containers/profile'));

function App() {
  return (
    <Suspense
      fallback={
        <div style={{ textAlign: 'center', marginTop: '10em' }}>
          <Loader />
        </div>
      }
    >
      <Router>
        <Header />
        <ToastContainer className="toast-container" />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/products/:id" component={ProductDetails} />
          <Route path="/cart/:id?" component={Cart} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/shipping" component={Shipping} />
          <Route path="/order" component={PlaceOrder} exact />
          <Route path="/order/:id" component={Order} />
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
