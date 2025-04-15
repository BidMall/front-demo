// API 엔드포인트 기본 URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

/**
 * API 요청 함수
 * @param endpoint API 엔드포인트 경로
 * @param options fetch 옵션
 * @returns 응답 데이터
 */
export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    // 에러 응답 처리
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `API 요청 실패: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

/**
 * GET 요청 헬퍼 함수
 */
export function get<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  return fetchApi<T>(endpoint, { ...options, method: 'GET' });
}

/**
 * POST 요청 헬퍼 함수
 */
export function post<T>(
  endpoint: string,
  data?: any,
  options: RequestInit = {}
): Promise<T> {
  return fetchApi<T>(endpoint, {
    ...options,
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PUT 요청 헬퍼 함수
 */
export function put<T>(
  endpoint: string,
  data?: any,
  options: RequestInit = {}
): Promise<T> {
  return fetchApi<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * DELETE 요청 헬퍼 함수
 */
export function del<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  return fetchApi<T>(endpoint, { ...options, method: 'DELETE' });
} 