<template>
  <div>
    <UButton class="m-2" @click="handlePostUser">POST /users</UButton>
    <UButton class="m-2" @click="handleGetUser">GET /users/{id}</UButton>
    <UButton class="m-2" @click="handlePostApplication">
      POST /applications
    </UButton>
    <UButton class="m-2" @click="handleGetApplicationsByUserId">
      GET /users/{id}/applications
    </UButton>
    <UButton class="m-2" @click="handleGetScholarships">
      GET /scholarships
    </UButton>
    <UButton class="m-2" @click="handleGetScholarshipsById">
      GET /scholarships/{id}
    </UButton>
    <UButton class="m-2" @click="handlePostScholarship">
      POST /scholarships
    </UButton>
    <UButton class="m-2" @click="handleGetBenefactors">
      GET /benefactors
    </UButton>
    <UButton class="m-2" @click="handlePostBenefactor">
      POST /benefactors
    </UButton>
  </div>
</template>

<script setup lang="ts">
const handlePostUser = async () => {
  const body = {
    email: 'ghi@abc.com',
    name: 'abc',
  }

  try {
    const response = await $fetch('/api/users/', {
      method: 'post',
      body,
    })
  } catch (err) {}
}

const handleGetUser = async () => {
  try {
    const response = await $fetch('/api/users/1', {
      method: 'get',
    })
  } catch (err) {}
}

const handlePostApplication = async () => {
  const body = {
    scholarshipId: 5,
    userId: 2,
  }

  try {
    const response = await $fetch('/api/applications/', {
      method: 'post',
      body,
    })
  } catch (err) {}
}

const handleGetApplicationsByUserId = async () => {
  try {
    const response = await $fetch('/api/users/2/applications', {
      method: 'get',
    })
  } catch (err) {}
}

const handleGetScholarships = async () => {
  try {
    const response = await $fetch('/api/scholarships', {
      method: 'get',
    })
  } catch (err) {}
}

const handleGetScholarshipsById = async () => {
  try {
    const response = await $fetch(
      '/api/scholarships/sustainable-mars-scholarship',
      {
        method: 'get',
      },
    )
  } catch (err) {}
}

const handlePostScholarship = async () => {
  const body = {
    title: 'Ecoterra Scholarship',
    description: 'ecoterra scholarship',
    award: 2500,
    deadline: '2024-10-10',
    slug: 'ecoterra-scholarship',
    categoryIds: [1, 2],
    benefactorId: 9,
  }

  try {
    const response = await $fetch('/api/scholarships/', {
      method: 'post',
      body,
    })
  } catch (err) {}
}

const handleGetBenefactors = async () => {
  try {
    const response = await $fetch('/api/benefactors', {
      method: 'get',
    })
  } catch (err) {}
}

const handlePostBenefactor = async () => {
  const body = {
    name: 'Recyclon',
    description:
      'Recyling is the way of the future, especially on a barren planet like Mars, making Recyclon an efficient builder of the Martian society.',
    logo: '',
    email: 'recyclon@corp.com',
  }

  try {
    const response = await $fetch('/api/benefactors/', {
      method: 'post',
      body,
    })
  } catch (err) {}
}
</script>

<style scoped></style>
