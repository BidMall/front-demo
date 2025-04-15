/**
 * 경매 상품 타입
 */
export interface AuctionItem {
  id: number;
  title: string;
  currentDate: string;
  startPrice: number;
  currentPrice: number;
  status: 'ACTIVE' | 'ENDED' | 'SOLD';
  imageUrl: string;
}

/**
 * 경매 상품 상세 타입
 */
export interface AuctionDetail {
  id: number;
  title: string;
  productId: number;
  deadline: string;
  startPrice: number;
  currentPrice: number;
  status: 'ACTIVE' | 'ENDED' | 'SOLD';
  imageUrl: string;
  thumbnails: string[];
  description: string;
  seller: string;
  bidCount: number;
  likeCount: number;
  isLiked: boolean;
}

/**
 * 경매 필터 타입
 */
export interface AuctionFilter {
  type: 'LATEST' | 'ENDING_SOON';
  label: string;
}

/**
 * 경매 정렬 옵션 타입
 */
export interface SortOption {
  value: string;
  label: string;
}

/**
 * 경매 상태 옵션 타입
 */
export interface StatusOption {
  value: string;
  label: string;
} 