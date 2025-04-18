// CDN 방식으로 사용

// 전역 타입 정의
declare global {
  interface Window {
    PortOne: any;
  }
}

export type PaymentData = {
  orderName: string;
  amount: number;
  currency?: string;
  itemId: string | number;
  bidId?: string | number;
};

/**
 * PortOne 결제 요청 함수
 */
export const requestPayment = async (paymentData: PaymentData) => {
  const { orderName, amount, currency = 'KRW', itemId, bidId } = paymentData;

  // 환경 변수 확인
  const storeId = process.env.NEXT_PUBLIC_PORTONE_STORE_ID;
  const channelKey = process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY;

  if (!storeId || !channelKey) {
    throw new Error('PortOne 설정이 올바르지 않습니다. 환경 변수를 확인해주세요.');
  }

  // PortOne SDK가 로드되었는지 확인
  if (typeof window === 'undefined' || !window.PortOne) {
    console.error('PortOne SDK가 로드되지 않았습니다.');
    throw new Error('PortOne SDK가 로드되지 않았습니다.');
  }

  // 결제 고유 ID 생성 (실제 서비스에서는 서버에서 생성한 ID를 사용해야 함)
  const paymentId = `order-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

  try {
    const payment = await window.PortOne.requestPayment({
      storeId,            // 상점 ID
      channelKey,         // 채널 키
      paymentId,          // 결제 ID (고유값)
      orderName,          // 주문명
      totalAmount: amount, // 결제 금액
      currency,           // 통화 (KRW 등)
      payMethod: "CARD",  // 결제 수단
      customData: {       // 커스텀 데이터
        itemId,            // 상품 ID
        bidId              // 입찰 ID
      },
    });

    return {
      success: true,
      payment
    };
  } catch (error) {
    console.error('결제 요청 중 오류가 발생했습니다:', error);
    return {
      success: false,
      error
    };
  }
}; 