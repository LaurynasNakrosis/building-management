'use client';

import { AdminNav } from '@/app/components/AdminNav';
import Link from 'next/link';
import { useAdminAuth } from '../useAdminAuth';
import { useAdminProjects, type Project } from '@/app/admin/useAdminProjects';
import { formatDate } from '@/lib/utils';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from 'lucide-react';
import { useState } from 'react';
import Toast from '@/app/components/UI/Toast';
import ConfirmModal from '@/app/components/UI/ConfirmModal';

type ConfirmConfig = {
  title: string;
  description: React.ReactNode;
  confirmLabel?: string;
  onConfirm: () => void;
};
type ToastType = 'success' | 'error';
type ToastState = { message: string; type: ToastType } | null;

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
            <PencilSquareIcon className='w-3.5 h-3.5' />
            Edit
          </button>
          <button
            type='button'
            onClick={onDeleteClick}
            disabled={isDeleting}
            className='flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-red-700/50 bg-red-900/30 hover:bg-red-800/60 text-red-400 hover:text-red-300 text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <TrashIcon className='w-3.5 h-3.5' />
            {isDeleting ? 'Deleting…' : 'Delete'}
          </button>
          <Link
            href={`/admin/projects/${project.slug}`}
            className='ml-auto text-xs text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-2'
          >
            View details
          </Link>
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
  const [confirmConfig, setConfirmConfig] = useState<ConfirmConfig | null>(
    null,
  );
  const [toast, setToast] = useState<ToastState>(null);

  if (auth.status === 'loading') {
    return (
      <div className='min-h-screen flex items-center justify-center bg-zinc-900 text-white'>
        <p>Checking admin access...</p>
      </div>
    );
  }

  function showToast(message: string, type: ToastType) {
    setToast({ message, type });
  }

  function handleDeleteClick(slug: string, title: string) {
    setConfirmConfig({
      title: 'Delete project?',
      description: (
        <>
          This will permanently delete <span>{title}</span> <br /> This action
          cannot be undone.
        </>
      ),
      confirmLabel: 'Yes delete',
      onConfirm: async () => {
        setConfirmConfig(null);
        try {
          await deleteProjectBySlug(slug);
          showToast('Project deleted.', 'success');
        } catch {
          showToast('Failed to delete project.', 'error');
        }
      },
    });
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
          {isLoadingProjects ? (
            <div className='rounded-xl border border-lime-400/30 bg-zinc-900/60 p-10 text-zinc-400 text-sm text-center'>
              Loading projects…
            </div>
          ) : state.status === 'error' ? (
            <div className='rounded-xl border border-red-500/50 bg-zinc-900/60 p-10 text-red-400 text-sm text-center'>
              {state.error}
            </div>
          ) : (
            <>
              <div className='grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2'>
                {featuredProject ? (
                  <AdminProjectCard
                    project={featuredProject}
                    imageClassName='aspect-[2/1]'
                    onEditClick={() => {}}
                    onDeleteClick={() =>
                      handleDeleteClick(
                        featuredProject.slug,
                        featuredProject.title,
                      )
                    }
                    isDeleting={isDeleting(featuredProject.slug)}
                  />
                ) : (
                  <PlaceholderCard
                    label='Featured Project'
                    imageClassName='aspect-[2/1]'
                  />
                )}
                {/* Top row — two stacked cards (right column) */}
                <div className='flex flex-col w-full gap-8'>
                  {/* Top row project ONE */}
                  {topRowProjectOne ? (
                    <AdminProjectCard
                      project={topRowProjectOne}
                      imageClassName='aspect-[3/1]'
                      onEditClick={() => {}}
                      onDeleteClick={() =>
                        handleDeleteClick(
                          topRowProjectOne.slug,
                          topRowProjectOne.title,
                        )
                      }
                      isDeleting={isDeleting(topRowProjectOne.slug)}
                    />
                  ) : (
                    <PlaceholderCard
                      label='Top Project 1'
                      imageClassName='aspect-[3/1]'
                    />
                  )}

                  {/* Top row project TWO */}
                  {topRowProjectTwo ? (
                    <AdminProjectCard
                      project={topRowProjectTwo}
                      imageClassName='aspect-[3/1]'
                      onEditClick={() => {}}
                      onDeleteClick={() =>
                        handleDeleteClick(
                          topRowProjectTwo.slug,
                          topRowProjectTwo.title,
                        )
                      }
                      isDeleting={isDeleting(topRowProjectTwo.slug)}
                    />
                  ) : (
                    <PlaceholderCard
                      label='Top Project 2'
                      imageClassName='aspect-[3/1]'
                    />
                  )}
                </div>
              </div>

              {/* Divider */}
              {remainingProjects.length > 0 && (
                <div className='hidden w-full h-px md:block bg-lime-300' />
              )}

              {/* Remaining projects — 3-column grid */}
              {remainingProjects.length > 0 && (
                <div className='grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3'>
                  <div className='grid grid-cols-1 gap-4'>
                    {remainingProjects
                      .filter((_, index) => index % 3 === 0)
                      .map((project) => (
                        <AdminProjectCard
                          key={project._id}
                          project={project}
                          imageClassName='aspect-[2/1]'
                          onEditClick={() => {}}
                          onDeleteClick={() =>
                            handleDeleteClick(project.slug, project.title)
                          }
                          isDeleting={isDeleting(project.slug)}
                        />
                      ))}
                  </div>
                  <div>
                    {remainingProjects
                      .filter((_, index) => index % 3 === 1)
                      .map((project) => (
                        <AdminProjectCard
                          key={project._id}
                          project={project}
                          imageClassName='aspect-[2/1]'
                          onEditClick={() => {}}
                          onDeleteClick={() =>
                            handleDeleteClick(project.slug, project.title)
                          }
                          isDeleting={isDeleting(project.slug)}
                        />
                      ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        {confirmConfig && (
          <ConfirmModal
            open={true}
            title={confirmConfig.title}
            description={confirmConfig.description}
            confirmLabel={confirmConfig.confirmLabel}
            cancelLabel='Cancel'
            onConfirm={confirmConfig.onConfirm}
            onCancel={() => setConfirmConfig(null)}
          />
        )}
        <Toast
          open={!!toast}
          message={toast?.message ?? ''}
          type={toast?.type ?? 'success'}
          durationMs={1800}
          onClose={() => setToast(null)}
        />
      </div>
    </div>
  );
}
