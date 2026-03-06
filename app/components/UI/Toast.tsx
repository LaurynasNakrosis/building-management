import React, { useEffect } from 'react';

type ToastType = 'success' | 'error';
type ToastProps = {
  open: boolean;
  message: string;
  type: ToastType;
  durationMs: number;
  onClose: () => void;
};

export default function Toast({
  open,
  message,
  type,
  durationMs = 1000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (!open) return;
    const id = setTimeout(onClose, durationMs);
    return () => clearTimeout(id);
  }, [open, durationMs, onClose]);

  if (!open) return null;
  const isSuccess = type === 'success';
  const fill = isSuccess ? 'rgba(6, 78, 59, 0.7)' : 'rgba(127, 29, 29, 0.7)'; // emerald-900/70, red-900/70
  const borderColor = isSuccess ? '#34d399' : '#f87171';
  return (
    <div
      className='
      fixed z-50
      inset-x-0 top-4 px-4 flex justify-center
      sm:inset-x-auto sm:top-auto sm:bottom-4 sm:right-4 sm:justify-end
    '
    >
      <div
        className={`max-w-lg w-full rounded-2xl px-10 py-6
          flex items-center gap-3 text-sm
          backdrop-blur-2xl
          border border-white/[0.12]
          shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)]
          ${
            type === 'success'
              ? 'bg-emerald-950/40 text-emerald-100'
              : 'bg-red-950/40 text-red-100'
          }`}
      >
        <div className='flex-1'>{message}</div>
        <button
          type='button'
          onClick={onClose}
          className={`shrink-0 text-sm font-medium px-3 py-1.5 rounded-md border transition-colors
            ${
              type === 'success'
                ? 'border-emerald-400/60 text-emerald-200 hover:bg-emerald-800/50'
                : 'border-red-400/60 text-red-200 hover:bg-red-800/50'
            }`}
          aria-label='Dismiss notification'
        >
          ×
        </button>
      </div>
    </div>
  );
}
