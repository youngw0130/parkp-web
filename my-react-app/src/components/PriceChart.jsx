import React from 'react'
import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
    ComposedChart,
} from 'recharts'

export default function PriceChart({ data }) {
    return (
        <div className="bg-white rounded-lg p-4 shadow-sm border h-72">
            <div className="flex justify-between items-center mb-2">
                <div className="font-medium">삼성전자 (005930)</div>
                <div className="text-sm text-slate-500">Realtime · 1D</div>
            </div>
            <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Line yAxisId="left" type="monotone" dataKey="price" stroke="#0F62FE" dot={false} strokeWidth={2} />
                        <Bar yAxisId="right" dataKey="volume" barSize={12} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}