'use client';

import { AdminNav } from '@/app/components/AdminNav';
import Link from 'next/link';
import { useAdminAuth } from '../useAdminAuth';
import { useAdminProjects, type Project } from '@/app/admin/useAdminProjects';
import { formatDate } from '@/lib/utils';

function AdminProjectCard({
  project,
  imageClassName,
  onEditClick,
  onDeleteClick,
  isDeleting,
}: {
  project: Project;
  imageClassName: string;
  onEditClick: () => void;
  onDeleteClick: () => void;
  isDeleting: boolean;
}) {
  return (
    <div className='p-4 overflow-hidden relative duration-700 border rounded-xl hover:bg-zinc-800/10 group md:gap-8 hover:border-zinc-400/50 border-zinc-600'>
      <article className='relative w-full h-full'>
        {project.picture && project.picture.length > 0 ? (
          <img
            src={project.picture[0]}
            alt={project.title}
            className={`rounded-lg object-cover w-full ${imageClassName}`}
          />
        ) : (
          <div
            className={`rounded-lg w-full ${imageClassName} bg-zinc-800 border border-dashed border-zinc-600 flex items-center justify-center`}
          >
            <span className='text-zinc-600 text-xs'>No image</span>
          </div>
        )}

        <div className='text-sm text-zinc-100 pt-4'>
          {project.date ? (
            <time dateTime={new Date(project.date).toISOString()}>
              {formatDate(new Date(project.date).toISOString())}
            </time>
          ) : (
            <span className='text-zinc-500'>No date set</span>
          )}
        </div>
        <div className='flex items-start justify-between mt-4 gap-2'>
          <h2 className='text-2xl font-bold text-zinc-100 group-hover:text-white sm:text-3xl font-display leading-tight'>
            {project.title}
          </h2>
          <span
            className={`shrink-0 mt-1 text-xs px-2 py-0.5 rounded-full font-medium ${
              project.published
                ? 'bg-lime-400/20 text-lime-300 border border-lime-400/40'
                : 'bg-zinc-700 text-zinc-400 border border-zinc-600'
            }`}
          >
            {project.published ? 'Published' : 'Draft'}
          </span>
        </div>
        <p>{project.description}</p>

        <div className='flex items-center gap-2 mt-5 pt-4 border-t border-zinc-700/60'>
          <button
            type='button'
            onClick={onEditClick}
            className='flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-zinc-600 text-xs text-zinc-200 hover:bg-zinc-800 transition-colors'
          >
            Edit
          </button>
          <button
            type='button'
            onClick={onDeleteClick}
            disabled={isDeleting}
            className='flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-red-700/50 bg-red-900/30 hover:bg-red-800/60 text-red-400 hover:text-red-300 text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Delete
          </button>
          <Link
            href={`/admin/projects/${project.slug}`}
            className='ml-auto text-xs text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-2'
          ></Link>
        </div>
      </article>
    </div>
  );
}
function PlaceholderCard({
  label,
  imageClassName,
}: {
  label: string;
  imageClassName: string;
}) {
  return (
    <div className='p-4 overflow-hidden relative duration-700 border border-dashed rounded-xl border-zinc-700 bg-zinc-900/40'>
      <div
        className={`rounded-lg w-full ${imageClassName} bg-zinc-800/50 border border-dashed border-zinc-700 flex items-center justify-center`}
      >
        <span className='text-zinc-600 text-xs'>No image yet</span>
      </div>
      <div className='mt-4 space-y-3'>
        <div className='h-4 w-24 rounded bg-zinc-800' />
        <div className='h-7 w-3/4 rounded bg-zinc-800' />
        <div className='h-4 w-full rounded bg-zinc-800' />
        <div className='h-4 w-5/6 rounded bg-zinc-800' />
      </div>
      <div className='mt-6 flex flex-col items-center justify-center gap-2 py-2'>
        <p className='text-xs text-zinc-500 font-medium uppercase tracking-wide'>
          {label} — empty slot
        </p>
        <Link
          href='/admin/projects/create'
          className='text-xs px-3 py-1.5 rounded-md border border-lime-400/50 text-lime-400 hover:bg-lime-400/10 transition-colors'
        >
          + Create a project for this slot
        </Link>
      </div>
    </div>
  );
}

export default function AdminProjectsPage() {
  const { auth } = useAdminAuth();
  const { state, deleteProjectBySlug, isDeleting } = useAdminProjects(
    auth.status === 'authenticated',
  );

  if (auth.status === 'loading') {
    return (
      <div className='min-h-screen flex items-center justify-center bg-zinc-900 text-white'>
        <p>Checking admin access...</p>
      </div>
    );
  }
  if (auth.status === 'unauthenticated') return null;
  const isLoadingProjects =
    state.status === 'idle' || state.status === 'loading';
  const projectsList = state.status === 'success' ? state.data : [];
  const featuredProject = projectsList[0] ?? null;
  const topRowProjectOne = projectsList[1] ?? null;
  const topRowProjectTwo = projectsList[2] ?? null;
  const remainingProjects = projectsList.slice(3);

  return (
    <div className='px-6 lg:px-8 min-h-screen text-white bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 pb-20'>
      <AdminNav />
      <div className='pl-6 pt-24 md:pl-24'>
        <div className='pt-20 mx-auto space-y-8 max-w-7xl md:space-y-16 md:pt-24 lg:pt-32'>
          <div className='flex items-start justify-between'>
            <div className='max-w-2xl'>
              <h2 className='text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl'>
                Projects
              </h2>
              <p className='mt-4 text-zinc-400'>
                Manage your projects below. Changes made here will reflect on
                the public-facing projects page.
              </p>
            </div>
            <Link
              href='/admin/projects/create'
              className='shrink-0 px-4 py-2.5 rounded-lg border border-lime-400 bg-lime-400 text-sm font-semibold text-zinc-900 hover:bg-lime-300 hover:border-lime-300 transition-colors'
            >
              + New Project
            </Link>
          </div>
          <div className='w-full h-px bg-lime-300' />
          <>
            <div>
              {featuredProject ? (
                <AdminProjectCard
                  project={featuredProject}
                  imageClassName='aspect-[2/1]'
                  onEditClick={() => {}}
                  onDeleteClick={() => {}}
                  isDeleting={false}
                />
              ) : (
                <PlaceholderCard
                  label='Featured Project'
                  imageClassName='aspect-[2/1]'
                />
              )}
            </div>
          </>
        </div>
      </div>
    </div>
  );
}
