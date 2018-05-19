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
              selectedSeats[i-1][j-1] ? 'seat-taken' : 'seat-free',
              isLastSelected(i-1,j-1) ? 'seat-booked' : ''
            ]"
            class="layout-seat"
            @click="seatClicked(i-1, j-1)"
          >
            <!-- {{ i-1 }} -->
            <!-- {{ j-1 }} -->
          </div>
        </div>
      </div>
      <div
        v-if="isCinemaAdmin"
        class="layout-admin-panel"
      >
        <v-btn
          color="info darken-1"
          @click.native="addColumn">
          add column
          <v-icon class="ml-2">view_column</v-icon>
        </v-btn>
        <v-btn
          color="info darken-1"
          @click.native="addRow">
          add row
          <v-icon class="ml-2">playlist_add</v-icon>
        </v-btn>
      </div>
    </v-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Layout',
  props: {
    seats: {
      type: Array,
      default: () => [[]], // nule i jedinice
    },
    lastSelected: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters(['isCinemaAdmin']),
    selectedSeats: {
      get() {
        return this.seats;
      },
      set(value) {
        this.$emit('update:seats', value);
      },
    },
    lastSelectedSeats: {
      get() {
        return this.lastSelected;
      },
      set(value) {
        this.$emit('update:last-selected', value);
      },
    },
    rowsCount() {
      return this.selectedSeats.length;
    },
    colsCount() {
      return this.selectedSeats[0].length;
    },
  },
  methods: {
    isLastSelected(i, j) {
      return Boolean(_.findIndex(this.lastSelectedSeats, (o) => {
        return o.x === i && o.y === j;
      }) + 1);
    },
    bookOrUnbook(i, j) {
      const index = _.findIndex(this.lastSelectedSeats, (o) => {
        return o.x === i && o.y === j;
      });
      if (index === -1) {
        this.lastSelectedSeats.push({ x: i, y: j });
        this.lastSelectedSeats = this.lastSelectedSeats;
        return;
      }
      this.lastSelectedSeats.splice(index, 1);
    },
    isSeatTaken(i, j) {
      return !this.selectedSeats[i][j];
    },
    seatClicked(i, j) {
      // nije admin => bookira karte
      if (!this.isCinemaAdmin) {
        if (this.isSeatTaken(i, j)) {
          return;
        }
        this.bookOrUnbook(i, j);
        return;
      }
      this.selectedSeats[i][j] = this.selectedSeats[i][j] === 1 ? 0 : 1;
      this.$forceUpdate();
    },
    addRow() {
      this.selectedSeats.push(Array(...Array(this.colsCount)).map(Number.prototype.valueOf, 1));
    },
    addColumn() {
      _.forEach(this.selectedSeats, (x) => {
        x.push(1);
      });
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

