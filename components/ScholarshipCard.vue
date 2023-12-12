<template>
  <div>
    <div
      class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
    >
      <img
        :src="`https://picsum.photos/${randomNumber}`"
        alt=""
        class="h-full w-full object-cover object-center group-hover:opacity-75"
      />
    </div>

    <h3 class="font-medium text-gray-900">{{ scholarship.title }}</h3>
  </div>
</template>

<style scoped></style>

<script lang="ts" setup>
const randomNumber = Math.floor(Math.random() * 1000)
const props = defineProps({
  scholarship: Object,
})
</script>
