import logo from './logo.svg';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './containers/home';
import Login from './containers/login';
import Register from './containers/register';
import ProductDetails from './containers/productDetails';
import Cart from './containers/cart';
import './App.css';

import Header from './components/common/header';

function App() {
  return (
    <Router>
      {/* <Header /> */}
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/products/:id" component={ProductDetails} />
        <Route path="/cart/:id?" component={Cart} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
