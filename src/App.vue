<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<template>
  <ul>
    <li>
      <RouterLink to="/">Home</RouterLink>
    </li>
    <li>
      <RouterLink to="/notFound">Not Found</RouterLink>
    </li>
    <RouterView />
  </ul>

</template>

<style scoped></style>
