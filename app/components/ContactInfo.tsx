type ContactInfoProps = {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export default function ContactInfo({
  title,
  firstName,
  lastName,
  email,
  phone,
}: ContactInfoProps) {
  return (
    <div>
      <h2 className='text-xl font-semibold'>{title}</h2>
      <ul className='text-zinc-300 space-y-1'>
        <li>
          Contact: {firstName} {lastName}
        </li>
        <li>Email: {email}</li>
        <li className='font-semibold'>Phone: {phone}</li>
      </ul>
    </div>
  );
}
