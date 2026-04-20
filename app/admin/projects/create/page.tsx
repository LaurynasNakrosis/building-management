'use client';
import { AdminNav } from '@/app/components/AdminNav';
import Input from '@/app/components/formComponents/Input';
import { createProject } from '@/lib/actions/project.actions';
import { ProjectInputSchema } from '@/lib/validator';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { z } from 'zod';
import Toast from '@/app/components/UI/Toast';
import { UploadButton } from '@/lib/uploadthing';

type ToastType = 'success' | 'error';
type ToastState = { message: string; type: ToastType } | null;

type FormState = {
  title: string;
  slug: string;
  description: string;
  date: string;
  location: string;
  picture: string;
  url: string;
  repository: string;
  published: boolean;
  bodyCode: string;
};
const initialForm: FormState = {
  title: '',
  slug: '',
  description: '',
  date: '',
  location: '',
  picture: '',
  url: '',
  repository: '',
  published: false,
  bodyCode: '',
};

export default function CreateProjectPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  function showToast(message: string, type: ToastType) {
    setToast({ message, type });
  }

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const payload = useMemo(() => {
    return {
      slug: form.slug.trim(),
      title: form.title.trim(),
      description: form.description.trim(),
      date: form.date ? new Date(form.date) : undefined,
      location: form.location.trim() || undefined,
      picture: form.picture.trim() || '',
      url: form.url.trim() || '',
      repository: form.repository.trim() || '',
      published: form.published,
      body: { code: form.bodyCode },
    };
  }, [form]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log('handleSubmit fired');
    e.preventDefault();
    if (isSubmitting) return;

    const parsed = ProjectInputSchema.safeParse(payload);
    if (!parsed.success) {
      const flat = z.flattenError(parsed.error);
      const fieldMsgs = Object.values(flat.fieldErrors).flat().filter(Boolean);
      showToast(
        flat.formErrors[0] ||
          fieldMsgs[0] ||
          'Please fix the highlighted fields.',
        'error',
      );

      const firstPath = parsed.error.issues[0]?.path?.join('.') ?? '';
      const idByPath: Record<string, string> = {
        slug: 'slug',
        title: 'title',
        description: 'description',
        date: 'date',
        location: 'location',
        picture: 'picture',
        url: 'url',
        repository: 'repository',
        published: 'published',
        'body.code': 'bodyCode',
      };
      const targetId = idByPath[firstPath];
      if (targetId && typeof document !== 'undefined') {
        document.getElementById(targetId)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }

      return;
    }

    try {
      setIsSubmitting(true);
      await createProject(parsed.data);
      setForm(initialForm);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

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

        <form onSubmit={handleSubmit} className='space-y-8'>
          <section className='rounded-xl border border-lime-400/70 bg-zinc-900/60 p-6 shadow-sm space-y-4'>
            <h2 className='text-lg font-semibold text-lime-300'>Basics</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Input
                id='title'
                label='Title'
                name='title'
                type='text'
                value={form.title}
                onChange={(e) => {
                  const nextTitle = e.target.value;
                  updateField('title', nextTitle);
                }}
              />
              <Input
                id='slug'
                label='Slug'
                name='slug'
                type='text'
                value={form.slug}
                onChange={(e) => updateField('slug', e.target.value)}
              />
              <Input
                id='date'
                label='Date'
                name='date'
                type='date'
                value={form.date}
                onChange={(e) => updateField('date', e.target.value)}
              />
              <Input
                id='location'
                label='Location'
                name='location'
                type='text'
                value={form.location}
                onChange={(e) => updateField('location', e.target.value)}
              />
              <Input
                id='picture'
                label='Picture URL'
                name='picture'
                type='text'
                value={form.picture}
                onChange={(e) => updateField('picture', e.target.value)}
              />
              <div className='flex flex-col gap-2'>
                <label className='block text-[0.75rem] mb-0.5 text-[#9bafaf] uppercase font-semibold tracking-wide'>
                  Upload Picture
                </label>

                <UploadButton
                  endpoint='projectImage'
                  onClientUploadComplete={(res) => {
                    const url = res?.[0]?.url;
                    if (!url) return;
                    updateField('picture', url);
                    showToast('Image uploaded.', 'success');
                  }}
                  onUploadError={(error: Error) =>
                    showToast(error.message || 'Upload failed.', 'error')
                  }
                />

                {form.picture && (
                  <img
                    src={form.picture}
                    alt='Uploaded preview'
                    className='mt-2 max-h-40 rounded-md border border-zinc-700 object-cover'
                  />
                )}
              </div>
              <Input
                id='repository'
                label='Repository URL (optional)'
                name='repository'
                type='text'
                value={form.repository}
                onChange={(e) => updateField('repository', e.target.value)}
              />
            </div>
            <div className='flex items-center gap-3 pt-2'>
              <input
                id='published'
                name='published'
                type='checkbox'
                checked={form.published}
                onChange={(e) => updateField('published', e.target.checked)}
                className='h-4 w-4 accent-lime-400'
              />
              <label htmlFor='published' className='text-sm text-zinc-200'>
                Published
              </label>
            </div>
            <div className='w-full flex flex-col gap-1'>
              <label
                htmlFor='description'
                className='block text-[0.75rem] mb-0.5 text-[#9bafaf] uppercase font-semibold tracking-wide'
              >
                Description
              </label>
              <textarea
                id='description'
                name='description'
                value={form.description}
                onChange={(e) => updateField('description', e.target.value)}
                className='block w-full rounded-md border border-[#758a8a] bg-[#869999] px-3 py-3 md:py-2.5 text-sm md:text-[0.9rem] text-[#142020] placeholder:text-[#5c7373] focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400 transition-shadow min-h-[120px]'
              />
            </div>
            <div className='w-full flex flex-col gap-1'>
              <label
                htmlFor='bodyCode'
                className='block text-[0.75rem] mb-0.5 text-[#9bafaf] uppercase font-semibold tracking-wide'
              >
                Body
              </label>
              <textarea
                id='bodyCode'
                name='bodyCode'
                value={form.bodyCode}
                onChange={(e) => updateField('bodyCode', e.target.value)}
                className='block w-full rounded-md border border-[#758a8a] bg-[#869999] px-3 py-3 md:py-2.5 text-sm md:text-[0.9rem] text-[#142020] placeholder:text-[#5c7373] focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400 transition-shadow min-h-[120px]'
              />
            </div>
          </section>
          <div className='flex flex-col sm:flex-row sm:justify-end gap-3 pt-2 w-full'>
            <button
              type='submit'
              onClick={() => console.log('submitting')}
              className='w-full sm:w-auto px-4 py-3 sm:py-2.5 rounded-lg border border-lime-400 bg-lime-400 text-sm sm:text-[0.9rem] font-semibold text-zinc-900 hover:bg-lime-300 hover:border-lime-300 transition-colors disabled:opacity-60 disabled:cursor-not-allowed'
            >
              {isSubmitting ? 'Creating' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
      <Toast
        open={!!toast}
        message={toast?.message ?? ''}
        type={toast?.type ?? 'success'}
        durationMs={1800}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
