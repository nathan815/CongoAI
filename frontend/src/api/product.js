import axios from 'axios';

export default {
  create(data) {
    return axios.post('/products', data);
  },
  getInfo(id) {
    return axios.get(`/products/${id}`);
  },
  getProducts() {
    return axios.get('/products');
  },
}
