/**
 * API 설정 파일
 * 환경변수를 사용하여 API 키를 안전하게 관리합니다.
 * 
 * 사용법:
 * 1. 프로젝트 루트에 .env.local 파일 생성
 * 2. VITE_ALPHA_VANTAGE_API_KEY=your_api_key_here 추가
 * 
 * .env.local 파일은 Git에 커밋하지 마세요!
 */

export const API_CONFIG = {
  ALPHA_VANTAGE: {
    API_KEY: import.meta.env.VITE_ALPHA_VANTAGE_API_KEY || 'X0UGJ3LDUPAL7458',
    BASE_URL: 'https://www.alphavantage.co/query',
  },
};

// API 키 검증
if (!API_CONFIG.ALPHA_VANTAGE.API_KEY) {
  console.error('⚠️ Alpha Vantage API 키가 설정되지 않았습니다.');
  console.error('프로젝트 루트에 .env.local 파일을 생성하고 VITE_ALPHA_VANTAGE_API_KEY를 설정하세요.');
}

export default API_CONFIG;

