'use client';

import { TrashIcon } from '@heroicons/react/24/outline';

import { AdminNav } from '@/app/components/AdminNav';
import Link from 'next/link';
import { useAdminAuth } from '../../useAdminAuth';
import Input from '@/app/components/formComponents/Input';
import { useState } from 'react';
import { toSlug } from '@/lib/utils';
import Modal from '@/app/components/UI/Modal';
import ConfirmModal from '@/app/components/UI/ConfirmModal';
import { createInvoice } from '@/lib/actions/invoice.actions';
import Toast from '@/app/components/UI/Toast';

export default function CreateInvoicePage() {
  const { auth } = useAdminAuth();

  const FIELD_LABELS: Record<string, string> = {
    clientsName: 'Client name',
    clientsSurname: 'Client surname',
    clientsEmail: 'Client email',
    clientsPhone: 'Client phone',
    clientsHouseNumber: 'Client house number',
    clientsRoadName: 'Client road name',
    clientsCity: 'Client city',
    clientsPostcode: 'Client postcode',
    clientsCountry: 'Client country',
    siteHouseNumber: 'Site house number',
    siteRoadName: 'Site road name',
    siteCity: 'Site city',
    sitePostcode: 'Site postcode',
    siteCountry: 'Site country',
    jobStartDate: 'Job start date',
    jobFinishDate: 'Job finish date',
  };

  function getMissingRequiredFields(): string[] {
    const missing: string[] = [];
    if (
      !formValues.clientsName?.trim() ||
      formValues.clientsName.trim().length < 3
    ) {
      missing.push(FIELD_LABELS.clientsName);
    }
    if (!formValues.clientsSurname?.trim())
      missing.push(FIELD_LABELS.clientsSurname);
    if (!formValues.clientsEmail?.trim())
      missing.push(FIELD_LABELS.clientsEmail);
    if (!formValues.clientsPhone?.trim())
      missing.push(FIELD_LABELS.clientsPhone);
    if (!formValues.clientsHouseNumber?.trim())
      missing.push(FIELD_LABELS.clientsHouseNumber);
    if (!formValues.clientsRoadName?.trim())
      missing.push(FIELD_LABELS.clientsRoadName);
    if (!formValues.clientsCity?.trim()) missing.push(FIELD_LABELS.clientsCity);
    if (!formValues.clientsPostcode?.trim())
      missing.push(FIELD_LABELS.clientsPostcode);
    if (!formValues.clientsCountry?.trim())
      missing.push(FIELD_LABELS.clientsCountry);
    if (!formValues.siteHouseNumber?.trim())
      missing.push(FIELD_LABELS.siteHouseNumber);
    if (!formValues.siteRoadName?.trim())
      missing.push(FIELD_LABELS.siteRoadName);
    if (!formValues.siteCity?.trim()) missing.push(FIELD_LABELS.siteCity);
    if (!formValues.sitePostcode?.trim())
      missing.push(FIELD_LABELS.sitePostcode);
    if (!formValues.siteCountry?.trim()) missing.push(FIELD_LABELS.siteCountry);
    if (!formValues.jobStartDate?.trim())
      missing.push(FIELD_LABELS.jobStartDate);
    if (!formValues.jobFinishDate?.trim())
      missing.push(FIELD_LABELS.jobFinishDate);
    return missing;
  }

  type InvoiceFormValues = {
    clientsName: string;
    clientsSurname: string;
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
    clientsSurname: '',
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

  type ConfirmConfig = {
    title: string;
    description: React.ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
  };

  type JobItem = {
    description: string;
    quantity: number;
    rate: number;
    total: number;
  };
  type ToastType = 'success' | 'error';

  type ToastState = {
    message: string;
    type: ToastType;
  } | null;

  const [formValues, setFormValues] =
    useState<InvoiceFormValues>(initialFormValues);
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [jobFieldError, setJobFieldError] = useState<string | null>(null);
  const [confirmConfig, setConfirmConfig] = useState<ConfirmConfig | null>(
    null,
  );
  const [toast, setToast] = useState<ToastState>(null);

  const isJobInvalid =
    !formValues.itemDescription.trim() ||
    !formValues.itemQuantity ||
    !formValues.itemRate;

  function openConfirm(config: ConfirmConfig) {
    setConfirmConfig(config);
  }

  function closeConfirm() {
    setConfirmConfig(null);
  }

  function handleResetForm() {
    setFormValues(initialFormValues);
    setJobItems([]);
  }

  function handleResetClick() {
    openConfirm({
      title: 'Reset form?',
      description: (
        <>
          This will clear all fields and logged job items.
          <br />
          Are you sure you want to reset?
        </>
      ),
      confirmLabel: 'Yes, reset',
      cancelLabel: 'Cancel',
      onConfirm: () => {
        handleResetForm();
        closeConfirm();
      },
    });
  }

  function handleAddJobItem() {
    const quantity = parseFloat(formValues.itemQuantity) || 0;
    const rate = parseFloat(formValues.itemRate) || 0;

    if (!formValues.itemDescription.trim()) {
      setJobFieldError('Please enter a job description.');
    }
    if (quantity <= 0) {
      setJobFieldError('Quantity must be greater than zero.');
      return;
    }
    if (rate < 0) {
      setJobFieldError('Rate can not be negative');
      return;
    }
    setJobFieldError(null);

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
    showToast('Job item added successfully.', 'success');
  }

  function handleDeleteJobClick(index: number) {
    const item = jobItems[index];
    if (!item) return;

    openConfirm({
      title: 'Remove job item?',
      description: (
        <>
          This will delete:
          <br />
          <span className='font-medium text-zinc-200'>{item.description}</span>
          <br />
          <span className='text-zinc-400 text-sm'>
            {item.quantity} × £{item.rate.toFixed(2)} = £{item.total.toFixed(2)}
          </span>
        </>
      ),
      confirmLabel: 'Yes, remove',
      cancelLabel: 'Cancel',
      onConfirm: () => {
        setJobItems((prev) => prev.filter((_, i) => i !== index));
        closeConfirm();
        showToast('Job item removed.', 'success');
      },
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (jobItems.length === 0) {
      showToast(
        'Please add at least one job item before creating the invoice.',
        'error',
      );
      return;
    }
    const missingFields = getMissingRequiredFields();
    if (missingFields.length > 0) {
      const message =
        missingFields.length === 1
          ? `Please fill in: ${missingFields[0]}.`
          : `Please fill in: ${missingFields.join(', ')}.`;
      showToast(message, 'error');
      const firstKey = Object.entries(FIELD_LABELS).find(([, label]) =>
        missingFields.includes(label),
      )?.[0];
      if (firstKey && typeof document !== 'undefined') {
        const el = document.getElementById(firstKey);
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const price = jobItems.reduce((sum, item) => sum + item.total, 0);

    const payload = {
      name: formValues.clientsName || 'Untitled Invoice',
      slug: formValues.clientsName
        ? toSlug(formValues.clientsName)
        : `invoice-${Date.now()}`,
      price,

      invoiceDate: new Date(),

      businessContactInformation: undefined as never,

      clientInformation: {
        firstName: formValues.clientsName,
        lastName: formValues.clientsSurname,
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
    try {
      await createInvoice(payload);
      showToast('Invoice created successfully.', 'success');
      handleResetForm();
    } catch (err) {
      console.error(err);
      showToast('Failed to create invoice. Please try again.', 'error');
    }
    const { businessContactInformation: _, ...payloadWithoutBusiness } =
      payload;

    console.log('Invoice payload:', payload);
  }

  function handleInputChange(field: keyof InvoiceFormValues, value: string) {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  }

  function showToast(message: string, type: ToastType) {
    setToast({ message, type });
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
                id='clientsSurname'
                label='Clients Surname'
                name='clientsSurname'
                type='clientsSurname'
                value={formValues.clientsSurname}
                onChange={(e) =>
                  handleInputChange('clientsSurname', e.target.value)
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
            {jobFieldError && (
              <p className='text-sm text-red-400 mt-1'>{jobFieldError}</p>
            )}
            <div className='flex flex-col sm:flex-row sm:justify-end gap-3 pt-2 w-full'>
              <button
                type='button'
                className={`'w-full sm:w-auto px-4 py-3 sm:py-2.5 rounded-lg border border-lime-400 text-sm sm:text-[0.9rem] font-medium text-lime-300 hover:bg-lime-400/10 transition-colors'
                  ${isJobInvalid ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleAddJobItem}
                disabled={isJobInvalid}
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
                        <span className='text-lime-400'>{item.quantity}</span> ×
                        £{item.rate.toFixed(2)} = £{item.total.toFixed(2)}
                      </div>

                      <div>
                        <button
                          type='button'
                          onClick={() => handleDeleteJobClick(index)}
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
              onClick={handleResetClick}
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

      {confirmConfig && (
        <ConfirmModal
          open={true}
          title={confirmConfig.title}
          description={confirmConfig.description}
          confirmLabel={confirmConfig.confirmLabel}
          cancelLabel={confirmConfig.cancelLabel}
          onConfirm={confirmConfig.onConfirm}
          onCancel={closeConfirm}
        />
      )}
      {toast && (
        <Toast
          open={true}
          message={toast.message}
          type={toast.type}
          durationMs={2000}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
