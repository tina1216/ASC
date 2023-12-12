import { defineStore } from 'pinia'
export const useScholarshipStore = defineStore('ScholarshipStore', () => {
  const scholarships = ref([])
  async function fetchScholarships() {
    try {
      scholarships.value = await useFetchScholarships()
    } catch (err) {
      return err
    }
  }

  return {
    scholarships,
    fetchScholarships,
  }
})
