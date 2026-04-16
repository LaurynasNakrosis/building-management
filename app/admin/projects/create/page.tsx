'use client';
import { AdminNav } from '@/app/components/AdminNav';
import Input from '@/app/components/input';
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
        <form action='' className='space-y-8'>
          <section className='rounded-xl border border-lime-400/70 bg-zinc-900/60 p-6 shadow-sm space-y-4'>
            <h2 className='text-lg font-semibold text-lime-300'>Basics</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Input id='title' label='Title' name='title' type='text' />
              <Input id='slug' label='Slug' name='slug' type='text' />
              <Input id='date' label='Date' name='date' type='date' />
              <Input
                id='location'
                label='Location'
                name='location'
                type='text'
              />
              <Input
                id='picture'
                label='Picture URL'
                name='picture'
                type='text'
              />
            </div>
            <div className='flex items-center gap-3 pt-2'>
              <input type='checkbox' className='h-4 w-4 accent-lime-400' />
              <label className='text-sm text-zinc-200'>Published</label>
            </div>
            <div className='w-full flex flex-col gap-1'>
              <label className='block text-[0.75rem] mb-0.5 text-[#9bafaf] uppercase font-semibold tracking-wide'>
                Description
              </label>
              <textarea className='block w-full rounded-md border border-[#758a8a] bg-stone-400 px-3 py-3 md:py-2.5 text-sm md:text-[0.9rem] text-[#142020] placeholder:text-[#5c7373] focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400 transition-shadow min-h-[120px]' />
            </div>
            <div className='w-full flex flex-col gap-1'>
              <label className='block text-[0.75rem] mb-0.5 text-stone-800 uppercase font-semibold tracking-wide'>
                Body
              </label>
              <textarea className='block w-full rounded-md border border-[#758a8a] bg-stone-400 px-3 py-3 md:py-2.5 text-sm md:text-[0.9rem] text-[#142020] placeholder:text-[#5c7373] focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400 transition-shadow min-h-[120px]' />
            </div>
          </section>
          <div className='flex flex-col sm:flex-row sm:justify-end gap-3 pt-2 w-full'>
            <button className='w-full sm:w-auto px-4 py-3 sm:py-2.5 rounded-lg border border-lime-400 bg-lime-400 text-sm sm:text-[0.9rem] font-semibold text-zinc-900 hover:bg-lime-300 hover:border-lime-300 transition-colors disabled:opacity-60 disabled:cursor-not-allowed'>
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
