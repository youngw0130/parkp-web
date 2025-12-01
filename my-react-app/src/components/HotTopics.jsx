import React from 'react'

export default function HotTopics({ topics }) {
    return (
        <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">인기 토론</h2>
            </div>
            <div className="divide-y">
                {topics.map((topic) => (
                    <div key={topic.id} className="p-4 hover:bg-slate-50 cursor-pointer">
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                                <h3 className="font-medium mb-1">{topic.title}</h3>
                                <div className="flex items-center gap-3 text-sm text-slate-500">
                                    <span>{topic.symbol}</span>
                                    <span>💬 {topic.replies}</span>
                                    <span>👁️ {topic.views}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

