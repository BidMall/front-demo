'use client';

import ApiTester from '@/components/api/ApiTester';

export default function ApiTestPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">API 테스트</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <p className="text-gray-600 mb-4">
          이 페이지에서는 백엔드 API를 직접 테스트할 수 있습니다. 
          각 API 엔드포인트에 대한 요청을 보내고 응답을 확인할 수 있습니다.
        </p>
      </div>
      
      <ApiTester />
    </div>
  );
} 