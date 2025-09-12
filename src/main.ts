import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { createRouter, createWebHistory} from "vue-router";
import { requireAuth } from "./router/guards";
import { authStore } from "./stores/auth";

import ElementPlus from "element-plus"

const router = createRouter({
  routes: [
    { path: "/", redirect: "/dashboard" },
    {
      path: "/auth",
      component: () => import('./pages/auth.vue'),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import('./layouts/dashboard-layout.vue'),
      beforeEnter: requireAuth,
      children: [
        {
          path: '/dashboard/create-article',
          name: "create-article",
          component: () => import('./pages/create-article.vue'),
        },
        {
          path: '/dashboard/articles',
          name: "articles",
          component: () => import('./pages/articles.vue'),
          children: [
            {
              path: '/articles/:id',
              name: "articleId",
              component: () => import('./pages/edit-article.vue'),
            }
          ]
        },
        {
          path: '/dashboard/categories',
          name: "categories",
          component: () => import('./pages/categories.vue')
        },
      ]
    },
    { path: "/notFound", component: () => import('./pages/notFound.vue') },
    { path: "/:pathMatch(.*)*", redirect: "/notFound" },
  ],
  history: createWebHistory(),
});

authStore.init();

createApp(App)
.use(ElementPlus)
.use(router).component("QuillEditor", QuillEditor).mount("#app");
