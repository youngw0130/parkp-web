import React from 'react'
import { useApp } from '../context/AppContext'
import KpiCard from '../components/KpiCard'
import RealTimeStockChart from '../components/RealTimeStockChart'
import StockPriceWidget from '../components/StockPriceWidget'
import NewsList from '../components/NewsList'
import PortfolioTable from '../components/PortfolioTable'
import AlertPanel from '../components/AlertPanel'

export default function Dashboard() {
    const { metrics, news, alerts } = useApp()

    return (
        <main className="flex-1 p-6">
            <section className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                <KpiCard 
                    title="총 자산" 
                    value={`$${metrics.totalValue.toLocaleString()}`} 
                    delta={typeof metrics.returnRate === 'number' ? metrics.returnRate.toFixed(2) : metrics.returnRate} 
                />
                <KpiCard 
                    title="24시간 변동성" 
                    value={`${metrics.volatility}%`} 
                    delta={-0.30} 
                />
                <KpiCard 
                    title="일일 손익" 
                    value={`$${metrics.dailyPL.toLocaleString()}`} 
                    delta={(metrics.dailyPL / metrics.portfolioValue * 100).toFixed(2)} 
                />
                <KpiCard 
                    title="예상 위험도 (VaR)" 
                    value={`${(parseFloat(metrics.volatility) * 1.5).toFixed(2)}%`} 
                />
            </section>

            {/* 주요 종목 실시간 시세 */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <StockPriceWidget symbol="AAPL" />
                <StockPriceWidget symbol="MSFT" />
                <StockPriceWidget symbol="TSLA" />
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                <div className="lg:col-span-2">
                    <h3 className="text-lg font-semibold mb-2 px-1">시장 현황 (AAPL)</h3>
                    <RealTimeStockChart symbol="AAPL" interval="5min" />
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

