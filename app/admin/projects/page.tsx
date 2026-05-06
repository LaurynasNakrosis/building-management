'use client';

import { AdminNav } from '@/app/components/AdminNav';
import Link from 'next/link';
import { useAdminAuth } from '../useAdminAuth';
import { useAdminProjects, type Project } from '@/app/admin/useAdminProjects';
import { useState } from 'react';
import Toast from '@/app/components/UI/Toast';
import ConfirmModal from '@/app/components/UI/ConfirmModal';
import ProjectPlaceholderCard from '@/app/components/UI/ProjectPlaceholderCard';
import AdminProjectCard from '@/app/components/UI/AdminProjectCard';

type ConfirmConfig = {
  title: string;
  description: React.ReactNode;
  confirmLabel?: string;
  onConfirm: () => void;
};
type ToastType = 'success' | 'error';
type ToastState = { message: string; type: ToastType } | null;

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
                  <ProjectPlaceholderCard
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
                    <ProjectPlaceholderCard
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
                    <ProjectPlaceholderCard
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
                  <div className='grid grid-cols-1 gap-4'>
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
                  <div className='grid grid-cols-1 gap-4'>
                    {remainingProjects
                      .filter((_, index) => index % 3 === 2)
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
