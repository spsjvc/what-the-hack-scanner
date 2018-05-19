<template>
  <div>
    <v-container
      grid-list-md
      text-xs-center>
      <div class="layout-container">
        <div
          v-for="i in rowsCount"
          :key="`4${i}`"
          class="layout-row"
        >
          <div
            v-for="j in colsCount"
            :key="`5${i}${j}`"
            :class="[
              seats[i-1][j-1] ? 'seat-taken' : 'seat-free',
              isSelected(i-1,j-1) ? 'seat-booked' : ''
            ]"
            class="layout-seat"
            @click="seatClicked(i-1, j-1)"
          >
          <span>
            <strong class="text-xs-center" :style="{ width: '100%' }">{{i}}{{alphabet[j - 1]}}</strong>
            {{seatsInfo[i-1][j-1].user ? `(${seatsInfo[i-1][j-1].user.name})` : ''}}
            <br>
            {{ lastReservation(i, j) ? lastReservation(i, j).time_end.substring(10,16) : '' }}
          </span>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Layout',
  props: {
    canSelectAll: {
      type: Boolean,
      default: false,
    },
    canSelect: {
      type: Boolean,
      default: false,
    },
    selectedSeat: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    alphabet: [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
    ],
  }),
  computed: {
    ...mapGetters([
      'seats',
      'room',
      'reservations',
      'seatsInfo',
    ]),
    choosenSeat: {
      get() {
        return this.selectedSeat;
      },
      set(value) {
        this.$emit('update:selectedSeat', value);
      },
    },
    rowsCount() {
      return this.seats.length;
    },
    colsCount() {
      return this.seats[0].length;
    },
  },
  methods: {
    seatIDByCoord(i, j) {
      const arst = _.chunk(this.room.seats, 5)[i - 1][j - 1];
      return arst ? arst.id : null;
    },
    seatByCoord(i, j) {
      return _.filter(this.room.room.seats, (x) => x.id === this.seatIDByCoord(i, j))[0];
    },
    reservationForSeat(i, j) {
      const now = (new Date()).toISOString();
      return _.filter(this.reservations, (r) => {
        return r.time_start < now && r.time_end < now && r.seat_id === this.seatIDByCoord(i, j);
      });
    },
    lastReservation(i, j) {
      return _.orderBy(this.reservationForSeat(i, j), ['time_end'], ['desc'])[0];
    },
    firstReservation(i, j) {
      return _.orderBy(this.reservationForSeat(i, j), ['time_end'], ['asc'])[0];
    },
    selectSeat(i, j) {
      if (this.choosenSeat.x === i && this.choosenSeat.y === j) {
        this.choosenSeat = {};
        return;
      }
      if (!this.seats[i][j] || this.canSelectAll) {
        this.choosenSeat = { x: i, y: j };
      }
    },
    isSelected(i, j) {
      return this.choosenSeat.x === i && this.choosenSeat.y === j;
    },
    seatClicked(i, j) {
      if (!this.canSelect) {
        return;
      }
      this.selectSeat(i, j);
      this.$forceUpdate();
    },
  },
};
</script>
<style>
/* .layout-container {
  height: 70vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.layout-row {
  display: flex;
  flex-grow: 1;
  justify-content: flex-start;
  align-items: stretch;
  background: grey;
  padding-left: 4px;
  padding-right: 4px;
}
.layout-row:first-child {
  padding-top: 4px;
}
.layout-row:last-child {
  padding-bottom: 4px;
}

.layout-seat {
  flex: 1;
  margin: 4px 4px 4px 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.seat-taken {
  background: crimson;
}
.seat-booked {
  background: blueviolet!important;
}
.seat-free {
  background: teal;
}
.layout-admin-panel {
  position: absolute;
  left: 0;
  bottom: 0;
} */


.layout-container {
 height: 70vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
}
.layout-row {
  display: flex;
  flex-grow: 1;
  justify-content: flex-start;
  align-items: stretch;
}
.layout-row:first-child {
  padding-top: 4px;
}
.layout-row:last-child {
  padding-bottom: 4px;
}
.layout-seat {
   flex: 1;
  margin: 4px 4px 4px 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

}
.seat-taken {
  background: #D81159;
}
.seat-booked {
  background: #FFBC42 !important;
}
.seat-free {
  background: #218380;
}
.layout-admin-panel {
  position: absolute;
  left: 0;
  bottom: 0;
}

</style>

