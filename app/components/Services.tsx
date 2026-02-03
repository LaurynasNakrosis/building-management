import React from 'react'

interface ServicesProps {
  services: {
    name: string
    description: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  }[]
}

export default function Services({ services }: ServicesProps) {
  return (
    <div>
      {' '}
      <section className='py-24 sm:py-32 bg-zinc-900/50'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:text-center'>
            <h2 className='text-base font-semibold leading-7 text-lime-400 drop-shadow-[0_0_8px_rgba(163,230,53,0.4)]'>
              Our Services
            </h2>
            <p className='mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl font-display'>
              Comprehensive Building Solutions
            </p>
            <p className='mt-6 text-lg leading-8 text-zinc-300'>
              We provide end-to-end building management services to meet all
              your construction and maintenance needs.
            </p>
          </div>
          <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none'>
            <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4'>
              {services.map((service) => (
                <div key={service.name} className='flex flex-col'>
                  <dt className='flex items-center gap-x-3 text-base font-semibold leading-7 text-white'>
                    {React.createElement(service.icon, {
                      className:
                        'h-6 w-6 flex-none text-lime-400 drop-shadow-[0_0_8px_rgba(163,230,53,0.5)]',
                      'aria-hidden': 'true',
                    })}
                    {service.name}
                  </dt>
                  <dd className='mt-4 flex flex-auto flex-col text-sm leading-7 text-zinc-300'>
                    <p className='flex-auto'>{service.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </div>
  )
}
