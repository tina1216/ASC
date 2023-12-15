<template>
  <h1 class="mb-6 uppercase font-weight text-3xl">
    {{ event.title }}
  </h1>
  <div class="mt-10">
    <div class="flex flex-row items-center">
      <UIcon class="p-4 mr-2" name="i-heroicons-book-open" />
      <h2 class="uppercase">Description</h2>
    </div>
    <p class="pt-1 text-justify">{{ event.description }}</p>
  </div>
  <div v-if="event" class="grid grid-cols-2">
    <div class="mt-10">
      <div class="flex flex-row items-center">
        <UIcon class="p-4 mr-2" name="i-heroicons-calendar" />
        <h2 class="uppercase">Deadline</h2>
      </div>
      <h3>
        {{ new Date(event.deadline).toISOString().split("T")[0] }}
      </h3>
    </div>
    <div class="mt-10">
      <div class="flex flex-row items-center">
        <UIcon class="p-4 mr-2" name="i-heroicons-at-symbol" />
        <h2>Contact</h2>
      </div>
      <p>
        {{ organiser.email }}
      </p>
    </div>
    <div class="mt-10 flex flex-col">
      <div class="flex flex-row items-center">
        <UIcon class="p-4 mr-2" name="i-heroicons-user-circle" />
        <h2 class="uppercase">Organiser</h2>
      </div>
      <h3>{{ organiser.name }}</h3>
    </div>
  </div>
  <div class="mt-10">
    <div class="flex flex-row items-center">
      <UIcon class="p-4 mr-2" name="i-heroicons-information-circle" />

      <h2>Company Info</h2>
    </div>
    <p class="mt-2 text-sm italic border border-gray rounded-lg p-3 bg-gray-200 text-justify">
      {{ organiser.description }}
    </p>
  </div>
  <UButton
    :color="isDisabled ? 'black' : 'primary'"
    :loading="isLoading"
    class="mt-10"
    @click="handlePostApplication"
    :disabled="isDisabled"
  >
    {{ isDisabled ? "Applied" : "Apply" }}
  </UButton>
</template>

<script setup lang="ts">
const isLoading = ref(false);
const { events } = await useEventStore();
const route = useRoute();

const event = computed(() => {
  return events.find((event) => event.slug == route.params.eventSlug);
});

const organisers = await useFetch("/api/organisers/").then((res) => res.data);

const organiser = computed(() => {
  return organisers.value.find((b) => b.id === event.value.organiserId);
});

const headers = useRequestHeaders(["cookie"]) as HeadersInit;
const { data: token } = await useFetch("/api/auth/token", { headers });
const userId = token.value?.id;
console.log("userId", userId);

const { data: applications } = await useFetch(`/api/users/${userId}/applications`);

const isDisabled = ref(false);
onMounted(() => {
  if (applications.value) {
    const application = applications.value.find(
      (application) => application.eventId === event.value.id
    );

    if (application) {
      isDisabled.value = true;
    }
  }
});

if (!event.value) {
  throw createError({
    statusCode: 404,
    message: `event with the title of ${route.params.eventSlug} does not exist`,
  });
}

const handlePostApplication = async () => {
  const body = {
    eventId: event.value.id,
    userId: userId,
  };

  isLoading.value = true;
  try {
    const { data, status, error } = await useFetch("/api/applications/", {
      method: "post",
      body,
    });
    setTimeout(() => {
      if (status.value === "success") {
        // Disable the button
        isLoading.value = false;
        isDisabled.value = true;
      } else {
        // Handle the error
        console.error("Error updating event status:", error);
      }
    }, 2000);
  } catch (err) {}
};
</script>

<style lang="scss" scoped></style>
