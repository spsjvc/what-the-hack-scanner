import RoomService from 'Api/room.service';

const state = {
  room: {
    layout: [[]],
  },
};

const getters = {
  room: (state) => state.room,
  seats: (state) => state.room.layout,
};

const actions = {
  async fetchRoom({ commit }) {
    const room = await RoomService.getRoom(1);
    commit('setRoom', room.data);
  },
};

const mutations = {
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
