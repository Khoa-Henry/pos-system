import { useUserStore } from "@/store/user";
import Login from "@/views/Login/Login.vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },
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
    {
      path: "/reports",
      name: "reports",
      component: () => import("../views/Reports/Reports.vue"),
    },
    {
      path: "/notfound",
      name: "not found",
      component: () => import("../views/NotFound/NotFound.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  if (
    userStore.isAuth === false &&
    to.name !== "login" &&
    to.name !== "not found"
  ) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
