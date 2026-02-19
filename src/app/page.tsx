'use client'

import { useState, useEffect } from 'react'
import { 
  LayoutDashboard, 
  TrendingUp, 
  LineChart, 
  BarChart3, 
  Settings,
  RefreshCw,
  Wallet,
  Activity,
  Clock,
  Brain,
  Bell,
  Search,
  User
} from 'lucide-react'

// Navigation items
const navItems = [
  { id: 'dashboard', label: 'DASHBOARD', icon: LayoutDashboard, active: true },
  { id: 'markets', label: 'MARKETS', icon: TrendingUp },
  { id: 'trading', label: 'TRADING', icon: LineChart },
  { id: 'analytics', label: 'ANALYTICS', icon: BarChart3 },
  { id: 'settings', label: 'SETTINGS', icon: Settings },
]

// Sample crypto data
const cryptoAssets = [
  { 
    symbol: 'BTC', 
    name: 'Bitcoin', 
    price: 104248.42, 
    change: 2.34,
    positions: [
      { entry: 103500, side: 'UP', size: 4.00, pnl: 28.50 },
    ]
  },
  { 
    symbol: 'ETH', 
    name: 'Ethereum', 
    price: 3284.17, 
    change: -1.21,
    positions: [
      { entry: 3250, side: 'UP', size: 2.00, pnl: 68.34 },
      { entry: 3310, side: 'DOWN', size: 1.50, pnl: -38.70 },
    ]
  },
  { 
    symbol: 'SOL', 
    name: 'Solana', 
    price: 198.45, 
    change: 5.67,
    positions: [
      { entry: 190, side: 'UP', size: 3.00, pnl: 25.35 },
    ]
  },
  { 
    symbol: 'XRP', 
    name: 'Ripple', 
    price: 3.12, 
    change: -0.45,
    positions: []
  },
]

// Forecast data
const forecasts = [
  { market: 'Will BTC close above $105,000 this week?', probability: 68, forecast: 'YES' },
  { market: 'Will ETH close above $3,500 this week?', probability: 45, forecast: 'YES' },
  { market: 'Will SOL close above $200 this week?', probability: 72, forecast: 'YES' },
]

// Recent trades
const recentTrades = [
  { time: '19:42', market: 'BTC 5m', direction: 'UP', size: 4.00, odds: 0.52, pnl: 28.50 },
  { time: '19:37', market: 'ETH 5m', direction: 'DOWN', size: 1.50, odds: 0.48, pnl: -38.70 },
  { time: '19:32', market: 'SOL 5m', direction: 'UP', size: 3.00, odds: 0.55, pnl: 25.35 },
  { time: '19:27', market: 'BTC 5m', direction: 'UP', size: 2.00, odds: 0.51, pnl: 15.20 },
  { time: '19:22', market: 'XRP 5m', direction: 'UP', size: 1.00, odds: 0.49, pnl: -12.50 },
]

