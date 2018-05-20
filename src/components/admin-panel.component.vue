<template>
  <div>
    <v-flex xs6 offset-xs3>
      <form>
        <v-text-field
          v-validate="'required'"
          v-model="name"
          :error-messages="errors.collect('ime')"
          label="Ime"
          data-vv-name="ime"
          required
        ></v-text-field>
        <v-text-field
          v-validate="'required'"
          v-model="faculty"
          :error-messages="errors.collect('fakultet')"
          label="Fakultet"
          data-vv-name="fakultet"
          required
        ></v-text-field>
        <v-text-field
          v-validate="'required|integer'"
          v-model="rows"
          :error-messages="errors.collect('redovi')"
          label="Broj redova"
          data-vv-name="redovi"
          required
        ></v-text-field>
        <v-text-field
          v-validate="'required|integer'"
          v-model="columns"
          :error-messages="errors.collect('kolone')"
          label="Broj kolona"
          data-vv-name="kolone"
          required
        ></v-text-field>

        <v-btn @click="submit" :disabled="errors.length">submit</v-btn>
        <v-btn @click="clear">clear</v-btn>
      </form>
    </v-flex>

    <v-snackbar
      :timeout="5000"
      top
      v-model="snackbar"
    >
      {{ message }}
      <v-btn flat color="pink" @click.native="snackbar = false">Zatvori</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import RoomService from 'Api/room.service';

export default {
  name: 'AdminPanel',
  data: () => ({
    name: '',
    snackbar: false,
    message: '',
    faculty: '',
    rows: '',
    columns: '',
  }),
  methods: {
    showSnackbar(message) {
      this.message = message;
      this.snackbar = true;
    },
    clear() {
      this.name = '';
      this.faculty = '';
      this.rows = 0;
      this.columns = 0;
    },
    async submit() {
      const isValid = await this.$validator.validateAll();
      if (!isValid) {
        return;
      }
      RoomService.createRoom({
        name: this.name,
        faculty: this.faculty,
        rows: this.rows,
        columns: this.columns,
      }).then(() => {
        this.showSnackbar('Kreiranje citaonice uspesno!');
        this.clear();
      }).catch(() => {
        this.showSnackbar('Kreiranje citaonice nije uspelo! Molimo Vas pokusajte ponovo');
      });
    },
  },
};
</script>
