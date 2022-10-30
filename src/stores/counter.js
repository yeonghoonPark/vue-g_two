import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  // state변수 정의
  state: () => ({
    counter: 0,
  }),

  // computed, getters에서 this로 state에 접근할 수 없어서 state라고 명시해주는 것이다.
  getters: {
    doubleCount: (state) =>
      state.counter != 0 ? state.counter * 2 : state.counter,

    // getters내부에서 내부의 값을 접근하고 싶다면 this는 사용 가능하다.
    // doubleCountPlusOne(){
    //   return this.doubleCount + 1;
    // }

    doubleCountPlusOne: function () {
      return this.doubleCount + 1;
    },
  },

  // method
  actions: {
    increament: function () {
      this.counter++;
    },
  },
});
