import Home from '../components/Home';
import ViewProduct from '../components/product/ViewProduct';
import Cart from '../components/product/Cart';

export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/',
    name: 'cart',
    component: Cart
  },
  {
    path: '/products/:id',
    name: 'product',
    component: ViewProduct
  }
];
