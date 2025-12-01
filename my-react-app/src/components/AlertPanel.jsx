import React from 'react'

export default function AlertPanel({ alerts, showAll = false }) {
    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'high':
                return 'bg-red-50 border-red-200'
            case 'medium':
                return 'bg-orange-50 border-orange-200'
            case 'low':
                return 'bg-yellow-50 border-yellow-200'
            default:
                return 'bg-slate-50 border-slate-200'
        }
    }

    const getSeverityIcon = (severity) => {
        switch (severity) {
            case 'high':
                return '🔴'
            case 'medium':
                return '🟠'
            case 'low':
                return '🟡'
            default:
                return '⚪'
        }
    }

    const displayAlerts = showAll ? alerts : alerts.slice(0, 5)

    if (displayAlerts.length === 0) {
        return (
            <div className="bg-white rounded-lg p-4 shadow-sm border">
                <div className="text-sm text-slate-500">알림이 없습니다</div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-lg p-4 shadow-sm border">
            {!showAll && <div className="font-medium mb-2">알림</div>}
            <ul className="flex flex-col gap-2">
                {displayAlerts.map((alert) => (
                    <li
                        key={alert.id}
                        className={`p-3 rounded border ${getSeverityColor(alert.severity)}`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span>{getSeverityIcon(alert.severity)}</span>
                                    <span className="text-sm font-semibold">{alert.message}</span>
                                </div>
                                <div className="text-xs text-slate-500 ml-6">
                                    {alert.symbol} · {alert.time}
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

