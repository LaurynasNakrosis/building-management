import { NextApiRequest, NextApiResponse } from 'next';
import {
  getInvoiceBySlug,
  deleteInvoiceBySlug,
} from '@/lib/actions/invoice.actions';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ message: 'Slug is required' });
  }

  try {
    if (req.method === 'GET') {
      const invoice = await getInvoiceBySlug(slug);
      if (!invoice)
        return res.status(404).json({ message: 'Invoice not found' });
      return res.status(200).json(invoice);
    }

    if (req.method === 'DELETE') {
      const deleted = await deleteInvoiceBySlug(slug);
      if (!deleted)
        return res.status(404).json({ message: 'Invoice not found' });
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Error fetching invoice:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    return res.status(500).json({ message: `Invoice error: ${errorMessage}` });
  }
}
