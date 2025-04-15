'use client';

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

const AuctionDetailClient = dynamic(() => import('@/components/auction/AuctionDetailClient'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center min-h-[300px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e67850]"></div>
    </div>
  )
});

export default function Page() {
  const params = useParams();
  const id = params.id as string;
  
  return <AuctionDetailClient id={id} />;
} 