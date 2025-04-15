'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuctionLogo from '@/components/auction/AuctionLogo';

export default function SignUpPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [marketingAgreed, setMarketingAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    
    if (!termsAgreed) {
      alert('이용약관에 동의해주세요.');
      return;
    }
    
    setIsLoading(true);
    
    // 여기서 실제 회원가입 API 호출을 구현하세요
    try {
      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 성공 시 로그인 페이지로 이동
      router.push('/signin');
    } catch (error) {
      console.error('Signup failed:', error);
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
      
      {/* 회원가입 양식 */}
      <div className="flex-grow flex items-center justify-center bg-[#f5f5f5]">
        <div className="w-full max-w-md bg-gray-200 p-8 rounded-lg shadow-sm">
          <h1 className="text-center text-xl font-bold text-gray-900 mb-8">
            회원 정보를 입력하세요.
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full p-4 border-none bg-white rounded focus:outline-none"
                placeholder="아이디"
                required
              />
            </div>
            
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 border-none bg-white rounded focus:outline-none"
                placeholder="비밀번호"
                required
              />
            </div>
            
            <div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-4 border-none bg-white rounded focus:outline-none"
                placeholder="비밀번호 재입력"
                required
              />
            </div>
            
            <div className="pt-4 flex flex-col space-y-2">
              <div className="flex items-center justify-end">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={termsAgreed}
                    onChange={(e) => setTermsAgreed(e.target.checked)}
                    className="form-checkbox"
                  />
                  <span className="ml-2 text-sm text-gray-700">(필수) 이용약관 전체동의</span>
                </label>
              </div>
              
              <div className="flex items-center justify-end">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={marketingAgreed}
                    onChange={(e) => setMarketingAgreed(e.target.checked)}
                    className="form-checkbox"
                  />
                  <span className="ml-2 text-sm text-gray-700">(선택) 마케팅 수신 동의</span>
                </label>
              </div>
            </div>
            
            <div className="pt-8 flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-white text-gray-800 rounded hover:bg-gray-100 transition-colors"
              >
                {isLoading ? '처리 중...' : '다음으로'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 