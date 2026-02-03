import { IInvoiceInput } from '@/types'
import { Document, Model, model, models, Schema, Types } from 'mongoose'

export interface IInvoice extends Document, IInvoiceInput {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const invoiceSchema = new Schema<IInvoice>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
)

const Invoice =
  (models.Invoice as Model<IInvoice>) ||
  model<IInvoice>('Invoice', invoiceSchema)

export default Invoice
