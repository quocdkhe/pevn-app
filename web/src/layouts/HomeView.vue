<template>
  <v-layout>
    <v-navigation-drawer v-model="drawer" color="primary" disable-resize-watcher>
      <v-list nav>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :active="i === 0"
          link
          :title="item.text"
        />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar class="px-md-4">
      <template #prepend>
        <v-app-bar-nav-icon v-if="$vuetify.display.smAndDown" @click="drawer = !drawer" />
      </template>

      <v-img
        class="me-sm-8"
        max-width="40"
        src="https://cdn.vuetifyjs.com/docs/images/logos/v.svg"
      />

      <template v-if="$vuetify.display.mdAndUp">
        <v-tabs align-tabs="center" v-model="tab" class="me-2" grow>
          <v-tab v-for="(item, i) in items" :key="i" :value="i" :to="item.to">
            {{ item.text }}
          </v-tab>
        </v-tabs>
      </template>

      <v-spacer />
      <template #append>
        <template v-if="isLoggedIn">
          <v-btn class="ms-2 text-none" variant="text">
            {{ user.name }}

            <v-menu activator="parent" origin="top">
              <v-list>
                <v-list-item link title="Update profile" to="/profile" />
                <v-list-item title="Sign out" @click="logout" />
              </v-list>
            </v-menu>
          </v-btn>
        </template>

        <template v-else>
          <v-btn class="ms-2 text-none" color="primary" variant="elevated" to="/login">
            Sign In
          </v-btn>
          <v-btn class="ms-2 text-none" color="primary" to="/register"> Sign Up </v-btn>
        </template>
      </template>
    </v-app-bar>

    <v-main height="200">
      <router-view></router-view>
    </v-main>
  </v-layout>
</template>

<script setup>
import { ref, shallowRef, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import api from '@/utils/api';

// Simulated global user store using localStorage (replace with Pinia if preferred)
const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));
const isLoggedIn = ref(!!user.value);
const name = ref(user.value?.name || '');

const toast = useToast();
const drawer = shallowRef(false);
const tab = ref(0);

const items = [
  { text: 'Dashboard', to: '/' },
  { text: 'Profile', to: '/profile' },
];

// Auto-rehydrate user if stored
onMounted(() => {
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    const parsed = JSON.parse(savedUser);
    name.value = parsed.name;
    isLoggedIn.value = true;
  }
});

async function logout() {
  try {
    await api.post('/users/logout');
    localStorage.removeItem('user');
    name.value = '';
    isLoggedIn.value = false;
    toast.success('Logout successfully');
  } catch (error) {
    console.error(error);
    toast.error('Logout failed');
  }
}
</script>
