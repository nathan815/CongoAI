import Home from '../components/Home';
import ModelInfoPage from '../components/model/ModelInfoPage';
import Cart from '../components/cart/Cart';
import Sell from '../components/seller/Sell';

export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
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
