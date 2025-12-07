import React from 'react'
import { useApp } from '../context/AppContext'
import { format } from 'date-fns'

export default function TradeHistory() {
    const { paperTrades } = useApp()

    if (paperTrades.history.length === 0) {
        return (
            <div className="bg-white rounded-lg p-6 shadow-sm border">
                <p className="text-slate-500 text-center py-8">거래 내역이 없습니다</p>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">거래 내역</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">시간</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">종목</th>
                            <th className="px-4 py-3 text-center text-sm font-medium text-slate-700">구분</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-slate-700">수량</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-slate-700">가격</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-slate-700">금액</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {paperTrades.history
                            .slice()
                            .reverse()
                            .map((trade) => (
                                <tr key={trade.id} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 text-sm text-slate-600">
                                        {format(new Date(trade.timestamp), 'MM/dd HH:mm')}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div>
                                            <div className="font-medium">{trade.name}</div>
                                            <div className="text-sm text-slate-500">{trade.symbol}</div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-medium ${
                                                trade.type === 'buy'
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-blue-100 text-blue-700'
                                            }`}
                                        >
                                            {trade.type === 'buy' ? '매수' : '매도'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">{trade.shares}주</td>
                                    <td className="px-4 py-3 text-right">${trade.price.toLocaleString()}</td>
                                    <td className="px-4 py-3 text-right font-medium">
                                        ${trade.cost.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

