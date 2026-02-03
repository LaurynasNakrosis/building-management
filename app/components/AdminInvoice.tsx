import Link from 'next/link'
import React from 'react'

type Invoice = {
  _id: string
  name: string
  price: number
  slug: string
  items?: Array<{
    description: string
    quantity: number
    unitPrice: number
    total: number
  }>
  address?: {
    street?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
  }
  createdAt?: Date
  updatedAt?: Date
}

export default function AdminInvoice({ invoices }: { invoices: Invoice[] }) {
  if (invoices.length === 0) {
    return (
      <div className='text-center py-8'>
        <p className='text-zinc-400'>No invoices to display</p>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '>
      {invoices.map((invoice) => (
        <div
          key={invoice._id}
          className='backdrop-blur-sm text-blue-400 hover:text-blue-300  text-sm shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]  transition-all duration-200 border border-zinc-600/30 rounded-lg border-zinc-700 bg-zinc-800 p-6 flex flex-col'
        >
          <div className='flex-1'>
            <h3 className='text-xl font-bold mb-2 text-white'>
              {invoice.name}
            </h3>
            <p className='text-zinc-400 mb-4'>
              Price: ${invoice.price.toFixed(2)}
            </p>

            {invoice.items && invoice.items.length > 0 && (
              <div className='mb-4'>
                <h4 className='text-sm font-semibold text-zinc-300 mb-2'>
                  Items:
                </h4>
                <div className='space-y-2'>
                  {invoice.items.map((item, index) => (
                    <div key={index} className='text-sm text-zinc-400'>
                      <p>{item.description}</p>
                      <p className='text-xs'>
                        {item.quantity} × ${item.unitPrice.toFixed(2)} = $
                        {item.total.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {invoice.address && (
              <div className='mb-4'>
                <h4 className='text-sm font-semibold text-zinc-300 mb-2'>
                  Address:
                </h4>
                <div className='text-sm text-zinc-400'>
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

            {invoice.createdAt && (
              <p className='text-xs text-zinc-500 mt-4'>
                Created: {new Date(invoice.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>

          <Link
            href={`/invoices/${invoice.slug}`}
            className='rounded-full mt-4 text-center p-4 bg-gradient-to-br from-zinc-800/30 via-zinc-700/20 to-zinc-800/30 backdrop-blur-lg text-lime-400 hover:text-lime-300 hover:from-zinc-800/40 hover:via-zinc-700/30 hover:to-zinc-800/40 text-sm shadow-[0_8px_32px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.25),inset_0_-1px_1px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.6),0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.3),inset_0_-1px_1px_rgba(0,0,0,0.3)] transition-all duration-300 border border-white/20 hover:border-white/30'
          >
            View Details →
          </Link>
        </div>
      ))}
    </div>
  )
}
