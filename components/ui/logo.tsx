import Image from 'next/image';

export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Image 
        src="/logo.png" // Path relative to the public folder
        alt="Logo"
        width={120} // Equivalent to w-40
        height={50} // Equivalent to h-15
        className="h-12 w-40"
      />
    </div>
  );
}