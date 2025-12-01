import React from 'react'
import { useApp } from '../context/AppContext'
import HotTopics from '../components/HotTopics'
import TopTraders from '../components/TopTraders'

export default function Community() {
    const { community } = useApp()

    return (
        <main className="flex-1 p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">커뮤니티 & 소셜 트레이딩</h1>
                <p className="text-slate-600">투자자들과 정보를 공유하고 전문가의 전략을 따라해보세요</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <HotTopics topics={community.hotTopics} />
                </div>
                <div>
                    <TopTraders traders={community.topTraders} />
                </div>
            </div>
        </main>
    )
}

