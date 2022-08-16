<script lang="ts" setup>
// this component is to be used as a reusable table component, it will accept a headers prop and have a slot for the table body

const props = defineProps<{
  headers: string[];
}>();
</script>

<template>
  <div class="w-full overflow-x-auto">
    <table class="table w-full">
      <thead>
        <tr>
          <th v-for="header in headers" class="text-left" :key="header">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <slot class="overflow-y-auto"></slot>
      </tbody>
    </table>
  </div>
</template>
