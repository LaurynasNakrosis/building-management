'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { AdminNav } from '../components/AdminNav';
import AdminInvoice from '../components/AdminInvoice';

const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes
const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes of inactivity

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

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<string | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [invoicesLoading, setInvoicesLoading] = useState(true);
  const [invoicesError, setInvoicesError] = useState<string | null>(null);
  const router = useRouter();
  const logoutTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearAuth = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('loginTime');
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
    }
    router.push('/sign-in');
  };

  const resetInactivityTimer = () => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
    }
    logoutTimerRef.current = setTimeout(() => {
      clearAuth();
    }, INACTIVITY_TIMEOUT);
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('adminUser');
    const loginTimeStr = localStorage.getItem('loginTime');

    if (!isAuthenticated || isAuthenticated !== 'true' || !storedUser) {
      clearAuth();
      return;
    }

    if (loginTimeStr) {
      const loginTime = parseInt(loginTimeStr, 10);
      if (isNaN(loginTime)) {
        clearAuth();
        return;
      }
      const timeSinceLogin = Date.now() - loginTime;
      if (timeSinceLogin >= SESSION_DURATION) {
        clearAuth();
        return;
      }
    } else {
      clearAuth();
      return;
    }

    setAdminUser(storedUser);
    setIsLoading(false);
    resetInactivityTimer();

    const events = ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    events.forEach((event) => {
      window.addEventListener(event, resetInactivityTimer);
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetInactivityTimer);
      });
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
      }
    };
  }, [router]);

  useEffect(() => {
    const fetchInvoices = async () => {
      setInvoicesLoading(true);
      setInvoicesError(null);
      try {
        const response = await fetch('/api/invoices');
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched invoices:', data);
          setInvoices(data || []);
        } else {
          const errorData = await response
            .json()
            .catch(() => ({ message: 'Failed to fetch invoices' }));
          setInvoicesError(errorData.message || 'Failed to fetch invoices');
          console.error('Error response:', response.status, errorData);
        }
      } catch (error) {
        console.error('Error fetching invoices:', error);
        setInvoicesError(
          'Failed to fetch invoices. Please check the console for details.'
        );
      } finally {
        setInvoicesLoading(false);
      }
    };

    if (!isLoading) {
      fetchInvoices();
    }
  }, [isLoading]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen text-white'>
        <div>Loading...</div>
      </div>
    );
  }

  // Admin content
  return (
    <div className=' relative min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900'>
      <AdminNav />
      <div className='container mx-auto px-4 py-24  text-white'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold mb-4'>Admin Dashboard</h1>
          <p className='mb-6 text-zinc-400'>Welcome, {adminUser}!</p>
        </div>
        {invoicesLoading ? (
          <div className='text-center py-8'>
            <p className='text-zinc-400'>Loading invoices...</p>
          </div>
        ) : invoicesError ? (
          <div className='text-center py-8'>
            <p className='text-red-400'>Error: {invoicesError}</p>
          </div>
        ) : invoices.length === 0 ? (
          <div className='text-center py-8'>
            <p className='text-zinc-400'>
              No invoices found. Make sure the database is seeded.
            </p>
          </div>
        ) : (
          <AdminInvoice invoices={invoices} />
        )}
      </div>
    </div>
  );
}
