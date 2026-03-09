'use client';

import { ReactNode } from 'react';
import Modal from '@/app/components/UI/Modal';

type ConfirmModalProps = {
  open: boolean;
  title: string;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  className?: string;
};

export default function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  className = '',
}: ConfirmModalProps) {
  return (
    <Modal
      open={open}
      className={`rounded-xl bg-zinc-900 text-white p-6 max-w-sm w-full border border-lime-400 ${className}`}
    >
      <h2 className='text-lg font-semibold mb-2'>{title}</h2>
      {description && (
        <div className='text-sm text-zinc-300 mb-4'>{description}</div>
      )}
      <div className='flex flex-col sm:flex-row gap-3 justify-end'>
        <button
          type='button'
          onClick={onCancel}
          className='w-full sm:w-auto px-4 py-2 rounded-md border border-zinc-600 text-sm text-zinc-200 hover:bg-zinc-800'
        >
          {cancelLabel}
        </button>
        <button
          type='button'
          onClick={onConfirm}
          className='w-full sm:w-auto px-4 py-2 rounded-md border border-red-500 bg-red-500 text-sm font-semibold text-white hover:bg-red-400 hover:border-red-400'
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
