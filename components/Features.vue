<template>
  <div>
    <UButton class="m-2" @click="handlePostUser">POST /users</UButton>
    <UButton class="m-2" @click="handleGetUser">GET /users/{id}</UButton>
    <UButton class="m-2" @click="handlePostApplication"> POST /applications </UButton>
    <UButton class="m-2" @click="handleGetApplicationsByUserId">
      GET /users/{id}/applications
    </UButton>
    <UButton class="m-2" @click="handleGetEvents"> GET /events </UButton>
    <UButton class="m-2" @click="handleGetEventsById"> GET /events/{id} </UButton>
    <UButton class="m-2" @click="handlePostEvent"> POST /events </UButton>
    <UButton class="m-2" @click="handleGetOrganisers"> GET /organisers </UButton>
    <UButton class="m-2" @click="handlePostOrganiser"> POST /organisers </UButton>
  </div>
</template>

<script setup lang="ts">
const handlePostUser = async () => {
  const body = {
    email: "ghi@abc.com",
    name: "abc",
  };

  try {
    const response = await $fetch("/api/users/", {
      method: "post",
      body,
    });
  } catch (err) {}
};

const handleGetUser = async () => {
  try {
    const response = await $fetch("/api/users/1", {
      method: "get",
    });
  } catch (err) {}
};

const handlePostApplication = async () => {
  const body = {
    eventId: 5,
    userId: 2,
  };

  try {
    const response = await $fetch("/api/applications/", {
      method: "post",
      body,
    });
  } catch (err) {}
};

const handleGetApplicationsByUserId = async () => {
  try {
    const response = await $fetch("/api/users/2/applications", {
      method: "get",
    });
  } catch (err) {}
};

const handleGetEvents = async () => {
  try {
    const response = await $fetch("/api/events", {
      method: "get",
    });
  } catch (err) {
    console.log(err);
  }
};

const handleGetEventsById = async () => {
  try {
    const response = await $fetch("/api/events/sustainable-mars-event", {
      method: "get",
    });
  } catch (err) {
    console.log(err);
  }
};

const handlePostEvent = async () => {
  const body = {
    title: "Ecoterra event",
    description: "ecoterra event",
    deadline: "2024-10-10",
    slug: "ecoterra-event",
    categoryIds: [1, 2],
    organiserId: 9,
  };

  try {
    const response = await $fetch("/api/events/", {
      method: "post",
      body,
    });
  } catch (err) {}
};

const handleGetOrganisers = async () => {
  try {
    const response = await $fetch("/api/organisers", {
      method: "get",
    });
  } catch (err) {
    console.log(err);
  }
};

const handlePostOrganiser = async () => {
  const body = {
    name: "Recyclon",
    description:
      "Recyling is the way of the future, especially on a barren planet like Mars, making Recyclon an efficient builder of the Martian society.",
    logo: "",
    email: "recyclon@corp.com",
  };

  try {
    const response = await $fetch("/api/organisers/", {
      method: "post",
      body,
    });
  } catch (err) {}
};
</script>

<style scoped></style>
