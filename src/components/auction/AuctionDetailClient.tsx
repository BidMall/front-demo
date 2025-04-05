'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AuctionDetail } from '@/types/auction';
import AuctionHeader from '@/components/auction/AuctionHeader';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// 샘플 상세 데이터
const SAMPLE_DETAIL: AuctionDetail = {
  id: 1,
  title: '호보백',
  productId: 15,
  deadline: 'YY.MM.DD - YY.MM.DD',
  startPrice: 100000,
  currentPrice: 100000,
  status: 'ACTIVE',
  imageUrl: '/images/item1.jpeg',
  thumbnails: [
    '/images/item1.jpeg',
    '/images/item2.jpeg',
    '/images/item3.jpeg',
    '/images/item4.jpeg'
  ],
  description: '상품 소개에 대한 내용이 들어갑니다. 이 상품은 고품질 소재로 제작되었으며, 특별한 디자인이 특징입니다.',
  seller: '@ge_scout',
  bidCount: 0,
  likeCount: 0,
  isLiked: false
};

// 샘플 그래프 데이터
const generatePriceHistoryData = () => {
  const labels = ['1일차', '2일차', '3일차', '4일차', '5일차', '6일차', '7일차'];
  
  // 입찰 가격 시뮬레이션 (시작가부터 점차 상승)
  const prices = [100000, 101000, 101000, 105000, 105000, 105000, 108000];
  
  return {
    labels,
    datasets: [
      {
        label: '입찰가 추이',
        data: prices,
        borderColor: '#e67850',
        backgroundColor: 'rgba(230, 120, 80, 0.1)',
        fill: true,
        tension: 0.1,
        pointRadius: 3,
        pointBackgroundColor: '#e67850',
      },
    ],
  };
};

interface AuctionDetailClientProps {
  id: string;
}

