import { string, z, ZodString } from 'zod';
import { formatNumberWithDecimal } from './utils';

const Price = (field: string) =>
  z.coerce
    .number()
    .refine(
      (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(value)),
      `${field} must have exactly two decimal places (e.g., 49.99)`,
    );

const addressSchema = z.object({
  houseNumber: z.string().min(1, 'House number or name is required.'),
  roadName: z.string().min(1, 'Road name is required.'),
  city: z.string().min(1, 'City is required.'),
  country: z.string().min(1, 'Country is required.'),
  postCode: z.string().min(1, 'Post code is required'),
});

const contactInformationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  address: addressSchema, // Reusing the shared schema
  phone: z.string().min(1, 'Phone number is required'),
  email: z.string().refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
    message: 'Valid email is required',
  }),
});

const jobItemSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  quantity: z.coerce.number().positive('Quantity must be positive'),
  rate: Price('Rate'),
  total: z.coerce.number().optional(), // Will be calculated: quantity * rate
});

export const InvoiceInputChema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  price: Price('Price'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  businessContactInformation: contactInformationSchema,
  clientInformation: contactInformationSchema,
  jobAddress: addressSchema,

  invoiceDate: z.coerce.date({
    message: 'Invalid invoice date format',
  }),

  jobStartDate: z.coerce.date({
    message: 'Invalid job start date format',
  }),

  jobFinishDate: z.coerce.date({
    message: 'Invalid job finish date format',
  }),

  jobItems: z.array(jobItemSchema).min(1, 'At least one job item is required'),
});

export const ProjectInputSchema = z.object({
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  title: z.string().min(3, 'Title must be atleast 3 haracters'),
  description: z.string().min(3, 'Description must be atleast 10 characters'),
  date: z.coerce.date().optional(),
  location: z.string().optional(),
  pictures: z
    .array(z.string().url('Each picture must be a valid URL'))
    .default([]),
  url: z.string().url('URL must be valid').optional().or(z.literal('')),
  published: z.coerce.boolean(),
  body: z.object({
    code: string().min(1, 'Body code is required'),
  }),
});

export const ProjectUpdateSchema = ProjectInputSchema.partial().extend({
  slug: z.string().min(3).optional(),
});
