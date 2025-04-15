'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuctionLogo from '@/components/auction/AuctionLogo';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // 여기서 실제 로그인 API 호출을 구현하세요
    try {
      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 성공 시 메인 페이지로 이동
      router.push('/main');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 헤더 */}
      <div className="bg-[#f9f1ea] p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/main">
            <div className="cursor-pointer">
              <AuctionLogo />
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            <Link 
              href="/signin" 
              className="text-sm font-medium"
            >
              SIGN IN
            </Link>
            <Link 
              href="/signup" 
              className="text-sm font-medium"
            >
              JOIN US
            </Link>
            <button className="flex flex-col justify-center space-y-1">
              <div className="h-0.5 w-5 bg-black"></div>
              <div className="h-0.5 w-5 bg-black"></div>
              <div className="h-0.5 w-5 bg-black"></div>
            </button>
          </div>
        </div>
      </div>
      
      {/* 로그인 양식 */}
      <div className="flex-grow flex items-center justify-center bg-[#d35d33]">
        <div className="w-full max-w-md px-6">
          <h1 className="text-center text-2xl md:text-3xl font-bold text-white mb-10">
            SIGN IN!
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 border-none bg-gray-200 rounded focus:outline-none"
                placeholder="이메일"
                required
              />
            </div>
            
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 border-none bg-gray-200 rounded focus:outline-none"
                placeholder="비밀번호"
                required
              />
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full p-4 bg-gray-200 rounded text-gray-800 font-medium hover:bg-gray-300 transition-colors"
              >
                {isLoading ? '로그인 중...' : '로그인'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <Link href="/signup" className="text-white hover:underline">
              계정이 없으신가요? 가입하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 