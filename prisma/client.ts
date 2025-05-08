import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query']
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Prisma notes
/* 
To connect out application to a database, we often use an Object-relational mapper (ORM) like Prisma.
An ORM is a tool that sits between a database and an application.
It's responsible for mapping database records to objects in an application.

Prisma is the ost widely-used ORM for Next.js (or node.js) applications.

1. **Define Models**: To use Prisma, first we have to define our data models in a schema file.
    This file is usually named `schema.prisma` and is located in the `prisma` directory of our project.
    These are entities that represent our application domain, such as User, Order, Customer, etc.
    Each model has one or more fields (or properties) that define its structure.

    `npx prisma init` will create your models.

    >> we wnat to match these with our Zod types, ex: `./app/api/users/schema.ts`, `./app/api/products/schema.ts`

2. **Create migration file**: Once we create a model, we use Prisma CLI to create a migration file. 
    A migration file contins instructions to generate or update database tables to match our models.
    Those instructions are in SQL language, which is the language databsae engines understand. 

    `npx prisma migrate dev`

3. **Generate Prisma Client**: To connect with a database, we create an instance of PrismaClient. This client object 
    gets automatically generated when ever we create a new migration. It exposes properties that represent out models (eg. user)
    (./prisma/client.ts)
*/
