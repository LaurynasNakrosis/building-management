'use client';

import { useEffect, useState } from 'react';

type Invoice = {
  _id: string;
  name: string;
  price: number;
  slug: string;
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

export type InvoicesState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Invoice[] }
  | { status: 'error'; error: string };

export function useAdminInvoices(enabled: boolean) {
  const [state, setState] = useState<InvoicesState>({ status: 'idle' });

  useEffect(() => {
    if (!enabled) return;

    const fetchInvoices = async () => {
      setState({ status: 'loading' });
      try {
        const response = await fetch('/api/invoices');
        if (response.ok) {
          const data = await response.json();
          setState({ status: 'success', data: data || [] });
        } else {
          const errorData = await response
            .json()
            .catch(() => ({ message: 'Failed to fetch invoices' }));
          setState({
            status: 'error',
            error: errorData.message || 'Failed to fetch invoices',
          });
        }
      } catch (error) {
        console.error('Error fetching invoices:', error);
        setState({
          status: 'error',
          error:
            'Failed to fetch invoices. Please check the console for details.',
        });
      }
    };

    fetchInvoices();
  }, [enabled]);

  return state;
}
