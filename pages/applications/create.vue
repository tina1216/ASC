<template>
  <div class="w-96 mx-auto">
    <h1 class="text-2xl font-bold mb-4">Create Event</h1>

    <form @submit.prevent="handlePostEvent" class="space-y-4">
      <div class="flex flex-col">
        <label for="title" class="text-sm font-medium mb-1">Title:</label>
        <input
          type="text"
          v-model="title"
          required
          class="border-gray-300 border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div class="flex flex-col">
        <label for="description" class="text-sm font-medium mb-1"> Description: </label>
        <textarea
          v-model="description"
          required
          class="border-gray-300 border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>
      <div class="flex flex-col">
        <label for="deadline" class="text-sm font-medium mb-1"> Deadline: </label>
        <input
          type="date"
          v-model="deadline"
          required
          class="border-gray-300 border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div class="flex flex-col">
        <label for="category" class="text-sm font-medium mb-1"> Category: </label>
        <USelectMenu
          v-model="selectedCategories"
          :options="categories"
          multiple
          option-attribute="name"
          placeholder="Select a category"
        >
          <template #label>
            <div v-for="category in selectedCategories">
              <span>{{ category.name }}</span>
            </div>
          </template>
        </USelectMenu>
      </div>
      <div class="flex flex-col">
        <label for="organiser" class="text-sm font-medium mb-1"> Organiser: </label>
        <USelectMenu v-model="organiser" :options="organisers" option-attribute="name">
          <template #label>
            <span v-if="organiser.name">{{ organiser.name }}</span>
            <span v-else>Select a organiser</span>
          </template>
        </USelectMenu>
      </div>
      <div class="flex flex-col">
        <label for="slug" class="text-sm font-medium mb-1">Slug:</label>
        <input
          type="text"
          v-model="slug"
          required
          class="border-gray-300 border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          readonly
        />
      </div>
      <div class="flex justify-center">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Event
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: [
    async function (to, from) {
      const headers = useRequestHeaders(["cookie"]) as HeadersInit;
      const { data: token } = await useFetch("/api/auth/token", { headers });
      const isAdmin = computed(() => token.value?.role === "ADMIN");

      if (!isAdmin.value) {
        window.location.href = "/";
      }
    },
  ],
});

const router = useRouter();

const title = ref("");
const description = ref("");
const deadline = ref("");
const selectedCategories = ref([]);
const organiser = ref("");

const categories = await useFetch("/api/categories/").then((res) => res.data);
const organisers = await useFetch("/api/organisers/").then((res) => res.data);

const slug = computed(() => {
  const titleSlug = title.value.toLowerCase().replace(/\s+/g, "-");
  return titleSlug;
});

const handlePostEvent = async () => {
  const body = {
    title: title.value,
    description: description.value,
    deadline: deadline.value,
    slug: slug.value,
    categoryIds: selectedCategories,
    organiserId: organiser.value.id,
  };

  try {
    await useFetch("/api/events/", {
      method: "post",
      body,
    }).then(() => {
      router.push("/");
    });
  } catch (err) {
    console.error("Error creating event:", err);
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
