import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Safely initialize the client only if key exists (handled in components mostly)
const getClient = () => {
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const generateSupportResponse = async (userQuery: string): Promise<string> => {
  const client = getClient();
  if (!client) {
    return "API 키가 설정되지 않아 AI 상담을 이용할 수 없습니다.";
  }

  try {
    const response = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        당신은 '전주사랑상품권' 앱의 친절한 고객 상담 AI 챗봇입니다.
        
        [배경 지식]
        - 전주사랑상품권은 전주 지역 경제 활성화를 위한 지역화폐입니다.
        - 충전 시 12% 캐시백을 적립해줍니다 (이벤트 기간).
        - 월 구매 한도는 50만원입니다.
        - 가맹점은 전주 시내 IC카드 단말기가 있는 대부분의 점포입니다 (대형마트, 유흥업소 제외).
        
        사용자의 질문: "${userQuery}"
        
        짧고 친절하게 한국어로 답변해주세요.
      `,
    });
    return response.text || "죄송합니다. 답변을 생성할 수 없습니다.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "일시적인 오류로 인해 답변할 수 없습니다. 잠시 후 다시 시도해주세요.";
  }
};
