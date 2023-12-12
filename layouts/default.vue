<template>
  <div
    class="p-12 bg-gray-100 w-full h-full min-h-screen flex flex-col items-center"
  >
    <div class="mb-12 flex items-center">
      <UIcon class="p-6" name="i-heroicons-academic-cap-solid" />
      <h1 class="text-2xl font-bold uppercase ml-2">Eduscholar</h1>
    </div>

    <div class="flex flex-row justify-center flex-grow">
      <div class="mr-4 p-8 bg-white rounded-md min-w-[20ch] flex flex-col">
        <div v-if="!loggedIn">
          <NuxtLink to="/login">
            <div class="flex items-center">
              <UIcon class="m-2" name="i-heroicons-arrow-right-on-rectangle" />
              <h3>Log In</h3>
            </div>
          </NuxtLink>
        </div>
        <div v-else>
          <NuxtLink href="/">
            <div class="flex items-center">
              <UIcon class="m-2" name="i-heroicons-bookmark" />
              <h3>Scholarships</h3>
            </div>
          </NuxtLink>
          <NuxtLink to="/applications">
            <div class="flex items-center">
              <UIcon class="m-2" name="i-heroicons-table-cells" />
              <h3>Applications</h3>
            </div>
          </NuxtLink>
          <div v-show="isAdmin">
            <NuxtLink to="/applications/create">
              <div class="flex items-center">
                <UIcon class="m-2" name="i-heroicons-plus-circle" />
                <h3>Create</h3>
              </div>
            </NuxtLink>
          </div>
          <hr class="mt-5" />
          <div class="flex items-center">
            <UIcon class="m-2" name="i-heroicons-arrow-right-on-rectangle" />
            <button @click="signOut"><h3>Log out</h3></button>
          </div>
        </div>
      </div>

      <div class="p-12 bg-white rounded-md w-[100ch] flex flex-wrap">
        <div class="flex flex-col">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { status, signOut } = useAuth()
const loggedIn = computed(() => status.value === 'authenticated')

const headers = useRequestHeaders(['cookie']) as HeadersInit
const { data: token } = await useFetch('/api/auth/token', { headers })
const isAdmin = computed(() => token.value?.role === 'ADMIN')
</script>

<style lang="scss" scoped></style>
