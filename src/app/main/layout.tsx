import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AUCTION | BidMall',
  description: 'Browse and bid on auction items',
};

export default function AuctionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#faf4ef] py-6 px-4">
      {children}
    </div>
  );
} 