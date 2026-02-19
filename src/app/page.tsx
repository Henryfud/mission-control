'use client'

import { useState, useEffect } from 'react'
import { 
  LayoutDashboard,
  TrendingUp,
  LineChart,
  BarChart3,
  Settings,
  RefreshCw,
  Activity,
  Bell,
  Search,
  Brain,
  User,
  Clock,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

// Navigation
const navItems = [
  { id: 'dashboard', label: 'DASHBOARD', icon: LayoutDashboard, active: true },
  { id: 'markets', label: 'MARKETS', icon: TrendingUp },
  { id: 'trading', label: 'TRADING', icon: LineChart },
  { id: 'analytics', label: 'ANALYTICS', icon: BarChart3 },
  { id: 'settings', label: 'SETTINGS', icon: Settings },
]

const cryptoAssets = [
  { symbol: 'BTC', name: 'Bitcoin', price: 104248.42, change: 2.34 },
  { symbol: 'ETH', name: 'Ethereum', price: 3284.17, change: -1.21 },
  { symbol: 'SOL', name: 'Solana', price: 198.45, change: 5.67 },
  { symbol: 'XRP', name: 'Ripple', price: 3.12, change: -0.45 },
]

const positions = [
  { asset: 'BTC', entry: 103500, side: 'UP', size: 4.00, pnl: 28.50 },
  { asset: 'ETH', entry: 3250, side: 'UP', size: 2.00, pnl: 68.34 },
  { asset: 'ETH', entry: 3310, side: 'DOWN', size: 1.50, pnl: -38.70 },
  { asset: 'SOL', entry: 190, side: 'UP', size: 3.00, pnl: 25.35 },
]

const forecasts = [
  { market: 'Will BTC close above $105k this week?', probability: 68 },
  { market: 'Will ETH close above $3.5k this week?', probability: 45 },
  { market: 'Will SOL close above $200 this week?', probability: 72 },
]

const recentTrades = [
  { time: '19:42', market: 'BTC 5m', direction: 'UP', size: 4.00, pnl: 28.50 },
  { time: '19:37', market: 'ETH 5m', direction: 'DOWN', size: 1.50, pnl: -38.70 },
  { time: '19:32', market: 'SOL 5m', direction: 'UP', size: 3.00, pnl: 25.35 },
  { time: '19:27', market: 'BTC 5m', direction: 'UP', size: 2.00, pnl: 15.20 },
]

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState('dashboard')
  const [currentDate, setCurrentDate] = useState('')

  useEffect(() => {
    const now = new Date()
    setCurrentDate(now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
  }, [])

  const totalPnL = recentTrades.reduce((sum, t) => sum + t.pnl, 0)

  return (
    <div className="flex h-screen bg-[#0d1117] text-white font-sans">
      {/* Left Sidebar - Narrow, dark */}
      <div className="w-48 bg-[#010409] border-r border-[#21262d] flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-[#21262d]">
          <h1 className="text-lg font-bold text-[#58a6ff] tracking-wide">MISSION CONTROL</h1>
        </div>

        {/* Nav - Icons on left, labels indented */}
        <nav className="flex-1 p-2 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                activeNav === item.id 
                  ? 'bg-[#1f6feb] text-white' 
                  : 'text-[#8b949e] hover:bg-[#21262d] hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bot Status at bottom */}
        <div className="p-4 border-t border-[#21262d]">
          <div className="bg-[#161b22] rounded-lg p-3 border border-[#30363d]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-[#3fb950] rounded-full animate-pulse" />
              <span className="text-xs text-[#8b949e]">Bot Status</span>
            </div>
            <div className="text-xl font-bold text-[#3fb950]">5-0</div>
            <div className="text-xs text-[#8b949e]">Wins / Losses</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Logo left, user icons right */}
        <header className="h-14 bg-[#010409] border-b border-[#21262d] flex items-center justify-between px-6">
          {/* Left - Nothing extra, logo is in sidebar */}
          <div></div>
          
          {/* Right - User icons + actions */}
          <div className="flex items-center gap-4">
            {/* Apollo */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#a371f7] rounded-full flex items-center justify-center">
                <Brain size={12} className="text-white" />
              </div>
              <span className="text-sm font-medium">Apollo</span>
            </div>
            
            <span className="text-[#30363d]">/</span>
            
            {/* Kam */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#f0883e] rounded-full flex items-center justify-center">
                <User size={12} className="text-white" />
              </div>
              <span className="text-sm font-medium">Kam</span>
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-[#21262d]" />

            {/* Icons */}
            <button className="p-1.5 text-[#8b949e] hover:text-white hover:bg-[#21262d] rounded-md">
              <RefreshCw size={16} />
            </button>
            <button className="p-1.5 text-[#8b949e] hover:text-white hover:bg-[#21262d] rounded-md">
              <Bell size={16} />
            </button>
            <button className="p-1.5 text-[#8b949e] hover:text-white hover:bg-[#21262d] rounded-md">
              <Search size={16} />
            </button>

            {/* Paper Trading badge */}
            <div className="flex items-center gap-1.5 px-2 py-1 bg-[#161b22] rounded border border-[#30363d]">
              <Activity size={12} className="text-[#3fb950]" />
              <span className="text-xs text-[#3fb950]">Paper Trading</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {/* Welcome */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Welcome back</h2>
            <p className="text-[#8b949e] text-sm mt-1">{currentDate}</p>
          </div>

          {/* Main Grid - Left: Positions, Right: Forecast + Trades */}
          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - 2/3 width */}
            <div className="col-span-2">
              {/* Active Positions */}
              <section>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp size={18} className="text-[#58a6ff]" />
                  Your Active Positions
                </h3>
                
                {/* Crypto Cards */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {cryptoAssets.map((asset) => (
                    <div 
                      key={asset.symbol}
                      className="bg-[#161b22] rounded-lg p-3 border border-[#30363d]"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm">{asset.symbol}</span>
                        <span className="text-[#8b949e] text-xs">{asset.name}</span>
                      </div>
                      <div className="text-lg font-semibold">${asset.price.toLocaleString()}</div>
                      <div className={`flex items-center gap-1 text-xs mt-1 ${
                        asset.change >= 0 ? 'text-[#3fb950]' : 'text-[#f85149]'
                      }`}>
                        {asset.change >= 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                        {Math.abs(asset.change)}%
                      </div>
                    </div>
                  ))}
                </div>

                {/* Positions Table */}
                <div className="bg-[#161b22] rounded-lg border border-[#30363d] overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-[#0d1117]">
                      <tr>
                        <th className="text-left px-4 py-2.5 text-xs font-medium text-[#8b949e]">Asset</th>
                        <th className="text-left px-4 py-2.5 text-xs font-medium text-[#8b949e]">Entry Price</th>
                        <th className="text-left px-4 py-2.5 text-xs font-medium text-[#8b949e]">Side</th>
                        <th className="text-left px-4 py-2.5 text-xs font-medium text-[#8b949e]">Size</th>
                        <th className="text-right px-4 py-2.5 text-xs font-medium text-[#8b949e]">P/L</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#21262d]">
                      {positions.map((pos, i) => (
                        <tr key={i} className="hover:bg-[#21262d]">
                          <td className="px-4 py-3 font-medium">{pos.asset}</td>
                          <td className="px-4 py-3 text-[#8b949e]">${pos.entry.toLocaleString()}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              pos.side === 'UP' ? 'bg-[#238636] text-white' : 'bg-[#da3633] text-white'
                            }`}>
                              {pos.side}
                            </span>
                          </td>
                          <td className="px-4 py-3">${pos.size.toFixed(2)}</td>
                          <td className={`px-4 py-3 text-right font-medium ${
                            pos.pnl >= 0 ? 'text-[#3fb950]' : 'text-[#f85149]'
                          }`}>
                            {pos.pnl >= 0 ? '+' : ''}{pos.pnl.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            {/* Right Column - 1/3 width */}
            <div className="space-y-6">
              {/* Today's Forecast */}
              <section>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Brain size={18} className="text-[#a371f7]" />
                  Today's Forecast
                </h3>
                <div className="bg-[#161b22] rounded-lg border border-[#30363d] overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-[#0d1117]">
                      <tr>
                        <th className="text-left px-3 py-2 text-xs font-medium text-[#8b949e]">Market</th>
                        <th className="text-right px-3 py-2 text-xs font-medium text-[#8b949e]">Prob</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#21262d]">
                      {forecasts.map((f, i) => (
                        <tr key={i} className="hover:bg-[#21262d]">
                          <td className="px-3 py-2.5 text-xs">{f.market}</td>
                          <td className="px-3 py-2.5 text-right text-xs">{f.probability}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Recent Trades */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Clock size={18} className="text-[#f0883e]" />
                    Recent Trades
                  </h3>
                  <span className={`text-sm font-bold ${
                    totalPnL >= 0 ? 'text-[#3fb950]' : 'text-[#f85149]'
                  }`}>
                    ${totalPnL >= 0 ? '+' : ''}{totalPnL.toFixed(2)}
                  </span>
                </div>
                <div className="bg-[#161b22] rounded-lg border border-[#30363d] overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-[#0d1117]">
                      <tr>
                        <th className="text-left px-3 py-2 text-xs font-medium text-[#8b949e]">Time</th>
                        <th className="text-left px-3 py-2 text-xs font-medium text-[#8b949e]">Market</th>
                        <th className="text-left px-3 py-2 text-xs font-medium text-[#8b949e]">Dir</th>
                        <th className="text-right px-3 py-2 text-xs font-medium text-[#8b949e]">P/L</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#21262d]">
                      {recentTrades.map((t, i) => (
                        <tr key={i} className="hover:bg-[#21262d]">
                          <td className="px-3 py-2.5 text-[#8b949e] text-xs">{t.time}</td>
                          <td className="px-3 py-2.5 text-xs">{t.market}</td>
                          <td className="px-3 py-2.5">
                            <span className={`px-1.5 py-0.5 rounded text-xs ${
                              t.direction === 'UP' ? 'bg-[#238636] text-white' : 'bg-[#da3633] text-white'
                            }`}>
                              {t.direction}
                            </span>
                          </td>
                          <td className={`px-3 py-2.5 text-right text-xs font-medium ${
                            t.pnl >= 0 ? 'text-[#3fb950]' : 'text-[#f85149]'
                          }`}>
                            {t.pnl >= 0 ? '+' : ''}{t.pnl.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
