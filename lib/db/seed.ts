import { loadEnvConfig } from '@next/env'
import { cwd } from 'process'
import { connectToDatabase } from '.'
import Invoice from './models/invoice.model'
import data from '@/lib/data'

loadEnvConfig(cwd())

const main = async () => {
  try {
    const { invoices } = data

    // Debug: Check if MONGODB_URI is loaded (don't log the full string for security)
    if (!process.env.MONGODB_URI) {
      throw new Error(
        'MONGODB_URI is missing. Please create .env.local file with MONGODB_URI'
      )
    }

    // Log first few characters to verify it's loading (for debugging)
    console.log(
      'MONGODB_URI starts with:',
      process.env.MONGODB_URI.substring(0, 20) + '...'
    )

    await connectToDatabase(process.env.MONGODB_URI)

    await Invoice.deleteMany()
    const createdInvoices = await Invoice.insertMany(invoices)

    console.log({ createdInvoices, message: 'Invoices seeded successfully' })
    process.exit(0)
  } catch (error) {
    console.error(error)
    throw new Error('Failed to seed Database')
  }
}

main()
