import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AuctionHeader = () => {
  const router = useRouter();
  
  const handleMenuClick = () => {
    router.push('/mypage');
  };
  
  return (
    <div className="flex justify-between items-center">
      <Link href="/main">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 cursor-pointer transition-colors duration-300 hover:text-[#e67850]">
          AUCTION
        </h1>
      </Link>
      <div className="flex items-center space-x-4">
        <Link 
          href="/signin" 
          className="text-sm font-medium hover:underline"
        >
          SIGN IN
        </Link>
        <Link 
          href="/signup" 
          className="text-sm font-medium hover:underline"
        >
          JOIN US
        </Link>
        <button 
          onClick={handleMenuClick}
          className="flex flex-col justify-center space-y-1 cursor-pointer"
        >
          <div className="h-0.5 w-5 bg-black"></div>
          <div className="h-0.5 w-5 bg-black"></div>
          <div className="h-0.5 w-5 bg-black"></div>
        </button>
      </div>
    </div>
  );
};

export default AuctionHeader; 