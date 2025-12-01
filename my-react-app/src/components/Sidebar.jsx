import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavLink = ({ to, children }) => {
    const location = useLocation()
    const isActive = location.pathname === to

    return (
        <Link
            to={to}
            className={`py-2 px-3 rounded hover:bg-slate-100 block ${
                isActive ? 'bg-blue-50 text-blue-600 font-medium' : ''
            }`}
        >
            {children}
        </Link>
    )
}

export default function Sidebar() {
    return (
        <aside className="w-64 border-r p-4 hidden md:block bg-white">
            <nav className="flex flex-col gap-2 text-sm">
                <NavLink to="/">대시보드</NavLink>
                <NavLink to="/watchlist">관심종목</NavLink>
                <NavLink to="/news">뉴스</NavLink>
                <NavLink to="/alerts">알림</NavLink>
                <NavLink to="/paper-trading">모의투자</NavLink>
                <NavLink to="/community">커뮤니티</NavLink>
            </nav>
        </aside>
    )
}
