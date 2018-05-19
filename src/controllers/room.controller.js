import Vue from 'vue';
import Axios from 'axios';
import RoomService from 'Api/room.service';
import store from 'Store';


export default {
  getRoom(id) {
    return RoomService.getRoom(id);
  },
};
