import React from 'react';

type Props = React.ComponentPropsWithoutRef<'button'> & {
  children: React.ReactNode;
};

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, className, type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={`h-[60px] rounded-md bg-gradient-to-r from-lime-400 to-green-500 px-6 py-3 text-sm font-semibold text-zinc-900 shadow-lg shadow-lime-500/50 hover:shadow-lime-500/70 hover:from-lime-300 hover:to-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ${className ?? ''}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
export default Button;
