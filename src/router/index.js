import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/homeView.vue";
import searchView from "../views/searchView.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/getMealsByIngredient/:ingredient/:day",
    name: "Search",
    component: searchView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
