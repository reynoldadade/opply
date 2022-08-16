<script lang="ts" setup>
import { onMounted, Ref, ref } from "vue";
import Layout from "../components/UI/Layout.vue";
import Table from "../components/UI/Table.vue";
import Pagination from "../components/UI/Pagination.vue";
import { Quote } from "../models/quotes.model";
import useDate from "../composables/date.js";

import { GET_quotes } from "../services/api.service";

//  define headers for the table
// NB there is no need for it to be a vue ref, it is just a regular array
const quotesTableHeaders = ["ID", "Title", "Amount", "Created", "Supplier ID"];
const quotes: Ref<Quote[]> = ref([]);
// previous and next page urls
const previousPage: Ref<string | null> = ref(null);
const nextPage: Ref<string | null> = ref(null);

// used to call supplier service and save to suppliers variable
async function getQuotes(url: string = "/quotes/") {
  const response = await GET_quotes(url);
  if (response) {
    // since i expect a QuoteResponse, i need to extract the quotes from the response
    quotes.value = response.results;
    previousPage.value = response.previous;
    nextPage.value = response.next;
  }
}

// accept next or previous page url and call getQuotes with it
function changePage(pageURL: string | null) {
  if (pageURL) {
    getQuotes(pageURL);
  }
}

onMounted(() => {
  getQuotes();
});
</script>

<template>
  <Layout>
    <div class="font-bold">Quotes</div>
    <Table :headers="quotesTableHeaders">
      <tr v-for="quote in quotes" :key="quote.id">
        <td>{{ quote.id }}</td>
        <td>{{ quote.title }}</td>
        <td>{{ quote.amount }}</td>
        <td>{{ useDate(quote.created) }}</td>
        <td>{{ quote.supplier_id }}</td>
      </tr>
    </Table>
    <Pagination
      :previous="previousPage"
      :next="nextPage"
      @page-changed="changePage"
    />
  </Layout>
</template>
