<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <PostFilter
      v-model:inputValue="params.title_like"
      v-model:selectValue="params._limit"
    />

    <hr class="my-4" />

    <AppLoading v-if="isLoading" />

    <AppError v-else-if="errorMessage" :message="errorMessage" />

    <template v-else>
      <AppGrid :items="posts">
        <template v-slot="{ item }">
          <PostItem
            :title="item.title"
            :content="item.content"
            :created-at="item.createdAt"
            @click="goPageDetail(item.id)"
            @modal="openModal(item)"
            @preview="selectPreview(item.id)"
          />
        </template>
      </AppGrid>
    </template>

    <AppPagination
      :current-page="params._page"
      :page-count="pageCount"
      @page="(page) => (params._page = page)"
    />

    <Teleport to="#modal">
      <PostModal
        v-model="show"
        :title="modalTitle"
        :content="modalContent"
        :created-at="modalCreatedAt"
      />
    </Teleport>

    <template v-if="previewId">
      <hr class="my-5" />
      <AppCard>
        <PostDetailView :id="previewId" />
      </AppCard>
    </template>

    <template v-if="posts && posts.length > 0">
      <hr class="my-5" />
      <AppCard>
        <PostDetailView :id="posts[0].id" />
      </AppCard>
    </template>
  </div>
</template>

<script setup>
/* Vue */
import { ref, watchEffect } from "vue";
import { computed } from "@vue/reactivity";

/* Route */
import { useRouter } from "vue-router";

/* Components */
import PostItem from "../../components/posts/PostItem.vue";
import PostDetailView from "./PostDetailView.vue";
import PostFilter from "../../components/posts/PostFilter.vue";
import PostModal from "../../components/posts/PostModal.vue";
// import AppCard from "../../components/app/AppCard.vue";
// import AppGrid from "../../components/app/AppGrid.vue";
// import AppPagination from "../../components/app/AppPagination.vue";

/* api */
import { getPosts } from "../../api/posts.js";
import { useAxios } from "../../composables/useAxios";

// appLoading, appError
// const errorMessage = ref(null);
// const isLoading = ref(false);

const previewId = ref(null);
const selectPreview = (id) => (previewId.value = id);

// madal
const show = ref(false);
const modalTitle = ref("");
const modalContent = ref("");
const modalCreatedAt = ref("");
const openModal = ({ title, content, createdAt }) => {
  show.value = true;
  modalTitle.value = title;
  modalContent.value = content;
  modalCreatedAt.value = createdAt;
};

// main
const router = useRouter();
// const posts = ref([]);
const params = ref({
  _sort: "createdAt",
  _order: "desc",
  _limit: "3",
  _page: 1,
  title_like: "",
});

// pagination
const totalCount = computed(() => response.value.headers["x-total-count"]);
const pageCount = computed(() =>
  Math.ceil(totalCount.value / params.value._limit),
);

const {
  response,
  data: posts,
  errorMessage,
  isLoading,
} = useAxios("/posts", { params });

// const fetchPosts = async () => {
//   try {
//     isLoading.value = true;
//     const { data, headers } = await getPosts(params.value);
//     posts.value = data;
//     totalCount.value = headers["x-total-count"];

//     // 위를 아래처럼 축약할 수 있다.
//     // ({ data: posts.value } = await getPosts(params.value));
//   } catch (error) {
//     console.error(error);
//     errorMessage.value = error;
//   } finally {
//     isLoading.value = false;
//   }
// };
// fetchPosts();

// watchEffect는 watch와 다르게 자동으로 한 번 실행한다. (react의 useEffect와 흡사하다.)
// watchEffect(fetchPosts);

/**
 *
 * @param {number} id
 * posts에 저장 된 id값으로 url을 변경하는 함수
 */
const goPageDetail = (id) => {
  // router.push(`/posts/${id}`);

  // http://127.0.0.1:5173/posts/1?searchText=Hello#world!
  router.push({
    name: "PostDetail",
    params: {
      id,
    },
    // query: {
    //   searchText: "Hello",
    // },
    // hash: "#world!",
  });
};
</script>

<style lang="scss" scoped></style>
