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
</script>

<template>
  <Layout>
    <div>
      <h1 class="text-xl">Supplier Details</h1>
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
