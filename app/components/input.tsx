import React, { ReactNode } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: string
  label?: string
}
const classes =
  'h-[70px] md:h-12 text-stone-800 w-[18rem] md:w-full p-3 md:p-1 border-b-2 rounded-md border-lime-200 bg-stone-400 placeholder:text-stone-600 placeholder:italic focus:outline-none focus:border-lime-600'
export default function Input({ children, label, ...props }: InputProps) {
  return (
    <p className=' gap-2 flex flex-col my-4'>
      <label className='text-sm font-bold uppercase text-stone-800'>
        {label}
      </label>
      <input className={classes} placeholder={children} {...props} />
    </p>
  )
}
