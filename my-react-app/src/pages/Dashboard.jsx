import React from 'react'
import { useApp } from '../context/AppContext'
import KpiCard from '../components/KpiCard'
import PriceChart from '../components/PriceChart'
import NewsList from '../components/NewsList'
import PortfolioTable from '../components/PortfolioTable'
import AlertPanel from '../components/AlertPanel'
import { priceData } from '../components/SampleData'

export default function Dashboard() {
    const { metrics, news, alerts } = useApp()

    return (
        <main className="flex-1 p-6">
            <section className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                <KpiCard 
                    title="포트폴리오 가치" 
                    value={`₩${metrics.totalValue.toLocaleString()}`} 
                    delta={metrics.returnRate} 
                />
                <KpiCard 
                    title="24시간 변동성" 
                    value={`${metrics.volatility}%`} 
                    delta={-0.3} 
                />
                <KpiCard 
                    title="일일 손익" 
                    value={`₩${metrics.dailyPL.toLocaleString()}`} 
                    delta={(metrics.dailyPL / metrics.portfolioValue * 100).toFixed(1)} 
                />
                <KpiCard 
                    title="예상 위험도 (VaR)" 
                    value={`${(parseFloat(metrics.volatility) * 1.5).toFixed(1)}%`} 
                />
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                <div className="lg:col-span-2">
                    <PriceChart data={priceData} />
                </div>
                <div className="flex flex-col gap-4">
                    <NewsList items={news} />
                    <AlertPanel alerts={alerts} />
                </div>
            </section>

            <section className="mb-6">
                <PortfolioTable />
            </section>
        </main>
    )
}

