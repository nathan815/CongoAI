import axios from 'axios';

export default {
  create(productId) {
    return axios.post('/transactions', { products: productId });
  }
}
