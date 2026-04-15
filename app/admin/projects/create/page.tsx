import { AdminNav } from '@/app/components/AdminNav';
import Link from 'next/link';

export default function CreateProjectPage() {
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
