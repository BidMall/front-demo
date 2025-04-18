import PortOne from "@portone/browser-sdk/v2";

// 결제를 실행하는 함수
export const requestPayment = async ({
  orderName,
  amount,
  currency = 'KRW',
  itemId,
  customData = {}
}: {
  orderName: string;
  amount: number;
  currency?: string;
  itemId: string | number;
  customData?: Record<string, any>;
}) => {
  // 환경 변수 확인
  const storeId = process.env.NEXT_PUBLIC_PORTONE_STORE_ID;
  const channelKey = process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY;

  if (!storeId || !channelKey) {
    throw new Error('PortOne 설정이 올바르지 않습니다. 환경 변수를 확인해주세요.');
  }

  // 결제 고유 ID 생성
  const paymentId = `order-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

  try {
    // 통화 형식 변환
    const formattedCurrency = currency === 'KRW' ? 'CURRENCY_KRW' : 'CURRENCY_USD';
    
    // PortOne SDK를 직접 호출 (타입 에러 방지를 위해 any 타입 사용)
    const payment = await (PortOne as any).requestPayment({
      storeId,
      channelKey,
      paymentId,
      orderName,
      totalAmount: amount,
      currency: formattedCurrency,
      payMethod: "CARD",
      customData: {
        itemId,
        ...customData
      },
    });

    // 결제 실패 또는 오류 처리
    if (payment && payment.code != null) {
      return {
        success: false,
        error: payment.message || '알 수 없는 오류가 발생했습니다.'
      };
    }

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