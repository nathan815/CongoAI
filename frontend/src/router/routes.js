import Home from '../components/Home';
import ModelInfoPage from '../components/model/ModelInfoPage';
import Cart from '../components/cart/Cart';
import Sell from '../components/seller/Sell';
import SignIn from '../components/auth/SignIn';
import Register from '../components/auth/Register';

export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignIn
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/sell',
    name: 'sell',
    component: Sell
  },
  {
    path: '/models/:id',
    name: 'model',
    component: ModelInfoPage
  }
];
