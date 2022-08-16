<script lang="ts" setup>
// this component will handle pagination for the table
// it will be used in the quotes and suppliers components
const emit = defineEmits<{
  (event: "page-changed", pageURL: string): void;
}>();

// pass the prop to the function so it can be emitted to the parent
function pageChanged(pageURL: string | null) {
  // in the rare situation that pageURL is null, then nothing happens
  if (pageURL) {
    emit("page-changed", pageURL);
  }
}

const prop = defineProps<{
  previous: string | null;
  next: string | null;
}>();
</script>

<template>
  <div class="btn-group flex">
    <button
      class="btn btn-outline w-28 btn-sm"
      :disabled="prop.previous === null"
      @click.prevent="pageChanged(prop?.previous)"
    >
      Previous
    </button>
    <button
      class="btn btn-outline w-28 btn-sm"
      :disabled="prop.next === null"
      @click.prevent="pageChanged(prop?.next)"
    >
      Next
    </button>
  </div>
</template>
