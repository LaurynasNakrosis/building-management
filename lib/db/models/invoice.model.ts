import { IInvoiceInput } from '@/types'
import { Document, Model, model, models, Schema, Types } from 'mongoose'

export interface IInvoice extends Document, IInvoiceInput {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date
  // Legacy fields (kept for backward compatibility)
  items?: Array<{
    description: string
    quantity: number
    unitPrice: number
    total: number
  }>
  address?: {
    street?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
  }
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
    
    // Business Address
    businessAddress: {
      houseNumber: {
        type: String,
        required: true,
      },
      roadName: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      postCode: {
        type: String,
        required: true,
      },
    },
    
    // Business Contact Information
    businessContactInformation: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      address: {
        houseNumber: {
          type: String,
          required: true,
        },
        roadName: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
        postCode: {
          type: String,
          required: true,
        },
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    
    // Client Information
    clientInformation: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      address: {
        houseNumber: {
          type: String,
          required: true,
        },
        roadName: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
        postCode: {
          type: String,
          required: true,
        },
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    
    // Job Address
    jobAddress: {
      houseNumber: {
        type: String,
        required: true,
      },
      roadName: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      postCode: {
        type: String,
        required: true,
      },
    },
    
    // Dates
    invoiceDate: {
      type: Date,
      required: true,
    },
    jobStartDate: {
      type: Date,
      required: true,
    },
    jobFinishDate: {
      type: Date,
      required: true,
    },
    
    // Job Items (array of items with description, quantity, rate, total)
    jobItems: [
      {
        description: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        rate: {
          type: Number,
          required: true,
        },
        total: {
          type: Number,
          required: true,
        },
      },
    ],
    
    // Legacy fields (kept for backward compatibility)
    items: [
      {
        description: {
          type: String,
          required: false,
        },
        quantity: {
          type: Number,
          required: false,
        },
        unitPrice: {
          type: Number,
          required: false,
        },
        total: {
          type: Number,
          required: false,
        },
      },
    ],
    address: {
      street: {
        type: String,
        required: false,
      },
      city: {
        type: String,
        required: false,
      },
      state: {
        type: String,
        required: false,
      },
      zipCode: {
        type: String,
        required: false,
      },
      country: {
        type: String,
        required: false,
      },
    },
  },
  { timestamps: true }
)

const Invoice =
  (models.Invoice as Model<IInvoice>) ||
  model<IInvoice>('Invoice', invoiceSchema)

export default Invoice