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
    <div className='px-4 lg:px-0 min-h-screen text-white bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 pb-20'>
      <AdminNav />
      <div className='pl-6 pt-24 md:pl-24'>
        <Link
          href='/admin/projects'
          className='flex items-center justify-center text-zinc-400 hover:text-white text-sm mb-6 w-full max-w-[12rem]'
        >
          ← Back to Projects
        </Link>
      </div>
      <div className='max-w-5xl mx-auto lg:px-8'>
        <h1 className='text-2xl font-bold text-center mb-8'>Create Project</h1>
      </div>
    </div>
  );
}
