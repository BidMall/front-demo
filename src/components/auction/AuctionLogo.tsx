import Link from 'next/link';

const AuctionLogo = () => {
  return (
    <Link href="/main" className="inline-block group">
      <div className="flex items-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl cursor-pointer relative font-sans">
          <span className="font-black text-gray-900 tracking-tighter">BID</span>
          <span className="font-black text-[#e67850] tracking-tight relative -ml-0.5">MALL</span>
        </h1>
      </div>
    </Link>
  );
};

export default AuctionLogo; 