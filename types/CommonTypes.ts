import { User, Application, Event, Organiser, Role, Status } from "@prisma/client";

type Event = Event & {
  path: string;
};

// Export the types and enums
export { User, Application, Event, Organiser, Category, Role, Status };
