import Link from 'next/link';

type PlaceholderProps = {
  label: string;
  imageClassName?: string;
};

export default function ProjectPlaceholderCard({
  label,
  imageClassName = '',
}: PlaceholderProps) {
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
