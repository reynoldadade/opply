<script lang="ts" setup>
import { useAppStore } from "../../stores/app";
import { useCookies } from "@vueuse/integrations/useCookies";
import { useRouter } from "vue-router";
import Overlay from "./Overlay.vue";
// get store instance
const appStore = useAppStore();

// get route instance
const router = useRouter();

// get cookies
const cookies = useCookies();

// this component is purely for UI purposes, it will have a header bar to display the menu and a slot for the content

//logout from the app
function logout() {
  // clear store
  appStore.$reset();
  //remove the token from the cookies
  cookies.remove("token");
  //redirect to the login page
  router.replace({
    name: "Auth",
  });
}
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="navbar bg-base-100 sticky top-0 flex p-2 justify-between z-50">
      <span>Opply</span>
      <div class="flex">
        <router-link to="/suppliers" class="mx-2 hover:text-secondary flex"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          <span> Suppliers</span>
        </router-link>
        <router-link to="/quotes" class="mx-2 hover:text-secondary flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
          <span>Quotes</span>
        </router-link>
        <button class="mx-2 hover:text-red-500 flex" @click="logout">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            /></svg
          ><span>Logout</span>
        </button>
      </div>
    </div>
    <div class="px-10 py-5 flex-grow relative">
      <Overlay v-if="appStore.getLoader" />
      <div
        class="w-full h-full p-2 shadow-xl bg-gray-100 flex flex-col justify-between"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>
