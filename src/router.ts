import AuthComponent from "./views/Auth.vue";
import { createRouter, createWebHistory } from "vue-router";
import Suppliers from "./views/Suppliers.vue";
import Supplier from "./views/Supplier.vue";
import Quotes from "./views/Quotes.vue";
import { useCookies } from "@vueuse/integrations/useCookies";
// define cookies composable instance
const cookies = useCookies();

// route paths and components
const routes = [
  { path: "", component: AuthComponent, name: "Auth" },
  {
    path: "/suppliers",
    name: "Suppliers",
    component: Suppliers,
  },
  { path: "/suppliers/:id", component: Supplier, name: "Supplier" },
  { path: "/quotes", component: Quotes, name: "Quotes" },
];

// create and export Vue Router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router guard to check for authentication
router.beforeEach(async (to, from) => {
  // get user token
  const token = cookies.get("token");
  if (
    // make sure the user is authenticated
    !token &&
    // ❗️ Avoid an infinite redirectß
    to.name !== "Auth"
  ) {
    // redirect the user to the login page
    return { name: "Auth" };
  }
});
// export router instance
export default router;
