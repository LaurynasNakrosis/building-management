import { NextApiRequest, NextApiResponse } from 'next'
import { getInvoicesForCard } from '@/lib/actions/invoice.actions'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const limit = req.query.limit
      ? parseInt(req.query.limit as string)
      : undefined
    const invoices = await getInvoicesForCard({ limit })
    console.log('API: Fetched invoices count:', invoices?.length || 0)
    return res.status(200).json(invoices || [])
  } catch (error) {
    console.error('Error fetching invoices:', error)
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred'
    return res
      .status(500)
      .json({ message: `Error fetching invoices: ${errorMessage}` })
  }
}