export default function AuctionDetailClient({ id }: AuctionDetailClientProps) {
  const [detail, setDetail] = useState<AuctionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [bidMessage, setBidMessage] = useState('');
  const [priceHistoryData, setPriceHistoryData] = useState(generatePriceHistoryData());

  useEffect(() => {
    // 실제 구현에서는 API 호출로 대체
    const fetchDetail = async () => {
      setLoading(true);
      try {
        // API 호출 대신 샘플 데이터 사용
        setTimeout(() => {
          setDetail(SAMPLE_DETAIL);
          setIsLiked(SAMPLE_DETAIL.isLiked);
          setSelectedImage(SAMPLE_DETAIL.imageUrl);
          // 기본 입찰가는 현재가격보다 1000원 높게 설정
          setBidAmount(String(SAMPLE_DETAIL.currentPrice + 1000));
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Failed to fetch auction detail:', error);
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
    // 실제 구현에서는 API 호출로 좋아요 상태 변경
  };

  const handleBid = () => {
    setShowBidModal(true);
  };

  const handleCloseBidModal = () => {
    setShowBidModal(false);
  };

  const handleBidSubmit = () => {
    // 입찰 금액 검증
    if (!bidAmount || parseInt(bidAmount) <= (detail?.currentPrice || 0)) {
      setBidMessage('현재가보다 높은 금액을 입력해주세요.');
      return;
    }

    // 실제 구현에서는 API 호출로 입찰 처리
    alert(`${bidAmount}원 입찰이 완료되었습니다.`);
    setShowBidModal(false);

    // 입찰 성공 후 데이터 갱신 (실제 API 호출 대신 로컬에서 업데이트)
    if (detail) {
      const newDetail = {
        ...detail,
        currentPrice: parseInt(bidAmount),
        bidCount: detail.bidCount + 1
      };
      setDetail(newDetail);
      
      // 그래프 데이터 업데이트
      updatePriceHistoryGraph(parseInt(bidAmount));
    }
  };
  
  // 그래프 데이터 업데이트
  const updatePriceHistoryGraph = (newPrice: number) => {
    const newHistoryData = {...priceHistoryData};
    const newLabels = [...newHistoryData.labels, `${newHistoryData.labels.length + 1}일차`];
    const newPrices = [...newHistoryData.datasets[0].data, newPrice];
    
    newHistoryData.labels = newLabels;
    newHistoryData.datasets[0].data = newPrices;
    
    setPriceHistoryData(newHistoryData);
  };

  // 썸네일 클릭 시 메인 이미지 변경
  const handleThumbnailClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  // 차트 옵션
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: function(value: any) {
            return new Intl.NumberFormat('ko-KR', { 
              style: 'currency', 
              currency: 'KRW',
              maximumFractionDigits: 0 
            }).format(value);
          }
        },
        min: priceHistoryData?.datasets[0]?.data 
          ? Math.min(...priceHistoryData.datasets[0].data) * 0.95 
          : undefined
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e67850]"></div>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold">해당 경매 상품을 찾을 수 없습니다.</h2>
        <Link href="/main" className="mt-4 inline-block text-blue-600 hover:underline">
          경매 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return `KRW ${price.toLocaleString()}`;
  };

  return (
    <div className="bg-[#faf4ef] min-h-screen">
      <div className="container mx-auto px-4 py-5">
        {/* 헤더 */}
        <AuctionHeader />

        {/* 구분선 */}
        <div className="border-b border-gray-300 mb-8"></div>
        
        {/* 콘텐츠 */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* 이미지 영역 */}
          <div className="w-full md:w-1/2">
            <div className="relative aspect-square overflow-hidden bg-white rounded-md">
              <Image
                src={selectedImage || detail.imageUrl}
                alt={detail.title}
                fill
                className="object-cover"
              />
            </div>
            
            {/* 이미지 갤러리 (썸네일) */}
            <div className="grid grid-cols-4 gap-2 mt-2">
              {detail.thumbnails.map((thumbnail, index) => (
                <div 
                  key={index} 
                  className={`relative aspect-square bg-white rounded-md overflow-hidden cursor-pointer border-2 ${selectedImage === thumbnail ? 'border-[#e67850]' : 'border-transparent'}`}
                  onClick={() => handleThumbnailClick(thumbnail)}
                >
                  <Image
                    src={thumbnail}
                    alt={`${detail.title} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* 상세 정보 영역 */}
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-md p-6">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl font-bold">{detail.title}</h1>
                <div className="text-sm text-gray-500">{detail.seller}</div>
              </div>
              
              {/* 구분선 */}
              <div className="border-b border-dashed border-gray-300 my-4"></div>
              
              {/* 상품 ID */}
              <div className="flex justify-between py-3 border-b border-dashed border-gray-300">
                <div className="font-medium">제고</div>
                <div>{detail.productId}</div>
              </div>
              
              {/* 마감일 */}
              <div className="flex justify-between py-3 border-b border-dashed border-gray-300">
                <div className="font-medium">마감일</div>
                <div>{detail.deadline}</div>
              </div>
              
              {/* 시작가 */}
              <div className="flex justify-between py-3 border-b border-dashed border-gray-300">
                <div className="font-medium">시작가</div>
                <div>{formatPrice(detail.startPrice)}</div>
              </div>
              
              {/* 최고가 */}
              <div className="flex justify-between py-3 border-b border-dashed border-gray-300">
                <div className="font-medium">최고가</div>
                <div className="font-bold">{formatPrice(detail.currentPrice)}</div>
              </div>
              
              {/* 좋아요 & 입찰 버튼 */}
              <div className="flex mt-8 space-x-4">
                <button 
                  onClick={handleToggleLike}
                  className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill={isLiked ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                </button>
                <button 
                  onClick={handleBid}
                  className="flex-1 bg-gray-700 text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors"
                >
                  응찰하기
                </button>
              </div>
            </div>
            
            {/* 상품 소개 & 그래프 영역 */}
            <div className="mt-4 grid grid-cols-1 gap-4">
              <div className="bg-white rounded-md p-6">
                <h2 className="text-lg font-medium mb-3">상품 소개</h2>
                <p className="text-gray-700 text-sm">{detail.description}</p>
              </div>
              
              <div className="bg-white rounded-md p-6">
                <h2 className="text-lg font-medium mb-3">가격 추이</h2>
                <div className="h-60">
                  <Line options={chartOptions} data={priceHistoryData} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 입찰 모달 */}
        {showBidModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4 pointer-events-none">
            <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl border border-gray-200 pointer-events-auto">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold">구매하시겠습니까?</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">현재 최고가:</span>
                  <span className="font-medium">{formatPrice(detail.currentPrice)}</span>
                </div>
                
                <div>
                  <label htmlFor="bidAmount" className="block text-gray-600 mb-2">입찰가:</label>
                  <input
                    type="number"
                    id="bidAmount"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded"
                    placeholder="입력하세요"
                    min={detail.currentPrice + 1}
                  />
                  {bidMessage && (
                    <p className="text-red-500 text-sm mt-1">{bidMessage}</p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <button
                  onClick={handleCloseBidModal}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  취소
                </button>
                <button
                  onClick={handleBidSubmit}
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
                >
                  입찰하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 