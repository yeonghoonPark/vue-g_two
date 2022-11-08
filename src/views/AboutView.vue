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
    <p>🎈storeToRefs</p>
    <p>counter(storeToRefs): {{ counter }}</p>
    <p>coubleCounter(storeToRefs): {{ doubleCount }}</p>
    <p>coubleCounterPlusOne(storeToRefs): {{ doubleCountPlusOne }}</p>
    <button class="btn btn-primary" @click="increament">storeToRefs</button>
    <hr class="my-2" />
    <p>🎈store</p>
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

// 구조분해할당시에 반응성을 잃기 때문에 반응성을 유지하기 위해 toRefs 또는 toRef를 이용할 수 있다.
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
