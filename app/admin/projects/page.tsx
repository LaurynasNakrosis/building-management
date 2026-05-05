'use client';

import { AdminNav } from '@/app/components/AdminNav';
import Link from 'next/link';
import { useAdminAuth } from '../useAdminAuth';
import { useAdminProjects, type Project } from '@/app/admin/useAdminProjects';
import { divide } from 'lodash';

function AdminProjectCard({
  project,
  imageClassName,
}: {
  project: Project;
  imageClassName: string;
}) {
  return (
    <div>
      <article>
        {project.picture && project.picture.length > 0 ? (
          <img
            src={project.picture[0]}
            alt={project.title}
            className={`rounded-lg object-cover w-full ${imageClassName}`}
          />
        ) : (
          <div>
            <span className='text-zinc-600 text-xs'>No image</span>
          </div>
        )}
      </article>
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
                />
              ) : (
                <div> No Project </div>
              )}
            </div>
          </>
        </div>
      </div>
    </div>
  );
}
