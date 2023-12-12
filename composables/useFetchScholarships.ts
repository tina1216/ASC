import { Scholarship } from '@types/CommonTypes'

export default async (): Scholarship[] => {
  const { data, error } = await useFetch('/api/scholarships')

  if (error.value) {
    console.error('Error fetching scholarships:', error)

    throw createError({
      ...error.value,
      statusMessage: 'Unable to fetch scholarships',
    })
  }

  const scholarshipsWithPaths = data.value.map((scholarship) => ({
    ...scholarship,
    path: `/scholarships/${scholarship.slug}`,
  }))

  return scholarshipsWithPaths
}
