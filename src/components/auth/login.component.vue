<template>
  <v-layout
    align-center
    justify-center>
    <v-flex
      xs12
      sm8
      md4>
      <v-card class="elevation-12">
        <v-toolbar
          dark
          color="primary">
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="username"
              prepend-icon="person"
              name="username"
              label="Username"
              type="text"
              data-vv-name="username"/>
            <v-text-field
              id="password"
              v-model="password"
              prepend-icon="lock"
              name="password"
              label="Password"
              type="password"
              data-vv-name="password"/>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="primary"
            @click="submit">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthController from 'Controllers/auth.controller';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    submit() {
      AuthController.login({
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>
