'use client';

import { useState } from 'react';
import AuctionHeader from '@/components/auction/AuctionHeader';
import AuctionFilter from '@/components/auction/AuctionFilter';
import AuctionList from '@/components/auction/AuctionList';
import { AuctionFilter as AuctionFilterType, SortOption, StatusOption } from '@/types/auction';

// 필터 옵션
const FILTER_OPTIONS: AuctionFilterType[] = [
  { type: 'LATEST', label: '최신순' },
  { type: 'ENDING_SOON', label: '마감임박순' },
];

// 정렬 옵션
const SORT_OPTIONS: SortOption[] = [
  { value: '', label: '선택하세요' },
];

// 상태 옵션
const STATUS_OPTIONS: StatusOption[] = [
  { value: '', label: '선택하세요' },
];

export default function MainPage() {
  const [activeFilter, setActiveFilter] = useState<'LATEST' | 'ENDING_SOON'>('LATEST');
  const [selectedSort, setSelectedSort] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  return (
    <div className="max-w-7xl mx-auto">
      <AuctionHeader />
      
      <div className="mt-8">
        <AuctionFilter 
          filterOptions={FILTER_OPTIONS}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          sortOptions={SORT_OPTIONS}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
          statusOptions={STATUS_OPTIONS}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />
      </div>
      
      <div className="mt-8">
        <AuctionList filterType={activeFilter} />
      </div>
    </div>
  );
} 