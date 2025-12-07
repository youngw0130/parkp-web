import React from 'react'

export default function KpiCard({ title, value, delta }) {
    const numericDelta = parseFloat(delta);
    const formattedDelta = !isNaN(numericDelta) ? numericDelta.toFixed(2) : delta;
    const isPositive = !isNaN(numericDelta) && numericDelta >= 0;

    return (
        <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="text-sm text-slate-500">{title}</div>
            <div className="flex items-end gap-2">
                <div className="text-2xl font-semibold">{value}</div>
                {delta !== undefined && (
                    <div className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {isPositive ? '+' : ''}{formattedDelta}%
                    </div>
                )}
            </div>
        </div>
    )
}