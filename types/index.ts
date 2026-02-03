import { InvoiceInputChema } from '@/lib/validator'
import { z } from 'zod'

export type IInvoiceInput = z.infer<typeof InvoiceInputChema>

export type Data = {
  invoices: IInvoiceInput[]
}
