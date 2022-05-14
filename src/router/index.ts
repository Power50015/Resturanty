import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/menu",
      name: "Menu",
      component: () => import("../views/MenuView.vue"),
    },
    {
      path: "/addmenu",
      name: "AddMenu",
      component: () => import("../views/AddMenuView.vue"),
    },
    {
      path: "/order",
      name: "Order",
      component: () => import("../views/OrderView.vue"),
    },
    {
      path: "/admin-login",
      name: "admin-login",
      component: () => import("../views/AdminLoginView.vue"),
    },
    {
      path: "/restaurant/:restaurant",
      name: "restaurant",
      component: () => import("../views/RestaurantView.vue"),
    },
  ],
});

export default router;
