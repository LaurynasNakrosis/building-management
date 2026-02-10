'use client';
import React from 'react';
import { AdminNav } from '../components/AdminNav';
import AdminInvoice from '../components/AdminInvoice';
import { useAdminAuth } from './useAdminAuth';
import { useAdminInvoices } from './useAdminInvoices';

export default function AdminPage() {
  const { auth } = useAdminAuth();
  const invoicesState = useAdminInvoices(auth.status === 'authenticated');
  // Show loading state while checking auth
  if (auth.status === 'loading') {
    return (
      <div className='flex items-center justify-center min-h-screen text-white'>
        <div>Loading...</div>
      </div>
    );
  }
  if (auth.status === 'unauthenticated') {
    return null;
  }

  // Admin content
  return (
    <div className=' relative min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900'>
      <AdminNav />
      <div className='container mx-auto px-4 py-24  text-white'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold mb-4'>Admin Dashboard</h1>
          <p className='mb-6 text-zinc-400'>Welcome, {auth.user}!</p>
        </div>
        {invoicesState.status === 'loading' && (
          <div className='text-center py-8'>
            <p className='text-zinc-400'>Loading invoices...</p>
          </div>
        )}
        {invoicesState.status === 'error' && (
          <div className='text-center py-8'>
            <p className='text-red-400'>Error: {invoicesState.error}</p>
          </div>
        )}
        {invoicesState.status === 'success' &&
          invoicesState.data.length === 0 && (
            <div className='text-center py-8'>
              <p className='text-zinc-400'>
                No invoices found. Make sure the database is seeded.
              </p>
            </div>
          )}
        {invoicesState.status === 'success' &&
          invoicesState.data.length > 0 && (
            <AdminInvoice invoices={invoicesState.data} />
          )}
      </div>
    </div>
  );
}
