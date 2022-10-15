<template>
  <div class="text-center py-5">
    <h1>Oops!</h1>
    <h2>404 Not Found</h2>
    <div class="text-muted">The requested page could not be found</div>
    <div class="mt-4">
      <RouterLink to="/">
        <button class="btn btn-primary">Home</button>
      </RouterLink>
    </div>
    <p class="mt-2">{{ $route.params.pathMatch }}</p>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
