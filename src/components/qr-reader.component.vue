<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs6>
        <v-card dark color="secondary" class="pb-1 px-1">
          <v-card-text class="">QR čitač</v-card-text>
          <qrcode-reader
            @decode="onDecode"
            class="ma-1"
          ></qrcode-reader>
        </v-card>
      </v-flex>
      <v-flex xs-6>
        <v-card dark color="secondary">
          <v-card-text class="px-0">Slobodna mesta</v-card-text>
          <layout :canSelect="false" :selectedSeat.sync="selectedSeat"/>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
       <v-card tile>
          <v-toolbar card dark color="secondary">
            <v-btn icon dark @click.native="closeDialog">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Izaberi mesto</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
            </v-toolbar-items>
          </v-toolbar>
          <v-layout row>
            <v-flex xs-6 md-6>
              <template v-if="!selectedSeatReservations.id">
                Odaberite mesto
              </template>
              <template v-else-if="selectedSeatReservations.user">
                <p>
                  Korisnik: {{ selectedSeatReservations.user.name}}
                </p>
              </template>
              <template v-else>
                Mesto je slobodno do: <span>{{  }}</span>
                Rezervisi do:
                <v-time-picker v-model="until"></v-time-picker>
              </template>

            </v-flex>
            <v-flex xs-6 md-6>
              <layout :canSelect="true" :selectedSeat.sync="selectedSeat" :canSelectAll="true"/>
            </v-flex>
          </v-layout>
          <v-card-actions>
            <v-btn
              flat
              color="orange"
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
    selectedSeat: {},
    dialog: false,
    until: null,
  }),
  computed: {
    ...mapGetters([
      'room',
      'userToken',
      'seatsInfo',
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
    initiate() {
      RoomService.initiate({ access_token: this.userToken, until: this.until }).
        then(() => {
          this.closeDialog();
        }).
        catch(() => {
          console.log('nije uspelo bukiranje');
        });
    },
    closeDialog() {
      this.resetReservation();
      this.dialog = false;
    },
    resetReservation() {
      this.selectedSeat = {};
      store.commit('setCurrentUserToken', null);
    },
    async onDecode(content) {
      store.commit('setCurrentUserToken', content);
      const data = await RoomService.getUser(`${content}`);
      if (data.data.reservation) {
        this.resetReservation();
        return;
      }

      // nije rezervisao, sada bira
      store.commit('setBookingUser', data.data.user);
      this.dialog = true;

      // setTimeout(() => {
        // this.resetReservation();
      // }, 30000);
      // console.log(`${content}`);
    },
    // onLocate(points) {
    //   console.log('LOCATE', points);
    // },
  },
};

</script>