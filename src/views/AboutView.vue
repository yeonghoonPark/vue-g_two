<template>
  <div>
    <h2>About</h2>
    <p>{{ $route.path }}</p>
    <p>{{ $route.name }}</p>
    <button class="btn btn-primary me-2" @click="$router.push('/')">
      To Home
    </button>
    <button class="btn btn-primary" @click="goHomePage">To Home</button>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
console.log(route.path);

const router = useRouter();
const goHomePage = () => {
  router.push("/");
};
</script>

<style lang="scss" scoped></style>
