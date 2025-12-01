import React from 'react'

export default function KpiCard({ title, value, delta }) {
    return (
        <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="text-sm text-slate-500">{title}</div>
            <div className="flex items-end gap-2">
                <div className="text-2xl font-semibold">{value}</div>
                {delta !== undefined && (
                    <div className={`text-sm ${delta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {delta >= 0 ? `+${delta}%` : `${delta}%`}
                    </div>
                )}
            </div>
        </div>
    )
}