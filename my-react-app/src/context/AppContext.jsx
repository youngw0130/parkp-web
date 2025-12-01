import React, { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
    // 포트폴리오 데이터
    const [portfolio, setPortfolio] = useState({
        holdings: [
            { symbol: '005930', name: '삼성전자', shares: 10, avgPrice: 75000, currentPrice: 78000 },
            { symbol: '035720', name: '카카오', shares: 5, avgPrice: 50000, currentPrice: 48000 },
            { symbol: '000660', name: 'SK하이닉스', shares: 8, avgPrice: 120000, currentPrice: 125000 },
        ],
        watchlist: ['005930', '035720', '000660', '005380', '051910'],
        cash: 5000000,
    })

    // 뉴스 데이터
    const [news, setNews] = useState([
        { id: 1, title: '삼성전자, 3분기 실적 발표', source: '한겨레', time: '어제', score: 0.45, symbol: '005930' },
        { id: 2, title: '전기차 배터리 수요 증가', source: '연합뉴스', time: '오늘', score: -0.12, symbol: '000660' },
        { id: 3, title: '카카오, AI 투자 확대', source: '매일경제', time: '2시간 전', score: 0.32, symbol: '035720' },
    ])

    // 알림 데이터
    const [alerts, setAlerts] = useState([
        { id: 1, type: 'volume', message: '삼성전자 거래량 300% 급등', time: '3m 전', symbol: '005930', severity: 'high' },
        { id: 2, type: 'price', message: '카카오 가격 급락 감지', time: '22m 전', symbol: '035720', severity: 'medium' },
    ])

    // 모의투자 데이터
    const [paperTrades, setPaperTrades] = useState({
        balance: 10000000, // 1천만원
        positions: [],
        history: [],
    })

    // 커뮤니티 데이터
    const [community, setCommunity] = useState({
        hotTopics: [
            { id: 1, title: '삼성전자 실적 전망', symbol: '005930', replies: 45, views: 1200 },
            { id: 2, title: '반도체 업황 회복 시그널?', symbol: '000660', replies: 32, views: 890 },
        ],
        topTraders: [
            { id: 1, name: '투자고수', return: 24.5, followers: 1200 },
            { id: 2, name: '차트마스터', return: 18.3, followers: 890 },
        ],
    })

    // 포트폴리오 수익률 계산
    const calculatePortfolioMetrics = () => {
        const totalValue = portfolio.holdings.reduce((sum, holding) => {
            return sum + (holding.shares * holding.currentPrice)
        }, 0)
        
        const totalCost = portfolio.holdings.reduce((sum, holding) => {
            return sum + (holding.shares * holding.avgPrice)
        }, 0)

        const totalReturn = totalValue - totalCost
        const returnRate = totalCost > 0 ? (totalReturn / totalCost) * 100 : 0

        // 변동성 계산 (간단한 예시)
        const prices = portfolio.holdings.map(h => h.currentPrice)
        const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length
        const variance = prices.reduce((sum, price) => sum + Math.pow(price - avgPrice, 2), 0) / prices.length
        const volatility = Math.sqrt(variance) / avgPrice * 100

        // 일일 손익 (간단한 예시)
        const dailyPL = portfolio.holdings.reduce((sum, holding) => {
            const priceChange = (holding.currentPrice - holding.avgPrice) * 0.01 // 1% 가정
            return sum + (priceChange * holding.shares)
        }, 0)

        return {
            totalValue: totalValue + portfolio.cash,
            portfolioValue: totalValue,
            totalReturn,
            returnRate,
            volatility: volatility.toFixed(1),
            dailyPL,
        }
    }

    const metrics = calculatePortfolioMetrics()

    // 주식 추가
    const addToPortfolio = (symbol, name, shares, price) => {
        setPortfolio(prev => ({
            ...prev,
            holdings: [...prev.holdings, { symbol, name, shares, avgPrice: price, currentPrice: price }]
        }))
    }

    // 관심종목 추가
    const addToWatchlist = (symbol) => {
        if (!portfolio.watchlist.includes(symbol)) {
            setPortfolio(prev => ({
                ...prev,
                watchlist: [...prev.watchlist, symbol]
            }))
        }
    }

    // 모의투자 주문
    const placePaperTrade = (symbol, name, type, shares, price) => {
        const cost = shares * price
        if (type === 'buy' && paperTrades.balance < cost) {
            alert('잔액이 부족합니다')
            return false
        }

        setPaperTrades(prev => {
            const newBalance = type === 'buy' 
                ? prev.balance - cost 
                : prev.balance + cost

            const newHistory = [...prev.history, {
                id: Date.now(),
                symbol,
                name,
                type,
                shares,
                price,
                cost,
                timestamp: new Date(),
            }]

            return {
                ...prev,
                balance: newBalance,
                history: newHistory,
            }
        })
        return true
    }

    // 알림 추가
    const addAlert = (type, message, symbol, severity = 'medium') => {
        const newAlert = {
            id: Date.now(),
            type,
            message,
            symbol,
            severity,
            time: '방금 전',
        }
        setAlerts(prev => [newAlert, ...prev])
    }

    return (
        <AppContext.Provider value={{
            portfolio,
            setPortfolio,
            news,
            setNews,
            alerts,
            setAlerts,
            paperTrades,
            setPaperTrades,
            community,
            setCommunity,
            metrics,
            addToPortfolio,
            addToWatchlist,
            placePaperTrade,
            addAlert,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export function useApp() {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useApp must be used within AppProvider')
    }
    return context
}

