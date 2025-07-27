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
          <v-tab v-for="(item, i) in items" :key="i" :value="i">
            {{ item.text }}
          </v-tab>
        </v-tabs>
      </template>

      <v-spacer />

      <template #append>
        <v-btn class="ms-1" color="medium-emphasis" icon="mdi-bell-outline" />

        <v-btn class="ms-1" icon>
          <v-avatar image="https://cdn.vuetifyjs.com/images/john.png" />

          <v-menu activator="parent" origin="top">
            <v-list>
              <v-list-item link title="Update profile" />

              <v-list-item link title="Sign out" />
            </v-list>
          </v-menu>
        </v-btn>
      </template>
    </v-app-bar>

    <v-main height="200">
      <!--  -->
    </v-main>
  </v-layout>
</template>

<script setup>
import { shallowRef, ref } from 'vue';

const drawer = shallowRef(false);
const tab = ref(0);
const items = [
  {
    text: 'Dashboard',
  },
  {
    text: 'Users',
  },
  {
    text: 'Projects',
  },
  {
    text: 'Settings',
  },
  {
    text: 'Contact',
  },
];
</script>
