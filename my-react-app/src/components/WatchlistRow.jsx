import React, { useState, useEffect } from 'react';
import { getStockQuote } from '../utils/alphaVantageApi';

export default function WatchlistRow({ symbol, onRemove }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        async function fetchData() {
            try {
                setLoading(true);
                // Alpha Vantage API 호출
                const result = await getStockQuote(symbol);
                
                if (isMounted) {
                    if (result['Global Quote'] && Object.keys(result['Global Quote']).length > 0) {
                        setData(result['Global Quote']);
                    } else {
                        // 데이터가 없거나 API 제한에 걸린 경우
                        console.warn(`No data for ${symbol}`, result);
                        // 에러 발생 시 null 유지 또는 에러 상태 처리
                    }
                }
            } catch (err) {
                if (isMounted) setError(err);
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        fetchData();
        
        // 2분마다 갱신 (API 제한 고려)
        const interval = setInterval(fetchData, 120000); 
        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [symbol]);

    if (loading) {
        return (
            <tr className="animate-pulse">
                <td className="px-4 py-3">
                    <div className="h-4 bg-slate-200 rounded w-16 mb-1"></div>
                    <div className="h-3 bg-slate-100 rounded w-12"></div>
                </td>
                <td className="px-4 py-3 text-right"><div className="h-4 bg-slate-200 rounded w-20 ml-auto"></div></td>
                <td className="px-4 py-3 text-right"><div className="h-4 bg-slate-200 rounded w-16 ml-auto"></div></td>
                <td className="px-4 py-3 text-center"><div className="h-4 bg-slate-200 rounded w-12 mx-auto"></div></td>
            </tr>
        );
    }

    // 데이터가 없을 경우 (에러 또는 로딩 실패)
    if (!data) {
        return (
            <tr className="bg-red-50">
                <td className="px-4 py-3">
                    <div className="font-medium text-red-600">{symbol}</div>
                    <div className="text-xs text-red-500">데이터 로딩 실패</div>
                </td>
                <td className="px-4 py-3 text-right">-</td>
                <td className="px-4 py-3 text-right">-</td>
                <td className="px-4 py-3 text-center">
                    <button onClick={() => onRemove(symbol)} className="text-sm text-red-600 hover:underline">
                        삭제
                    </button>
                </td>
            </tr>
        );
    }

    const price = parseFloat(data['05. price']);
    const change = parseFloat(data['09. change']);
    const changePercent = data['10. change percent'].replace('%', '');
    const isPositive = change >= 0;

    return (
        <tr className="hover:bg-slate-50">
            <td className="px-4 py-3">
                <div>
                    <div className="font-medium">{symbol}</div>
                </div>
            </td>
            <td className="px-4 py-3 text-right font-medium">
                ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
            <td className={`px-4 py-3 text-right font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? '+' : ''}{parseFloat(changePercent).toFixed(2)}%
            </td>
            <td className="px-4 py-3 text-center">
                <button onClick={() => onRemove(symbol)} className="text-sm text-slate-500 hover:text-red-600 hover:underline">
                    삭제
                </button>
            </td>
        </tr>
    );
}

