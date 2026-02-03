import { CheckCircle } from 'lucide-react'
import React from 'react'

interface ServicesProps {
  features: string[]
}

export default function Services({ features }: ServicesProps) {
  return (
    <div>
      {' '}
      <section className='py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:mx-0'>
            <h2 className='text-3xl font-bold tracking-tight text-white sm:text-4xl font-display'>
              Why Choose{' '}
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-400'>
                Us
              </span>
            </h2>
            <p className='mt-6 text-lg leading-8 text-zinc-300'>
              We combine years of experience with modern techniques to deliver
              exceptional results for every project.
            </p>
          </div>
          <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl'>
            <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16'>
              {features.map((feature) => (
                <div key={feature} className='relative pl-16'>
                  <dt className='text-base font-semibold leading-7 text-white'>
                    <div className='absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 border border-lime-500/30 shadow-[0_0_12px_rgba(163,230,53,0.3)]'>
                      <CheckCircle
                        className='h-6 w-6 text-lime-400 drop-shadow-[0_0_8px_rgba(163,230,53,0.6)]'
                        aria-hidden='true'
                      />
                    </div>
                    {feature}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </div>
  )
}
