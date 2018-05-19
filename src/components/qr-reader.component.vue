<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs6>
        <v-card dark color="primary" class="pb-1 px-1">
          <v-card-text class="">QR čitač</v-card-text>
          <qrcode-reader
            @decode="onDecode"
            @locate="onLocate"
            class="ma-1"
          ></qrcode-reader>
        </v-card>
      </v-flex>
      <v-flex xs-6>
        <v-card dark color="primary">
          <v-card-text class="px-0">Slobodna mesta</v-card-text>
          <layout :canSelect="canSelect" :selectedSeat.sync="selectedSeat"/>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { QrcodeReader } from 'vue-qrcode-reader';
import Layout from 'Components/layout.component';
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
  }),
  computed: {
    ...mapGetters([
      'room',
      'userToken',
    ]),
    canSelect() {
      return Boolean(this.userToken);
    },
  },
  created() {
      store.dispatch('fetchRoom');
  },
  methods: {
    onDecode(content) {
      store.commit('setCurrentUserToken', content);
      setTimeout(() => {
        this.selectedSeat = {};
        store.commit('setCurrentUserToken', null);
      }, 30000);
      console.log(`${content}`);
    },
    onLocate(points) {
      console.log('LOCATE', points);
    },
  },
};

</script>