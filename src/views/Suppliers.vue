<script lang="ts" setup>
import { onMounted, Ref, ref } from "vue";
import Layout from "../components/UI/Layout.vue";
import Table from "../components/UI/Table.vue";
import Pagination from "../components/UI/Pagination.vue";

import { Supplier } from "../models/suppliers.model";
import { GET_suppliers } from "../services/api.service";
import { useAppStore } from "../stores/app";
import { useRouter } from "vue-router";
// create store instance
const appStore = useAppStore();

//create router instance
const router = useRouter();
//  define headers for the table
// NB there is no need for it to be a vue ref, it is just a regular array
const supplierTableHeaders = ["ID", "Name", "Description", ""];
const suppliers: Ref<Supplier[]> = ref([]);
// previous and next page urls
const previousPage: Ref<string | null> = ref(null);
const nextPage: Ref<string | null> = ref(null);

// used to call supplier service and save to suppliers variable
async function getSuppliers(url: string = "/suppliers/") {
  const response = await GET_suppliers(url);
  if (response) {
    // since i expect a SupplierResponse, i need to extract the suppliers from the response
    suppliers.value = response.results;
    previousPage.value = response.previous;
    nextPage.value = response.next;
  }
}

// accept next or previous page url and call getSuppliers with it
function changePage(pageURL: string | null) {
  if (pageURL) {
    getSuppliers(pageURL);
  }
}

// accept supplier details and save to store
function viewSupplierDetails(supplier: Supplier): void {
  // save supplier to store
  appStore.setSelectedSupplier(supplier);
  // change route to /suppliers/:id
  router.push({
    name: "Supplier",
    params: {
      id: supplier.id,
    },
  });

  console.log(router);
}

onMounted(() => {
  getSuppliers();
});
</script>

<template>
  <Layout>
    <div class="font-bold">Suppliers</div>
    <Table :headers="supplierTableHeaders">
      <tr v-for="supplier in suppliers" :key="supplier.id">
        <td>{{ supplier.id }}</td>
        <td>{{ supplier.name }}</td>
        <td>{{ supplier.description }}</td>
        <td>
          <button class="btn btn-sm" @click="viewSupplierDetails(supplier)">
            View Details
          </button>
        </td>
      </tr>
    </Table>
    <Pagination
      :previous="previousPage"
      :next="nextPage"
      @page-changed="changePage"
    />
  </Layout>
</template>
