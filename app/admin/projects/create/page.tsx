'use client';
import { AdminNav } from '@/app/components/AdminNav';
import Link from 'next/link';
import { useState } from 'react';

export default function CreateProjectPage() {
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    date: '',
    location: '',
    picture: '',
    published: false,
    bodyCode: '',
  });

  return (
    <div className=''>
      <AdminNav />
      <div className='pl-6 pt-24 md:pl-24'>
        <Link
          href='/admin/projects'
          className='flex items-center justify-center text-zinc-400 hover:text-white text-sm mb-6 w-full max-w-[12rem]'
        >
          ← Back to Projects
        </Link>
      </div>
    </div>
  );
}
