import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/checkout",
      name: "checkout",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/CheckOut/CheckOut.vue"),
    },
    {
      path: "/history",
      name: "history",
      component: () => import("../views/History/History.vue"),
    },
    {
      path: "/inventory",
      name: "inventory",
      component: () => import("../views/Inventory/Inventory.vue"),
    },
  ],
});

export default router;
