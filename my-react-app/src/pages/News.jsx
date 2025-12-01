import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import NewsList from '../components/NewsList'

export default function News() {
    const { news } = useApp()
    const [filter, setFilter] = useState('all')

    const filteredNews = filter === 'all' 
        ? news 
        : news.filter(item => {
            if (filter === 'positive') return item.score > 0
            if (filter === 'negative') return item.score < 0
            return true
        })

    return (
        <main className="flex-1 p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">실시간 뉴스 & 감성 분석</h1>
                <p className="text-slate-600">기업 뉴스, 공시, 커뮤니티 글을 수집하여 감성 스코어와 함께 제공합니다</p>
            </div>

            <div className="flex gap-2 mb-4">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                        filter === 'all'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-slate-700 border'
                    }`}
                >
                    전체
                </button>
                <button
                    onClick={() => setFilter('positive')}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                        filter === 'positive'
                            ? 'bg-green-600 text-white'
                            : 'bg-white text-slate-700 border'
                    }`}
                >
                    긍정적
                </button>
                <button
                    onClick={() => setFilter('negative')}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                        filter === 'negative'
                            ? 'bg-red-600 text-white'
                            : 'bg-white text-slate-700 border'
                    }`}
                >
                    부정적
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border">
                <NewsList items={filteredNews} showDetails />
            </div>
        </main>
    )
}

