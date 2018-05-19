import Axios from 'axios';

const PREFIX = 'rooms';

export default {
  getRoom(id) {
    return Axios.get(PREFIX + '/' + id);
  },
  getUser(token) {
    return Axios.post('users/get-user-by-token', { access_token: token });
  },
  initiate(data) {
    return Axios.post('/reservations/initiate', data);
  },
};
