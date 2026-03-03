'use client';

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
  const [formValues, setFormValues] = useState<InvoiceFormValues>({
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
  });
  type JobItem = {
    description: string;
    quantity: number;
    rate: number;
    total: number;
  };
  const [jobItems, setJobItems] = useState<JobItem[]>([]);

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
        <form onSubmit={handleSubmit}>
          <div className='mb-10 px-4 lg:flex lg:justify-around  '>
            <div className='h-fit py-4  m-1 flex flex-col justify-center items-center border border-lime-400 rounded-lg gap-4'>
              <h2>Clients Information:</h2>
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

              <h2>Clients Address:</h2>
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
            <div className='flex flex-col'>
              <div className='h-fit py-4 m-1 flex flex-col justify-center items-center border border-lime-400 rounded-lg gap-4'>
                <h2>Site Address</h2>
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
              <div className=' py-4 m-1 flex flex-col justify-center items-center border border-lime-400 rounded-lg gap-4'>
                <h2>Job Dates</h2>
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
          <div className='mb-10 px-4 lg:flex lg:justify-around  '>
            <div className=' py-4 m-1 flex flex-col justify-center items-center border border-lime-400 rounded-lg  gap-4'>
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

              <button
                type='button'
                className='mt-2 px-4 py-2 border border-lime-400 rounded text-lime-300'
                onClick={handleAddJobItem}
              >
                + Add job
              </button>
            </div>
          </div>
          <div className=' w-[420px] lg:w-[385px] py-4 m-1 flex flex-col justify-center items-center border border-lime-400 rounded-lg  gap-4'>
            Log added items here ...
          </div>
          <p>
            <button>Reset</button>
            <button>Create</button>
          </p>
        </form>
      </div>
    </div>
  );
}
