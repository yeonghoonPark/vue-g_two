<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <PostFilter
      v-model:inputValue="params.title_like"
      v-model:selectValue="params._limit"
    />
    <!-- <form @submit.prevent>
      <div class="row g-3">
        <div class="col">
          <input v-model="params.title_like" type="text" class="form-control" />
        </div>
        <div class="col-3">
          <select v-model="params._limit" class="form-select">
            <option value="3">Watching 3</option>
            <option value="6">Watching 6</option>
            <option value="9">Watching 9</option>
          </select>
        </div>
      </div>
    </form> -->
    <hr class="my-4" />
    <AppGrid :items="posts">
      <template v-slot="{ item }">
        <PostItem
          :title="item.title"
          :content="item.content"
          :created-at="item.createdAt"
          @click="goPageDetail(item.id)"
          @modal="openModal(item)"
        />
      </template>
    </AppGrid>

    <!-- <nav class="mt-5" aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: !(params._page > 1) }">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="--params._page"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          v-for="page in pageCount"
          :key="page"
          class="page-item"
          :class="{ active: params._page === page }"
        >
          <a class="page-link" href="#" @click.prevent="params._page = page">
            {{ page }}
          </a>
        </li>

        <li
          class="page-item"
          :class="{ disabled: !(params._page < pageCount) }"
        >
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="++params._page"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav> -->
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
    <!-- <AppModal v-model="show" :title="posts.title">
      <template #default>
        <div class="row g-3">
          <div class="col-3 text-muted">Title</div>
          <div class="col-9">{{ modalTitle }}</div>

          <div class="col-3 text-muted">Content</div>
          <div class="col-9">{{ modalContent }}</div>

          <div class="col-3 text-muted">CreatedAt</div>
          <div class="col-9">{{ modalCreatedAt }}</div>
        </div>
      </template>
      <template #actions>
        <button type="button" class="btn btn-secondary" @click="closeModal">
          Close
        </button>
      </template>
    </AppModal> -->

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

/* Utils */
import { getPosts } from "../../api/posts.js";
import { computed } from "@vue/reactivity";

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
const posts = ref([]);
const params = ref({
  _sort: "createdAt",
  _order: "desc",
  _limit: "3",
  _page: 1,
  title_like: "",
});

// pagination
const totalCount = ref(0);
const pageCount = computed(() =>
  Math.ceil(totalCount.value / params.value._limit),
);

const fetchPosts = async () => {
  try {
    const { data, headers } = await getPosts(params.value);
    posts.value = data;
    totalCount.value = headers["x-total-count"];

    // 위를 아래처럼 축약할 수 있다.
    // ({ data: posts.value } = await getPosts(params.value));
  } catch (error) {
    console.error(error);
  }
};
// fetchPosts();

// watchEffect는 watch와 다르게 자동으로 한 번 실행한다. (react의 useEffect와 흡사하다.)
watchEffect(fetchPosts);

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