function formatPrice(price: number): string {
  if (price >= 1000) {
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
  return price.toFixed(2)
}

function formatCurrency(value: number): string {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState('dashboard')
  const [currentDate, setCurrentDate] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentDate(now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }))
    }
    updateTime()
  }, [])

  const refreshData = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  const totalPnL = recentTrades.reduce((sum, trade) => sum + trade.pnl, 0)
  const winningTrades = recentTrades.filter(t => t.pnl > 0).length

  return (
    <div className="flex h-screen bg-[#0d1117] text-white font-sans">
      {/* Left Sidebar */}
      <div className="w-56 bg-[#010409] border-r border-[#21262d] flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-[#21262d]">
          <h1 className="text-lg font-bold text-[#58a6ff] tracking-wide">MISSION CONTROL</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                item.active 
                  ? 'bg-[#1f6feb] text-white' 
                  : 'text-[#8b949e] hover:bg-[#21262d] hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bot Status */}
        <div className="p-4 border-t border-[#21262d]">
          <div className="bg-[#161b22] rounded-lg p-3 border border-[#30363d]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-[#3fb950] rounded-full animate-pulse" />
              <span className="text-xs text-[#8b949e]">Bot Status</span>
            </div>
            <div className="text-xl font-bold text-[#3fb950]">{winningTrades}-{recentTrades.length - winningTrades}</div>
            <div className="text-xs text-[#8b949e]">Wins / Losses</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-14 bg-[#010409] border-b border-[#21262d] flex items-center justify-between px-6">
          {/* Left: User Avatars */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#a371f7] rounded-full flex items-center justify-center">
                <Brain size={14} className="text-white" />
              </div>
              <span className="text-sm font-medium">Apollo</span>
            </div>
            <span className="text-[#30363d]">/</span>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#f0883e] rounded-full flex items-center justify-center">
                <User size={14} className="text-white" />
              </div>
              <span className="text-sm font-medium">Kam</span>
            </div>
          </div>
          
          {/* Right: Icons */}
          <div className="flex items-center gap-2">
            <button 
              onClick={refreshData}
              className="p-2 text-[#8b949e] hover:text-white hover:bg-[#21262d] rounded-md transition-colors"
            >
              <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
            </button>
            <button className="p-2 text-[#8b949e] hover:text-white hover:bg-[#21262d] rounded-md transition-colors">
              <Bell size={18} />
            </button>
            <button className="p-2 text-[#8b949e] hover:text-white hover:bg-[#21262d] rounded-md transition-colors">
              <Search size={18} />
            </button>
            <div className="flex items-center gap-2 ml-2 px-3 py-1.5 bg-[#161b22] rounded-md border border-[#30363d]">
              <Activity size={14} className="text-[#3fb950]" />
              <span className="text-sm text-[#3fb950]">Paper Trading</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Welcome */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Welcome back</h2>
            <p className="text-[#8b949e] text-sm mt-1">{currentDate}</p>
          </div>

          {/* Active Positions Section */}
          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-[#58a6ff]" />
              Your Active Positions
            </h3>
            
            <div className="grid grid-cols-4 gap-4 mb-4">
              {cryptoAssets.map((asset) => (
                <div 
                  key={asset.symbol}
                  className="bg-[#161b22] rounded-lg p-4 border border-[#30363d] hover:border-[#58a6ff] transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{asset.symbol}</span>
                      <span className="text-[#8b949e] text-sm">{asset.name}</span>
                    </div>
                  </div>
                  <div className="text-xl font-semibold">${formatPrice(asset.price)}</div>
                  <div className={`flex items-center gap-1 text-sm mt-1 ${
                    asset.change >= 0 ? 'text-[#3fb950]' : 'text-[#f85149]'
                  }`}>
                    {asset.change >= 0 ? '+' : ''}{asset.change}%
                    <span className="text-[#8b949e] ml-1">24h</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Positions Table */}
            <div className="bg-[#161b22] rounded-lg border border-[#30363d] overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#0d1117]">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-medium text-[#8b949e] uppercase tracking-wider">Asset</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-[#8b949e] uppercase tracking-wider">Entry Price</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-[#8b949e] uppercase tracking-wider">Side</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-[#8b949e] uppercase tracking-wider">Size</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-[#8b949e] uppercase tracking-wider">P/L</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#21262d]">
                  {cryptoAssets.flatMap(asset => 
                    asset.positions.map((pos, idx) => (
                      <tr key={`${asset.symbol}-${idx}`} className="hover:bg-[#21262d]">
                        <td className="px-4 py-3 font-medium">{asset.symbol}</td>
                        <td className="px-4 py-3 text-[#8b949e]">${formatPrice(pos.entry)}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            pos.side === 'UP' ? 'bg-[#238636] text-white' : 'bg-[#da3633] text-white'
                          }`}>
                            {pos.side}
                          </span>
                        </td>
                        <td className="px-4 py-3">${pos.size.toFixed(2)}</td>
                        <td className={`px-4 py-3 text-right font-medium ${pos.pnl >= 0 ? 'text-[#3fb950]' : 'text-[#f85149]'}`}>
                          {pos.pnl >= 0 ? '+' : ''}{formatCurrency(pos.pnl)}
                        </td>
                      </tr>
                    ))
                  )}
                  {cryptoAssets.every(a => a.positions.length === 0) && (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-[#8b949e]">
                        No active positions
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Today's Forecast & Recent Trades */}
          <div className="grid grid-cols-2 gap-6">
            {/* Today's Forecast */}
            <section>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Brain size={18} className="text-[#a371f7]" />
                Today's Forecast
              </h3>
              <div className="bg-[#161b22] rounded-lg border border-[#30363d] overflow-hidden">
                <table className="w-full">
                  <thead className="bg-[#0d1117]">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-medium text-[#8b949e]">Market</th>
                      <th className="text-right px-4 py-3 text-xs font-medium text-[#8b949e]">Probability</th>
                      <th className="text-right px-4 py-3 text-xs font-medium text-[#8b949e]">Forecast</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#21262d]">
                    {forecasts.map((forecast, idx) => (
                      <tr key={idx} className="hover:bg-[#21262d]">
                        <td className="px-4 py-3 text-sm">{forecast.market}</td>
                        <td className="px-4 py-3 text-right text-sm">{forecast.probability}%</td>
                        <td className="px-4 py-3 text-right">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            forecast.forecast === 'YES' ? 'bg-[#238636] text-white' : 'bg-[#da3633] text-white'
                          }`}>
                            {forecast.forecast}
                          </span>
                        </td>
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
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-[#8b949e]">Total P/L:</span>
                  <span className={`font-bold ${totalPnL >= 0 ? 'text-[#3fb950]' : 'text-[#f85149]'}`}>
                    {totalPnL >= 0 ? '+' : ''}{formatCurrency(totalPnL)}
                  </span>
                </div>
              </div>
              <div className="bg-[#161b22] rounded-lg border border-[#30363d] overflow-hidden">
                <table className="w-full">
                  <thead className="bg-[#0d1117]">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-medium text-[#8b949e]">Time</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-[#8b949e]">Market</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-[#8b949e]">Direction</th>
                      <th className="text-right px-4 py-3 text-xs font-medium text-[#8b949e]">Size</th>
                      <th className="text-right px-4 py-3 text-xs font-medium text-[#8b949e]">Odds</th>
                      <th className="text-right px-4 py-3 text-xs font-medium text-[#8b949e]">P/L</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#21262d]">
                    {recentTrades.map((trade, idx) => (
                      <tr key={idx} className="hover:bg-[#21262d]">
                        <td className="px-4 py-3 text-sm text-[#8b949e]">{trade.time}</td>
                        <td className="px-4 py-3 text-sm">{trade.market}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            trade.direction === 'UP' ? 'bg-[#238636] text-white' : 'bg-[#da3633] text-white'
                          }`}>
                            {trade.direction}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right text-sm">${trade.size.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right text-sm text-[#8b949e]">{(trade.odds * 100).toFixed(0)}%</td>
                        <td className={`px-4 py-3 text-right text-sm font-medium ${trade.pnl >= 0 ? 'text-[#3fb950]' : 'text-[#f85149]'}`}>
                          {trade.pnl >= 0 ? '+' : ''}{formatCurrency(trade.pnl)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
