import Image from 'next/image';
import React from 'react';
import { allProjects } from '@/data/projects';
import { Navigation } from '../components/nav';
import { Card } from '../components/card';

export const revalidate = 60;

export default async function ProjectsPage() {
  const views = allProjects.reduce((acc, p) => {
    acc[p.slug] = 0;
    return acc;
  }, {} as Record<string, number>);

  const featured = allProjects.find(
    (project) => project.slug === 'haslemere-avenue-rear-extension'
  )!;

  const top2 = allProjects.find(
    (project) => project.slug === 'victorian-terrace-kitchen-renovation'
  )!;
  const top3 = allProjects.find(
    (project) => project.slug === 'luxury-bathroom-suite-installation'
  )!;
  const sorted = allProjects
    .filter((p) => p.published)
    .filter(
      (project) =>
        project.slug !== featured.slug &&
        project.slug !== top2.slug &&
        project.slug !== top3.slug
    )
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime()
    );

  return (
    <div className='relative pb-16'>
      <Navigation />
      <div className='px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32'>
        <div className='max-w-2xl mx-auto lg:mx-0'>
          <h2 className='text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl'>
            Projects
          </h2>
          <p className='mt-4 text-zinc-400'>
            Here you'll find a mix of professional projects and personal
            creations, showcasing a range of design and construction expertise.
          </p>
        </div>
        <div className='w-full h-px bg-lime-300' />

        <div className='grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 '>
          <Card>
            <div>
              <article className='relative w-full h-full'>
                <div className='w-full'>
                  {featured.picture &&
                    (featured.picture.includes('google.com') ? (
                      <img
                        src={featured.picture}
                        alt={featured.title}
                        className='rounded-lg object-cover w-full aspect-[2/1] object-center'
                        style={{
                          width: '100%',
                          height: 'auto',
                          maxHeight: 300,
                        }}
                      />
                    ) : (
                      <Image
                        src={featured.picture}
                        alt={featured.title}
                        width={1200}
                        height={600}
                        className='rounded-lg object-cover w-full aspect-[2/1]'
                        style={{
                          width: '100%',
                          height: 'auto',
                          maxHeight: 300,
                        }}
                        sizes='(max-width: 768px) 100vw, 50vw'
                        priority
                      />
                    ))}
                </div>
                <div className='text-xs text-zinc-100 pt-4'>
                  {featured.date ? (
                    <time dateTime={new Date(featured.date).toISOString()}>
                      {Intl.DateTimeFormat(undefined, {
                        dateStyle: 'medium',
                      }).format(new Date(featured.date))}
                    </time>
                  ) : (
                    <span>SOON</span>
                  )}
                </div>
                <h2
                  id='featured-post'
                  className='mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display'
                >
                  {featured.title}
                </h2>
                <p className='mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300'>
                  {featured.description}
                </p>
              </article>
            </div>
          </Card>
          {/* this is the second and third project */}
          <div className='flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0 '>
            {[top2, top3].map((project) => (
              <Card key={project.slug}>
                <div>
                  <article className='relative w-full h-full '>
                    <div className='w-full'>
                      <img
                        src={project.picture}
                        alt={project.title}
                        width={600}
                        height={200}
                        className='rounded-lg object-cover w-full aspect-[3/1]'
                      />
                    </div>
                    <div className='text-xs text-zinc-100 pt-4'>
                      {project.date ? (
                        <time dateTime={new Date(project.date).toISOString()}>
                          {Intl.DateTimeFormat(undefined, {
                            dateStyle: 'medium',
                          }).format(new Date(project.date))}
                        </time>
                      ) : (
                        <span>SOON</span>
                      )}
                    </div>
                    <h2 className='mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display'>
                      {project.title}
                    </h2>
                    <p className='mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300'>
                      {project.description}
                    </p>
                  </article>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <div className='hidden w-full h-px md:block bg-lime-300' />

        <div className='grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3'>
          {/* first row */}
          <div className='grid grid-cols-1  gap-4'>
            {sorted
              .filter((_, i) => i % 3 === 0)
              .map((project) => (
                <Card key={project.slug}>
                  <img
                    src={project.picture}
                    alt={project.title}
                    width={1200}
                    height={600}
                    className='rounded-lg object-cover w-full aspect-[2/1]'
                  />
                  <div className='text-xs text-zinc-100'>
                    {project.date ? (
                      <time dateTime={new Date(project.date).toISOString()}>
                        {Intl.DateTimeFormat(undefined, {
                          dateStyle: 'medium',
                        }).format(new Date(project.date))}
                      </time>
                    ) : (
                      <span>SOON</span>
                    )}
                  </div>
                  <h2 className='mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display'>
                    {project.title}
                  </h2>
                  <p className='mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300'>
                    {project.description}
                  </p>
                </Card>
              ))}
          </div>
          {/* second row */}
          <div className='grid grid-cols-1 gap-4'>
            {sorted
              .filter((_, i) => i % 3 === 1)
              .map((project) => (
                <Card key={project.slug}>
                  <img
                    src={project.picture}
                    alt={project.title}
                    width={1200}
                    height={600}
                    className='rounded-lg object-cover w-full aspect-[2/1]'
                  />
                  <div className='text-xs text-zinc-100'>
                    {project.date ? (
                      <time dateTime={new Date(project.date).toISOString()}>
                        {Intl.DateTimeFormat(undefined, {
                          dateStyle: 'medium',
                        }).format(new Date(project.date))}
                      </time>
                    ) : (
                      <span>SOON</span>
                    )}
                  </div>
                  <h2 className='mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display'>
                    {project.title}
                  </h2>
                  <p className='mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300'>
                    {project.description}
                  </p>
                </Card>
              ))}
          </div>
          {/* third row */}
          <div className='grid grid-cols-1 gap-4'>
            {sorted
              .filter((_, i) => i % 3 === 2)
              .map((project) => (
                <Card key={project.slug}>
                  <img
                    src={project.picture}
                    alt={project.title}
                    width={1200}
                    height={600}
                    className='rounded-lg object-cover w-full aspect-[2/1]'
                  />
                  <div className='text-xs text-zinc-100'>
                    {project.date ? (
                      <time dateTime={new Date(project.date).toISOString()}>
                        {Intl.DateTimeFormat(undefined, {
                          dateStyle: 'medium',
                        }).format(new Date(project.date))}
                      </time>
                    ) : (
                      <span>SOON</span>
                    )}
                  </div>
                  <h2 className='mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display'>
                    {project.title}
                  </h2>
                  <p className='mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300'>
                    {project.description}
                  </p>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
