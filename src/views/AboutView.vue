<template>
  <div>
    <h2>About</h2>
    <p>{{ $route.path }}</p>
    <p>{{ $route.name }}</p>
    <button class="btn btn-primary me-2" @click="$router.push('/')">
      To Home
    </button>
    <button class="btn btn-primary" @click="goHomePage">To Home</button>
    <hr class="my-4" />
    <h2>store</h2>
    <p>๐storeToRefs</p>
    <p>counter(storeToRefs): {{ counter }}</p>
    <p>coubleCounter(storeToRefs): {{ doubleCount }}</p>
    <p>coubleCounterPlusOne(storeToRefs): {{ doubleCountPlusOne }}</p>
    <button class="btn btn-primary" @click="increament">storeToRefs</button>
    <hr class="my-2" />
    <p>๐store</p>
    <p>counter: {{ store.counter }}</p>
    <p>coubleCounter: {{ store.doubleCount }}</p>
    <p>coubleCounterPlusOne: {{ store.doubleCountPlusOne }}</p>
    <button class="btn btn-primary" @click="store.increament">store</button>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { toRef, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";

// store
import { useCounterStore } from "../stores/counter";

const store = useCounterStore();
console.log(store);

// ๊ตฌ์กฐ๋ถํดํ ๋น์์ ๋ฐ์์ฑ์ ์๊ธฐ ๋๋ฌธ์ ๋ฐ์์ฑ์ ์ ์งํ๊ธฐ ์ํด toRefs ๋๋ toRef๋ฅผ ์ด์ฉํ  ์ ์๋ค.
// toRefs
// const { counter } = toRefs(store);

// toRef
// const counter = toRef(store, "counter");

// storeToRefs
const { counter, doubleCount, doubleCountPlusOne } = storeToRefs(store);

// method
const { increament } = store;

increament();
counter.value = 100;

const route = useRoute();
console.log(route.path);

const router = useRouter();
const goHomePage = () => {
  router.push("/");
};
</script>

<style lang="scss" scoped></style>
