'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LikedItem {
  id: number;
  title: string;
  imageUrl: string;
  isLiked: boolean;
}

// 더미 데이터
const SAMPLE_ITEMS: LikedItem[] = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  title: '전시명칭',
  imageUrl: '/images/item.jpg',
  isLiked: true
}));

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<'exhibitions' | 'auctions' | null>(null);
  const [likedItems, setLikedItems] = useState<LikedItem[]>(SAMPLE_ITEMS);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [username, setUsername] = useState('');

  const handleLikeToggle = (id: number) => {
    setLikedItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, isLiked: !item.isLiked } : item
      )
    );
  };

  const handleShowLikes = () => {
    setShowDeleteForm(false);
  };

  const handleDeleteProfile = () => {
    setShowDeleteForm(true);
  };

  const handleDeleteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (confirm('정말로 프로필을 삭제하시겠습니까?')) {
      alert('프로필이 삭제되었습니다.');
      // 여기에서 실제 프로필 삭제 API 호출
      setShowDeleteForm(false);
    }
  };

  // 현재 탭에 맞는 하단 설명 텍스트
  const getDescription = () => {
    if (activeTab === 'exhibitions') {
      return '전시회 목록';
    } else if (activeTab === 'auctions') {
      return '경매 목록';
    } else {
      return '좋아요 목록';
    }
  };

  // 삭제 화면 렌더링
  const renderDeleteForm = () => {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="flex flex-col items-center justify-center">
          <div className="w-32 h-32 bg-gray-400 rounded-full flex items-center justify-center mb-6">
            <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center">
              <div className="text-white text-3xl font-bold">ㅇㅅㅇ</div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-2">그만두시나요?</h2>
          
          <form onSubmit={handleDeleteSubmit} className="w-full mt-6">
            <div className="mb-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="@입력하세요..."
                className="w-full p-3 border border-gray-300 bg-gray-100 rounded"
                required
              />
            </div>
            
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                탈퇴하기
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f9f1ea]">
      {/* 헤더 */}
      <div className="bg-[#f9f1ea] p-4 border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/main">
            <div className="cursor-pointer">
              <h1 className="text-3xl md:text-4xl font-black text-gray-900">
                BIDMALL
              </h1>
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
      
      {/* 마이페이지 컨텐츠 */}
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-10">MY PAGE</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* 좌측 사이드바 */}
          <div className="w-full md:w-1/4">
            <div className="space-y-6">
              <button 
                onClick={handleShowLikes}
                className={`block w-full text-left py-2 ${!showDeleteForm ? 'border-b-2 border-black font-bold' : ''} cursor-pointer`}
              >
                Likes<br />
                <span className="text-sm text-gray-500">좋아요 목록</span>
              </button>
              
              <button 
                onClick={handleDeleteProfile}
                className={`block w-full text-left py-2 ${showDeleteForm ? 'border-b-2 border-black font-bold' : ''}`}
              >
                Delete Profile<br />
                <span className="text-sm text-gray-500">프로필 삭제하기</span>
              </button>
            </div>
          </div>
          
          {/* 메인 콘텐츠 */}
          <div className="w-full md:w-3/4">
            {showDeleteForm ? (
              renderDeleteForm()
            ) : (
              <>
                <div className="bg-gray-700 text-white rounded-t-lg">
                  <div className="flex">
                    <div className="py-4 px-6 font-bold">
                      LIKES
                    </div>
                    <button 
                      onClick={() => setActiveTab('exhibitions')}
                      className={`py-4 px-6 transition-colors ${activeTab === 'exhibitions' ? 'font-bold bg-gray-800' : 'hover:bg-gray-600'}`}
                    >
                      Exhibitions
                    </button>
                    <button 
                      onClick={() => setActiveTab('auctions')}
                      className={`py-4 px-6 transition-colors ${activeTab === 'auctions' ? 'font-bold bg-gray-800' : 'hover:bg-gray-600'}`}
                    >
                      Auctions
                    </button>
                  </div>
                  <div className="px-6 pb-4 text-sm">
                    {getDescription()}
                  </div>
                </div>
                
                <div className="bg-gray-700 p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {likedItems.map((item) => (
                      <div key={item.id} className="bg-white relative">
                        <div className="relative aspect-square">
                          <Image 
                            src={item.imageUrl} 
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-2">
                          <div className="text-sm text-gray-500">전시명칭/컬렉션명</div>
                          <div className="font-medium">{item.title}</div>
                        </div>
                        <button 
                          onClick={() => handleLikeToggle(item.id)}
                          className="absolute top-2 right-2 p-1 bg-white bg-opacity-70 rounded-full"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 