import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="#home" className="flex flex-col">
      <span className="text-xl font-bold text-primary tracking-wide">
        Samiksha Enterprises
      </span>
      <span className="text-xs text-muted-foreground -mt-1">
        Run by Satish Jagadale
      </span>
    </Link>
  );
}
