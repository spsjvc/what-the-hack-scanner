import RoomService from 'Api/room.service';

const state = {
  userToken: null,
  bookingUser: null,
  room: {
    layout: [[]],
  },
};

const getters = {
  room: (state) => state.room,
  seats: (state) => state.room.layout,
  userToken: (state) => state.userToken,
  seatsInfo: (state) => state.room.seats ? _.chunk(state.room.seats, 5) : [[]],
  bookingUser: (state) => state.bookingUser,
  // timeUntilTaken: (state) => {
    // state.room
  // },
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
  setBookingUser(state, user) {
    state.bookingUser = user;
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
