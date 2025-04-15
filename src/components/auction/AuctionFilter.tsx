'use client';

import { AuctionFilter as AuctionFilterType, SortOption, StatusOption } from '@/types/auction';
import { useState } from 'react';

interface AuctionFilterProps {
  filterOptions: AuctionFilterType[];
  activeFilter: 'LATEST' | 'ENDING_SOON';
  onFilterChange: (filter: 'LATEST' | 'ENDING_SOON') => void;
  sortOptions: SortOption[];
  selectedSort: string;
  onSortChange: (value: string) => void;
  statusOptions: StatusOption[];
  selectedStatus: string;
  onStatusChange: (value: string) => void;
}

const AuctionFilter: React.FC<AuctionFilterProps> = ({
  activeFilter,
  onFilterChange,
  statusOptions,
  selectedStatus,
  onStatusChange
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // 여기에 검색 기능 구현
    console.log('검색어:', searchTerm);
    // 검색 로직 추가
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* 메뉴바 */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => onFilterChange('LATEST')}
            className={`py-3 px-3 font-medium text-base border-b-2 min-w-[100px] text-center ${
              activeFilter === 'LATEST'
                ? 'border-[#e67850] text-[#e67850]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            최신 상품
          </button>
          <button
            onClick={() => onFilterChange('ENDING_SOON')}
            className={`py-3 px-3 font-medium text-base border-b-2 min-w-[100px] text-center ${
              activeFilter === 'ENDING_SOON'
                ? 'border-[#e67850] text-[#e67850]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            마감 임박 상품
          </button>
        </nav>
      </div>
      
      {/* 필터링 옵션 */}
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {/* 경매 상태 필터 */}
          <div className="relative w-full sm:w-44">
            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-300 rounded-full px-4 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-[#e67850]"
            >
              <option value="">경매상태</option>
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          
          {/* 검색 필드 */}
          <div className="relative w-full flex-grow">
            <input
              type="text"
              placeholder="검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-full px-4 py-2 pr-10 focus:outline-none focus:ring-1 focus:ring-[#e67850]"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="검색"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-[#e67850]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* 안내 문구 */}
        <p className="text-sm text-gray-500 ml-3">원하는 상품을 검색해 보세요!</p>
      </div>
    </div>
  );
};

export default AuctionFilter; 