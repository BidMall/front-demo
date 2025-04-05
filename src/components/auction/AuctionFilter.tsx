'use client';

import { AuctionFilter as AuctionFilterType, SortOption, StatusOption } from '@/types/auction';

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
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
      {/* 최신순/마감임박순 필터 */}
      <div className="flex">
        <button
          className={`px-8 py-3 text-sm font-medium rounded-l-full border-[1px] border-r-0 border-gray-300 ${
            activeFilter === 'LATEST' ? 'bg-[#e67850] text-white border-[#e67850]' : 'bg-transparent text-gray-700'
          }`}
          onClick={() => onFilterChange('LATEST')}
        >
          최신순
        </button>
        <button
          className={`px-8 py-3 text-sm font-medium rounded-r-full border-[1px] border-gray-300 ${
            activeFilter === 'ENDING_SOON' ? 'bg-[#e67850] text-white border-[#e67850]' : 'bg-transparent text-gray-700'
          }`}
          onClick={() => onFilterChange('ENDING_SOON')}
        >
          마감임박순
        </button>
      </div>
      
      <div className="flex-grow"></div>
      
      {/* 검색 필드 */}
      <div className="relative w-full sm:w-72">
        <input
          type="text"
          placeholder="검색"
          className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#e67850]"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
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
    </div>
  );
};

export default AuctionFilter; 