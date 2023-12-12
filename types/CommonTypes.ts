import {
  User,
  Application,
  Scholarship,
  Benefactor,
  Role,
  Status,
} from '@prisma/client'

type Scholarship = Scholarship & {
  path: string
}

// Export the types and enums
export { User, Application, Scholarship, Benefactor, Category, Role, Status }
