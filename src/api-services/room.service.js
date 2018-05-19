import Axios from 'axios';

const PREFIX = 'rooms';

export default {
  getRoom(id) {
    return Axios.get(PREFIX + '/' + id);
  },
};
