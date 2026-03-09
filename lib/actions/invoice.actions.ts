'use server';
import { z } from 'zod';
import { getBusinessContactInformation } from '../businessInfo';
import { connectToDatabase } from '../db';
import Invoice from '../db/models/invoice.model';
import { InvoiceInputChema } from '../validator';

type CreateInvoicePayload = Omit<
  z.infer<typeof InvoiceInputChema>,
  'businessContactInformation'
>;

export async function getInvoicesForCard({
  limit,
}: {
  limit?: number;
} = {}) {
  await connectToDatabase();
  const query = Invoice.find({}).sort({ createdAt: 'desc' });

  if (limit) {
    query.limit(limit);
  }

  const invoices = await query;
  return JSON.parse(JSON.stringify(invoices));
}

export async function getInvoiceBySlug(slug: string) {
  await connectToDatabase();
  const invoice = await Invoice.findOne({ slug });
  if (!invoice) {
    return null;
  }
  return JSON.parse(JSON.stringify(invoice));
}

export async function createInvoice(payload: CreateInvoicePayload) {
  const businessContactInformation = getBusinessContactInformation();

  const fullPayload = {
    ...payload,
    businessContactInformation,
  };

  const parsed = InvoiceInputChema.safeParse(fullPayload);
  if (!parsed.success) {
    throw new Error(parsed.error.flatten().formErrors.join(', '));
  }

  await connectToDatabase();
  const invoice = await Invoice.create(parsed.data);
  return JSON.parse(JSON.stringify(invoice));
}
