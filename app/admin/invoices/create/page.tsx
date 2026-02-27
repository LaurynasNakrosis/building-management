'use client';

import { AdminNav } from '@/app/components/AdminNav';
import Link from 'next/link';
import { useAdminAuth } from '../../useAdminAuth';
import Input from '@/app/components/formComponents/Input';

export default function CreateInvoicePage() {
  const { auth } = useAdminAuth();

  if (auth.status === 'loading') {
    return (
      <div className='min-h-screen flex items-center justify-center bg-zinc-900 text-white'>
        <p>Checking admin access...</p>
      </div>
    );
  }

  if (auth.status === 'unauthenticated') {
    return null;
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white'>
      <AdminNav />
      <div className=' pl-6 pt-24 md:pl-24'>
        <Link
          href='/admin'
          className=' flex items-center justify-center text-zinc-400 hover:text-white text-sm mb-6  w-full max-w-[10rem]'
        >
          ← Back to Admin
        </Link>
      </div>
      <div className=' max-w-8xl mx-auto text-center'>
        <h1 className='text-2xl font-bold mb-6'>Create Invoice</h1>
        <form action=''>
          <div className='m-6 md:flex border'>
            <div className='h-fit py-4  m-1 flex flex-col justify-center items-center border gap-4'>
              <h2>Clients Information:</h2>
              <Input
                id='clientsName'
                label='Clients Name'
                name='clientsName'
                type='clientsName'
              />
              <Input
                id='clientsEmail'
                label='Clients Email'
                name='clientsEmail'
                type='clientsEmail'
              />
              <Input
                id='clientsPhone'
                label='Clients Phone'
                name='clientsPhone'
                type='clientsPhone'
              />

              <h2>Clients Address:</h2>
              <Input
                id='clientsHouseNumber'
                label='Clients House Number'
                name='clientsHouseNumber'
                type='clientsHouseNumber'
              />
              <Input
                id='clientsRoadName'
                label='Clients Road Name '
                name='clientsRoadName'
                type='clientsRoadName'
              />
              <Input
                id='lientsCity'
                label='Clients City'
                name='clientsCity'
                type='clientsCity'
              />
              <Input
                id='clientsPostcode'
                label='Clients Postcode'
                name='clientsPostcode'
                type='clientsPostcode'
              />
              <Input
                id='clientsCountry'
                label='Clients Country'
                name='clientsCountry'
                type='clientsCountry'
              />
            </div>
            <div className='h-fit py-4 m-1 flex flex-col justify-center items-center border gap-4'>
              <h2>Site Address</h2>
              <Input
                id='siteHouseNumber'
                label='Site House Number'
                name='siteHouseNumber'
                type='siteHouseNumber'
              />
              <Input
                id='siteRoadName'
                label='Site Road Name '
                name='siteRoadName'
                type='siteRoadName'
              />
              <Input
                id='siteCity'
                label='Site City'
                name='siteCity'
                type='siteCity'
              />
              <Input
                id='sitePostcode'
                label='Site Postcode'
                name='sitePostcode'
                type='sitePostcode'
              />
              <Input
                id='siteCountry'
                label='Site Country'
                name='siteCountry'
                type='siteCountry'
              />
            </div>
            <div className='h-fit py-4 m-1 flex flex-col justify-center items-center border gap-4'>
              <h2>Job Dates</h2>
              <Input
                id='jobStartDate'
                label='Job Start Date'
                name='jobStartDate'
                type='date'
              />

              <Input
                id='jobFinishDate'
                label='Job Finish Date'
                name='jobFinishDate'
                type='date'
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
