import Link from 'next/link';

const AuctionLogo = () => {
  return (
    <Link href="/main" className="inline-block">
      <div className="flex items-center">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 cursor-pointer">
          BIDMALL
        </h1>
      </div>
    </Link>
  );
};

export default AuctionLogo; 