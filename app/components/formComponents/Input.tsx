import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  id: string;
  type: string;
};

export default function Input({ label, id, ...props }: Props) {
  return (
    <div className='w-full flex flex-col gap-1 text-white'>
      <label
        htmlFor={id}
        className='block text-[0.75rem] mb-0.5 text-[#9bafaf] uppercase font-semibold tracking-wide'
      >
        {label}
      </label>
      <input
        id={id}
        {...props}
        className='block w-full rounded-md border border-[#758a8a] bg-[#869999] px-3 py-2 text-sm text-[#142020] placeholder:text-[#5c7373] focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400 transition-shadow'
      />
    </div>
  );
}
