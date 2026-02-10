'use client';

type AddressBlockProps = {
  title: string;
  houseNumber: string;
  roadName: string;
  city: string;
  postCode: string;
  country: string;
  className: string;
};

export function AddressBlock({
  title,
  houseNumber,
  roadName,
  city,
  postCode,
  country,
  className,
}: AddressBlockProps) {
  return (
    <div className={`text-zinc-300 space-y-1 ${className ?? ''}`}>
      <h1 className='text-xl font-semibold'>{title}</h1>
      <ul>
        <li>
          {houseNumber} {roadName}
        </li>
        <li>{city}</li>
        <li>{postCode}</li>
        <li>{country}</li>
      </ul>
    </div>
  );
}
