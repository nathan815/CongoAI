import Home from '../components/Home';
import Viewproduct from '../components/product/Viewproduct';
import cart from '../components/product/cart';

export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/',
    name: 'cart',
    component: cart
  },
  {
    path: '/products/:id',
    name: 'product',
    component: Viewproduct
  }
];
