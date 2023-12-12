<template>
  <div>
    <UTable :columns="columns" :rows="applications">
      <template #actions-data="{ row }">
        <UDropdown v-if="isAdmin" :items="items(row)">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-ellipsis-horizontal-20-solid"
          />
        </UDropdown>
      </template>
    </UTable>
  </div>
</template>

<script setup lang="ts">
const columns = ref([
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'title',
    label: 'Scholarship',
  },
  {
    key: 'createdAt',
    label: 'Applied At',
  },
  {
    key: 'benefactor',
    label: 'Benefactor',
  },
  {
    key: 'status',
    label: 'Status',
  },
])

const items = (row) => [
  [
    {
      label: 'Approve',
      click: () => handleUpdateApplication(row.id, 'ACCEPTED'),
    },
    {
      label: 'Reject',
      click: () => handleUpdateApplication(row.id, 'REJECTED'),
    },
  ],
]

const headers = useRequestHeaders(['cookie']) as HeadersInit
const { data: token } = await useFetch('/api/auth/token', { headers })
const userId = token.value?.id
const isAdmin = computed(() => token.value?.role === 'ADMIN')

const applications = ref([])

if (userId) {
  if (isAdmin.value) {
    const { data } = await useFetch(`/api/applications`, { method: 'get' })
    applications.value = data.value.map((application) => ({
      id: application.id,
      user: application.user.name,
      title: application.scholarship.title,
      createdAt: new Date(application.createdAt).toLocaleDateString(),
      benefactor: application.scholarship.benefactor.name,
      status: application.application_status,
    }))
    columns.value.push(
      {
        key: 'user',
        label: 'Applicant',
      },
      {
        key: 'actions',
        label: 'Actions',
      },
    )
  } else {
    const { data } = await useFetch(`/api/users/${userId}/applications`, {
      method: 'get',
    })

    applications.value = data.value.map((application) => ({
      id: application.id,
      title: application.scholarship.title,
      createdAt: new Date(application.createdAt).toLocaleDateString(),
      benefactor: application.scholarship.benefactor.name,
      status: application.application_status,
    }))
  }
}

const handleUpdateApplication = async (
  id: Number,
  application_status: String,
) => {
  const { data } = await useFetch(`/api/applications`, {
    method: 'put',
    body: { id, application_status },
  })

  applications.value = applications.value.map((application) => {
    if (application.id === id) {
      application.status = application_status
    }
    return application
  })
}
</script>

<style scoped></style>
