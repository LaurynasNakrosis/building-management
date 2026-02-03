import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import pic1 from '@/public/Logo1.jpeg'
import pic3 from '@/public/Logo3.jpeg'
import pic4 from '@/public/Logo4.png'

export default function Hero() {
  return (
    <div>
      {' '}
      <section className='relative px-6 pt-32 pb-20 mx-auto max-w-7xl lg:px-8 lg:pt-40'>
        <div className='flex flex-col lg:flex-row items-center justify-center'>
          <div className='flex justify-evenly'>
            <img
              className=' -p-10 '
              src={pic4.src}
              alt=''
              height={300}
              width={300}
            />
          </div>
          <span className='flex flex-col items-center lg:items-start  text-4xl font-bold tracking-tight text-zinc-300 sm:text-6xl lg:text-7xl font-display'>
            Professional
            <span className=' py-4 block  tex-from-lime-400 text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-500'>
              Building & Management
            </span>
            Services
          </span>
        </div>
        <div className='mx-auto max-w-3xl text-center'>
          <p className='mt-6 text-lg leading-8 text-zinc-300 sm:text-xl'>
            Your trusted partner for construction, maintenance, and property
            management. Delivering excellence in every project with expertise,
            reliability, and quality.
          </p>
          <div className='mt-10 flex items-center justify-center gap-x-6'>
            <Link
              href='/projects'
              className='rounded-md bg-gradient-to-r from-lime-400 to-green-500 px-6 py-3 text-sm font-semibold text-zinc-900 shadow-lg shadow-lime-500/50 hover:shadow-lime-500/70 hover:from-lime-300 hover:to-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 transition-all duration-200 flex items-center gap-2'
            >
              View Our Projects
              <ArrowRight className='w-4 h-4' />
            </Link>
            <Link
              href='/contact'
              className='text-sm font-semibold leading-6 text-lime-400 hover:text-lime-300 transition-colors duration-200 drop-shadow-[0_0_8px_rgba(163,230,53,0.4)]'
            >
              Get in Touch <span aria-hidden='true'>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
