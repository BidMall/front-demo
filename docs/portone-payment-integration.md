# PortOne 결제 연동 프로젝트 분석

이 문서는 Spring Boot와 React 기반의 PortOne 결제 연동 예제 프로젝트에 대한 분석을 제공합니다.

## 프로젝트 구조

### 백엔드 (Spring Boot + Kotlin)
- `org.example` 패키지에 결제 관련 컨트롤러 및 모델 클래스 위치
- WebFlux와 코루틴 기반의 비동기 API 처리
- PortOne 서버 SDK 사용

### 프론트엔드 (React)
- React 기반 SPA 구현
- PortOne 브라우저 SDK를 통한 결제 창 연동
- Vite 기반 빌드 시스템

## 핵심 코드 분석

### 백엔드 컴포넌트

#### 1. PaymentController
- 결제 완료 처리와 웹훅 처리를 위한 API 제공
- 인증 결제 처리 및 결제 상태 동기화 로직 구현
- 결제 정보 검증을 통한 보안 확보

#### 2. 데이터 모델
- `Payment`: 결제 정보를 위한 모델
- `Item`: 상품 정보를 위한 모델
- `PaymentCustomData`: 결제 시 전달되는 커스텀 데이터 정의

#### 3. 예외 처리
- `SyncPaymentException`: 결제 동기화 실패 시 발생하는 예외
- `SyncPaymentExceptionHandler`: 결제 예외 처리기

### 프론트엔드 컴포넌트

#### App.jsx
- 상품 정보 조회 및 표시
- PortOne SDK를 통한 결제 요청 처리
- 결제 상태에 따른 UI 렌더링

## PortOne 결제 연동에 필요한 데이터

### 필수 API 키 및 설정값

1. **스토어 ID (Store ID)**
   - 환경 변수: `VITE_STORE_ID`
   - PortOne 콘솔에서 발급받는 상점 ID
   - 형식: `store-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

2. **채널 키 (Channel Key)**
   - 환경 변수: `VITE_CHANNEL_KEY`
   - PortOne 콘솔에서 발급받는 결제 채널 키
   - 형식: `channel-key-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

3. **API 시크릿 키 (API Secret)**
   - 서버 환경 변수: `portone.secret.api`
   - PortOne 서버 API 호출 시 인증에 사용
   - Spring 설정에서 `PortOneSecretProperties` 클래스를 통해 관리

4. **웹훅 시크릿 키 (Webhook Secret)**
   - 서버 환경 변수: `portone.secret.webhook`
   - 웹훅 요청 검증에 사용
   - Spring 설정에서 `PortOneSecretProperties` 클래스를 통해 관리

### 결제 요청 파라미터 (프론트엔드)

```javascript
const payment = await PortOne.requestPayment({
  storeId: VITE_STORE_ID,           // 상점 ID
  channelKey: VITE_CHANNEL_KEY,     // 채널 키
  paymentId,                        // 결제 ID (고유값)
  orderName: item.name,             // 주문명
  totalAmount: item.price,          // 결제 금액
  currency: item.currency,          // 통화 (KRW 등)
  payMethod: "CARD",                // 결제 수단
  customData: {                     // 커스텀 데이터
    item: item.id,                  // 상품 ID
  },
});
```

### 웹훅 처리 (백엔드)

웹훅 요청 검증에 필요한 헤더:
- `webhook-id`: 웹훅 ID
- `webhook-timestamp`: 웹훅 타임스탬프
- `webhook-signature`: 웹훅 서명

## 결제 프로세스

1. 프론트엔드에서 상품 정보 로드
2. 사용자가 결제 버튼 클릭
3. PortOne SDK를 통해 결제창 표시 및 결제 진행
4. 결제 완료 후 결제 ID를 백엔드로 전송
5. 백엔드에서 PortOne API를 통해 결제 정보 검증
6. 결제 상태 업데이트 및 프론트엔드에 결과 반환
7. 웹훅을 통한 비동기 결제 상태 업데이트 처리

## 결제 검증 프로세스

백엔드에서는 결제 정보를 검증하기 위해 다음 항목을 확인:
1. 결제된 상품명이 실제 상품명과 일치하는지
2. 결제 금액이 실제 상품 가격과 일치하는지
3. 통화 코드가 일치하는지
4. 커스텀 데이터에 포함된 상품 ID가 유효한지

## 라이브러리 의존성

### 백엔드
- `io.portone:server-sdk`: PortOne 서버 SDK
- Spring WebFlux
- Kotlinx Serialization
- Kotlinx Coroutines

### 프론트엔드
- `@portone/browser-sdk`: PortOne 브라우저 SDK (v0.0.10)
- React 18

## 배포 및 실행

프로젝트 실행을 위한 명령어:
```bash
# 개발 모드 실행 (프론트엔드 + 백엔드)
npm run dev
```

## 주의사항

1. 실제 운영 환경에서는 API 키와 시크릿을 안전하게 관리해야 함
2. 웹훅 처리 시 요청의 진위 여부를 반드시 검증해야 함
3. 결제 처리 시 동시성 이슈를 고려한 락 메커니즘 구현 필요
4. 환경 변수 및 시크릿 값은 민감 정보로 관리되어야 함 