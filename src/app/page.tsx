'use client'

import { useState } from 'react'
import { 
  LayoutDashboard, 
  Calendar, 
  Brain, 
  Users, 
  FolderKanban,
  Monitor,
  ChevronRight,
  Plus,
  Search,
  Clock,
  CheckCircle2,
  Circle,
  Play,
  Pause
} from 'lucide-react'

// Sample data
const tasks = [
  { id: 1, title: 'Build V4 Trading Bot', status: 'done', assignee: 'Apollo', project: 'Trading' },
  { id: 2, title: 'Research OBI + RSI signals', status: 'done', assignee: 'Research', project: 'Trading' },
  { id: 3, title: 'Set up Mission Control', status: 'in_progress', assignee: 'Apollo', project: 'Infrastructure' },
  { id: 4, title: 'Optimize win rate', status: 'backlog', assignee: 'Data Analyst', project: 'Trading' },
  { id: 5, title: 'Go live with real trading', status: 'backlog', assignee: 'Apollo', project: 'Trading' },
]

const agents = [
  { name: 'Apollo', role: 'CEO / Lead Developer', status: 'Active', color: 'bg-blue-500', activity: 'Building Mission Control' },
  { name: 'Research Agent', role: 'Deep Research', status: 'Idle', color: 'bg-green-500', activity: 'Waiting for task' },
  { name: 'Trading Bot v4', role: 'Execute Trades', status: 'Working', color: 'bg-purple-500', activity: 'Monitoring OBI + RSI' },
]

const memories = [
  { id: 1, title: 'Trading Strategy V4', date: 'Today', type: 'decision' },
  { id: 2, title: 'Bot Win Rate 5-0', date: 'Today', type: 'result' },
  { id: 3, title: 'Cognitive Infrastructure', date: 'Today', type: 'system' },
]

const calendarEvents = [
  { time: 'Now', title: 'Bot monitoring', type: 'running' },
  { time: '11:00', title: 'Research signal thresholds', type: 'done' },
  { time: '16:30', title: 'Deploy V4 bot', type: 'done' },
]

