/**
 * Alpha Vantage API 유틸리티
 * 주식, 암호화폐, 외환 데이터를 가져오는 함수들
 */

import { API_CONFIG } from '../config/api.config';

const { API_KEY, BASE_URL } = API_CONFIG.ALPHA_VANTAGE;

/**
 * API 호출 기본 함수
 */
async function fetchFromAlphaVantage(params) {
  const queryParams = new URLSearchParams({
    ...params,
    apikey: API_KEY,
  });

  const url = `${BASE_URL}?${queryParams}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP 오류가 발생했습니다. 상태 코드: ${response.status}`);
    }
    const data = await response.json();
    
    // API 에러 체크
    if (data['Error Message']) {
      throw new Error(`API 오류: ${data['Error Message']}`);
    }
    if (data['Note']) {
      throw new Error('API 호출 제한에 도달했습니다. 잠시 후 다시 시도해주세요.');
    }
    
    return data;
  } catch (error) {
    console.error('Alpha Vantage API 오류:', error);
    throw error;
  }
}

/**
 * 일일 주가 데이터 가져오기
 * @param {string} symbol - 주식 심볼 (예: 'AAPL', 'MSFT')
 * @param {string} outputsize - 'compact' (최근 100개) 또는 'full' (전체 데이터)
 */
export async function getStockDailyData(symbol, outputsize = 'compact') {
  return fetchFromAlphaVantage({
    function: 'TIME_SERIES_DAILY',
    symbol: symbol,
    outputsize: outputsize,
  });
}

/**
 * 실시간 주가 데이터 가져오기
 * @param {string} symbol - 주식 심볼
 * @param {string} interval - '1min', '5min', '15min', '30min', '60min'
 */
export async function getStockIntradayData(symbol, interval = '5min') {
  return fetchFromAlphaVantage({
    function: 'TIME_SERIES_INTRADAY',
    symbol: symbol,
    interval: interval,
  });
}

/**
 * 주식 시세 조회 (실시간)
 * @param {string} symbol - 주식 심볼
 */
export async function getStockQuote(symbol) {
  return fetchFromAlphaVantage({
    function: 'GLOBAL_QUOTE',
    symbol: symbol,
  });
}

/**
 * 주식 검색
 * @param {string} keywords - 검색 키워드
 */
export async function searchSymbol(keywords) {
  return fetchFromAlphaVantage({
    function: 'SYMBOL_SEARCH',
    keywords: keywords,
  });
}

/**
 * 암호화폐 일일 데이터
 * @param {string} symbol - 암호화폐 심볼 (예: 'BTC')
 * @param {string} market - 시장 (기본: 'USD')
 */
export async function getCryptoDailyData(symbol, market = 'USD') {
  return fetchFromAlphaVantage({
    function: 'DIGITAL_CURRENCY_DAILY',
    symbol: symbol,
    market: market,
  });
}

/**
 * 외환 환율 조회
 * @param {string} fromCurrency - 출발 통화 (예: 'USD')
 * @param {string} toCurrency - 도착 통화 (예: 'KRW')
 */
export async function getExchangeRate(fromCurrency, toCurrency) {
  return fetchFromAlphaVantage({
    function: 'CURRENCY_EXCHANGE_RATE',
    from_currency: fromCurrency,
    to_currency: toCurrency,
  });
}

/**
 * 뉴스 및 감성 분석
 * @param {string} tickers - 주식 심볼 (선택사항)
 * @param {string} topics - 토픽 (선택사항)
 */
export async function getMarketNews(tickers = '', topics = '') {
  const params = {
    function: 'NEWS_SENTIMENT',
  };
  
  if (tickers) params.tickers = tickers;
  if (topics) params.topics = topics;
  
  return fetchFromAlphaVantage(params);
}

/**
 * 기술적 지표 - SMA (단순이동평균)
 * @param {string} symbol - 주식 심볼
 * @param {string} interval - 시간 간격
 * @param {number} timePeriod - 기간
 * @param {string} seriesType - 'close', 'open', 'high', 'low'
 */
export async function getSMA(symbol, interval = 'daily', timePeriod = 20, seriesType = 'close') {
  return fetchFromAlphaVantage({
    function: 'SMA',
    symbol: symbol,
    interval: interval,
    time_period: timePeriod,
    series_type: seriesType,
  });
}

/**
 * 기술적 지표 - RSI (상대강도지수)
 * @param {string} symbol - 주식 심볼
 * @param {string} interval - 시간 간격
 * @param {number} timePeriod - 기간
 * @param {string} seriesType - 'close', 'open', 'high', 'low'
 */
export async function getRSI(symbol, interval = 'daily', timePeriod = 14, seriesType = 'close') {
  return fetchFromAlphaVantage({
    function: 'RSI',
    symbol: symbol,
    interval: interval,
    time_period: timePeriod,
    series_type: seriesType,
  });
}

/**
 * 회사 개요 정보
 * @param {string} symbol - 주식 심볼
 */
export async function getCompanyOverview(symbol) {
  return fetchFromAlphaVantage({
    function: 'OVERVIEW',
    symbol: symbol,
  });
}

export default {
  getStockDailyData,
  getStockIntradayData,
  getStockQuote,
  searchSymbol,
  getCryptoDailyData,
  getExchangeRate,
  getMarketNews,
  getSMA,
  getRSI,
  getCompanyOverview,
};

