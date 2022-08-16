<script lang="ts" setup>
import Spinner from "./Spinner.vue";
// this component is purely a UI component and does not have any logic, it is going to act as an overlay over the contents of the layout
</script>

<template>
  <div
    class="h-screen w-screen fixed top-0 left-0 right-0 bg-transBlack z-[100] flex justify-center items-center"
  >
    <Spinner />
  </div>
</template>
