import axios from 'axios';

export default {
  create(data) {
    return axios.post('/products', {
      title: data.name,
      desc: data.desc,
      category: data.category,
      type: data.type,
      price: data.price
    });
  },
  getInfo(id) {
    return axios.get(`/products/${id}`);
  },
  getProducts() {
    return axios.get('/products');
  },
}
