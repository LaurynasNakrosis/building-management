import React from 'react';

type Props = {
  label: string;
  name: string;
  id: string;
  type: string;
};

export default function Input({ label, id, ...props }: Props) {
  return (
    <div className='mx-4 flex flex-col items-start text-white'>
      <label
        htmlFor={id}
        className='block text-[0.8rem] mb-0.5 text-[#9bafaf] uppercase font-bold'
      >
        {label}
      </label>
      <input
        className=' block w-[25rem] max-w-[22rem] p-2 text-base rounded border border-[#758a8a] bg-[#869999] text-[#142020]'
        id={id}
        {...props}
      />
    </div>
  );
}
