import { truncateTables } from './truncate-tables'

export default async function globalSetup(): Promise<void> {
  console.log('running global setup once before everything')
  // Call the truncateTables function to clear the database before running tests
  await truncateTables()
}
