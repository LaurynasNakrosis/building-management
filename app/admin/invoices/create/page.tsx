'use client';

import { AdminNav } from '@/app/components/AdminNav';
import Link from 'next/link';
import { useState } from 'react';

type InvoiceFormValues = {
  name: string;
  slug: string;
  invoiceDate: string;
  itemDescription: string;
  itemQuantity: string;
  itemRate: string;
};

export default function CreateInvoicePage() {
  const [formValues, setFormValues] = useState<InvoiceFormValues>({
    name: '',
    slug: '',
    invoiceDate: '',
    itemDescription: '',
    itemQuantity: '',
    itemRate: '',
  });

  return (
    <div>
      <AdminNav />
      <div>
        <Link href='/admin'>← Back to Admin</Link>
        <h2 className=' bg-white'>Create Invoice</h2>
        <p>Form coming nex...</p>
      </div>
    </div>
  );
}
