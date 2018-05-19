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
    lastSelected: {
      type: Array,
      default: () => [],
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
  }),
  computed: {
    choosenSeat: {
      get() {
        return this.selectedSeat;
      },
      set(value) {
        this.$emit('update:selectedSeat', value);
      },
    },
    ...mapGetters(['seats']),
    rowsCount() {
      return this.seats.length;
    },
    colsCount() {
      return this.seats[0].length;
    },
  },
  methods: {
    selectSeat(i, j) {
      if (this.choosenSeat.x === i && this.choosenSeat.y === j) {
        this.choosenSeat = {};
        return;
      }
      if (!this.seats[i][j]) {
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
.layout-container {
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
}

</style>

