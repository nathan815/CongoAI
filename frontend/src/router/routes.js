import Home from '../components/Home';
import ModelInfoPage from '../components/model/ModelInfoPage';
import Cart from '../components/cart/Cart';
import SellerPage from '../components/seller/SellerPage';
import SignIn from '../components/auth/SignIn';
import Register from '../components/auth/Register';
import BrowseModels from '../components/browse/BrowseModels';

export default [
  {
    path: '/',
    name: 'home',
    component: Home,
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
    component: SellerPage
  },
  {
    path: '/browse',
    name: 'browse',
    component: BrowseModels
  },
  {
    path: '/models/:id',
    name: 'model',
    component: ModelInfoPage
  }
];
