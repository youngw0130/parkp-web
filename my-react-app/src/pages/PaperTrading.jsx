import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import TradeForm from '../components/TradeForm'
import TradeHistory from '../components/TradeHistory'
import RealTimeStockChart from '../components/RealTimeStockChart'

export default function PaperTrading() {
    const { paperTrades } = useApp()
    const [activeTab, setActiveTab] = useState('trade')
    const [selectedSymbol, setSelectedSymbol] = useState('AAPL') // 기본값

    return (
        <main className="flex-1 p-6 bg-slate-50 min-h-screen">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">모의투자</h1>
                    <p className="text-slate-600">가상의 자금으로 실전 매매를 연습해보세요</p>
                </div>
                <div className="text-right bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
                    <div className="text-sm text-slate-500 mb-1">내 자산 (예수금)</div>
                    <div className="text-2xl font-bold text-slate-800">
                        ${paperTrades.balance.toLocaleString()}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 좌측: 차트 및 정보 */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-[500px]">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-lg text-sm">{selectedSymbol}</span>
                                실시간 차트
                            </h2>
                            <div className="text-sm text-slate-400">5분 봉</div>
                        </div>
                        <div className="h-[400px]">
                            <RealTimeStockChart symbol={selectedSymbol} interval="5min" />
                        </div>
                    </div>

                    {/* 하단 탭 메뉴 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="flex border-b border-slate-100">
                            <button
                                onClick={() => setActiveTab('trade')}
                                className={`px-6 py-4 font-medium transition-colors ${
                                    activeTab === 'trade' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'
                                }`}
                            >
                                거래 내역
                            </button>
                            <button
                                onClick={() => setActiveTab('backtest')}
                                className={`px-6 py-4 font-medium transition-colors ${
                                    activeTab === 'backtest' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'
                                }`}
                            >
                                수익률 분석
                            </button>
                        </div>
                        <div className="p-6">
                            {activeTab === 'trade' && <TradeHistory />}
                            {activeTab === 'backtest' && (
                                <div className="text-center py-12 text-slate-500">
                                    수익률 분석 기능은 준비 중입니다.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 우측: 주문 패널 (Sticky) */}
                <div className="lg:col-span-1">
                    <div className="sticky top-6">
                        <TradeForm 
                            selectedSymbol={selectedSymbol} 
                            onSymbolChange={setSelectedSymbol}
                        />
                        
                        <div className="mt-6 bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <h3 className="font-bold text-blue-700 mb-2">💡 투자 팁</h3>
                            <p className="text-sm text-blue-600 leading-relaxed">
                                시장가 주문은 즉시 체결됩니다. 
                                변동성이 큰 종목은 주의해서 거래하세요.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
