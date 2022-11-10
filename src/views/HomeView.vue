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
    <!-- <h2 class="text-center">{{ $person.name }}</h2>

    <button class="my-4 btn btn-primary" @click="person.say">
      Click person
    </button> -->

    <h2>{{ position }} 원본</h2>
    <h2>{{ xPostion }} toRef</h2>
    <h2>{{ newXPostion }} ref</h2>
    <h2>{{ x }} toRefs</h2>
    <h2>{{ y }} toRefs</h2>
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
import { onMounted, ref, inject, reactive, toRef, toRefs } from "vue";
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

// const person = inject("person");
// console.log("@@", person);

const position = reactive({
  x: 100,
  y: 1000,
});

// toRef
const xPostion = toRef(position, "x");
console.log(xPostion);

// 반응성을 잃지 않지만 단지 position.x의 값을 단순히 primitive로 받아 새롭게 ref로 선언한 것 뿐이다, 반응성을 유지하지만 reactive로 선언 된 원본과는 전혀 관계가 없다.
const newXPostion = ref(position.x);

// toRefs (구조분해할당)
const { x, y } = toRefs(position);
</script>

<style lang="scss" scoped></style>
