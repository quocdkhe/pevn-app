<template>
  <v-container class="mt-8" max-width="500">
    <v-card>
      <v-card-title class="text-h6">Update Profile</v-card-title>

      <v-card-text>
        <v-form @submit.prevent="handleSubmit" v-model="isFormValid" ref="formRef" lazy-validation>
          <v-text-field label="Email" v-model="form.email" disabled prepend-icon="mdi-email" />

          <v-text-field
            label="Full Name"
            v-model="form.name"
            prepend-icon="mdi-account"
            :rules="[rules.required]"
          />

          <v-text-field
            label="New Password"
            v-model="form.password"
            type="password"
            prepend-icon="mdi-lock"
            :rules="[rules.min]"
          />

          <v-text-field
            label="Confirm Password"
            v-model="form.confirmPassword"
            type="password"
            prepend-icon="mdi-lock-check"
            :rules="[rules.matchPassword]"
          />

          <v-btn
            type="submit"
            color="primary"
            class="mt-4"
            block
            :disabled="!isFormValid"
            @click="handleSubmit"
          >
            Save Changes
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import api from '@/utils/api';
import { onMounted, reactive, ref } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();
const formRef = ref(null);
const isFormValid = ref(false);

const form = reactive({
  email: 'user@example.com',
  name: '',
  password: '',
  confirmPassword: '',
});

const rules = {
  required: (v) => !!v || 'This field is required',
  min: (v) => !v || v.length >= 6 || 'Minimum 6 characters',
  matchPassword: (v) => v === form.password || 'Passwords do not match',
};

onMounted(async () => {
  try {
    const { data } = await api.get('/users/profile');
    const { email, name } = data;

    form.email = email;
    form.name = name;
  } catch (error) {
    console.error(error);
  }
});

const handleSubmit = async () => {
  if (!formRef.value?.validate()) {
    return;
  }
  const payload = {
    name: form.name,
    ...(form.password ? { password: form.password } : {}),
  };

  try {
    await api.put('/users/profile', payload);
    toast.success('Update information successfully');
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || 'Something went wrong');
  }
};
</script>
