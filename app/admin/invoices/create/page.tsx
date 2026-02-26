'use client';

import { AdminNav } from '@/app/components/AdminNav';
import Link from 'next/link';
import { useAdminAuth } from '../../useAdminAuth';

export default function CreateInvoicePage() {
  const { auth } = useAdminAuth();

  if (auth.status === 'loading') {
    return (
      <div className='min-h-screen flex items-center justify-center bg-zinc-900 text-white'>
        <p>Checking admin access...</p>
      </div>
    );
  }

  if (auth.status === 'unauthenticated') {
    return null;
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white'>
      <AdminNav />
      <div className=' pl-24 pt-24'>
        <Link
          href='/admin'
          className='text-zinc-400 hover:text-white text-sm mb-6 block'
        >
          ← Back to Admin
        </Link>
      </div>
      <div className=' max-w-4xl mx-auto text-center'>
        <h2 className='text-2xl font-bold mb-6'>Create Invoice</h2>
        <p className='text-zinc-400'>Form coming next...</p>
      </div>
    </div>
  );
}
