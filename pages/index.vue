<template>
  <div>
    <h2 class="mb-5 mt-5 font-bold">Scholarships</h2>
    <ul
      class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
    >
      <li v-for="scholarship in scholarshipList" :key="scholarship.slug">
        <NuxtLink :to="scholarship.path">
          <ScholarshipCard :scholarship="scholarship"></ScholarshipCard>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ auth: false })
const { scholarships, fetchScholarships } = await useScholarshipStore()
fetchScholarships()

const scholarshipList = computed(() => scholarships)
</script>

<style scoped></style>
