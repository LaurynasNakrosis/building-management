import { Project } from '@/app/admin/useAdminProjects';
import { formatDate } from '@/lib/utils';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type AdminProjectCardProps = {
  project: Project;
  imageClassName: string;
  onEditClick: () => void;
  onDeleteClick: () => void;
  isDeleting: boolean;
};

export default function AdminProjectCard({
  project,
  imageClassName,
  onEditClick,
  onDeleteClick,
  isDeleting,
}: AdminProjectCardProps) {
  const [imgError, setImgError] = useState(false);
  const hasImage = !imgError && project.picture && project.picture.length > 0;
  return (
    <div className='p-4 overflow-hidden relative duration-700 border rounded-xl hover:bg-zinc-800/10 group md:gap-8 hover:border-zinc-400/50 border-zinc-600'>
      <article className='relative w-full h-full'>
        {hasImage ? (
          <img
            src={project.picture![0]}
            alt={project.title}
            onError={() => setImgError(true)}
            className={`rounded-lg object-cover w-full ${imageClassName}`}
          />
        ) : (
          <div
            className={`rounded-lg w-full ${imageClassName} bg-zinc-800 border border-dashed border-zinc-600 flex items-center justify-center`}
          >
            <span className='text-zinc-600 text-xs'>
              {imgError ? 'Image unavailable' : 'No image'}
            </span>
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
