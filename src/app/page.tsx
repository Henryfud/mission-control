'use client'

import { useState, useEffect } from 'react'
import { 
  CheckSquare,
  FileCheck,
  Users,
  Calendar,
  FolderKanban,
  Brain,
  FileText,
  User,
  Building2,
  Monitor,
  RefreshCw,
  Activity,
  Bell,
  Search,
  Plus,
  ChevronRight,
  Clock,
  Play,
  CheckCircle2,
  Circle,
  Lightbulb,
  PenTool,
  Image,
  Video,
  Check,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  X,
  File
} from 'lucide-react'

// Types
type TaskStatus = 'backlog' | 'todo' | 'in_progress' | 'review' | 'done'
type TaskAssignee = 'apollo' | 'kam'
type NavView = 'dashboard' | 'tasks' | 'content' | 'calendar' | 'memory' | 'team' | 'office'

interface Task {
  id: number
  title: string
  status: TaskStatus
  assignee: TaskAssignee
  project: string
  dueDate?: string
}

interface ContentItem {
  id: number
  title: string
  stage: 'ideas' | 'scripting' | 'thumbnail' | 'filming' | 'published'
  script?: string
}

interface CalendarEvent {
  id: number
  title: string
  time: string
  type: 'cron' | 'scheduled'
  assignedTo: TaskAssignee
}

interface Memory {
  id: number
  title: string
  content: string
  date: string
  type: 'decision' | 'result' | 'system'
}

interface OfficeAgent {
  id: number
  name: string
  role: string
  status: 'working' | 'idle' | 'waiting'
  currentTask: string
  color: string
}

// Sample Data
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
  { time: '19:42', market: 'BTC 5m', direction: 'UP', size: 4.00, odds: 52, pnl: 28.50 },
  { time: '19:37', market: 'ETH 5m', direction: 'DOWN', size: 1.50, odds: 48, pnl: -38.70 },
  { time: '19:32', market: 'SOL 5m', direction: 'UP', size: 3.00, odds: 55, pnl: 25.35 },
  { time: '19:27', market: 'BTC 5m', direction: 'UP', size: 2.00, odds: 51, pnl: 15.20 },
]

const initialTasks: Task[] = [
  { id: 1, title: 'Build Mission Control Dashboard', status: 'in_progress', assignee: 'apollo', project: 'Infrastructure', dueDate: 'Today' },
  { id: 2, title: 'Optimize trading bot win rate', status: 'backlog', assignee: 'apollo', project: 'Trading' },
  { id: 3, title: 'Research new signal strategies', status: 'todo', assignee: 'apollo', project: 'Research' },
  { id: 4, title: 'Review Q1 trading performance', status: 'backlog', assignee: 'kam', project: 'Trading' },
  { id: 5, title: 'Deploy to production', status: 'review', assignee: 'apollo', project: 'Infrastructure' },
]

const contentPipeline: ContentItem[] = [
  { id: 1, title: 'How to Build AI Agents', stage: 'filming' },
  { id: 2, title: 'Polymarket Trading Bot Tutorial', stage: 'scripting', script: 'In this video...' },
  { id: 3, title: 'OpenClaw vs Custom Agents', stage: 'ideas' },
]

const calendarEvents: CalendarEvent[] = [
  { id: 1, title: 'Daily trading bot check', time: '09:00', type: 'cron', assignedTo: 'apollo' },
  { id: 2, title: 'Research signal thresholds', time: '11:00', type: 'scheduled', assignedTo: 'apollo' },
  { id: 3, title: 'Content pipeline review', time: 'Daily 20:00', type: 'cron', assignedTo: 'apollo' },
]

const memories: Memory[] = [
  { id: 1, title: 'Trading Strategy V4', content: 'Use OBI + RSI confluence for 5-minute BTC markets.', date: 'Today', type: 'decision' },
  { id: 2, title: 'Bot Win Rate 5-0', content: 'Started with 5 consecutive wins using OBI:0.81 signal.', date: 'Today', type: 'result' },
  { id: 3, title: 'Vercel Deployment', content: 'Deployed Mission Control to Vercel.', date: 'Today', type: 'system' },
]

