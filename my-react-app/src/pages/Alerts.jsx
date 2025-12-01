import React from 'react'
import { useApp } from '../context/AppContext'
import AlertPanel from '../components/AlertPanel'

export default function Alerts() {
    const { alerts } = useApp()

    const alertsByType = {
        volume: alerts.filter(a => a.type === 'volume'),
        price: alerts.filter(a => a.type === 'price'),
        news: alerts.filter(a => a.type === 'news'),
    }

    return (
        <main className="flex-1 p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">AI 기반 이상징후 탐지 & 알림</h1>
                <p className="text-slate-600">거래량 급등락, 주가 급변 등 이상 신호를 자동으로 탐지합니다</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-lg p-4 shadow-sm border">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="font-semibold">거래량 알림</h2>
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                            {alertsByType.volume.length}건
                        </span>
                    </div>
                    <AlertPanel alerts={alertsByType.volume} />
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm border">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="font-semibold">가격 변동 알림</h2>
                        <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">
                            {alertsByType.price.length}건
                        </span>
                    </div>
                    <AlertPanel alerts={alertsByType.price} />
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm border">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="font-semibold">뉴스 알림</h2>
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                            {alertsByType.news.length}건
                        </span>
                    </div>
                    <AlertPanel alerts={alertsByType.news} />
                </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h2 className="text-xl font-semibold mb-4">전체 알림</h2>
                <AlertPanel alerts={alerts} showAll />
            </div>
        </main>
    )
}

