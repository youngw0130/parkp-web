import React, { createContext, useContext, useState } from 'react'

interface Holding {
    symbol: string
    name: string
    shares: number
    avgPrice: number
    currentPrice: number
}

interface Portfolio {
    holdings: Holding[]
    watchlist: string[]
    cash: number
}

interface NewsItem {
    id: number
    title: string
    source: string
    time: string
    score: number
    symbol?: string
}

interface Alert {
    id: number
    type: 'volume' | 'price' | 'news'
    message: string
    time: string
    symbol: string
    severity: 'high' | 'medium' | 'low'
}

interface PaperTrade {
    id: number
    symbol: string
    name: string
    type: 'buy' | 'sell'
    shares: number
    price: number
    cost: number
    timestamp: Date
}

interface PaperTrades {
    balance: number
    positions: any[]
    history: PaperTrade[]
}

interface Community {
    hotTopics: Array<{
        id: number
        title: string
        symbol: string
        replies: number
        views: number
    }>
    topTraders: Array<{
        id: number
        name: string
        return: number
        followers: number
    }>
}

interface AppContextType {
    portfolio: Portfolio
    setPortfolio: React.Dispatch<React.SetStateAction<Portfolio>>
    news: NewsItem[]
    setNews: React.Dispatch<React.SetStateAction<NewsItem[]>>
    alerts: Alert[]
    setAlerts: React.Dispatch<React.SetStateAction<Alert[]>>
    paperTrades: PaperTrades
    setPaperTrades: React.Dispatch<React.SetStateAction<PaperTrades>>
    community: Community
    setCommunity: React.Dispatch<React.SetStateAction<Community>>
    metrics: {
        totalValue: number
        portfolioValue: number
        totalReturn: number
        returnRate: number
        volatility: string
        dailyPL: number
    }
    addToPortfolio: (symbol: string, name: string, shares: number, price: number) => void
    addToWatchlist: (symbol: string) => void
    placePaperTrade: (symbol: string, name: string, type: 'buy' | 'sell', shares: number, price: number) => boolean
    addAlert: (type: 'volume' | 'price' | 'news', message: string, symbol: string, severity?: 'high' | 'medium' | 'low') => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
    // 포트폴리오 데이터
    const [portfolio, setPortfolio] = useState<Portfolio>({
        holdings: [
            { symbol: '005930', name: '삼성전자', shares: 10, avgPrice: 75000, currentPrice: 78000 },
            { symbol: '035720', name: '카카오', shares: 5, avgPrice: 50000, currentPrice: 48000 },
            { symbol: '000660', name: 'SK하이닉스', shares: 8, avgPrice: 120000, currentPrice: 125000 },
        ],
        watchlist: ['005930', '035720', '000660', '005380', '051910'],
        cash: 5000000,
    })

    // 뉴스 데이터
    const [news, setNews] = useState<NewsItem[]>([
        { id: 1, title: '삼성전자, 3분기 실적 발표', source: '한겨레', time: '어제', score: 0.45, symbol: '005930' },
        { id: 2, title: '전기차 배터리 수요 증가', source: '연합뉴스', time: '오늘', score: -0.12, symbol: '000660' },
        { id: 3, title: '카카오, AI 투자 확대', source: '매일경제', time: '2시간 전', score: 0.32, symbol: '035720' },
    ])

    // 알림 데이터
    const [alerts, setAlerts] = useState<Alert[]>([
        { id: 1, type: 'volume', message: '삼성전자 거래량 300% 급등', time: '3m 전', symbol: '005930', severity: 'high' },
        { id: 2, type: 'price', message: '카카오 가격 급락 감지', time: '22m 전', symbol: '035720', severity: 'medium' },
    ])

    // 모의투자 데이터
    const [paperTrades, setPaperTrades] = useState<PaperTrades>({
        balance: 10000000,
        positions: [],
        history: [],
    })

    // 커뮤니티 데이터
    const [community, setCommunity] = useState<Community>({
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
        const totalValue = portfolio.holdings.reduce((sum: number, holding: Holding) => {
            return sum + (holding.shares * holding.currentPrice)
        }, 0)
        
        const totalCost = portfolio.holdings.reduce((sum: number, holding: Holding) => {
            return sum + (holding.shares * holding.avgPrice)
        }, 0)

        const totalReturn = totalValue - totalCost
        const returnRate = totalCost > 0 ? (totalReturn / totalCost) * 100 : 0

        // 변동성 계산
        const prices = portfolio.holdings.map((h: Holding) => h.currentPrice)
        const avgPrice = prices.reduce((a: number, b: number) => a + b, 0) / prices.length
        const variance = prices.reduce((sum: number, price: number) => sum + Math.pow(price - avgPrice, 2), 0) / prices.length
        const volatility = Math.sqrt(variance) / avgPrice * 100

        // 일일 손익
        const dailyPL = portfolio.holdings.reduce((sum: number, holding: Holding) => {
            const priceChange = (holding.currentPrice - holding.avgPrice) * 0.01
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
    const addToPortfolio = (symbol: string, name: string, shares: number, price: number) => {
        setPortfolio((prev: Portfolio) => ({
            ...prev,
            holdings: [...prev.holdings, { symbol, name, shares, avgPrice: price, currentPrice: price }]
        }))
    }

    // 관심종목 추가
    const addToWatchlist = (symbol: string) => {
        if (!portfolio.watchlist.includes(symbol)) {
            setPortfolio((prev: Portfolio) => ({
                ...prev,
                watchlist: [...prev.watchlist, symbol]
            }))
        }
    }

    // 모의투자 주문
    const placePaperTrade = (symbol: string, name: string, type: 'buy' | 'sell', shares: number, price: number): boolean => {
        const cost = shares * price
        if (type === 'buy' && paperTrades.balance < cost) {
            return false
        }

        setPaperTrades((prev: PaperTrades) => {
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
    const addAlert = (type: 'volume' | 'price' | 'news', message: string, symbol: string, severity: 'high' | 'medium' | 'low' = 'medium') => {
        const newAlert: Alert = {
            id: Date.now(),
            type,
            message,
            symbol,
            severity,
            time: '방금 전',
        }
        setAlerts((prev: Alert[]) => [newAlert, ...prev])
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

export type { AppContextType, Portfolio, Holding, NewsItem, Alert, PaperTrades, Community }

