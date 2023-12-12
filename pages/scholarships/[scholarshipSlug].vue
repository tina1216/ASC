<template>
  <h1 class="mb-6 uppercase font-weight text-3xl">
    {{ scholarship.title }}
  </h1>
  <div class="mt-10">
    <div class="flex flex-row items-center">
      <UIcon class="p-4 mr-2" name="i-heroicons-book-open" />
      <h2 class="uppercase">Description</h2>
    </div>
    <p class="pt-1 text-justify">{{ scholarship.description }}</p>
  </div>
  <div v-if="scholarship" class="grid grid-cols-2">
    <div class="flex flex-col">
      <div class="grid grid-cols-2 gap-6">
        <div class="mt-10">
          <div class="flex flex-row items-center">
            <UIcon class="p-4 mr-2" name="i-heroicons-currency-dollar" />
            <h2 class="uppercase">Award</h2>
          </div>
          <p>${{ scholarship.award }}</p>
        </div>
      </div>
    </div>
    <div class="mt-10">
      <div class="flex flex-row items-center">
        <UIcon class="p-4 mr-2" name="i-heroicons-calendar" />
        <h2 class="uppercase">Deadline</h2>
      </div>
      <h3>
        {{ new Date(scholarship.deadline).toISOString().split('T')[0] }}
      </h3>
    </div>
    <div class="mt-10">
      <div class="flex flex-row items-center">
        <UIcon class="p-4 mr-2" name="i-heroicons-at-symbol" />
        <h2>Contact</h2>
      </div>
      <p>
        {{ benefactor.email }}
      </p>
    </div>
    <div class="mt-10 flex flex-col">
      <div class="flex flex-row items-center">
        <UIcon class="p-4 mr-2" name="i-heroicons-user-circle" />
        <h2 class="uppercase">Sponsor</h2>
      </div>
      <h3>{{ benefactor.name }}</h3>
    </div>
  </div>
  <div class="mt-10">
    <div class="flex flex-row items-center">
      <UIcon class="p-4 mr-2" name="i-heroicons-information-circle" />

      <h2>Company Info</h2>
    </div>
    <p
      class="mt-2 text-sm italic border border-gray rounded-lg p-3 bg-gray-200 text-justify"
    >
      {{ benefactor.description }}
    </p>
  </div>
  <UButton
    :color="isDisabled ? 'black' : 'primary'"
    :loading="isLoading"
    class="mt-10"
    @click="handlePostApplication"
    :disabled="isDisabled"
  >
    {{ isDisabled ? 'Applied' : 'Apply' }}
  </UButton>
</template>

<script setup lang="ts">
const isLoading = ref(false)
const { scholarships } = await useScholarshipStore()
const route = useRoute()

const scholarship = computed(() => {
  return scholarships.find(
    (scholarship) => scholarship.slug == route.params.scholarshipSlug,
  )
})

const benefactors = await useFetch('/api/benefactors/').then((res) => res.data)

const benefactor = computed(() => {
  return benefactors.value.find((b) => b.id === scholarship.value.benefactorId)
})

const headers = useRequestHeaders(['cookie']) as HeadersInit
const { data: token } = await useFetch('/api/auth/token', { headers })
const userId = token.value?.id
console.log('userId', userId)

const { data: applications } = await useFetch(
  `/api/users/${userId}/applications`,
)

const isDisabled = ref(false)
onMounted(() => {
  if (applications.value) {
    const application = applications.value.find(
      (application) => application.scholarshipId === scholarship.value.id,
    )

    if (application) {
      isDisabled.value = true
    }
  }
})

if (!scholarship.value) {
  throw createError({
    statusCode: 404,
    message: `Scholarship with the title of ${route.params.scholarshipSlug} does not exist`,
  })
}

const handlePostApplication = async () => {
  const body = {
    scholarshipId: scholarship.value.id,
    userId: userId,
  }

  isLoading.value = true
  try {
    const { data, status, error } = await useFetch('/api/applications/', {
      method: 'post',
      body,
    })
    setTimeout(() => {
      if (status.value === 'success') {
        // Disable the button
        isLoading.value = false
        isDisabled.value = true
      } else {
        // Handle the error
        console.error('Error updating scholarship status:', error)
      }
    }, 2000)
  } catch (err) {}
}
</script>

<style lang="scss" scoped></style>
