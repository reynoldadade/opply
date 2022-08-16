<script lang="ts" setup>
import { Ref, ref, computed, defineAsyncComponent } from "vue";
import { useAppStore } from "../stores/app";
// create store instance
const appStore = useAppStore();

/*** variables ***/

// component we want to be loaded in the DOM that is either login or register
const componentToLoad: Ref<string> = ref("Login");
/****** end of variables   */

/******** computed  */
const componentInView = computed(() => {
  // check the value of componentToLoad and return the component to load
  return componentToLoad.value === "Login"
    ? defineAsyncComponent(() => import("../components/auth/Login.vue"))
    : defineAsyncComponent(() => import("../components/auth/Register.vue"));
});

//change component in view
function changeComponentInView(component: string) {
  // set error to false and set the value of componentToLoad to the component
  //this ensures components dont have errors triggered when switched
  appStore.setIsError(false);
  componentToLoad.value = component;
}
</script>

<template>
  <div class="flex w-full h-full justify-center items-center">
    <div class="w-full md:w-2/3 lg:w-1/2 card shadow-xl">
      <div class="card-body">
        <transition name="slide" mode="out-in">
          <component
            :is="componentInView"
            @switchComponent="changeComponentInView"
          ></component>
        </transition>
      </div>
    </div>
  </div>
</template>
