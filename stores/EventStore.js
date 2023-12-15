import { defineStore } from "pinia";

export const useEventStore = defineStore("EventStore", () => {
  const events = ref([]);

  async function fetchEvents() {
    try {
      events.value = await useFetchEvents();
    } catch (err) {
      return err;
    }
  }

  return {
    events,
    fetchEvents,
  };
});
