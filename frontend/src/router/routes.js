import Home from '../components/Home';
import ViewProduct from '../components/product/ViewProduct';
import Cart from '../components/cart/Cart';

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
