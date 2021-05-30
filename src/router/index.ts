import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      layout: "AppLayoutHome",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/product",
    name: "Product",
    component: () => import("../views/Product.vue"),
    meta: {
      layout: "AppLayoutHome",
    },
  },
  {
    path: "/stock",
    name: "Stock",
    component: () => import("../views/Stock.vue"),
    meta: {
      layout: "AppLayoutHome",
    },
  },
  {
    path: "/list",
    name: "List",
    component: () => import("../views/List.vue"),
    meta: {
      layout: "AppLayoutHome",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
