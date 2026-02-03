import { connectToDatabase } from '../db'
import Invoice from '../db/models/invoice.model'

export async function getInvoicesForCard({
  limit,
}: {
  limit?: number
} = {}) {
  await connectToDatabase()
  const query = Invoice.find({}).sort({ createdAt: 'desc' })

  if (limit) {
    query.limit(limit)
  }

  const invoices = await query
  return JSON.parse(JSON.stringify(invoices))
}

export async function getInvoiceBySlug(slug: string) {
  await connectToDatabase()
  const invoice = await Invoice.findOne({ slug })
  if (!invoice) {
    return null
  }
  return JSON.parse(JSON.stringify(invoice))
}
