'use client';

import { useState, useEffect } from 'react';
import { AuctionItem as AuctionItemType } from '@/types/auction';
import AuctionItem from './AuctionItem';

interface AuctionListProps {
  filterType: 'LATEST' | 'ENDING_SOON';
}

// 샘플 데이터
const SAMPLE_ITEMS: AuctionItemType[] = [
  {
    id: 1,
    title: 'HEADING(제목영역)',
    currentDate: 'YY.MM.DD',
    startPrice: 100000,
    currentPrice: 100000,
    status: 'ACTIVE',
    imageUrl: '/images/item.jpg'
  },
  {
    id: 2,
    title: 'HEADING(제목영역)',
    currentDate: 'YY.MM.DD',
    startPrice: 100000,
    currentPrice: 100000,
    status: 'ACTIVE',
    imageUrl: '/images/item.jpg'
  },
  {
    id: 3,
    title: 'HEADING(제목영역)',
    currentDate: 'YY.MM.DD',
    startPrice: 100000,
    currentPrice: 100000,
    status: 'ACTIVE',
    imageUrl: '/images/item.jpg'
  },
  {
    id: 4,
    title: 'HEADING(제목영역)',
    currentDate: 'YY.MM.DD',
    startPrice: 100000,
    currentPrice: 100000,
    status: 'ACTIVE',
    imageUrl: '/images/item.jpg'
  },
  {
    id: 5,
    title: 'HEADING(제목영역)',
    currentDate: 'YY.MM.DD',
    startPrice: 100000,
    currentPrice: 100000,
    status: 'ACTIVE',
    imageUrl: '/images/item.jpg'
  },
  {
    id: 6,
    title: 'HEADING(제목영역)',
    currentDate: 'YY.MM.DD',
    startPrice: 100000,
    currentPrice: 100000,
    status: 'ACTIVE',
    imageUrl: '/images/item.jpg'
  }
];

const AuctionList: React.FC<AuctionListProps> = ({ filterType }) => {
  const [items, setItems] = useState<AuctionItemType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 실제 구현에서는 API 호출로 대체
    const fetchItems = async () => {
      setLoading(true);
      try {
        // 필터에 따라 다른 결과를 반환할 수 있음
        setTimeout(() => {
          setItems(SAMPLE_ITEMS);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Failed to fetch auction items:', error);
        setLoading(false);
      }
    };

    fetchItems();
  }, [filterType]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e67850]"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-14">
      {items.map(item => (
        <AuctionItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default AuctionList; 