const navItems = [
  { id: 'tasks', label: 'Tasks', icon: FolderKanban },
  { id: 'content', label: 'Content', icon: ChevronRight },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'memory', label: 'Memory', icon: Brain },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'office', label: 'Office', icon: Monitor },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState('tasks')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white">
      {/* Sidebar */}
      <div className="w-64 border-r border-[#262626] p-4 flex flex-col">
        <h1 className="text-xl font-bold mb-8 text-blue-500">Mission Control</h1>
        
        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === item.id 
                  ? 'bg-blue-500/20 text-blue-400' 
                  : 'text-gray-400 hover:bg-[#171717]'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
        
        {/* Bot Status */}
        <div className="mt-auto p-4 bg-[#171717] rounded-lg border border-green-500/30">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <h3 className="text-sm font-medium">Bot Status</h3>
          </div>
          <div className="text-3xl font-bold text-green-400">5-0</div>
          <div className="text-xs text-gray-500 mb-3">Wins / Losses</div>
          <div className="text-sm bg-[#0a0a0a] p-2 rounded">
            <span className="text-green-400">UP</span> 161% @ OBI:0.81
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        
        {/* TASKS */}
        {activeTab === 'tasks' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Tasks Board</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600">
                <Plus size={16} />
                New Task
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="bg-[#171717] p-4 rounded-lg">
                <div className="text-2xl font-bold">{tasks.length}</div>
                <div className="text-sm text-gray-400">Total Tasks</div>
              </div>
              <div className="bg-[#171717] p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">{tasks.filter(t => t.status === 'in_progress').length}</div>
                <div className="text-sm text-gray-400">In Progress</div>
              </div>
              <div className="bg-[#171717] p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-400">{tasks.filter(t => t.status === 'done').length}</div>
                <div className="text-sm text-gray-400">Done</div>
              </div>
              <div className="bg-[#171717] p-4 rounded-lg">
                <div className="text-2xl font-bold">{Math.round(tasks.filter(t => t.status === 'done').length / tasks.length * 100)}%</div>
                <div className="text-sm text-gray-400">Complete</div>
              </div>
            </div>
            
            {/* Kanban */}
            <div className="grid grid-cols-4 gap-4">
              {['Backlog', 'In Progress', 'Review', 'Done'].map((column) => (
                <div key={column} className="bg-[#171717] rounded-lg p-4">
                  <h3 className="font-medium mb-4 text-gray-400 flex items-center gap-2">
                    {column === 'Done' && <CheckCircle2 size={16} className="text-green-400" />}
                    {column === 'In Progress' && <Play size={16} className="text-blue-400" />}
                    {column}
                  </h3>
                  <div className="space-y-3">
                    {tasks.filter(t => 
                      (column === 'Backlog' && t.status === 'backlog') ||
                      (column === 'In Progress' && t.status === 'in_progress') ||
                      (column === 'Review' && t.status === 'review') ||
                      (column === 'Done' && t.status === 'done')
                    ).map(task => (
                      <div key={task.id} className="bg-[#0a0 p-3 roundeda0a]-lg border border-[#262626] hover:border-blue-500/50 cursor-pointer transition-colors">
                        <div className="font-medium">{task.title}</div>
                        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                          <span>{task.assignee}</span>
                          <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded">{task.project}</span>
                        </div>
                      </div>
                    ))}
                    {column === 'Backlog' && (
                      <button className="w-full py-2 border border-dashed border-[#262626] rounded-lg text-gray-500 text-sm hover:border-gray-500">
                        + Add task
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TEAM */}
        {activeTab === 'team' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Team</h2>
            <div className="grid grid-cols-3 gap-4">
              {agents.map((agent) => (
                <div key={agent.name} className="bg-[#171717] p-6 rounded-lg border border-[#262626]">
                  <div className="flex items-start justify-between">
                    <div className={`w-14 h-14 ${agent.color} rounded-full flex items-center justify-center text-xl font-bold`}>
                      {agent.name[0]}
                    </div>
                    <div className={`px-2 py-1 rounded text-xs ${
                      agent.status === 'Working' ? 'bg-green-500/20 text-green-400' :
                      agent.status === 'Active' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {agent.status}
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mt-4">{agent.name}</h3>
                  <p className="text-gray-400 text-sm">{agent.role}</p>
                  <div className="mt-4 pt-4 border-t border-[#262626]">
                    <div className="text-xs text-gray-500">Current Task</div>
                    <div className="text-sm mt-1">{agent.activity}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OFFICE */}
        {activeTab === 'office' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Office</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-[#171717] rounded-lg text-sm hover:bg-[#262626]">All Working</button>
                <button className="px-3 py-1.5 bg-[#171717] rounded-lg text-sm hover:bg-[#262626]">Gather</button>
              </div>
            </div>
            
            <div className="bg-[#171717] rounded-lg p-8">
              {/* Office Grid */}
              <div className="grid grid-cols-3 gap-6">
                {agents.map((agent) => (
                  <div key={agent.name} className="bg-[#0a0a0a] rounded-lg p-6 border border-[#262626]">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-16 h-16 ${agent.color} rounded-lg flex items-center justify-center text-2xl`}>
                        {agent.name[0]}
                      </div>
                      <div className={`w-3 h-3 rounded-full ${
                        agent.status === 'Working' ? 'bg-green-400 animate-pulse' :
                        agent.status === 'Active' ? 'bg-blue-400' :
                        'bg-yellow-400'
                      }`} />
                    </div>
                    <h3 className="font-bold">{agent.name}</h3>
                    <p className="text-sm text-gray-400">{agent.role}</p>
                    <div className="mt-4 bg-[#171717] rounded p-3">
                      <div className="text-xs text-gray-500">Working on</div>
                      <div className="text-sm mt-1">{agent.activity}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Activity Feed */}
              <div className="mt-6 pt-6 border-t border-[#262626]">
                <h3 className="text-sm font-medium text-gray-400 mb-4">Live Activity</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <Clock size={14} className="text-gray-500" />
                    <span className="text-gray-400">Bot placed trade UP @ OBI:0.81</span>
                    <span className="text-gray-600">2m ago</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle2 size={14} className="text-green-500" />
                    <span className="text-gray-400">Task completed: Build V4 Bot</span>
                    <span className="text-gray-600">1h ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MEMORY */}
        {activeTab === 'memory' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Memory</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input 
                  type="text" 
                  placeholder="Search memories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#171717] border border-[#262626] rounded-lg pl-10 pr-4 py-2 w-64 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 space-y-4">
                {memories.map((mem) => (
                  <div key={mem.id} className="bg-[#171717] rounded-lg p-6 border border-[#262626]">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain size={16} className="text-blue-400" />
                      <span className="text-xs text-gray-500">{mem.date}</span>
                    </div>
                    <h3 className="font-bold">{mem.title}</h3>
                    <p className="text-sm text-gray-400 mt-2">Memory content would appear here...</p>
                  </div>
                ))}
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-4">Categories</h3>
                <div className="space-y-2">
                  {['Decisions', 'Results', 'System', 'Research'].map((cat) => (
                    <button key={cat} className="w-full text-left px-4 py-2 bg-[#171717] rounded-lg text-sm hover:bg-[#262626]">
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CALENDAR */}
        {activeTab === 'calendar' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Calendar</h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-500 rounded-lg">Week</button>
                <button className="px-4 py-2 bg-[#171717] rounded-lg hover:bg-[#262626]">Today</button>
              </div>
            </div>
            
            {/* Always Running */}
            <div className="bg-[#171717] rounded-lg p-4 mb-6 border border-green-500/30">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <h3 className="font-medium">Always Running</h3>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm">Bot monitoring</span>
                <span className="text-gray-500">•</span>
                <span className="text-sm text-gray-400">Every 30 seconds</span>
              </div>
            </div>
            
            {/* Schedule */}
            <div className="bg-[#171717] rounded-lg p-6">
              <h3 className="font-medium mb-4">Today's Schedule</h3>
              <div className="space-y-3">
                {calendarEvents.map((event, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${
                      event.type === 'done' ? 'bg-green-400' : 'bg-blue-400'
                    }`} />
                    <div className="w-20 text-sm text-gray-400">{event.time}</div>
                    <div className="flex-1">{event.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CONTENT */}
        {activeTab === 'content' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Content Pipeline</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600">
                <Plus size={16} />
                New Content
              </button>
            </div>
            
            <div className="grid grid-cols-5 gap-4">
              {['Ideas', 'Scripting', 'Thumbnail', 'Filming', 'Published'].map((stage) => (
                <div key={stage} className="bg-[#171717] rounded-lg p-4">
                  <h3 className="font-medium mb-4 text-gray-400">{stage}</h3>
                  <div className="text-2xl font-bold text-gray-600">0</div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 bg-[#171717] rounded-lg p-8 text-center">
              <p className="text-gray-400">No content in pipeline</p>
              <p className="text-sm text-gray-600 mt-2">Add ideas to start creating</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
