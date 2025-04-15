import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | BidMall Demo",
  description: "BidMall Demo 프로젝트 소개 페이지",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">프로젝트 소개</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">BidMall Demo 프로젝트</h2>
        <p className="text-gray-600 mb-4">
          이 프로젝트는 모던 웹 애플리케이션 개발 스택을 활용한 데모 애플리케이션입니다.
          프론트엔드와 백엔드를 분리하여 개발하고, RESTful API를 통해 통신하는 구조로 설계되었습니다.
        </p>
        <p className="text-gray-600">
          각 기술 스택의 특징을 활용하여 효율적이고 확장 가능한 애플리케이션을 구현하는 것을 목표로 합니다.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">기술 스택</h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-medium text-gray-800">프론트엔드</h3>
              <ul className="list-disc list-inside text-gray-600 ml-2">
                <li>Next.js - React 프레임워크</li>
                <li>React - UI 컴포넌트 라이브러리</li>
                <li>TypeScript - 정적 타입 지원</li>
                <li>Tailwind CSS - 유틸리티 CSS 프레임워크</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">백엔드</h3>
              <ul className="list-disc list-inside text-gray-600 ml-2">
                <li>Spring Boot - Java 백엔드 프레임워크</li>
                <li>MySQL - 관계형 데이터베이스</li>
                <li>Swagger - API 문서화</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">주요 기능</h2>
          <ul className="list-disc list-inside text-gray-600 ml-2 space-y-2">
            <li>RESTful API를 통한 데이터 교환</li>
            <li>Swagger UI를 통한 API 테스트 및 문서화</li>
            <li>반응형 웹 디자인</li>
            <li>TypeScript를 통한 타입 안정성</li>
            <li>모듈화된 코드 구조</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">아키텍처</h2>
        <p className="text-gray-600 mb-4">
          이 프로젝트는 다음과 같은 아키텍처를 따릅니다:
        </p>
        <div className="bg-gray-100 p-4 rounded-md text-sm font-mono">
          <p className="mb-2">Client (Browser) ⟷ Next.js Frontend ⟷ Spring Boot Backend ⟷ MySQL Database</p>
        </div>
        <div className="mt-4 text-gray-600">
          <p>프론트엔드는 클라이언트의 요청을 처리하고 백엔드 API를 호출하여 데이터를 가져옵니다.</p>
          <p>백엔드는 비즈니스 로직을 처리하고 데이터베이스와의 상호작용을 담당합니다.</p>
        </div>
      </div>
    </div>
  );
} 