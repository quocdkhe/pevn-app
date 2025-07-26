<template>
  <v-container>
    <v-btn color="primary" @click="handleClick">Count is {{ count }}</v-btn>
  </v-container>
</template>

<script lang="js" setup>
import { ref } from 'vue';
const count = ref(0);

function handleClick() {
  count.value++;
}
</script>
