'use client';

import { useState } from 'react';
import { get } from '@/lib/api';

type ApiEndpoint = {
  name: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  description: string;
};

const API_ENDPOINTS: ApiEndpoint[] = [
  {
    name: '핑 테스트',
    path: '/api/ping',
    method: 'GET',
    description: '서버 연결 상태를 확인합니다.',
  },
  {
    name: '상태 확인',
    path: '/api/status',
    method: 'GET',
    description: '서버의 현재 상태를 반환합니다.',
  },
];

const ApiTester = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleEndpointSelect = (endpoint: ApiEndpoint) => {
    setSelectedEndpoint(endpoint);
    setResponse(null);
    setError(null);
  };

  const handleTestApi = async () => {
    if (!selectedEndpoint) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await get(selectedEndpoint.path);
      setResponse(data);
    } catch (err) {
      console.error('API 요청 오류:', err);
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">API 엔드포인트 선택</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {API_ENDPOINTS.map((endpoint) => (
            <button
              key={endpoint.path}
              onClick={() => handleEndpointSelect(endpoint)}
              className={`p-4 border rounded-lg text-left ${
                selectedEndpoint?.path === endpoint.path
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="font-medium">{endpoint.name}</div>
              <div className="text-sm text-gray-500 mt-1">{endpoint.path}</div>
              <div className="text-xs mt-2 text-gray-600">{endpoint.description}</div>
              <div className="mt-2">
                <span className={`text-xs font-bold px-2 py-1 rounded-full
                  ${endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                    endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                    endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'}`}
                >
                  {endpoint.method}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedEndpoint && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {selectedEndpoint.name}
          </h2>
          <div className="mb-4">
            <p className="text-gray-700 mb-2">엔드포인트: <span className="font-mono">{selectedEndpoint.path}</span></p>
            <p className="text-gray-700 mb-2">메서드: <span className="font-mono">{selectedEndpoint.method}</span></p>
            <p className="text-gray-700">{selectedEndpoint.description}</p>
          </div>
          
          <button
            onClick={handleTestApi}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? '요청 중...' : 'API 요청하기'}
          </button>
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
              <p className="font-medium">오류 발생</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          )}
          
          {response && (
            <div className="mt-4">
              <h3 className="font-medium text-gray-800 mb-2">응답 결과</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm whitespace-pre-wrap">
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ApiTester; 