'use client';

import { TrashIcon } from '@heroicons/react/24/outline';

import { AdminNav } from '@/app/components/AdminNav';
import Link from 'next/link';
import { useAdminAuth } from '../../useAdminAuth';
import Input from '@/app/components/formComponents/Input';
import { useState } from 'react';
import { toSlug } from '@/lib/utils';

export default function CreateInvoicePage() {
  const { auth } = useAdminAuth();

  type InvoiceFormValues = {
    clientsName: string;
    clientsEmail: string;
    clientsPhone: string;
    clientsHouseNumber: string;
    clientsRoadName: string;
    clientsCity: string;
    clientsPostcode: string;
    clientsCountry: string;

    siteHouseNumber: string;
    siteRoadName: string;
    siteCity: string;
    sitePostcode: string;
    siteCountry: string;

    jobStartDate: string;
    jobFinishDate: string;
    itemDescription: string;
    itemQuantity: string;
    itemRate: string;
  };
  const initialFormValues: InvoiceFormValues = {
    clientsName: '',
    clientsEmail: '',
    clientsPhone: '',
    clientsHouseNumber: '',
    clientsRoadName: '',
    clientsCity: '',
    clientsPostcode: '',
    clientsCountry: '',

    siteHouseNumber: '',
    siteRoadName: '',
    siteCity: '',
    sitePostcode: '',
    siteCountry: '',

    jobStartDate: '',
    jobFinishDate: '',
    itemDescription: '',
    itemQuantity: '',
    itemRate: '',
  };
  const [formValues, setFormValues] =
    useState<InvoiceFormValues>(initialFormValues);
  type JobItem = {
    description: string;
    quantity: number;
    rate: number;
    total: number;
  };
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  function handleResetForm() {
    setFormValues(initialFormValues);
    setJobItems([]);
  }
  function handleAddJobItem() {
    const quantity = parseFloat(formValues.itemQuantity) || 0;
    const rate = parseFloat(formValues.itemRate) || 0;

    if (!formValues.itemDescription.trim() || quantity <= 0 || rate < 0) {
      return;
    }

    const total = quantity * rate;

    const newItem: JobItem = {
      description: formValues.itemDescription,
      quantity,
      rate,
      total,
    };

    setJobItems((prev) => [...prev, newItem]);
    setFormValues((prev) => ({
      ...prev,
      itemDescription: '',
      itemQuantity: '',
      itemRate: '',
    }));
  }
  function handleRemoveJobItem(indexToRemove: number) {
    setJobItems((prev) => prev.filter((_, index) => index !== indexToRemove));
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const quantity = parseFloat(formValues.itemQuantity) || 0;
    const rate = parseFloat(formValues.itemRate) || 0;
    const total = quantity * rate;

    const jobItems = [
      {
        description: formValues.itemDescription,
        quantity,
        rate,
        total,
      },
    ];

    const price = total;

    const payload = {
      name: formValues.clientsName || 'Untitled Invoice',
      slug: formValues.clientsName
        ? toSlug(formValues.clientsName)
        : `invoice-${Date.now()}`,
      price,

      businessAddress: {
        houseNumber: '',
        roadName: '',
        city: '',
        country: '',
        postCode: '',
      },
      businessContactInformation: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: {
          houseNumber: '',
          roadName: '',
          city: '',
          country: '',
          postCode: '',
        },
      },
      clientInformation: {
        firstName: formValues.clientsName,
        lastName: '',
        phone: formValues.clientsPhone,
        email: formValues.clientsEmail,
        address: {
          houseNumber: formValues.clientsHouseNumber,
          roadName: formValues.clientsRoadName,
          city: formValues.clientsCity,
          country: formValues.clientsCountry,
          postCode: formValues.clientsPostcode,
        },
      },
      jobAddress: {
        houseNumber: formValues.siteHouseNumber,
        roadName: formValues.siteRoadName,
        city: formValues.siteCity,
        country: formValues.siteCountry,
        postCode: formValues.sitePostcode,
      },

      jobStartDate: formValues.jobStartDate
        ? new Date(formValues.jobStartDate)
        : new Date(),
      jobFinishDate: formValues.jobFinishDate
        ? new Date(formValues.jobFinishDate)
        : new Date(),

      jobItems,
    };
    console.log('Invoice payload:', payload);
  }
  function handleInputChange(field: keyof InvoiceFormValues, value: string) {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  }
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
    <div className='px-4 lg:px-0 min-h-screen pb-20 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white'>
      <AdminNav />
      <div className=' pl-6 pt-24 md:pl-24'>
        <Link
          href='/admin'
          className=' flex items-center justify-center text-zinc-400 hover:text-white text-sm mb-6  w-full max-w-[10rem]'
        >
          ← Back to Admin
        </Link>
      </div>
      <div className=' max-w-5xl mx-auto lg:px-8'>
        <h1 className='text-2xl font-bold mb-8 text-center'>Create Invoice</h1>
        <form onSubmit={handleSubmit} className='space-y-8'>
          <section className='rounded-xl border border-lime-400/70 bg-zinc-900/60 p-6 shadow-sm space-y-4 '>
            <h2 className='text-lg font-semibold text-lime-300'>
              Client Information
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Input
                id='clientsName'
                label='Clients Name'
                name='clientsName'
                type='clientsName'
                value={formValues.clientsName}
                onChange={(e) =>
                  handleInputChange('clientsName', e.target.value)
                }
              />
              <Input
                id='clientsEmail'
                label='Clients Email'
                name='clientsEmail'
                type='clientsEmail'
                value={formValues.clientsEmail}
                onChange={(e) =>
                  handleInputChange('clientsEmail', e.target.value)
                }
              />
              <Input
                id='clientsPhone'
                label='Clients Phone'
                name='clientsPhone'
                type='clientsPhone'
                value={formValues.clientsPhone}
                onChange={(e) =>
                  handleInputChange('clientsPhone', e.target.value)
                }
              />
            </div>
            <div className='pt-2 border-t border-zinc-700/60 mt-2 space-y-4'>
              <h3 className='text-sm font-semibold text-lime-300'>
                Client Address
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Input
                  id='clientsHouseNumber'
                  label='Clients House Number'
                  name='clientsHouseNumber'
                  type='clientsHouseNumber'
                  value={formValues.clientsHouseNumber}
                  onChange={(e) =>
                    handleInputChange('clientsHouseNumber', e.target.value)
                  }
                />
                <Input
                  id='clientsRoadName'
                  label='Clients Road Name '
                  name='clientsRoadName'
                  type='clientsRoadName'
                  value={formValues.clientsRoadName}
                  onChange={(e) =>
                    handleInputChange('clientsRoadName', e.target.value)
                  }
                />
                <Input
                  id='lientsCity'
                  label='Clients City'
                  name='clientsCity'
                  type='clientsCity'
                  value={formValues.clientsCity}
                  onChange={(e) =>
                    handleInputChange('clientsCity', e.target.value)
                  }
                />
                <Input
                  id='clientsPostcode'
                  label='Clients Postcode'
                  name='clientsPostcode'
                  type='clientsPostcode'
                  value={formValues.clientsPostcode}
                  onChange={(e) =>
                    handleInputChange('clientsPostcode', e.target.value)
                  }
                />
                <Input
                  id='clientsCountry'
                  label='Clients Country'
                  name='clientsCountry'
                  type='clientsCountry'
                  value={formValues.clientsCountry}
                  onChange={(e) =>
                    handleInputChange('clientsCountry', e.target.value)
                  }
                />
              </div>
            </div>
          </section>

          <section className='rounded-xl border border-lime-400/70 bg-zinc-900/60 p-6 shadow-sm space-y-4'>
            <div className='grid lg:grid-cols-2 gap-6'>
              <div className='space-y-4'>
                <h2 className='text-lg font-semibold text-lime-300'>
                  Site Address
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <Input
                    id='siteHouseNumber'
                    label='Site House Number'
                    name='siteHouseNumber'
                    type='siteHouseNumber'
                    value={formValues.siteHouseNumber}
                    onChange={(e) =>
                      handleInputChange('siteHouseNumber', e.target.value)
                    }
                  />
                  <Input
                    id='siteRoadName'
                    label='Site Road Name '
                    name='siteRoadName'
                    type='siteRoadName'
                    value={formValues.siteRoadName}
                    onChange={(e) =>
                      handleInputChange('siteRoadName', e.target.value)
                    }
                  />
                  <Input
                    id='siteCity'
                    label='Site City'
                    name='siteCity'
                    type='siteCity'
                    value={formValues.siteCity}
                    onChange={(e) =>
                      handleInputChange('siteCity', e.target.value)
                    }
                  />
                  <Input
                    id='sitePostcode'
                    label='Site Postcode'
                    name='sitePostcode'
                    type='sitePostcode'
                    value={formValues.sitePostcode}
                    onChange={(e) =>
                      handleInputChange('sitePostcode', e.target.value)
                    }
                  />
                  <Input
                    id='siteCountry'
                    label='Site Country'
                    name='siteCountry'
                    type='siteCountry'
                    value={formValues.siteCountry}
                    onChange={(e) =>
                      handleInputChange('siteCountry', e.target.value)
                    }
                  />
                </div>
              </div>

              <div className='space-y-4'>
                <h2 className='text-lg font-semibold text-lime-300'>
                  Job Dates
                </h2>
                <div className='grid grid-cols-1 gap-4'>
                  <Input
                    id='jobStartDate'
                    label='Job Start Date'
                    name='jobStartDate'
                    type='date'
                    value={formValues.jobStartDate}
                    onChange={(e) =>
                      handleInputChange('jobStartDate', e.target.value)
                    }
                  />

                  <Input
                    id='jobFinishDate'
                    label='Job Finish Date'
                    name='jobFinishDate'
                    type='date'
                    value={formValues.jobFinishDate}
                    onChange={(e) =>
                      handleInputChange('jobFinishDate', e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </section>

          <section className='rounded-xl border border-lime-400/70 bg-zinc-900/60 p-6 shadow-sm space-y-4'>
            <h2 className='text-lg font-semibold text-lime-300'>
              Jobs or Tasks
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='md:col-span-3'>
                <Input
                  id='itemDescription'
                  label='Job description'
                  name='itemDescription'
                  type='text'
                  value={formValues.itemDescription}
                  onChange={(e) =>
                    handleInputChange('itemDescription', e.target.value)
                  }
                />
              </div>
              <Input
                id='itemQuantity'
                label='Quantity'
                name='itemQuantity'
                type='number'
                value={formValues.itemQuantity}
                onChange={(e) =>
                  handleInputChange('itemQuantity', e.target.value)
                }
              />
              <Input
                id='itemRate'
                label='Rate (£)'
                name='itemRate'
                type='number'
                value={formValues.itemRate}
                onChange={(e) => handleInputChange('itemRate', e.target.value)}
              />
              <div className='flex flex-col justify-end gap-1'>
                <span className='text-xs text-zinc-400 uppercase font-bold'>
                  Total
                </span>
                <div className='px-3 p-2 rounded-md border border-zinc-600 bg-zinc-800 text-white text-xs'>
                  £
                  {(
                    (parseFloat(formValues.itemQuantity) || 0) *
                    (parseFloat(formValues.itemRate) || 0)
                  ).toFixed(2)}
                </div>
              </div>
            </div>
            <div className='flex flex-col sm:flex-row sm:justify-end gap-3 pt-2 w-full'>
              <button
                type='button'
                className='w-full sm:w-auto px-4 py-3 sm:py-2.5 rounded-lg border border-lime-400 text-sm sm:text-[0.9rem] font-medium text-lime-300 hover:bg-lime-400/10 transition-colors'
                onClick={handleAddJobItem}
              >
                + Add job
              </button>
            </div>
          </section>

          <section className='rounded-xl border border-lime-400/70 bg-zinc-900/60 p-6 shadow-sm space-y-4'>
            <h2 className='font-semibold text-lime-300'>Logged job items</h2>

            {jobItems.length === 0 ? (
              <p className='text-zinc-400 text-sm'>No jobs added yet.</p>
            ) : (
              <>
                <ul className='w-full text-left text-sm space-y-2'>
                  {jobItems.map((item, index) => (
                    <li
                      key={index}
                      className='flex items-start justify-between border-b border-zinc-700 pb-2 last:border-b-0 last:pb-0'
                    >
                      <div className='font-medium text-zinc-200/80'>
                        {item.description}
                      </div>
                      <div className='text-zinc-400'>
                        {item.quantity} × £{item.rate.toFixed(2)} = £
                        {item.total.toFixed(2)}
                      </div>
                      <div>
                        <button
                          type='button'
                          onClick={() => handleRemoveJobItem(index)}
                          className='ml-3 text-xs text-red-400 hover:text-red-300'
                        >
                          <TrashIcon className='h-6 w-6' />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className='mt-4 flex justify-between items-center border-t border-zinc-700 pt-3 text-sm'>
                  <span className='text-zinc-400 font-medium'>Items total</span>
                  <span className='font-semibold text-lime-300'>
                    £
                    {jobItems
                      .reduce((sum, item) => sum + item.total, 0)
                      .toFixed(2)}
                  </span>
                </div>
              </>
            )}
          </section>
          <div className='flex flex-col sm:flex-row sm:justify-end gap-3 pt-2 w-full'>
            <button
              type='reset'
              className='w-full sm:w-auto px-4 py-3 sm:py-2.5 rounded-lg border border-zinc-600 text-sm sm:text-[0.9rem] text-zinc-200 hover:bg-zinc-800 transition-colors'
              onClick={handleResetForm}
            >
              Reset Form
            </button>
            <button
              type='submit'
              className='w-full sm:w-auto px-4 py-3 sm:py-2.5 rounded-lg border border-lime-400 bg-lime-400 text-sm sm:text-[0.9rem] font-semibold text-zinc-900 hover:bg-lime-300 hover:border-lime-300 transition-colors'
            >
              Create Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
