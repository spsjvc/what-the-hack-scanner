<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs6 sm6 md6 lg6 style="justify-content: center">
        <v-card color="secondary">
          <v-card-text class="">QR čitač</v-card-text>
          <qrcode-reader
            :paused="isPaused"
            @decode="onDecode"
            class="ma-1"
          ></qrcode-reader>
        </v-card>
         <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex xs6>
              <v-card color="secondary">
                <v-card-text class="px-0">Slobodnih mesta: {{ freeSeats }}</v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs6>
              <v-card color="secondary">
                <v-card-text class="px-0">Zauzetih mesta: {{ takenSeats }}</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs6 sm6 md6 lg6>
        <v-card color="secondary">
          <v-card-text class="px-0">Trenutno stanje</v-card-text>
          <layout :canSelect="false" :selectedSeat.sync="selectedSeat"/>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog
      v-model="showBigMessage"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card >
        <div class="big-message-wrapper"><span class="big-message">{{ bigMessage }}</span></div>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
       <v-card tile>
          <v-toolbar card  color="secondary">
            <v-btn icon  @click.native="closeDialog">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Izaberi mesto</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
            </v-toolbar-items>
          </v-toolbar>
          <v-container grid-list-md>
            <v-layout row>
              <v-flex xs6 pa-3 md6>
                <template v-if="!selectedSeatReservations.id">
                  <h2 >Odaberite mesto</h2>
                </template>
                <template v-else-if="selectedSeatReservations.user">
                  <h3>Trenutno zauzeto od: {{ selectedSeatReservations.user.name}}</h3>
                  <h3>Trenutno uci: {{ currentSubject(selectedSeatReservations ? selectedSeatReservations.number : null) }}</h3>
                  <!-- <br> -->
                  <!-- <br> -->
                  <!-- <h3>Rezervacije za izabrano mesto:</h3> -->
                  <!-- <template v-for="reservation in seatReservations(selectedSeat.x, selectedSeat.y)"> -->
                    <!-- <p :key="reservation.id">{{ reservation.time_start }} - {{ reservation.time_end }}</p> -->
                  <!-- </template> -->
                </template>
                <template v-else>
                  <v-container grid-list-md>
                    <v-layout row>
                      <v-flex xs4>
                        <h3>Rezervacije za izabrano mesto:</h3>
                        <template v-for="reservation in seatReservations(selectedSeat.x, selectedSeat.y)">
                          <p :key="reservation.id">{{ reservation.time_start }} - {{ reservation.time_end }}</p>
                        </template>
                      </v-flex>
                      <v-flex xs8>
                        <h3 class="my-1">Rezervisi do:</h3>
                        <v-time-picker landscape elevation class="my-4 elevation-16" v-model="until" format="24hr"></v-time-picker>
                        <v-text-field
                          v-model="additional"
                          multi-line
                          name="email"
                          label="Dodatni komentari (predmet...)"
                          type="text"
                          data-vv-name="razlog"/>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </template>
              </v-flex>
              <v-flex xs6 md6>
                <layout :canSelect="true" :selectedSeat.sync="selectedSeat" :canSelectAll="true"/>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-actions>
            <v-btn
              flat
              color="orange"
              @click="closeDialog"
            >
              Otkaži
            </v-btn>
            <v-btn
              color="orange"
              :disabled="selectedSeat.x === null || until === null"
              @click="initiate"
            >
              Potvrdi
            </v-btn>
          </v-card-actions>
       </v-card>
    </v-dialog>
    <v-snackbar
      :timeout="5000"
      top
      v-model="snackbar"
    >
      {{ message }}
      <v-btn flat color="pink" @click.native="snackbar = false">Zatvori</v-btn>
    </v-snackbar>
    <v-dialog v-model="exitModal" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">Odaberite tip odlaska</v-card-title>
        <v-card-text>Da li zelite da odete na pauzu (do 15min) ili da napustite citaonicu?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="goToPause">Pauza</v-btn>
          <v-btn color="green darken-1" flat @click.native="goToExit">Odlazak</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { QrcodeReader } from 'vue-qrcode-reader';
import Layout from 'Components/layout.component';
import RoomService from 'Api/room.service';
import store from 'Store';
import { mapGetters } from 'vuex';

