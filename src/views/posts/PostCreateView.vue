<template>
  <div>
    <h2>게시글 등록</h2>
    <hr class="my-4" />

    <AppError v-if="errorMessage" :message="errorMessage" />

    <PostForm
      v-model:title="savedList.title"
      v-model:content="savedList.content"
      @submit.prevent="saveData"
    >
      <template #actions>
        <button
          type="button"
          class="btn btn-outline-dark me-2"
          @click="goListPage"
        >
          List
        </button>

        <button class="btn btn-primary" :disabled="isLoading">
          <template v-if="isLoading">
            <span
              class="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Loading...</span>
          </template>
          <template v-else> Save </template>
        </button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
/* vue */
import { ref } from "vue";

/* router */
import { useRouter } from "vue-router";

/* api */
import { createPost } from "../../api/posts";

/* components */
import PostForm from "../../components/posts/PostForm.vue";

/* composables */
import { useAlert } from "../../composables/useAlert";

// appLoading, appError
const errorMessage = ref(null);
const isLoading = ref(false);

const { vAlert, vSuccess } = useAlert();

const router = useRouter();

const savedList = ref({
  title: null,
  content: null,
});

const goListPage = () => {
  router.push({ name: "PostList" });
};

// const date = new Date();
// const years = date.getFullYear();
// const months = date.getMonth();
// const dates = date.getDate();
// const hours = date.getHours();
// const minutes = date.getMinutes();
// const secondes = date.getSeconds();

const saveData = async () => {
  try {
    isLoading.value = true;
    const data = {
      ...savedList.value,
      // createdAt: `${years}년 ${months}월 ${dates}일 ${hours}시 ${minutes}분 ${secondes}초`,
      createdAt: Date.now(),
    };
    await createPost(data);
    vSuccess("등록이 완료되었습니다.");
    goListPage();
  } catch (error) {
    console.error(error);
    vAlert(error.message);
    errorMessage.value = error;
  } finally {
    isLoading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
