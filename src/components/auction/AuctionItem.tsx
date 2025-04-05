'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AuctionItem as AuctionItemType } from '@/types/auction';

interface AuctionItemProps {
  item: AuctionItemType;
}

const AuctionItem: React.FC<AuctionItemProps> = ({ item }) => {
  const formatPrice = (price: number) => {
    return `KRW ${price.toLocaleString()}`;
  };

  return (
    <Link href={`/auction/${item.id}`} className="block">
      <div className="group">
        <div className="relative aspect-square overflow-hidden bg-gray-100 mb-3">
          <Image
            src="/images/item.jpg"
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
          <p className="text-sm text-gray-500 mb-2">{item.currentDate}</p>
          
          <div className="mt-1">
            <div className="flex justify-between">
              <span className="text-sm">시작가</span>
              <span className="text-sm">{formatPrice(item.startPrice)}</span>
            </div>
          </div>
          
          <div className="mt-1">
            <div className="flex justify-between">
              <span className="text-sm">현재가</span>
              <span className="text-sm font-semibold">{formatPrice(item.currentPrice)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AuctionItem; 