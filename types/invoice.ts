export type Invoice = {
  _id: string;
  name: string;
  price: number;
  slug: string;
  businessAddress?: {
    houseNumber: string;
    roadName: string;
    city: string;
    country: string;
    postCode: string;
  };
  businessContactInformation?: {
    firstName: string;
    lastName: string;
    address: {
      houseNumber: string;
      roadName: string;
      city: string;
      country: string;
      postCode: string;
    };
    phone: string;
    email: string;
  };
  clientInformation?: {
    firstName: string;
    lastName: string;
    address: {
      houseNumber: string;
      roadName: string;
      city: string;
      country: string;
      postCode: string;
    };
    phone: string;
    email: string;
  };
  jobAddress?: {
    houseNumber: string;
    roadName: string;
    city: string;
    country: string;
    postCode: string;
  };
  invoiceDate?: Date | string;
  jobStartDate?: Date | string;
  jobFinishDate?: Date | string;
  jobItems?: Array<{
    description: string;
    quantity: number;
    rate: number;
    total: number;
  }>;
  items?: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
};

export function getInvoiceTotal(invoice: Invoice): number {
  if (invoice.jobItems && invoice.jobItems.length > 0) {
    return invoice.jobItems.reduce((sum, item) => sum + item.total, 0);
  }
  if (invoice.items && invoice.items.length > 0) {
    return invoice.items.reduce((sum, item) => sum + item.total, 0);
  }
  return invoice.price;
}
