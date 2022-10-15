import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import PostCreateView from "@/views/posts/PostCreateView.vue";
import PostDetailView from "@/views/posts/PostDetailView.vue";
import PostEditView from "@/views/posts/PostEditView.vue";
import PostListView from "@/views/posts/PostListView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import NestedView from "@/views/nested/NestedView.vue";
import NestedHomeView from "@/views/nested/NestedHomeView.vue";
import NestedOneView from "@/views/nested/NestedOneView.vue";
import NestedTwoView from "@/views/nested/NestedTwoView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
  },
  {
    path: "/posts",
    name: "PostList",
    component: PostListView,
  },
  {
    path: "/posts/create",
    name: "PostCreate",
    component: PostCreateView,
  },
  {
    /**
     * :id처럼 :,?,# 붙은 형식은 동적라우팅이라 한다.
     * 여러개의 url을 하나의 페이지에 맵핑하고 싶을 때 사용한다.
     * params, query, hash를 이용하여 route속성에 접근할 수 있다.
     * ex)
     * const route = useRoute();
     * console.log(route.params);
     */
    path: "/posts/:id",
    name: "PostDetail",
    component: PostDetailView,
    // props: true,
    props: (route) => ({
      id: parseInt(route.params.id),
    }),
  },
  {
    path: "/posts:id/edit",
    name: "PostEdit",
    component: PostEditView,
    props: (route) => ({
      id: parseInt(route.params.id),
    }),
  },
  {
    /**
     * 404 Not Found
     * /:pathMatch(.*)* 를 이용하여 라우터에 등록되지 않는 url로 접근할 경우에
     * 해당 컴포넌트를 보여주어 등록되지 않는 페이지라는 것을 유저에게 알릴 수 있다.
     */
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundView,
  },
  {
    path: "/nested",
    name: "Nested",
    component: NestedView,
    children: [
      {
        path: "",
        name: "NestedHome",
        component: NestedHomeView,
      },
      {
        path: "one",
        name: "NestedOne",
        component: NestedOneView,
      },
      {
        path: "two",
        name: "NestedTwo",
        component: NestedTwoView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  // history: createWebHashHistory("/"),
  routes: routes,
});

export default router;
