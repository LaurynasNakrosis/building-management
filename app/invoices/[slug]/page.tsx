'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AdminNav } from '../../components/AdminNav';
import { getInvoiceTotal } from '@/types/invoice';
import { useInvoice } from './useInvoice';

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
          <div className='bg-zinc-800 border border-zinc-700 rounded-lg p-8  mt-8 text-center  bg-zinc-800/50 backdrop-blur-sm  text-sm  shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all duration-200 '>
            <div className='mb-8'>
              <h1 className='text-4xl font-bold mb-2'>{invoice.name}</h1>
              <p className='text-zinc-400'>Invoice #{invoice.slug}</p>
              {invoice.invoiceDate && (
                <p className='text-zinc-500 text-sm mt-2'>
                  Invoice Date:{' '}
                  {new Date(invoice.invoiceDate).toLocaleDateString()}
                </p>
              )}
              {invoice.createdAt && (
                <p className='text-zinc-500 text-sm mt-2'>
                  Created: {new Date(invoice.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>

            <div className='  lg:flex gap-2 min-h-[320px] lg:min-h-[240px] xl:min-h-[280px] w-full'>
              <div className='flex-1 flex flex-col'>
                {/* Business Information */}
                {(invoice.businessAddress ||
                  invoice.businessContactInformation) && (
                  <div className='mb-8 p-4 bg-zinc-900 rounded border border-zinc-700 text-left'>
                    <h2 className='text-xl font-semibold mb-3'>
                      Business Information
                    </h2>
                    {invoice.businessContactInformation && (
                      <div className='text-zinc-300 space-y-2 mb-4'>
                        <p>
                          <span className='font-semibold'>Contact:</span>{' '}
                          {invoice.businessContactInformation.firstName}{' '}
                          {invoice.businessContactInformation.lastName}
                        </p>
                        <p>
                          <span className='font-semibold'>Email:</span>{' '}
                          {invoice.businessContactInformation.email}
                        </p>
                        <p>
                          <span className='font-semibold'>Phone:</span>{' '}
                          {invoice.businessContactInformation.phone}
                        </p>
                      </div>
                    )}
                    {invoice.businessAddress && (
                      <div className='text-zinc-300'>
                        <p className='font-semibold mb-1'>Business Address:</p>
                        <p>
                          {invoice.businessAddress.houseNumber}{' '}
                          {invoice.businessAddress.roadName}
                        </p>
                        <p>
                          {invoice.businessAddress.city},{' '}
                          {invoice.businessAddress.postCode}
                        </p>
                        <p>{invoice.businessAddress.country}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className='flex-1 flex flex-col'>
                {/* Client Information */}
                {invoice.clientInformation && (
                  <div className=' mb-8 p-4 bg-zinc-900 rounded border border-zinc-700 text-left'>
                    <h2 className='text-xl font-semibold mb-3'>
                      Client Information
                    </h2>
                    <div className='text-zinc-300 space-y-2 mb-4'>
                      <p>
                        <span className='font-semibold'>Name:</span>{' '}
                        {invoice.clientInformation.firstName}{' '}
                        {invoice.clientInformation.lastName}
                      </p>
                      <p>
                        <span className='font-semibold'>Email:</span>{' '}
                        {invoice.clientInformation.email}
                      </p>
                      <p>
                        <span className='font-semibold'>Phone:</span>{' '}
                        {invoice.clientInformation.phone}
                      </p>
                      <div className='mt-3'>
                        <p className='font-semibold mb-1'>Address:</p>
                        <p>
                          {invoice.clientInformation.address.houseNumber}{' '}
                          {invoice.clientInformation.address.roadName}
                        </p>
                        <p>
                          {invoice.clientInformation.address.city},{' '}
                          {invoice.clientInformation.address.postCode}
                        </p>
                        <p>{invoice.clientInformation.address.country}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className=' lg:flex gap-2 min-h-[120px] lg:min-h-[140px]  w-full'>
              {/* Job Address */}
              <div className='flex-1 flex flex-col'>
                {invoice.jobAddress && (
                  <div className='h-[150px] mb-8 p-4 bg-zinc-900 rounded border border-zinc-700 text-left'>
                    <h2 className='text-xl font-semibold mb-3'>Job Address</h2>
                    <div className='text-zinc-300 space-y-1'>
                      <p>
                        {invoice.jobAddress.houseNumber}{' '}
                        {invoice.jobAddress.roadName}
                      </p>
                      <p>
                        {invoice.jobAddress.city}, {invoice.jobAddress.postCode}
                      </p>
                      <p>{invoice.jobAddress.country}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className='flex-1 flex flex-col'>
                {/* Job Dates */}
                {(invoice.jobStartDate || invoice.jobFinishDate) && (
                  <div className='h-[142px] mb-8 p-4 bg-zinc-900 rounded border border-zinc-700 text-left'>
                    <h2 className='text-xl font-semibold mb-3'>Job Schedule</h2>
                    <div className='text-zinc-300 space-y-2'>
                      {invoice.jobStartDate && (
                        <p>
                          <span className='font-semibold'>Start Date:</span>{' '}
                          {new Date(invoice.jobStartDate).toLocaleDateString()}
                        </p>
                      )}
                      {invoice.jobFinishDate && (
                        <p>
                          <span className='font-semibold'>Finish Date:</span>{' '}
                          {new Date(invoice.jobFinishDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Job Items (new structure) */}
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
                            £{item.rate.toFixed(2)}
                          </td>
                          <td className='p-3 text-right'>
                            £{item.total.toFixed(2)}
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
                          £{totalItems.toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            ) : invoice.items && invoice.items.length > 0 ? (
              // Legacy items display
              <div className='mb-8'>
                <h2 className='text-xl font-semibold mb-4'>Items</h2>
                <div className='overflow-x-auto'>
                  <table className='w-full border-collapse'>
                    <thead>
                      <tr className='border-b border-zinc-700'>
                        <th className='text-left p-3 text-zinc-300'>
                          Description
                        </th>
                        <th className='text-right p-3 text-zinc-300'>
                          Quantity
                        </th>
                        <th className='text-right p-3 text-zinc-300'>
                          Unit Price
                        </th>
                        <th className='text-right p-3 text-zinc-300'>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoice.items.map((item, index) => (
                        <tr key={index} className='border-b border-zinc-700'>
                          <td className='p-3'>{item.description}</td>
                          <td className='p-3 text-right'>{item.quantity}</td>
                          <td className='p-3 text-right'>
                            £{item.unitPrice.toFixed(2)}
                          </td>
                          <td className='p-3 text-right'>
                            £{item.total.toFixed(2)}
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
                          £{totalItems.toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            ) : (
              <div className='mb-8 p-4 bg-zinc-900 rounded border border-zinc-700'>
                <p className='text-zinc-300 text-lg font-semibold'>
                  Total: £{invoice.price.toFixed(2)}
                </p>
              </div>
            )}
            {/* Legacy address (for backward compatibility) */}
            {invoice.address && !invoice.clientInformation && (
              <div className='mb-8 p-4 bg-zinc-900 rounded border border-zinc-700'>
                <h2 className='text-xl font-semibold mb-3'>Billing Address</h2>
                <div className='text-zinc-300 space-y-1'>
                  {invoice.address.street && <p>{invoice.address.street}</p>}
                  {(invoice.address.city ||
                    invoice.address.state ||
                    invoice.address.zipCode) && (
                    <p>
                      {invoice.address.city}
                      {invoice.address.city && invoice.address.state && ', '}
                      {invoice.address.state} {invoice.address.zipCode}
                    </p>
                  )}
                  {invoice.address.country && <p>{invoice.address.country}</p>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
