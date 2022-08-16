<script lang="ts" setup>
import { useAppStore } from "../../stores/app";
import { useCookies } from "@vueuse/integrations/useCookies";
import { useRouter } from "vue-router";
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
    <div
      class="bg-blue-700 text-white sticky top-0 flex p-2 justify-between z-50"
    >
      <span>Opply</span>
      <div class="">
        <router-link to="/suppliers" class="mx-2 hover:text-gray-200"
          >Suppliers</router-link
        >
        <router-link to="/quotes" class="mx-2 hover:text-gray-200"
          >Quotes</router-link
        >
        <button class="mx-2 hover:text-gray-200" @click="logout">Logout</button>
      </div>
    </div>
    <div class="px-10 py-5 flex-grow">
      <div
        class="w-full h-full p-2 shadow-xl card bg-gray-100 flex flex-col justify-between"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>
