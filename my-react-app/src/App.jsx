import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Watchlist from './pages/Watchlist'
import News from './pages/News'
import Alerts from './pages/Alerts'
import PaperTrading from './pages/PaperTrading'
import Community from './pages/Community'

export default function App() {
    return (
        <AppProvider>
            <Router>
                <div className="min-h-screen">
                    <Topbar />
                    <div className="flex">
                        <Sidebar />
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/watchlist" element={<Watchlist />} />
                            <Route path="/news" element={<News />} />
                            <Route path="/alerts" element={<Alerts />} />
                            <Route path="/paper-trading" element={<PaperTrading />} />
                            <Route path="/community" element={<Community />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </AppProvider>
    )
}
