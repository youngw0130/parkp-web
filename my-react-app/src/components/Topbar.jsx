import React from 'react'

export default function Topbar() {
    return (
        <header className="flex items-center justify-between p-4 border-b bg-white">
            <div className="flex items-center gap-4">
                <button className="text-xl font-semibold">📈 MyInvest</button>
                <div className="hidden md:block text-sm text-slate-600">실시간 시장 대시보드</div>
            </div>

            <div className="flex items-center gap-3">
                <input
                    className="px-3 py-1 border rounded-md text-sm w-56"
                    placeholder="종목 검색"
                />
                <div className="text-sm text-slate-700">윤건우님</div>
            </div>
        </header>
    )
}