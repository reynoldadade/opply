<script lang="ts" setup>
import { onMounted } from "vue";
import { useAppStore } from "../stores/app";
import { useRoute, useRouter } from "vue-router";
import Layout from "../components/UI/Layout.vue";
// get store instance
const store = useAppStore();
// get supplier from store
const supplier = store.getSelectedSupplier;
// get route instance
const router = useRouter();
const route = useRoute();

onMounted(() => {
  if (!supplier) {
    // if there is no supplier saved in the store request supplier details from api, this is useful in case the page is refreshed
    store.setSelectedSupplierAsync(Number(route.params.id));
  }
});
</script>

<template>
  <Layout></Layout>
</template>
