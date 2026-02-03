import React from 'react'

const Button = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; onClick?: () => void }
>(({ children, onClick }, ref) => {
  return (
    <div
      ref={ref}
      onClick={onClick}
      className='h-[60px] rounded-md bg-gradient-to-r from-lime-400 to-green-500 px-6 py-3 text-sm font-semibold text-zinc-900 shadow-lg shadow-lime-500/50 hover:shadow-lime-500/70 hover:from-lime-300 hover:to-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer'
    >
      {children}
    </div>
  )
})

Button.displayName = 'Button'

export default Button
