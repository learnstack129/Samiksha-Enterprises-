import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/gallery/images/logo.png" // Path relative to the public folder
        alt="Samiksha Enterprises Logo"
        width={40}  // Adjust width as needed
        height={40} // Adjust height as needed
        className="object-contain"
        priority // Ensures the logo loads quickly as it's a key branding element
      />
      <span className="font-bold text-xl text-primary hidden sm:block">
        Samiksha Enterprises
      </span>
    </Link>
  );
}
