import axios from 'axios';

export default {
  authenticate(username, password) {
    return axios({
      url: '/auth',
      method: 'POST',
      auth: {
          username,
          password
      },
    });
  }
}
