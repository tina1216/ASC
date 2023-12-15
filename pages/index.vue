<template>
  <div>
    <h2 class="mb-5 mt-5 font-bold">Events</h2>
    <ul
      class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
    >
      <li v-for="event in eventList" :key="event.slug">
        <NuxtLink :to="event.path">
          <EventCard :event="event"></EventCard>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ auth: false });
const { events, fetchEvents } = await useEventStore();
fetchEvents();

const eventList = computed(() => events);
</script>

<style scoped></style>
