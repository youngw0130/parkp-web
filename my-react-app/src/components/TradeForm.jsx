import React, { useState } from 'react'
import { useApp } from '../context/AppContext'

export default function TradeForm() {
    const { placePaperTrade } = useApp()
    const [formData, setFormData] = useState({
        symbol: '',
        name: '',
        type: 'buy',
        shares: '',
        price: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const shares = parseInt(formData.shares)
        const price = parseInt(formData.price)

        if (!formData.symbol || !formData.name || !shares || !price) {
            alert('모든 필드를 입력해주세요')
            return
        }

        const success = placePaperTrade(
            formData.symbol,
            formData.name,
            formData.type,
            shares,
            price
        )

        if (success) {
            alert(`${formData.type === 'buy' ? '매수' : '매도'} 주문이 완료되었습니다`)
            setFormData({
                symbol: '',
                name: '',
                type: 'buy',
                shares: '',
                price: '',
            })
        }
    }

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">매매 주문</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            종목코드
                        </label>
                        <input
                            type="text"
                            value={formData.symbol}
                            onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="예: 005930"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            종목명
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="예: 삼성전자"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        매매 구분
                    </label>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, type: 'buy' })}
                            className={`flex-1 px-4 py-2 rounded-md font-medium ${
                                formData.type === 'buy'
                                    ? 'bg-red-600 text-white'
                                    : 'bg-slate-100 text-slate-700'
                            }`}
                        >
                            매수
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, type: 'sell' })}
                            className={`flex-1 px-4 py-2 rounded-md font-medium ${
                                formData.type === 'sell'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-100 text-slate-700'
                            }`}
                        >
                            매도
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            수량
                        </label>
                        <input
                            type="number"
                            value={formData.shares}
                            onChange={(e) => setFormData({ ...formData, shares: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="주"
                            min="1"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            가격
                        </label>
                        <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="₩"
                            min="1"
                        />
                    </div>
                </div>

                {formData.shares && formData.price && (
                    <div className="p-3 bg-slate-50 rounded-md">
                        <div className="text-sm text-slate-600">예상 금액</div>
                        <div className="text-lg font-semibold">
                            ₩{(parseInt(formData.shares || 0) * parseInt(formData.price || 0)).toLocaleString()}
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700"
                >
                    {formData.type === 'buy' ? '매수' : '매도'} 주문하기
                </button>
            </form>
        </div>
    )
}

