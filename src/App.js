import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Home from "./pages/Home"
import ProductList from "./pages/ProductList"
import IndividualProduct from "./pages/IndividualProduct"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Register from "./pages/Register"
import RegisterSuccess from "./pages/RegisterSuccess"
import Success from './pages/Success';
import { useSelector } from 'react-redux';
import Logout from './pages/Logout';
import ScrollToTop from './scrollToTop';

function App() {
  const user = useSelector(state => state.user.currentUser)

  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/products">
          <ProductList />
        </Route>
        <Route path="/products/:category">
          <ProductList />
        </Route>
        <Route path="/product/:id">
          <IndividualProduct />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/"/> : <Login />}
        </Route>
        <Route path="/register">
          {user ? <Redirect to="/"/> : <Register />}
        </Route>
        <Route path="/registered">
          <RegisterSuccess />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
