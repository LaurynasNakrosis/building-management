import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatNumberWithDecimal = (num: number): string => {
  const [int, decimal] = num.toString().split('.');
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : int;
};

export const toSlug = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]+/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '');

export function generateInvoiceSlug(): string {
  const digits = '0123456789';
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomDigit = () => digits[Math.floor(Math.random() * 10)];
  const randomLetter = () => letters[Math.floor(Math.random() * 26)];
  return (
    'MB' +
    randomDigit() +
    randomDigit() +
    randomDigit() +
    randomDigit() +
    randomLetter() +
    randomLetter()
  );
}

export function formatInvoiceSlug(slug: string): string {
  return slug.replace(/([A-Za-z]+)(\d+)([A-Za-z]+)/, '$1 $2 $3');
}

export function formatDate(value?: Date | string) {
  if (!value) return '';
  const date = typeof value === 'string' ? new Date(value) : value;
  return date.toLocaleDateString();
}

export function formatCurrencyGBP(amount: number) {
  return `£${amount.toFixed(2)}`;
}
