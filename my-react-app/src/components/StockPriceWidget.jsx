import React, { useState, useEffect } from 'react';
import { getStockQuote } from '../utils/alphaVantageApi';

/**
 * 실시간 주식 가격 위젯 예시
 */
export default function StockPriceWidget({ symbol = 'AAPL' }) {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStockData() {
      try {
        setLoading(true);
        setError(null);
        const data = await getStockQuote(symbol);
        
        if (data['Global Quote']) {
          setStockData(data['Global Quote']);
        } else {
          throw new Error('주식 데이터를 찾을 수 없습니다.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStockData();
    
    // 5분마다 업데이트
    const interval = setInterval(fetchStockData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [symbol]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-800 font-semibold">오류 발생</p>
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  if (!stockData) {
    return null;
  }

  const price = parseFloat(stockData['05. price']);
  const change = parseFloat(stockData['09. change']);
  const changePercent = stockData['10. change percent'];
  const isPositive = change >= 0;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-gray-500 text-sm font-medium">{symbol}</h3>
          <p className="text-3xl font-bold text-gray-900">
            ${price.toFixed(2)}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
          isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {isPositive ? '+' : ''}{change.toFixed(2)} ({changePercent})
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">고가</p>
          <p className="font-semibold">${parseFloat(stockData['03. high']).toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-500">저가</p>
          <p className="font-semibold">${parseFloat(stockData['04. low']).toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-500">시가</p>
          <p className="font-semibold">${parseFloat(stockData['02. open']).toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-500">거래량</p>
          <p className="font-semibold">{parseInt(stockData['06. volume']).toLocaleString()}</p>
        </div>
      </div>
      
      <p className="text-xs text-gray-400 mt-4">
        최종 업데이트: {stockData['07. latest trading day']}
      </p>
    </div>
  );
}

