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
    return Axios.post('/users/enter-without-reservation', data);
  },
  createRoom(data) {
    return Axios.post('/rooms', data);
  },
  exitRoom(data) {
    return Axios.post('/users/exit-from-room', data);
  },
  pauseRoom(data) {
    return Axios.post('/users/pause', data);
  },
};
