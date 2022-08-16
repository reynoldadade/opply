<script lang="ts" setup>
import { Ref, ref, computed, defineAsyncComponent } from "vue";

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
  componentToLoad.value = component;
}
</script>

<template>
  <div class="flex w-full h-full justify-center items-center">
    <div class="w-full md:w-2/3 lg:w-1/2 card shadow-xl">
      <div class="card-body">
        <component
          :is="componentInView"
          @switchComponent="changeComponentInView"
        ></component>
      </div>
    </div>
  </div>
</template>
