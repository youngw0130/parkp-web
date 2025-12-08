import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { getStockDailyData } from '../utils/alphaVantageApi';

/**
 * 실시간 주식 차트 컴포넌트
 * Alpha Vantage API를 사용하여 실제 데이터를 표시
 */
export default function RealTimeStockChart({ symbol = 'AAPL', interval = 'daily' }) {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    async function fetchChartData() {
      try {
        setLoading(true);
        setError(null);
        
        // 일봉 데이터 사용 (안정성 확보)
        const data = await getStockDailyData(symbol);
        console.log(`차트 데이터 응답 (${symbol}):`, data);

        if (data['Error Message']) {
            throw new Error(`API 오류: ${data['Error Message']}`);
        }
        if (data['Note']) {
            throw new Error('API 호출 제한 초과');
        }

        const timeSeriesKey = 'Time Series (Daily)';
        const timeSeries = data[timeSeriesKey];

        if (!timeSeries) {
          throw new Error('차트 데이터를 불러올 수 없습니다.');
        }

        // 데이터를 차트 형식으로 변환
        const formattedData = Object.entries(timeSeries)
          .slice(0, 30) // 최근 30일
          .map(([date, values]) => ({
            time: date.substring(5), // MM-DD
            price: parseFloat(values['4. close']),
            volume: parseInt(values['5. volume']),
          }))
          .reverse();

        setChartData(formattedData);
        setLastUpdate(new Date().toLocaleTimeString('ko-KR'));
      } catch (err) {
        setError(err.message || '데이터 로딩 실패');
        console.error('차트 에러:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchChartData();
  }, [symbol]); // interval 의존성 제거 (daily 고정)

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-4 shadow-sm border h-72">
        <div className="animate-pulse h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm text-gray-500">
              데이터를 불러오고 있습니다...<br/>
              <span className="text-xs text-gray-400">(대기열 등록됨: 잠시만 기다려주세요)</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg p-4 shadow-sm border h-72">
        <div className="h-full flex items-center justify-center">
          <div className="text-center text-red-600">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-semibold">데이터 로딩 실패</p>
            <p className="text-sm text-gray-500 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const latestPrice = chartData[chartData.length - 1]?.price;
  const firstPrice = chartData[0]?.price;
  const priceChange = latestPrice - firstPrice;
  const priceChangePercent = ((priceChange / firstPrice) * 100).toFixed(2);
  const isPositive = priceChange >= 0;

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border h-72">
      <div className="flex justify-between items-center mb-2">
        <div>
          <div className="font-medium text-lg">{symbol}</div>
          {latestPrice && (
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">${latestPrice.toFixed(2)}</span>
              <span className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercent}%)
              </span>
            </div>
          )}
        </div>
        <div className="text-right">
          <div className="text-sm text-slate-500">{interval} 차트</div>
          {lastUpdate && (
            <div className="text-xs text-slate-400">
              업데이트: {lastUpdate}
            </div>
          )}
        </div>
      </div>
      
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 10 }}
              interval="preserveStartEnd"
            />
            <YAxis 
              domain={['auto', 'auto']}
              tick={{ fontSize: 10 }}
              tickFormatter={(value) => `$${value.toFixed(0)}`}
            />
            <Tooltip 
              contentStyle={{ fontSize: 12 }}
              formatter={(value) => [`$${value.toFixed(2)}`, '가격']}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke={isPositive ? '#10b981' : '#ef4444'}
              strokeWidth={2}
              dot={false}
              animationDuration={300}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

