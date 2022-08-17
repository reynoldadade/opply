<script lang="ts" setup>
import { onMounted } from "vue";
import { useAppStore } from "../stores/app";
import { useRoute, useRouter } from "vue-router";
import Layout from "../components/UI/Layout.vue";
// get store instance
const store = useAppStore();
// get route instance
const router = useRouter();
const route = useRoute();

onMounted(() => {
  if (!store.getSelectedSupplier) {
    // if there is no supplier saved in the store request supplier details from api, this is useful in case the page is refreshed
    store.setSelectedSupplierAsync(Number(route.params.id));
  }
});

// function to go back to the previous page
const goBack = () => {
  router.go(-1);
};
</script>

<template>
  <Layout>
    <div data-testid="supplierComponent">
      <div class="flex items-center">
        <button
          class="btn btn-secondary flex capitalize btn-sm"
          @click="goBack"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
              clip-rule="evenodd"
            />
          </svg>
          <span> Back </span>
        </button>

        <span class="text-xl px-4">Supplier Details</span>
      </div>

      <ul class="text-base p-2">
        <li class="p-2 rounded-lg border mt-2">
          #ID: {{ store.getSelectedSupplier?.id }}
        </li>
        <li>Name: {{ store.getSelectedSupplier?.name }}</li>
        <li>Description: {{ store.getSelectedSupplier?.description }}</li>
      </ul>
    </div>
  </Layout>
</template>
<style scoped>
li {
  @apply p-2 rounded-lg border mt-2;
}
</style>
