'use client';

import { AdminNav } from '@/app/components/AdminNav';
import Link from 'next/link';

export default function AdminProjectsPage() {
  return (
    <div>
      <AdminNav />
      <div className='pl-6 pt-24 md:pl-24'>
        <Link
          href='/admin/projects/create'
          className='flex items-center justify-center text-zinc-400 hover:text-white text-sm mb-6 w-full max-w-[12rem]'
        >
          Create Project
        </Link>
      </div>
    </div>
  );
}
