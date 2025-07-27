<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="3">
        <v-card elevation="8">
          <v-card-title class="text-h5 text-center">Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="onLogin">
              <v-text-field
                v-model="username"
                label="Username"
                prepend-inner-icon="mdi-account"
                required
                class="mb-4"
              />
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                prepend-inner-icon="mdi-lock"
                required
                class="mb-4"
              />
              <v-btn :loading="fetching" type="submit" color="primary" block>Login</v-btn>
            </v-form>
            <div class="mt-4 text-center">
              <span>New user? </span>
              <router-link to="/register">Register</router-link>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import api from '@/utils/api';

const toast = useToast();
const username = ref('');
const password = ref('');
const fetching = ref(false);

async function onLogin() {
  // Replace with real authentication logic
  const payload = {
    email: username.value,
    password: password.value,
  };

  try {
    fetching.value = true;
    const { data } = await api.post('/users/auth', payload);
    toast.success(data.message);
  } catch (error: any) {
    console.log(error);
    toast.error(error?.response?.data?.message || 'Something went wrong, please check the console');
  } finally {
    fetching.value = false;
  }
}
</script>
