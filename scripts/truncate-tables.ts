import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// In SQLite, TRUNCATE is not supported, so we use DELETE to remove all rows from the table.
// Unlike TRUNCATE, DELETE logs each row deletion, but it's the proper way to clear tables in SQLite.
// This script ensures that all rows are deleted, resetting the table's state for clean tests.

// Additionally, SQLite maintains an auto-increment sequence for primary keys in the 'sqlite_sequence' table.
// we reset this sequence to ensure that the IDs start from 1 again after the deletion, simulating a 'fresh' table.

export async function truncateTables(): Promise<void> {
  await prisma.$executeRaw`DELETE FROM "Movie"` // clears the table by deleting all rows
  await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name = 'Movie'` // resets the auto-increment sequence for the Movie table
  console.log('Table truncated successfully.')
  await prisma.$disconnect() // disconnects from the database
}
