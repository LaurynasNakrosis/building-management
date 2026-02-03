import Link from 'next/link'
import React from 'react'

export default function Cta() {
  return (
    <div>
      {' '}
      <section className='py-24 sm:py-32 bg-zinc-900/50'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-white sm:text-4xl font-display'>
              Ready to Start Your{' '}
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-400 drop-shadow-[0_0_15px_rgba(163,230,53,0.5)]'>
                Project
              </span>
              ?
            </h2>
            <p className='mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-300'>
              Get in touch with us today to discuss your building management
              needs. We're here to help bring your vision to life.
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <Link
                href='/contact'
                className='rounded-md bg-gradient-to-r from-lime-400 to-green-500 px-6 py-3 text-sm font-semibold text-zinc-900 shadow-lg shadow-lime-500/50 hover:shadow-lime-500/70 hover:from-lime-300 hover:to-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 transition-all duration-200'
              >
                Contact Us
              </Link>
              <Link
                href='/projects'
                className='text-sm font-semibold leading-6 text-lime-400 hover:text-lime-300 transition-colors duration-200 drop-shadow-[0_0_8px_rgba(163,230,53,0.4)]'
              >
                View Portfolio <span aria-hidden='true'>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
