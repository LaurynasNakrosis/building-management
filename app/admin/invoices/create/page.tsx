'use client';

import { AdminNav } from '@/app/components/AdminNav';
import Link from 'next/link';
import { useAdminAuth } from '../../useAdminAuth';
import Input from '@/app/components/formComponents/Input';
import { useState } from 'react';

export default function CreateInvoicePage() {
  const { auth } = useAdminAuth();
  type InvoiceFormValues = {
    itemDescription: string;
    itemQuantity: string;
    itemRate: string;
  };
  const [formValues, setFormValues] = useState<InvoiceFormValues>({
    itemDescription: '',
    itemQuantity: '',
    itemRate: '',
  });

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
    <div className='min-h-screen pb-20 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white'>
      <AdminNav />
      <div className=' pl-6 pt-24 md:pl-24'>
        <Link
          href='/admin'
          className=' flex items-center justify-center text-zinc-400 hover:text-white text-sm mb-6  w-full max-w-[10rem]'
        >
          ← Back to Admin
        </Link>
      </div>
      <div className=' max-w-7xl mx-auto text-center'>
        <h1 className='text-2xl font-bold mb-6'>Create Invoice</h1>
        <form action=''>
          <div className='mb-10 lg:flex lg:justify-around  '>
            <div className='h-fit py-4  m-1 flex flex-col justify-center items-center border border-lime-400 rounded-lg gap-4'>
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
            <div className='flex flex-col'>
              <div className='h-fit py-4 m-1 flex flex-col justify-center items-center border border-lime-400 rounded-lg gap-4'>
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
              <div className=' py-4 m-1 flex flex-col justify-center items-center border border-lime-400 rounded-lg gap-4'>
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
          </div>
          <div className='mb-10 lg:flex lg:justify-around  '>
            <div className=' py-4 m-1 flex flex-col justify-center items-center border border-lime-400 rounded-lg  gap-4'>
              <Input
                id='itemDescription'
                label='Job description'
                name='itemDescription'
                type='text'
              />
              <Input
                id='itemQuantity'
                label='Quantity'
                name='itemQuantity'
                type='number'
              />
              <Input
                id='itemRate'
                label='Rate (£)'
                name='itemRate'
                type='number'
              />
              <div className='flex flex-col'>
                <span className='text-sm text-zinc-400 uppercase font-bold'>
                  Total
                </span>
                <div className='p-2 rounded border border-zinc-600 bg-zinc-800 text-white'>
                  £
                  {(
                    (parseFloat(formValues.itemQuantity) || 0) *
                    (parseFloat(formValues.itemRate) || 0)
                  ).toFixed(2)}
                </div>
              </div>
            </div>

            <div className='w-[420px] lg:w-[385px] py-4 m-1 flex flex-col justify-center items-center border border-lime-400 rounded-lg  gap-4'>
              Log added items here ...
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
