import React, { useState } from 'react'
import { useApp } from '../context/AppContext'

export default function Watchlist() {
    const { portfolio, addToWatchlist } = useApp()
    const [newSymbol, setNewSymbol] = useState('')

    const stockData = {
        '005930': { name: '삼성전자', price: 78000, change: 2.5 },
        '035720': { name: '카카오', price: 48000, change: -1.2 },
        '000660': { name: 'SK하이닉스', price: 125000, change: 3.1 },
        '005380': { name: '현대차', price: 245000, change: 0.8 },
        '051910': { name: 'LG화학', price: 420000, change: -0.5 },
    }

    const handleAdd = () => {
        if (newSymbol && !portfolio.watchlist.includes(newSymbol)) {
            addToWatchlist(newSymbol)
            setNewSymbol('')
        }
    }

    return (
        <main className="flex-1 p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">관심종목</h1>
                <p className="text-slate-600">관심있는 종목을 추가하고 실시간으로 모니터링하세요</p>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm border mb-6">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newSymbol}
                        onChange={(e) => setNewSymbol(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                        className="flex-1 px-3 py-2 border rounded-md"
                        placeholder="종목코드 입력 (예: 005930)"
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
                            {portfolio.watchlist.map((symbol) => {
                                const stock = stockData[symbol]
                                if (!stock) return null

                                return (
                                    <tr key={symbol} className="hover:bg-slate-50">
                                        <td className="px-4 py-3">
                                            <div>
                                                <div className="font-medium">{stock.name}</div>
                                                <div className="text-sm text-slate-500">{symbol}</div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-right font-medium">
                                            ₩{stock.price.toLocaleString()}
                                        </td>
                                        <td
                                            className={`px-4 py-3 text-right font-medium ${
                                                stock.change >= 0 ? 'text-red-600' : 'text-blue-600'
                                            }`}
                                        >
                                            {stock.change >= 0 ? '+' : ''}
                                            {stock.change}%
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <button className="text-sm text-blue-600 hover:underline">
                                                상세보기
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}

