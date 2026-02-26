'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AdminNav } from '../../components/AdminNav';
import { getInvoiceTotal } from '@/types/invoice';
import { useInvoice } from './useInvoice';
import { formatCurrencyGBP, formatDate } from '@/lib/utils';
import { AddressBlock } from '@/app/components/AddressBlock';
import ContactInfo from '@/app/components/ContactInfo';

export default function InvoiceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const invoiceState = useInvoice(slug);

  if (invoiceState.status === 'loading') {
    return (
      <div className='min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white flex items-center justify-center'>
        <p>Loading invoice...</p>
      </div>
    );
  }

  if (invoiceState.status === 'error') {
    return (
      <div className='min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white flex items-center justify-center flex-col gap-4'>
        <p className='text-red-400'>{invoiceState.error}</p>
        <Link href='/admin' className='text-blue-400 hover:text-blue-300'>
          ← Back to Admin
        </Link>
      </div>
    );
  }

  const invoice = invoiceState.data;
  const totalItems = getInvoiceTotal(invoice);

  return (
    <div className='min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white'>
      <AdminNav />
      <div className='container mx-auto px-4 py-24'>
        <Link
          href='/admin'
          className='inline-flex items-center gap-2 text-zinc-300 hover:text-zinc-100 mb-8'
        >
          <ArrowLeft className='w-5 h-5' />
          Back to Admin
        </Link>

        <div className='max-w-4xl mx-auto '>
          <div className='bg-zinc-800 border border-zinc-700 rounded-lg p-8  mt-10 text-center  bg-zinc-800/50 backdrop-blur-sm  text-sm  shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all duration-200 '>
            <div className='mb-8'>
              <h1 className='text-4xl font-bold mb-2'>{invoice.name}</h1>
              <p className='text-zinc-400'>Invoice #{invoice.slug}</p>
              {invoice.invoiceDate && (
                <p className='text-zinc-500 text-sm mt-2'>
                  Invoice Date: {formatDate(invoice.invoiceDate)}
                </p>
              )}
              {invoice.createdAt && (
                <p className='text-zinc-500 text-sm mt-2'>
                  Created: {formatDate(invoice.createdAt)}
                </p>
              )}
            </div>

            {/* Business Information */}
            <div className='  lg:flex gap-2 min-h-[320px] lg:min-h-[240px] xl:min-h-[280px] w-full'>
              <div className='flex-1 flex flex-col'>
                {(invoice.businessAddress ||
                  invoice.businessContactInformation) && (
                  <div className='mb-2 p-4 bg-zinc-800 rounded border border-zinc-700 text-left'>
                    {invoice.businessContactInformation && (
                      <div className='text-zinc-300 space-y-2 mb-2'>
                        <ContactInfo
                          title='Business Information'
                          firstName={
                            invoice.businessContactInformation.firstName
                          }
                          lastName={invoice.businessContactInformation.lastName}
                          email={invoice.businessContactInformation.email}
                          phone={invoice.businessContactInformation.phone}
                        />
                      </div>
                    )}
                    {invoice.businessAddress && (
                      <div>
                        <AddressBlock
                          title='Business Address:'
                          roadName={invoice.businessAddress.roadName}
                          houseNumber={invoice.businessAddress.houseNumber}
                          city={invoice.businessAddress.city}
                          postCode={invoice.businessAddress.postCode}
                          country={invoice.businessAddress.country}
                          className=''
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
              {/* Client Information */}
              <div className='flex-1 flex flex-col'>
                {invoice.clientInformation && (
                  <div className=' mb-8 p-4 bg-zinc-800 rounded border border-zinc-700 text-left'>
                    <div className='text-zinc-300 space-y-2 '>
                      <ContactInfo
                        title='Client Information'
                        firstName={invoice.clientInformation.firstName}
                        lastName={invoice.clientInformation.lastName}
                        email={invoice.clientInformation.email}
                        phone={invoice.clientInformation.phone}
                      />
                      <div>
                        <AddressBlock
                          title='Client Address'
                          houseNumber={
                            invoice.clientInformation.address.houseNumber
                          }
                          roadName={invoice.clientInformation.address.roadName}
                          city={invoice.clientInformation.address.city}
                          postCode={invoice.clientInformation.address.postCode}
                          country={invoice.clientInformation.address.country}
                          className=''
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Site Address */}
            <div className=' lg:flex gap-2 min-h-[120px] lg:min-h-[140px]  w-full'>
              <div className='flex-1 flex flex-col'>
                {invoice.jobAddress && (
                  <div className='h-[150px] mb-2 p-4 bg-zinc-800 rounded border border-zinc-700 text-left'>
                    <div className='text-zinc-300 space-y-1'>
                      <AddressBlock
                        title='Site Address:'
                        houseNumber={invoice.jobAddress.houseNumber}
                        roadName={invoice.jobAddress.roadName}
                        city={invoice.jobAddress.city}
                        postCode={invoice.jobAddress.postCode}
                        country={invoice.jobAddress.country}
                        className=''
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className='flex-1 flex flex-col'>
                {/* Job Dates */}
                {(invoice.jobStartDate || invoice.jobFinishDate) && (
                  <div className='h-[150px] mb-8 md:mb-0 p-4 bg-zinc-800 rounded border border-zinc-700 text-left'>
                    <h2 className='text-xl font-semibold mb-3'>Job Schedule</h2>
                    <div className='text-zinc-300 space-y-2'>
                      {invoice.jobStartDate && (
                        <p>
                          <span className='font-semibold'>Start Date:</span>{' '}
                          {formatDate(invoice.jobStartDate)}
                        </p>
                      )}
                      {invoice.jobFinishDate && (
                        <p>
                          <span className='font-semibold'>Finish Date:</span>{' '}
                          {formatDate(invoice.jobFinishDate)}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Job Items */}
            {invoice.jobItems && invoice.jobItems.length > 0 ? (
              <div className='mb-8'>
                <h2 className='text-xl font-semibold mb-4'>Job Items</h2>
                <div className='overflow-x-auto'>
                  <table className='w-full border-collapse'>
                    <thead>
                      <tr className='border-b border-zinc-700'>
                        <th className='text-left p-3 text-zinc-300'>
                          Description
                        </th>
                        <th className='text-right p-3 text-zinc-300'>Qty</th>
                        <th className='text-right p-3 text-zinc-300'>Rate</th>
                        <th className='text-right p-3 text-zinc-300'>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoice.jobItems.map((item, index) => (
                        <tr key={index} className='border-b border-zinc-700'>
                          <td className='p-3'>{item.description}</td>
                          <td className='p-3 text-right'>{item.quantity}</td>
                          <td className='p-3 text-right'>
                            {formatCurrencyGBP(item.rate)}
                          </td>
                          <td className='p-3 text-right'>
                            {formatCurrencyGBP(item.total)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className='border-t-2 border-zinc-600'>
                        <td
                          colSpan={3}
                          className='p-3 text-right font-semibold'
                        >
                          Total:
                        </td>
                        <td className='p-3 text-right font-bold text-lg'>
                          {formatCurrencyGBP(totalItems)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
