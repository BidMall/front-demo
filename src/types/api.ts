/**
 * 기본 API 응답 타입
 */
export interface ApiResponse {
  status: string;
  message: string;
}

/**
 * 페이지네이션 메타 정보
 */
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

/**
 * 페이지네이션이 포함된 응답 타입
 */
export interface PaginatedApiResponse<T> extends ApiResponse {
  data: T[];
  meta: PaginationMeta;
}

/**
 * 단일 데이터 응답 타입
 */
export interface DataResponse<T> extends ApiResponse {
  data: T;
} 