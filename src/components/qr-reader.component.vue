<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs6>
        <v-card dark color="primary">
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
          <layout :seats="seats"></layout>
        </v-card>
      </v-flex>
    </v-layout>
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

  }),
  computed: {
    ...mapGetters([
      'room',
      'seats',
    ]),
  },
  created() {
    RoomService.getRoom(1).then((response) => {
      // const data = response.data;
      // this.seats = data.layout;
      store.commit('setRoom', response.data);
    });
  },
  methods: {
    onDecode(content) {
      console.log(content);
    },
    onLocate(points) {
      console.log('LOCATE', points);
    },
  },
};

</script>