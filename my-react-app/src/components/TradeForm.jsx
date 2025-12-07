import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { getStockQuote } from '../utils/alphaVantageApi'

export default function TradeForm({ selectedSymbol = '', onSymbolChange }) {
    const { placePaperTrade, paperTrades } = useApp()
    const [symbol, setSymbol] = useState(selectedSymbol)
    const [currentPrice, setCurrentPrice] = useState(0)
    const [shares, setShares] = useState(1)
    const [mode, setMode] = useState('buy') // 'buy' | 'sell'
    const [loading, setLoading] = useState(false)

    // 심볼이 외부에서 변경되면 업데이트
    useEffect(() => {
        if (selectedSymbol && selectedSymbol !== symbol) {
            setSymbol(selectedSymbol)
            fetchPrice(selectedSymbol)
        }
    }, [selectedSymbol])

    const fetchPrice = async (targetSymbol) => {
        if (!targetSymbol) return
        try {
            setLoading(true)
            const data = await getStockQuote(targetSymbol)
            if (data['Global Quote'] && data['Global Quote']['05. price']) {
                setCurrentPrice(parseFloat(data['Global Quote']['05. price']))
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const handleSymbolSubmit = (e) => {
        if(e.key === 'Enter') {
            fetchPrice(symbol)
            if(onSymbolChange) onSymbolChange(symbol)
        }
    }

    const handleSymbolBlur = () => {
        if(symbol) {
            fetchPrice(symbol)
            if(onSymbolChange) onSymbolChange(symbol)
        }
    }

    const handleSubmit = () => {
        if (!symbol || !currentPrice || shares <= 0) {
            alert('종목과 수량을 확인해주세요')
            return
        }

        // 매도 시 보유 수량 체크 로직은 AppContext의 placePaperTrade에서 처리하거나 여기서 사전 체크
        // 여기서는 UI 흐름만 처리

        const success = placePaperTrade(
            symbol.toUpperCase(),
            symbol.toUpperCase(), // 이름은 심볼로 대체
            mode,
            shares,
            currentPrice
        )

        if (success) {
            alert(`${mode === 'buy' ? '구매' : '판매'}가 완료되었습니다.`)
            // 성공 후 초기화하지 않고 유지 (연속 매매 편의성)
        }
    }

    const getTotalAmount = () => shares * currentPrice

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
            {/* 탭 헤더 */}
            <div className="flex border-b border-slate-100">
                <button
                    onClick={() => setMode('buy')}
                    className={`flex-1 py-4 font-bold text-lg transition-colors ${
                        mode === 'buy' ? 'text-red-500 bg-red-50' : 'text-slate-400 hover:bg-slate-50'
                    }`}
                >
                    구매하기
                </button>
                <button
                    onClick={() => setMode('sell')}
                    className={`flex-1 py-4 font-bold text-lg transition-colors ${
                        mode === 'sell' ? 'text-blue-500 bg-blue-50' : 'text-slate-400 hover:bg-slate-50'
                    }`}
                >
                    판매하기
                </button>
            </div>

            <div className="p-6 space-y-6">
                {/* 종목 검색 */}
                <div>
                    <label className="block text-sm text-slate-500 mb-1 font-medium">종목코드</label>
                    <div className="relative">
                        <input 
                            type="text"
                            value={symbol}
                            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                            onKeyDown={handleSymbolSubmit}
                            onBlur={handleSymbolBlur}
                            placeholder="예: AAPL"
                            className="w-full text-xl font-bold p-3 bg-slate-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {loading && (
                            <div className="absolute right-3 top-3">
                                <div className="w-6 h-6 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                    </div>
                </div>

                {/* 현재가 표시 */}
                <div className="text-center py-2">
                    <div className="text-sm text-slate-500 mb-1">현재가</div>
                    <div className={`text-4xl font-bold tracking-tight ${
                        currentPrice > 0 ? (mode === 'buy' ? 'text-red-500' : 'text-blue-500') : 'text-slate-300'
                    }`}>
                        ${currentPrice > 0 ? currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 }) : '0.00'}
                    </div>
                </div>

                {/* 수량 조절 */}
                <div>
                    <label className="block text-sm text-slate-500 mb-2 font-medium text-center">수량</label>
                    <div className="flex items-center justify-center gap-4">
                        <button 
                            onClick={() => setShares(Math.max(1, shares - 1))}
                            className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 text-2xl font-bold hover:bg-slate-200"
                        >
                            -
                        </button>
                        <div className="w-32 text-center">
                            <input 
                                type="number"
                                value={shares}
                                onChange={(e) => setShares(parseInt(e.target.value) || 0)}
                                className="w-full text-center text-2xl font-bold bg-transparent outline-none"
                            />
                            <span className="text-sm text-slate-400">주</span>
                        </div>
                        <button 
                            onClick={() => setShares(shares + 1)}
                            className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 text-2xl font-bold hover:bg-slate-200"
                        >
                            +
                        </button>
                    </div>
                    {/* 간편 수량 버튼 */}
                    <div className="flex justify-center gap-2 mt-3">
                        {[10, 50, 100].map(num => (
                            <button 
                                key={num}
                                onClick={() => setShares(shares + num)}
                                className="px-3 py-1 text-xs font-medium bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100"
                            >
                                +{num}주
                            </button>
                        ))}
                    </div>
                </div>

                <div className="border-t border-dashed border-slate-200 my-4"></div>

                {/* 하단 정보 및 버튼 */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">주문 가능 금액</span>
                        <span className="font-medium text-slate-700">${paperTrades.balance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-500 font-medium">총 주문금액</span>
                        <span className="text-xl font-bold text-slate-800">
                            ${getTotalAmount().toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={currentPrice === 0}
                        className={`w-full py-4 rounded-xl text-lg font-bold text-white shadow-lg transition-transform active:scale-95 ${
                            currentPrice === 0 
                                ? 'bg-slate-300 cursor-not-allowed' 
                                : mode === 'buy' 
                                    ? 'bg-red-500 hover:bg-red-600 shadow-red-200' 
                                    : 'bg-blue-500 hover:bg-blue-600 shadow-blue-200'
                        }`}
                    >
                        {mode === 'buy' ? '구매하기' : '판매하기'}
                    </button>
                </div>
            </div>
        </div>
    )
}