export default {
  name: 'qr-reader',
  components: {
    QrcodeReader,
    Layout,
  },
  data: () => ({
    showBigMessage: false,
    bigMessage: '',
    snackbar: false,
    message: '',
    selectedSeat: {},
    dialog: false,
    until: null,
    additional: '',
    isPaused: false,
    exitModal: false,
  }),
  computed: {
    ...mapGetters([
      'room',
      'userToken',
      'seatsInfo',
      'freeSeats',
      'takenSeats',
      'reservations',
      'bookingUser',
    ]),
    canSelect() {
      return Boolean(this.userToken);
    },
    selectedSeatReservations() {
      return this.seatsInfo[this.selectedSeat.x] ? this.seatsInfo[this.selectedSeat.x][this.selectedSeat.y] : {};
    },
  },
  created() {
    store.dispatch('fetchRoom');
  },
  methods: {
    currentSubject(seatId) {
        if (seatId === null) {
      return;
      }
      return _.filter(this.reservations, (x) => x.seat_id === seatId)[0].subject; // eslint-disable-line
    },
    seatReservations(x, y) {
      const seatId = this.idByCoords(x, y);
      return _.filter(this.reservations, (x) => {
        return x.seat_id === seatId;
      });
    },
    seatByCoord(i, j) {
      const a = _.filter(this.room.seats, (x) => x.id === this.idByCoords(i, j))[0];
      return a;
    },
    idByCoords(i, j) {
      return _.chunk(this.room.seats, 5)[i][j].id;
    },
    reservationForSeat(i, j) {
      const now = (new Date()).toISOString();
      return _.filter(this.reservations, (r) => {
        return r.time_start < now && r.time_end < now && r.seat_id === this.idByCoords(i, j);
      });
    },
    lastReservation(i, j) {
      return _.orderBy(this.reservationForSeat(i, j), ['time_end'], ['desc'])[0];
    },
    firstReservation(i, j) {
      return _.orderBy(this.reservationForSeat(i, j), ['time_end'], ['asc'])[0];
    },
    initiate() {
      RoomService.initiate({
        access_token: this.userToken,
        until: this.until,
        subject: this.additional,
        seat_id: this.idByCoords(this.selectedSeat.x, this.selectedSeat.y),
      }).
        then(() => {
          this.showBig(`Dobrodosli, ${this.bookingUser.name}`);
          this.closeDialog();
        }).
        catch(() => {
          this.showSnackbar('Rezervisanje nije uspelo! Pokusajte ponovo');
        });
    },
    showSnackbar(message) {
      this.message = message;
      this.snackbar = true;
    },
    closeDialog() {
      this.additional = '';
      this.resetReservation();
      this.dialog = false;
      this.isPaused = false;
    },
    resetReservation() {
      this.selectedSeat = {};
      this.isPaused = false;
      store.commit('setCurrentUserToken', null);
    },
    showBig(message) {
      this.isPaused = true;
      this.showBigMessage = true;
      this.bigMessage = message;
      setTimeout(() => {
        this.isPaused = false;
        this.showBigMessage = false;
      }, 3000);
    },
    goToPause() {
      this.showBig(`Fino se odmorite, ${this.bookingUser.name}`);
      RoomService.pauseRoom({ access_token: this.userToken });
      this.exitModal = false;
      this.isPaused = false;
    },
    goToExit() {
      this.showBig(`Doviđenja, ${this.bookingUser.name}`);
      RoomService.exitRoom({ access_token: this.userToken });
      this.exitModal = false;
      this.isPaused = false;
    },
    async onDecode(content) {
      this.isPaused = true;
      if (_.isEmpty(content)) {
        this.isPaused = false;
        return;
      }
      store.commit('setCurrentUserToken', content);

      let response = null;
      try {
        response = await RoomService.getUser(`${content}`);
      } catch (e) {
        this.isPaused = false;
        return;
      }

      response = response.data;
      store.commit('setBookingUser', response.user);

      if (response.inside === true) {
        // na pauzi je i vraca se
        if (response.status === 'pause') {
          this.isPaused = false;
          this.showBig(`Dobrodosli nazad, ${response.user.name}`);
          return;
        }

        // izlazi ili ide na pauzu
        this.exitModal = true;
        return;
      }

      // napolju je i ulazi tek
      if (response.reservation) {
        if (response.reservation.seat.user_id === null) {
          this.showBig(`Doviđenja, ${response.user.name}`);
          this.resetReservation();
          return;
        }
          this.resetReservation();
          this.showBig(`Dobrodosli, ${response.user.name}`);
        return;
      }

      // nije rezervisao, sada bira
      store.commit('setBookingUser', response.user);
      this.dialog = true;
    },
  },
};

</script>
<style>
.big-message {
  color: green;
  text-shadow: 3px greenyellow;
  font-size: 40px;
}
.big-message-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