const officeAgents: OfficeAgent[] = [
  { id: 1, name: 'Apollo', role: 'Lead Developer', status: 'working', currentTask: 'Building Mission Control', color: 'bg-purple-500' },
  { id: 2, name: 'Research Agent', role: 'Researcher', status: 'idle', currentTask: 'Waiting for task', color: 'bg-green-500' },
  { id: 3, name: 'Trading Bot v9', role: 'Trader', status: 'working', currentTask: 'Monitoring Polymarket', color: 'bg-blue-500' },
  { id: 4, name: 'Writer Agent', role: 'Content Creator', status: 'waiting', currentTask: 'Pending script', color: 'bg-yellow-500' },
]

const navItems = [
  { id: 'dashboard', label: 'DASHBOARD', icon: TrendingUp },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'content', label: 'Content', icon: FileCheck },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'memory', label: 'Memory', icon: Brain },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'office', label: 'Office', icon: Building2 },
]

const contentStages = [
  { id: 'ideas', label: 'Ideas', icon: Lightbulb },
  { id: 'scripting', label: 'Scripting', icon: PenTool },
  { id: 'thumbnail', label: 'Thumbnail', icon: Image },
  { id: 'filming', label: 'Filming', icon: Video },
  { id: 'published', label: 'Published', icon: Check },
]

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState<NavView>('dashboard')
  const [currentDate, setCurrentDate] = useState('')
  const [tasks, setTasks] = useState(initialTasks)
  const [content, setContent] = useState(contentPipeline)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskAssignee, setNewTaskAssignee] = useState<TaskAssignee>('apollo')

  useEffect(() => {
    const now = new Date()
    setCurrentDate(now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
  }, [])

  const addTask = () => {
    if (!newTaskTitle.trim()) return
    setTasks([...tasks, { id: tasks.length + 1, title: newTaskTitle, status: 'backlog', assignee: newTaskAssignee, project: 'General' }])
    setNewTaskTitle('')
  }

  const getTasksByStatus = (status: TaskStatus) => tasks.filter(t => t.status === status)
  const getTasksByAssignee = (assignee: TaskAssignee) => tasks.filter(t => t.assignee === assignee)
  const getContentByStage = (stage: string) => content.filter(c => c.stage === stage)
  const totalPnL = recentTrades.reduce((sum, t) => sum + t.pnl, 0)

  // DASHBOARD VIEW (Trading)
  const renderDashboard = () => (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Welcome back</h2>
        <p className="text-[#8b949e] text-sm mt-1">{currentDate}</p>
      </div>

      {/* Active Positions Cards */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-[#58a6ff]" />
          Your Active Positions
        </h3>
        <div className="grid grid-cols-4 gap-4 mb-4">
          {cryptoAssets.map((asset) => (
            <div key={asset.symbol} className="bg-[#161b22] rounded-lg p-4 border border-[#30363d]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold">{asset.symbol}</span>
                <span className="text-[#8b949e] text-sm">{asset.name}</span>
              </div>
              <div className="text-xl font-semibold">${asset.price.toLocaleString()}</div>
              <div className={`flex items-center gap-1 text-sm mt-1 ${asset.change >= 0 ? 'text-[#3fb950]' : 'text-[#f85149]'}`}>
                {asset.change >= 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                {Math.abs(asset.change)}% <span className="text-[#8b949e]">24h</span>
              </div>
            </div>
          ))}
        </div>

        {/* Positions Table */}
        <div className="bg-[#161b22] rounded-lg border border-[#30363d] overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#0d1117]">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#8b949e]">Asset</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#8b949e]">Entry</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#8b949e]">Side</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#8b949e]">Size</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-[#8b949e]">P/L</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#21262d]">
              {positions.map((pos, i) => (
                <tr key={i} className="hover:bg-[#21262d]">
                  <td className="px-4 py-3 font-medium">{pos.asset}</td>
                  <td className="px-4 py-3 text-[#8b949e]">${pos.entry.toLocaleString()}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-xs ${pos.side === 'UP' ? 'bg-[#238636]' : 'bg-[#da3633]'}`}>{pos.side}</span></td>
                  <td className="px-4 py-3">${pos.size}</td>
                  <td className={`px-4 py-3 text-right ${pos.pnl >= 0 ? 'text-[#3fb950]' : 'text-[#f85149]'}`}>${pos.pnl >= 0 ? '+' : ''}{pos.pnl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Forecast & Recent Trades */}
      <div className="grid grid-cols-2 gap-6">
        <section>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Brain size={18} className="text-[#a371f7]" />
            Today's Forecast
          </h3>
          <div className="bg-[#161b22] rounded-lg border border-[#30363d]">
            <table className="w-full">
              <thead className="bg-[#0d1117]">
                <tr><th className="text-left px-4 py-3 text-xs font-medium text-[#8b949e]">Market</th><th className="text-right px-4 py-3 text-xs font-medium text-[#8b949e]">Prob</th></tr>
              </thead>
              <tbody className="divide-y divide-[#21262d]">
                {forecasts.map((f, i) => (
                  <tr key={i} className="hover:bg-[#21262d]">
                    <td className="px-4 py-3 text-sm">{f.market}</td>
                    <td className="px-4 py-3 text-right text-sm">{f.probability}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Clock size={18} className="text-[#f0883e]" />
              Recent Trades
            </h3>
            <span className={`font-bold ${totalPnL >= 0 ? 'text-[#3fb950]' : 'text-[#f85149]'}`}>${totalPnL >= 0 ? '+' : ''}{totalPnL}</span>
          </div>
          <div className="bg-[#161b22] rounded-lg border border-[#30363d]">
            <table className="w-full">
              <thead className="bg-[#0d1117]">
                <tr><th className="text-left px-4 py-3 text-xs font-medium text-[#8b949e]">Time</th><th className="text-left px-4 py-3 text-xs font-medium text-[#8b949e]">Market</th><th className="text-left px-4 py-3 text-xs font-medium text-[#8b949e]">Dir</th><th className="text-right px-4 py-3 text-xs font-medium text-[#8b949e]">P/L</th></tr>
              </thead>
              <tbody className="divide-y divide-[#21262d]">
                {recentTrades.map((t, i) => (
                  <tr key={i} className="hover:bg-[#21262d]">
                    <td className="px-4 py-3 text-sm text-[#8b949e]">{t.time}</td>
                    <td className="px-4 py-3 text-sm">{t.market}</td>
                    <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-xs ${t.direction === 'UP' ? 'bg-[#238636]' : 'bg-[#da3633]'}`}>{t.direction}</span></td>
                    <td className={`px-4 py-3 text-right ${t.pnl >= 0 ? 'text-[#3fb950]' : 'text-[#f85149]'}`}>${t.pnl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )

  // TASKS VIEW
  const renderTasks = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Tasks Board</h2>
        <div className="flex items-center gap-3">
          <select value={newTaskAssignee} onChange={(e) => setNewTaskAssignee(e.target.value as TaskAssignee)} className="bg-[#161b22] border border-[#30363d] rounded-lg px-3 py-2 text-sm">
            <option value="apollo">Apollo</option>
            <option value="kam">Kam</option>
          </select>
          <input type="text" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTask()} placeholder="Add task..." className="bg-[#161b22] border border-[#30363d] rounded-lg px-3 py-2 text-sm w-64" />
          <button onClick={addTask} className="p-2 bg-[#238636] rounded-lg"><Plus size={18} /></button>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {[{id: 'backlog', l: 'Backlog'}, {id: 'todo', l: 'To Do'}, {id: 'in_progress', l: 'In Progress'}, {id: 'review', l: 'Review'}, {id: 'done', l: 'Done'}].map(col => (
          <div key={col.id} className="bg-[#161b22] rounded-lg p-4 border border-[#30363d] min-h-[300px]">
            <h3 className="font-medium mb-4 text-[#8b949e]">{col.l} <span className="ml-auto text-xs bg-[#21262d] px-2 rounded">{getTasksByStatus(col.id as TaskStatus).length}</span></h3>
            <div className="space-y-3">
              {getTasksByStatus(col.id as TaskStatus).map(task => (
                <div key={task.id} className="bg-[#0d1117] p-3 rounded-lg border border-[#30363d]">
                  <div className="font-medium text-sm">{task.title}</div>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs px-2 py-0.5 rounded ${task.assignee === 'apollo' ? 'bg-purple-500/20 text-purple-400' : 'bg-orange-500/20 text-orange-400'}`}>{task.assignee === 'apollo' ? 'Apollo' : 'Kam'}</span>
                    <span className="text-xs text-[#8b949e]">{task.project}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // CONTENT VIEW
  const renderContent = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Content Pipeline</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#238636] rounded-lg"><Plus size={16} />Add Idea</button>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {contentStages.map(stage => (
          <div key={stage.id} className="bg-[#161b22] rounded-lg p-4 border border-[#30363d] min-h-[250px]">
            <h3 className="font-medium mb-4 text-[#8b949e]">{stage.label} <span className="ml-auto text-xs bg-[#21262d] px-2 rounded">{getContentByStage(stage.id).length}</span></h3>
            <div className="space-y-3">
              {getContentByStage(stage.id).map(item => (
                <div key={item.id} className="bg-[#0d1117] p-3 rounded-lg border border-[#30363d]">
                  <div className="font-medium text-sm">{item.title}</div>
                  {item.script && <div className="text-xs text-[#8b949e] mt-1 line-clamp-2">{item.script}</div>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // CALENDAR VIEW
  const renderCalendar = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Calendar</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#238636] rounded-lg"><Plus size={16} />Add Event</button>
      </div>
      <div className="bg-[#161b22] rounded-lg p-4 mb-6 border border-[#3fb950]/30">
        <div className="flex items-center gap-2"><div className="w-2 h-2 bg-[#3fb950] rounded-full animate-pulse" /><h3 className="font-medium">Always Running</h3></div>
        <p className="text-sm text-[#8b949e]">Bot monitoring every 30 seconds</p>
      </div>
      <div className="bg-[#161b22] rounded-lg p-6 border border-[#30363d]">
        <h3 className="font-medium mb-4">Scheduled Tasks & Cron Jobs</h3>
        <div className="space-y-3">
          {calendarEvents.map(e => (
            <div key={e.id} className="flex items-center gap-4 p-3 bg-[#0d1117] rounded-lg">
              <div className={`w-2 h-2 rounded-full ${e.type === 'cron' ? 'bg-[#a371f7]' : 'bg-[#58a6ff]'}`} />
              <div className="w-24 text-sm font-medium">{e.time}</div>
              <div className="flex-1">{e.title}</div>
              <span className={`text-xs px-2 py-1 rounded ${e.type === 'cron' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>{e.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // MEMORY VIEW
  const renderMemory = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Memory</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e]" size={16} />
          <input type="text" placeholder="Search memories..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-[#161b22] border border-[#30363d] rounded-lg pl-10 pr-4 py-2 w-80 text-sm" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          {memories.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase())).map(m => (
            <div key={m.id} className="bg-[#161b22] rounded-lg p-6 border border-[#30363d]">
              <div className="flex items-center gap-2 mb-2"><Brain size={16} className="text-[#a371f7]" /><span className="text-xs text-[#8b949e]">{m.date}</span><span className={`text-xs px-2 py-0.5 rounded ${m.type === 'decision' ? 'bg-blue-500/20 text-blue-400' : m.type === 'result' ? 'bg-green-500/20 text-green-400' : 'bg-purple-500/20 text-purple-400'}`}>{m.type}</span></div>
              <h3 className="font-bold text-lg">{m.title}</h3>
              <p className="text-sm text-[#8b949e] mt-2">{m.content}</p>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-sm font-medium text-[#8b949e] mb-4">Categories</h3>
          <div className="space-y-2">{['Decisions', 'Results', 'System'].map(c => <button key={c} className="w-full text-left px-4 py-2 bg-[#161b22] rounded-lg text-sm border border-[#30363d]">{c}</button>)}</div>
        </div>
      </div>
    </div>
  )

  // TEAM VIEW
  const renderTeam = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Team</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#238636] rounded-lg"><Plus size={16} />Add Agent</button>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          {[{name: 'Apollo', role: 'CEO / Lead Developer', status: 'active', task: 'Building Mission Control', color: 'bg-purple-500'}, {name: 'Research Agent', role: 'Deep Research', status: 'idle', task: 'Waiting for task', color: 'bg-green-500'}, {name: 'Trading Bot v9', role: 'Execute Trades', status: 'working', task: 'Monitoring OBI + RSI', color: 'bg-blue-500'}].map(m => (
            <div key={m.name} className="bg-[#161b22] p-6 rounded-lg border border-[#30363d]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${m.color} rounded-full flex items-center justify-center text-lg font-bold`}>{m.name[0]}</div>
                  <div><h3 className="font-bold">{m.name}</h3><p className="text-sm text-[#8b949e]">{m.role}</p></div>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${m.status === 'working' ? 'bg-green-500/20 text-green-400' : m.status === 'active' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{m.status}</span>
              </div>
              <div className="mt-4 pt-4 border-t border-[#30363d]"><div className="text-xs text-[#8b949e]">Current Task</div><div className="text-sm mt-1">{m.task}</div></div>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <div className="bg-[#161b22] p-4 rounded-lg border border-[#30363d]"><div className="text-2xl font-bold">3</div><div className="text-sm text-[#8b949e]">Total Agents</div></div>
          <div className="bg-[#161b22] p-4 rounded-lg border border-[#30363d]"><div className="text-2xl font-bold text-[#3fb950]">1</div><div className="text-sm text-[#8b949e]">Working</div></div>
          <div className="bg-[#161b22] p-4 rounded-lg border border-[#30363d]"><div className="text-2xl font-bold text-[#f0883e]">1</div><div className="text-sm text-[#8b949e]">Idle</div></div>
        </div>
      </div>
    </div>
  )

  // OFFICE VIEW
  const renderOffice = () => {
    const selected = selectedAgent ? officeAgents.find(a => a.id === selectedAgent) : null
    return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Digital Office</h2>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 grid grid-cols-2 gap-4">
          {officeAgents.map(agent => (
            <button key={agent.id} onClick={() => setSelectedAgent(agent.id)} className={`text-left p-5 rounded-xl border transition-all hover:scale-[1.02] ${selectedAgent === agent.id ? 'ring-2 ring-[#58a6ff] bg-[#161b22]' : 'bg-[#161b22] border-[#30363d] hover:border-[#58a6ff]'}`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-14 h-14 ${agent.color} rounded-full flex items-center justify-center text-xl font-bold`}>{agent.name[0]}</div>
                <div className="flex-1"><h3 className="font-bold text-lg">{agent.name}</h3><p className="text-sm text-[#8b949e]">{agent.role}</p></div>
              </div>
              <div className="bg-[#0d1117] rounded-lg p-3"><div className="text-xs text-[#8b949e]">{agent.status === 'working' ? 'Working on' : 'Status'}</div><div className={`text-sm ${agent.status === 'working' ? 'text-[#3fb950]' : 'text-[#8b949e]'}`}>{agent.currentTask}</div></div>
            </button>
          ))}
        </div>
        <div>{selected ? (
          <div className="bg-[#161b22] rounded-xl border border-[#30363d] p-6 sticky top-6">
            <div className="text-xs text-[#8b949e] mb-2">Selected Agent</div>
            <div className="flex items-center gap-4 mb-6"><div className={`w-16 h-16 ${selected.color} rounded-full flex items-center justify-center text-2xl font-bold`}>{selected.name[0]}</div><div><h3 className="font-bold text-xl">{selected.name}</h3><p className="text-[#8b949e]">{selected.role}</p></div></div>
            <div className="space-y-4">
              <div className="bg-[#0d1117] rounded-lg p-4"><div className="text-xs text-[#8b949e] mb-2">Status</div><div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${selected.status === 'working' ? 'bg-[#3fb950]/20 text-[#3fb950]' : 'bg-[#f0883e]/20 text-[#f0883e]'}`}>{selected.status === 'working' ? <Play size={14} /> : <Clock size={14} />}{selected.status.toUpperCase()}</div></div>
              <div className="bg-[#0d1117] rounded-lg p-4"><div className="text-xs text-[#8b949e] mb-2">Current Task</div><div className="text-sm">{selected.currentTask}</div></div>
              <div className="flex gap-2"><button className="flex-1 px-3 py-2 bg-[#1f6feb] rounded-lg text-sm">Assign Task</button><button className="flex-1 px-3 py-2 bg-[#21262d] rounded-lg text-sm">View Logs</button></div>
            </div>
            <button onClick={() => setSelectedAgent(null)} className="mt-4 w-full px-3 py-2 bg-[#21262d] rounded-lg text-sm">Close Panel</button>
          </div>
        ) : (
          <div className="bg-[#161b22] rounded-xl border border-[#30363d] p-6 text-center"><div className="text-[#8b949e]">Select an agent</div></div>
        )}
        </div>
      </div>
    </div>
  )}

  return (
    <div className="flex h-screen bg-[#0d1117] text-white font-sans">
      {/* Sidebar */}
      <div className="w-56 bg-[#010409] border-r border-[#21262d] flex flex-col">
        <div className="p-4 border-b border-[#21262d]">
          <h1 className="text-lg font-bold text-[#58a6ff] tracking-wide">MISSION CONTROL</h1>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveNav(item.id as NavView)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${activeNav === item.id ? 'bg-[#1f6feb] text-white' : 'text-[#8b949e] hover:bg-[#21262d] hover:text-white'}`}>
              <item.icon size={18} />{item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-[#21262d]">
          <div className="bg-[#161b22] rounded-lg p-3 border border-[#30363d]">
            <div className="flex items-center gap-2 mb-2"><div className="w-2 h-2 bg-[#3fb950] rounded-full animate-pulse" /><span className="text-xs text-[#8b949e]">Bot Status</span></div>
            <div className="text-xl font-bold text-[#3fb950]">5-0</div>
            <div className="text-xs text-[#8b949e]">Wins / Losses</div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 bg-[#010409] border-b border-[#21262d] flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2"><div className="w-8 h-8 bg-[#a371f7] rounded-full flex items-center justify-center"><Brain size={14} className="text-white" /></div><span className="text-sm font-medium">Apollo</span></div>
            <span className="text-[#30363d]">/</span>
            <div className="flex items-center gap-2"><div className="w-8 h-8 bg-[#f0883e] rounded-full flex items-center justify-center"><User size={14} className="text-white" /></div><span className="text-sm font-medium">Kam</span></div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-[#8b949e] hover:text-white hover:bg-[#21262d] rounded-md"><RefreshCw size={18} /></button>
            <button className="p-2 text-[#8b949e] hover:text-white hover:bg-[#21262d] rounded-md"><Bell size={18} /></button>
            <button className="p-2 text-[#8b949e] hover:text-white hover:bg-[#21262d] rounded-md"><Search size={18} /></button>
            <div className="flex items-center gap-2 ml-2 px-3 py-1.5 bg-[#161b22] rounded-md border border-[#30363d]"><Activity size={14} className="text-[#3fb950]" /><span className="text-sm text-[#3fb950]">Paper Trading</span></div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {activeNav === 'dashboard' && renderDashboard()}
          {activeNav === 'tasks' && renderTasks()}
          {activeNav === 'content' && renderContent()}
          {activeNav === 'calendar' && renderCalendar()}
          {activeNav === 'memory' && renderMemory()}
          {activeNav === 'team' && renderTeam()}
          {activeNav === 'office' && renderOffice()}
        </main>
      </div>
    </div>
  )
}
