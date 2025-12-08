import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import WatchlistRow from '../components/WatchlistRow'

export default function Watchlist() {
    const { portfolio, addToWatchlist, removeFromWatchlist } = useApp()
    const [newSymbol, setNewSymbol] = useState('')

    // 하드코딩된 stockData 제거

    const handleAdd = () => {
        if (newSymbol && !portfolio.watchlist.includes(newSymbol.toUpperCase())) {
            addToWatchlist(newSymbol.toUpperCase())
            setNewSymbol('')
        }
    }

    return (
        <main className="flex-1 p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">관심종목 (실시간 API)</h1>
                <p className="text-slate-600">Alpha Vantage API를 통해 실시간 시세를 확인합니다.</p>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm border mb-6">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newSymbol}
                        onChange={(e) => setNewSymbol(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                        className="flex-1 px-3 py-2 border rounded-md"
                        placeholder="종목코드 입력 (예: AAPL, TSLA)"
                    />
                    <button
                        onClick={handleAdd}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
                    >
                        추가
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold">관심종목 목록</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">종목</th>
                                <th className="px-4 py-3 text-right text-sm font-medium text-slate-700">현재가</th>
                                <th className="px-4 py-3 text-right text-sm font-medium text-slate-700">등락률</th>
                                <th className="px-4 py-3 text-center text-sm font-medium text-slate-700">액션</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {portfolio.watchlist.map((symbol) => (
                                <WatchlistRow 
                                    key={symbol} 
                                    symbol={symbol} 
                                    onRemove={removeFromWatchlist} 
                                />
                            ))}
                            {portfolio.watchlist.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-4 py-8 text-center text-slate-500">
                                        관심종목이 없습니다. 종목을 추가해보세요.
                                        </td>
                                    </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}

