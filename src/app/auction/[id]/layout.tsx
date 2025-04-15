import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '경매 상세 | BidMall',
  description: '경매 상품 상세 정보',
};

export default function AuctionDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#faf4ef]">
      {children}
    </div>
  );
} 