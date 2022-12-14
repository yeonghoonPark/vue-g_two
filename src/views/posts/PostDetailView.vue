<template>
  <AppLoading v-if="isLoading" />

  <AppError v-else-if="errorMessage" :message="errorMessage" />

  <div v-else>
    <h2>{{ selectedPost.title }}</h2>
    <h2>id: {{ props.id }} isOdd: {{ isOdd }}</h2>
    <p>{{ selectedPost.content }}</p>
    <p class="text-muted">
      {{
        $dayjs(selectedPost.createdAt).format("YYYY년 MM월 DD일 HH시 mm분 ss초")
      }}
    </p>
    <hr class="my-4" />
    <AppError v-if="deleteErrorMessage" :message="deleteErrorMessage" />
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-dark">Previous</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark">Next</button>
      </div>
      <div class="col-auto me-auto"></div>
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="goListPage">List</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-primary" @click="goEditPage">
          Edit
        </button>
      </div>
      <div class="col-auto">
        <button
          class="btn btn-outline-danger"
          @click="deletePostById"
          :disabled="deleteIsLoading"
        >
          <template v-if="deleteIsLoading">
            <span
              class="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Loading...</span>
          </template>
          <template v-else> Delete </template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
/* vue */
import { computed, ref, toRef, toRefs } from "vue";

/* router */
import { useRoute, useRouter } from "vue-router";

/* api */
import { getPostsById, deletePost } from "../../api/posts";

/* composables */
import { useAlert } from "../../composables/useAlert";
import { useAxios } from "../../composables/useAxios";
import { useNumber } from "../../composables/useNumber";

const { vAlert, vSuccess } = useAlert();
// appLoading, appError
// const errorMessage = ref(null);
// const isLoading = ref(false);

const props = defineProps({
  id: [Number, String],
});

// toRefs 구조분해할당 방식
// const { id: idRef } = toRefs(props);
// toRef 방식
const idRef = toRef(props, "id");
// 반응성을 잃지 않기 위해서 props.id 가 아닌 props.id를 toRef를 사용하여 넘겨준다.
// 받는 composable함수 에서는 parameter로 받는 값에 unref로 감싸주어야 한다.
const { isOdd } = useNumber(idRef);

const router = useRouter();
// const route = useRoute();
// const id = route.params.id;
// const selectedPost = ref({
//   title: null,
//   content: null,
//   createdAt: null,
// });

const setPost = ({ title, content, createdAt }) => {
  selectedPost.value.title = title;
  selectedPost.value.content = content;
  selectedPost.value.createdAt = createdAt;
};

const url = computed(() => `/posts/${props.id}`);

const { errorMessage, isLoading, data: selectedPost } = useAxios(url);

// const findPost = async () => {
//   try {
//     isLoading.value = true;
//     const { data } = await getPostsById(props.id);
//     setPost(data);
//     // ({ data: selectedPost.value } = await getPostsById(props.id));
//   } catch (error) {
//     console.error(error);
//     errorMessage.value = error;
//   } finally {
//     isLoading.value = false;
//   }
// };
// findPost();

const {
  deleteErrorMessage: deleteErrorMessage,
  deleteIsLoading: deleteIsLoading,
  execute,
} = useAxios(
  `/posts/${props.id}`,
  {
    method: "delete",
  },
  {
    immediate: false,
    onSuccess: () => {
      vSuccess("삭제가 완료되었습니다.");
      goListPage();
    },
    onError: (error) => {
      vAlert("Network Error", error);
    },
  },
);

// deleteAppLoading, deleteAppError
// const deleteErrorMessage = ref(null);
// const deleteIsLoading = ref(false);
const deletePostById = async () => {
  if (confirm("Are you sure you want to delete it?") === false) {
    return;
  }
  execute();
};

// const deletePostById = async () => {
//   try {
//     if (confirm("Are you sure you want to delete it?") === false) {
//       return;
//     }
//     deleteIsLoading.value = true;
//     await deletePost(props.id);
//     goListPage();
//   } catch (error) {
//     console.error(error);
//     deleteErrorMessage.value = error;
//   } finally {
//     deleteIsLoading.value = false;
//   }
// };

const goListPage = () => router.push({ name: "PostList" });
const goEditPage = () =>
  router.push({ name: "PostEdit", params: { id: props.id } });
</script>

<style lang="scss" scoped></style>
