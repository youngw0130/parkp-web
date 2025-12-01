import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import TradeForm from '../components/TradeForm'
import TradeHistory from '../components/TradeHistory'

export default function PaperTrading() {
    const { paperTrades } = useApp()
    const [activeTab, setActiveTab] = useState('trade')

    return (
        <main className="flex-1 p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">가상 모의투자</h1>
                <p className="text-slate-600">실제 시세 기반으로 가상 자금으로 매매 연습하세요</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-sm text-slate-500">가용 자금</div>
                        <div className="text-3xl font-bold text-blue-600">
                            ₩{paperTrades.balance.toLocaleString()}
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-slate-500">총 거래 횟수</div>
                        <div className="text-2xl font-semibold">
                            {paperTrades.history.length}건
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-2 mb-4 border-b">
                <button
                    onClick={() => setActiveTab('trade')}
                    className={`px-4 py-2 font-medium ${
                        activeTab === 'trade'
                            ? 'border-b-2 border-blue-600 text-blue-600'
                            : 'text-slate-600'
                    }`}
                >
                    매매하기
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`px-4 py-2 font-medium ${
                        activeTab === 'history'
                            ? 'border-b-2 border-blue-600 text-blue-600'
                            : 'text-slate-600'
                    }`}
                >
                    거래 내역
                </button>
                <button
                    onClick={() => setActiveTab('backtest')}
                    className={`px-4 py-2 font-medium ${
                        activeTab === 'backtest'
                            ? 'border-b-2 border-blue-600 text-blue-600'
                            : 'text-slate-600'
                    }`}
                >
                    백테스팅
                </button>
            </div>

            {activeTab === 'trade' && <TradeForm />}
            {activeTab === 'history' && <TradeHistory />}
            {activeTab === 'backtest' && (
                <div className="bg-white rounded-lg p-6 shadow-sm border">
                    <h2 className="text-xl font-semibold mb-4">전략 백테스팅</h2>
                    <p className="text-slate-600">과거 데이터를 기반으로 투자 전략을 검증하세요.</p>
                    <div className="mt-4 p-4 bg-slate-50 rounded">
                        <p className="text-sm text-slate-500">백테스팅 기능은 곧 출시됩니다.</p>
                    </div>
                </div>
            )}
        </main>
    )
}

