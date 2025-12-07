import React, { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
    // 포트폴리오 데이터
    const [portfolio, setPortfolio] = useState({
        holdings: [
            { symbol: 'AAPL', name: 'Apple Inc.', shares: 10, avgPrice: 150, currentPrice: 175 },
            { symbol: 'MSFT', name: 'Microsoft', shares: 5, avgPrice: 280, currentPrice: 310 },
            { symbol: 'TSLA', name: 'Tesla', shares: 8, avgPrice: 200, currentPrice: 220 },
        ],
        watchlist: ['AAPL', 'MSFT', 'TSLA', 'NVDA', 'GOOGL'],
        cash: 50000, // USD
    })

    // 뉴스 데이터
    const [news, setNews] = useState([
        { id: 1, title: '애플, 새로운 비전 프로 출시 발표', source: '테크크런치', time: '어제', score: 0.85, symbol: 'AAPL' },
        { id: 2, title: '마이크로소프트 AI 파트너십 확대', source: '로이터', time: '오늘', score: 0.92, symbol: 'MSFT' },
        { id: 3, title: '테슬라 생산 목표 달성', source: '블룸버그', time: '2시간 전', score: 0.32, symbol: 'TSLA' },
    ])

    // 알림 데이터
    const [alerts, setAlerts] = useState([
        { id: 1, type: 'volume', message: '테슬라(TSLA) 거래량 급증 감지', time: '3분 전', symbol: 'TSLA', severity: 'high' },
        { id: 2, type: 'price', message: '엔비디아(NVDA) 가격 상승 돌파', time: '22분 전', symbol: 'NVDA', severity: 'medium' },
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

    // 관심종목 제거
    const removeFromWatchlist = (symbol) => {
        setPortfolio(prev => ({
            ...prev,
            watchlist: prev.watchlist.filter(s => s !== symbol)
        }))
    }

    // 모의투자 주문
    const placePaperTrade = (symbol, name, type, shares, price) => {
        const cost = shares * price
        
        // 매수 시 잔액 확인
        if (type === 'buy' && paperTrades.balance < cost) {
            alert('잔액이 부족합니다')
            return false
        }

        // 매도 시 보유량 확인
        if (type === 'sell') {
            const currentPosition = paperTrades.positions.find(p => p.symbol === symbol)
            if (!currentPosition || currentPosition.shares < shares) {
                alert('매도 가능한 주식이 부족합니다')
                return false
            }
        }

        setPaperTrades(prev => {
            const newBalance = type === 'buy' 
                ? prev.balance - cost 
                : prev.balance + cost

            // 보유 주식 업데이트
            let newPositions = [...prev.positions]
            const existingIndex = newPositions.findIndex(p => p.symbol === symbol)

            if (type === 'buy') {
                if (existingIndex >= 0) {
                    // 추가 매수: 수량 증가, 평단가 갱신
                    const pos = newPositions[existingIndex]
                    const totalCost = (pos.shares * pos.avgPrice) + cost
                    const totalShares = pos.shares + shares
                    newPositions[existingIndex] = {
                        ...pos,
                        shares: totalShares,
                        avgPrice: totalCost / totalShares
                    }
                } else {
                    // 신규 매수
                    newPositions.push({ symbol, name, shares, avgPrice: price })
                }
            } else {
                // 매도
                const pos = newPositions[existingIndex]
                if (pos.shares === shares) {
                    // 전량 매도
                    newPositions.splice(existingIndex, 1)
                } else {
                    // 부분 매도
                    newPositions[existingIndex] = {
                        ...pos,
                        shares: pos.shares - shares
                    }
                }
            }

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
                positions: newPositions,
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
            removeFromWatchlist,
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

