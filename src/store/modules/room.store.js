import RoomService from 'Api/room.service';

const state = {
  userToken: null,
  room: {
    layout: [[]],
  },
};

const getters = {
  room: (state) => state.room,
  seats: (state) => state.room.layout,
  userToken: (state) => state.userToken,
};

const actions = {
  async fetchRoom({ commit }) {
    const room = await RoomService.getRoom(1);
    commit('setRoom', room.data);
  },
};

const mutations = {
  setCurrentUserToken(state, token) {
    state.userToken = token;
  },
  setRoom(state, roomData) {
    state.room = roomData;
  },
};

export {
  actions,
  state,
  getters,
  mutations,
};
