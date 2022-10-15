<template>
  <div>
    <h2>Home</h2>
    <p>{{ $route.path }}</p>
    <p>{{ $route.name }}</p>
    <button class="btn btn-primary me-2" @click="$router.push('/about')">
      To About
    </button>
    <button class="btn btn-primary" @click="goAboutPage">To About</button>
    <hr class="my-4" />
    <AppGrid :items="items" v-slot="{ item }" col-class="col-3">
      <AppCard>{{ item }}</AppCard>
    </AppGrid>

    <hr class="my-4" />
    <h2 class="text-center">{{ $person.name }}</h2>

    <button class="my-4 btn btn-primary" @click="person.say">
      Click person
    </button>
  </div>
</template>

<script>
export default {
  // created() {
  //   console.log(this.$person.name);
  //   this.$person.say();
  // },
};
</script>

<script setup>
import { onMounted, ref, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
// import AppGrid from "../components/app/AppGrid.vue";
// import AppCard from "../components/app/AppCard.vue";

const route = useRoute();
console.log(route.path);

const router = useRouter();
const goAboutPage = () => {
  router.push("/about");
};

const items = ref(["사과", "딸기", "포도", "바나나"]);

const person = inject("person");
console.log("@@", person);
</script>

<style lang="scss" scoped></style>
