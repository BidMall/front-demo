import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-800">
              BidMall Demo
            </Link>
          </div>
          
          <div className="flex space-x-6">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              홈
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              소개
            </Link>
            <Link 
              href="/api-test" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              API 테스트
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header; 