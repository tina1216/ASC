import { Event } from "@types/CommonTypes";

export default async (): Event[] => {
  const { data, error } = await useFetch("/api/events");

  if (error.value) {
    console.error("Error fetching events:", error);

    throw createError({
      ...error.value,
      statusMessage: "Unable to fetch events",
    });
  }

  const eventsWithPaths = data.value.map((event) => ({
    ...event,
    path: `/events/${event.slug}`,
  }));

  return eventsWithPaths;
};
