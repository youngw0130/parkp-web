import React from 'react'

export default function NewsList({ items, showDetails = false }) {
    const getScoreColor = (score) => {
        if (score > 0.3) return 'text-green-600 bg-green-50'
        if (score < -0.3) return 'text-red-600 bg-red-50'
        return 'text-slate-600 bg-slate-50'
    }

    const getScoreLabel = (score) => {
        if (score > 0.3) return '매우 긍정'
        if (score > 0) return '긍정'
        if (score < -0.3) return '매우 부정'
        if (score < 0) return '부정'
        return '중립'
    }

    return (
        <div className={showDetails ? '' : 'bg-white rounded-lg p-4 shadow-sm border'}>
            {!showDetails && <div className="font-medium mb-2">최신 뉴스 & 감성 분석</div>}
            <ul className="flex flex-col gap-3">
                {items.map((it) => (
                    <li key={it.id} className={`flex justify-between items-start ${showDetails ? 'p-3 border rounded hover:bg-slate-50' : ''}`}>
                        <div className="flex-1">
                            <div className="text-sm font-semibold mb-1">{it.title}</div>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <span>{it.time}</span>
                                <span>·</span>
                                <span>{it.source}</span>
                                {showDetails && it.symbol && (
                                    <>
                                        <span>·</span>
                                        <span className="font-medium">{it.symbol}</span>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className={`ml-4 px-2 py-1 rounded text-xs font-medium ${getScoreColor(it.score)}`}>
                            <div className="text-center">
                                <div className="font-bold">{it.score >= 0 ? `+${it.score.toFixed(2)}` : it.score.toFixed(2)}</div>
                                {showDetails && (
                                    <div className="text-xs mt-0.5">{getScoreLabel(it.score)}</div>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}