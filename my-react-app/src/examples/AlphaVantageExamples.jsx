import React, { useState } from 'react';
import {
  getStockDailyData,
  getStockQuote,
  searchSymbol,
  getCryptoDailyData,
  getExchangeRate,
  getMarketNews,
  getSMA,
  getRSI,
  getCompanyOverview
} from '../utils/alphaVantageApi';

/**
 * Alpha Vantage API 사용 예시 모음
 */
export default function AlphaVantageExamples() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleApiCall = async (apiFunction, ...args) => {
    setLoading(true);
    setResult(null);
    try {
      const data = await apiFunction(...args);
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Alpha Vantage API 사용 예시</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        
        {/* 주식 관련 API */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold text-lg mb-3 text-blue-600">주식 데이터</h3>
          
          <button
            onClick={() => handleApiCall(getStockQuote, 'AAPL')}
            className="w-full mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Apple 주식 시세
          </button>
          
          <button
            onClick={() => handleApiCall(getStockDailyData, 'MSFT', 'compact')}
            className="w-full mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Microsoft 일일 데이터
          </button>
          
          <button
            onClick={() => handleApiCall(searchSymbol, 'Tesla')}
            className="w-full mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Tesla 검색
          </button>
          
          <button
            onClick={() => handleApiCall(getCompanyOverview, 'IBM')}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            IBM 회사 정보
          </button>
        </div>

        {/* 기술적 지표 */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold text-lg mb-3 text-green-600">기술적 지표</h3>
          
          <button
            onClick={() => handleApiCall(getSMA, 'AAPL', 'daily', 20, 'close')}
            className="w-full mb-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            AAPL - SMA(20)
          </button>
          
          <button
            onClick={() => handleApiCall(getRSI, 'MSFT', 'daily', 14, 'close')}
            className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            MSFT - RSI(14)
          </button>
        </div>

        {/* 암호화폐 & 외환 */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold text-lg mb-3 text-purple-600">암호화폐 & 외환</h3>
          
          <button
            onClick={() => handleApiCall(getCryptoDailyData, 'BTC', 'USD')}
            className="w-full mb-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            비트코인 일일 데이터
          </button>
          
          <button
            onClick={() => handleApiCall(getExchangeRate, 'USD', 'KRW')}
            className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            USD → KRW 환율
          </button>
        </div>

        {/* 뉴스 */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold text-lg mb-3 text-orange-600">시장 뉴스</h3>
          
          <button
            onClick={() => handleApiCall(getMarketNews, 'AAPL')}
            className="w-full mb-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Apple 관련 뉴스
          </button>
          
          <button
            onClick={() => handleApiCall(getMarketNews, '', 'technology')}
            className="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            기술 부문 뉴스
          </button>
        </div>
      </div>

      {/* 결과 표시 영역 */}
      <div className="bg-gray-900 text-green-400 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">API 응답 결과</h3>
          {result && (
            <button
              onClick={() => {
                navigator.clipboard.writeText(result);
                alert('클립보드에 복사되었습니다!');
              }}
              className="px-3 py-1 bg-gray-700 text-white text-sm rounded hover:bg-gray-600"
            >
              복사
            </button>
          )}
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
            <p className="mt-2">API 호출 중...</p>
          </div>
        ) : result ? (
          <pre className="overflow-auto max-h-96 text-sm">
            {result}
          </pre>
        ) : (
          <p className="text-gray-500 text-center py-8">
            위의 버튼을 클릭하여 API를 테스트하세요
          </p>
        )}
      </div>

      {/* API 제한 안내 */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-800 mb-2">⚠️ API 사용 제한 안내</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• 무료 플랜: 분당 5회, 일일 100회 제한</li>
          <li>• API 호출 제한을 초과하면 일시적으로 사용이 차단됩니다</li>
          <li>• 프로덕션 환경에서는 적절한 캐싱과 요청 제한을 구현하세요</li>
        </ul>
      </div>
    </div>
  );
}

