import React from 'react'
import { useApp } from '../context/AppContext'

export default function PortfolioTable() {
    const { portfolio } = useApp()

    const getReturnColor = (returnRate) => {
        if (returnRate > 0) return 'text-green-600'
        if (returnRate < 0) return 'text-red-600'
        return 'text-slate-600'
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">보유 포트폴리오</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">종목</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-slate-700">보유수량</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-slate-700">평균단가</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-slate-700">현재가</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-slate-700">평가금액</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-slate-700">수익률</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {portfolio.holdings.map((holding) => {
                            const totalValue = holding.shares * holding.currentPrice
                            const totalCost = holding.shares * holding.avgPrice
                            const returnAmount = totalValue - totalCost
                            const returnRate = (returnAmount / totalCost) * 100

                            return (
                                <tr key={holding.symbol} className="hover:bg-slate-50">
                                    <td className="px-4 py-3">
                                        <div>
                                            <div className="font-medium">{holding.name}</div>
                                            <div className="text-sm text-slate-500">{holding.symbol}</div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-right">{holding.shares}주</td>
                                    <td className="px-4 py-3 text-right">₩{holding.avgPrice.toLocaleString()}</td>
                                    <td className="px-4 py-3 text-right">₩{holding.currentPrice.toLocaleString()}</td>
                                    <td className="px-4 py-3 text-right font-medium">
                                        ₩{totalValue.toLocaleString()}
                                    </td>
                                    <td className={`px-4 py-3 text-right font-medium ${getReturnColor(returnRate)}`}>
                                        {returnRate >= 0 ? '+' : ''}{returnRate.toFixed(2)}%
                                        <div className="text-xs text-slate-500">
                                            {returnAmount >= 0 ? '+' : ''}₩{returnAmount.toLocaleString()}
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

