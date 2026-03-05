import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  children: ReactNode;
  open: boolean;
  className?: string;
};

export default function Modal({ children, open, className = '' }: ModalProps) {
  const dialog = useRef<HTMLDialogElement | null>(null);
  useEffect(() => {
    if (!dialog.current) return;
    if (open) {
      dialog.current.showModal();
    } else dialog.current.close();
  }, [open]);

  const modalRoot = document.getElementById('modal');
  if (!modalRoot) return null;
  return createPortal(
    <dialog ref={dialog} className={`${className}`}>
      {children}
    </dialog>,
    modalRoot,
  );
}
