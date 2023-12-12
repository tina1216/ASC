import { defineStore } from 'pinia'
export const useAuthStore = defineStore('AuthStore', () => {
  const user = ref(null)
  return user
})
