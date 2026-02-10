import { useEffect, useState } from 'react';
import type { Invoice } from '@/types/invoice';

export type InvoiceState =
  | { status: 'loading' }
  | { status: 'success'; data: Invoice }
  | { status: 'error'; error: string };

export function useInvoice(slug: string | undefined) {
  const [invoiceState, setInvoiceState] = useState<InvoiceState>({
    status: 'loading',
  });

  useEffect(() => {
    if (!slug) return;

    const fetchInvoice = async () => {
      setInvoiceState({ status: 'loading' });
      try {
        const response = await fetch(`/api/invoices/${slug}`);
        if (response.ok) {
          const data = await response.json();
          setInvoiceState({ status: 'success', data });
        } else if (response.status === 404) {
          setInvoiceState({ status: 'error', error: 'Invoice not found' });
        } else {
          setInvoiceState({ status: 'error', error: 'Failed to load invoice' });
        }
      } catch (err) {
        console.error('Error fetching invoice:', err);
        setInvoiceState({ status: 'error', error: 'Failed to load invoice' });
      }
    };

    fetchInvoice();
  }, [slug]);

  return invoiceState;
}
