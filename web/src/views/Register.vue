<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="3">
        <v-card elevation="8">
          <v-card-title class="text-h5 text-center">Register</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="onRegister">
              <v-text-field
                v-model="name"
                label="Name"
                prepend-inner-icon="mdi-account"
                required
                class="mb-4"
              />
              <v-text-field
                v-model="email"
                label="Email"
                prepend-inner-icon="mdi-email"
                type="email"
                required
                class="mb-4"
              />
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                prepend-inner-icon="mdi-lock"
                :rules="[lengthRequired]"
                required
                class="mb-4"
              />
              <v-text-field
                v-model="confirmPassword"
                label="Confirm Password"
                type="password"
                prepend-inner-icon="mdi-lock"
                :rules="[matched]"
                required
                class="mb-4"
              />
              <v-btn type="submit" color="primary" :loading="submitting" block>Register</v-btn>
            </v-form>
            <div class="mt-4 text-center">
              <span>Already have an account?</span>
              <RouterLink to="/login">Login</RouterLink>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import api from '@/utils/api';
import router from '@/router';
import { useToast } from 'vue-toastification';

const toast = useToast();
const submitting = ref(false);
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const matched = () => {
  return !!(password.value === confirmPassword.value) || 'Password not match';
};
const lengthRequired = () => {
  return !!(password.value.length >= 6) || 'Password must be at least 6 characters in length';
};

async function onRegister() {
  const payload = {
    name: name.value,
    email: email.value,
    password: password.value,
  };
  try {
    submitting.value = true;
    const { data } = await api.post('/users/register', payload);
    toast.success(data.message);
    router.push('/login');
  } catch (error) {
    console.log(error);
    toast.error('Something went wrong, please check the console');
  } finally {
    submitting.value = false;
  }
}
</script>
