'use client';
import { ArrowLeft, FileText, Plus, LayoutDashboard, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

export const AdminNav: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting),
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('loginTime');
    router.push('/sign-in');
  };

  return (
    <header ref={ref}>
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur duration-200 border-b ${
          isIntersecting
            ? 'bg-zinc-900/0 border-transparent'
            : 'bg-zinc-900/500 border-zinc-800'
        }`}
      >
        <div className='container flex flex-row-reverse items-center justify-between p-6 mx-auto'>
          <div className='flex justify-between gap-8'>
            {pathname !== '/admin/projects' && (
              <Link
                href='/admin/projects'
                className='duration-200 text-zinc-400 hover:text-zinc-100 flex items-center gap-2'
              >
                {' '}
                <FileText className='w-8 h-8 hidden sm:block' />
                <span className='text-lg'>Projects</span>
              </Link>
            )}

            {/* <Link
              href='/admin/invoices/create'
              className='duration-200 text-zinc-400 hover:text-zinc-100 flex items-center gap-2'
            >
              <Plus className='w-4 h-4' />
              Create Invoice
            </Link> */}
            <button
              onClick={handleLogout}
              className='text-white px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors duration-200'
            >
              Logout
            </button>
          </div>

          <div className='flex items-center gap-6'>
            {pathname === '/admin' && (
              <Link
                href='/'
                className='duration-200 text-zinc-400 hover:text-zinc-100 flex items-center gap-1.5 text-sm'
              >
                <Home className='w-8 h-8  ' />
                <span className='hidden sm:inline text-lg'>Main Site</span>
              </Link>
            )}
            {pathname !== '/admin' && (
              <Link
                href='/admin'
                className='duration-200 text-zinc-400 hover:text-zinc-100 flex items-center gap-1.5 text-sm'
              >
                <LayoutDashboard className='w-8 h-8 ' />
                <span className='hidden sm:inline text-lg'>Dashboard</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
