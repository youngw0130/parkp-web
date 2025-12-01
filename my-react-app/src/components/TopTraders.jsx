import React from 'react'

export default function TopTraders({ traders }) {
    return (
        <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">인기 투자자</h2>
            </div>
            <div className="divide-y">
                {traders.map((trader) => (
                    <div key={trader.id} className="p-4 hover:bg-slate-50 cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-semibold">
                                    {trader.name[0]}
                                </div>
                                <div>
                                    <div className="font-medium">{trader.name}</div>
                                    <div className="text-sm text-slate-500">
                                        팔로워 {trader.followers.toLocaleString()}명
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ml-13">
                            <div className="text-sm text-slate-600 mb-1">수익률</div>
                            <div
                                className={`text-xl font-bold ${
                                    trader.return > 0 ? 'text-green-600' : 'text-red-600'
                                }`}
                            >
                                {trader.return > 0 ? '+' : ''}
                                {trader.return}%
                            </div>
                        </div>
                        <button className="mt-3 w-full py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                            팔로우
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

