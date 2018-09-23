import axios from 'axios';

export default {
  authenticate(email, password) {
    return axios({
      url: '/auth',
      method: 'POST',
      auth: {
          username: email,
          password: password
      },
    });
  },
  register({ name, email, password }) {
    return axios.post('/users', {
      name,
      email,
      password
    });
  }
}
