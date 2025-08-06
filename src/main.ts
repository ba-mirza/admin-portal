import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { createRouter, createWebHistory} from "vue-router";
import NotFound from "./pages/notFound.vue";
import Auth from "./pages/auth.vue";
import { requireAuth, requireGuest } from "./router/guards";
import { authStore } from "./stores/auth";

import ElementPlus from "element-plus"
import DashboardLayout from "./layouts/dashboard-layout.vue";

const router = createRouter({
  routes: [
    { path: "/", redirect: "/dashboard" },
    {
      path: "/auth",
      component: Auth,
      beforeEnter: requireGuest,
    },
    {
      path: "/dashboard",
      component: DashboardLayout,
      // beforeEnter: requireAuth,
    },
    { path: "/notFound", component: NotFound },
    { path: "/:pathMatch(.*)*", redirect: "/notFound" },
  ],
  history: createWebHistory(),
});

authStore.init();

createApp(App)
.use(ElementPlus)
.use(router).component("QuillEditor", QuillEditor).mount("#app");
