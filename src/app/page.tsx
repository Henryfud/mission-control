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
  ArrowRight,
  Lightbulb,
  PenTool,
  Image,
  Video,
  Check,
  X,
  Trash2,
  Edit3
} from 'lucide-react'

// Types
type TaskStatus = 'backlog' | 'todo' | 'in_progress' | 'review' | 'done'
type TaskAssignee = 'apollo' | 'kam'

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
  thumbnailUrl?: string
}

interface CalendarEvent {
  id: number
  title: string
  time: string
  type: 'scheduled' | 'cron' | 'reminder'
  assignedTo: TaskAssignee
}

interface Memory {
  id: number
  title: string
  content: string
  date: string
  type: 'decision' | 'result' | 'system' | 'research'
}

interface TeamMember {
  id: number
  name: string
  role: string
  status: 'active' | 'idle' | 'working'
  currentTask: string
  color: string
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
const initialTasks: Task[] = [
  { id: 1, title: 'Build Mission Control Dashboard', status: 'in_progress', assignee: 'apollo', project: 'Infrastructure', dueDate: 'Today' },
  { id: 2, title: 'Optimize trading bot win rate', status: 'backlog', assignee: 'apollo', project: 'Trading' },
  { id: 3, title: 'Research new signal strategies', status: 'todo', assignee: 'apollo', project: 'Research' },
  { id: 4, title: 'Review Q1 trading performance', status: 'backlog', assignee: 'kam', project: 'Trading' },
  { id: 5, title: 'Deploy to production', status: 'review', assignee: 'apollo', project: 'Infrastructure' },
  { id: 6, title: 'Set up new agent subroutines', status: 'done', assignee: 'apollo', project: 'Infrastructure' },
]

const contentPipeline: ContentItem[] = [
  { id: 1, title: 'How to Build AI Agents That Actually Work', stage: 'filming' },
  { id: 2, title: 'Polymarket Trading Bot Tutorial', stage: 'scripting', script: 'In this video, we will cover...' },
  { id: 3, title: 'OpenClaw vs Custom Agents', stage: 'ideas' },
  { id: 4, title: 'Making Money with Prediction Markets', stage: 'thumbnail', thumbnailUrl: '/thumbnails/polymarket.jpg' },
]

const calendarEvents: CalendarEvent[] = [
  { id: 1, title: 'Daily trading bot check', time: '09:00', type: 'cron', assignedTo: 'apollo' },
  { id: 2, title: 'Research signal thresholds', time: '11:00', type: 'scheduled', assignedTo: 'apollo' },
  { id: 3, title: 'Weekly performance review', time: 'Friday 16:00', type: 'scheduled', assignedTo: 'kam' },
  { id: 4, title: 'Content pipeline review', time: 'Daily 20:00', type: 'cron', assignedTo: 'apollo' },
]

const memories: Memory[] = [
  { id: 1, title: 'Trading Strategy V4', content: 'Use OBI + RSI confluence for 5-minute BTC markets. Win rate target 60%+.', date: 'Today', type: 'decision' },
  { id: 2, title: 'Bot Win Rate 5-0', content: 'Started with 5 consecutive wins using OBI:0.81 signal.', date: 'Today', type: 'result' },
  { id: 3, title: 'Cognitive Infrastructure', content: 'Built /mind/ directory with PROFILE.md, PROJECTS.md, DECISIONS.md, ERRORS.md', date: 'Yesterday', type: 'system' },
  { id: 4, title: 'Vercel Deployment', content: 'Deployed Mission Control to https://mission-control-sand-chi.vercel.app', date: 'Today', type: 'result' },
]

const teamMembers: TeamMember[] = [
  { id: 1, name: 'Apollo', role: 'CEO / Lead Developer', status: 'active', currentTask: 'Building Mission Control', color: 'bg-purple-500' },
  { id: 2, name: 'Research Agent', role: 'Deep Research', status: 'idle', currentTask: 'Waiting for task', color: 'bg-green-500' },
  { id: 3, name: 'Trading Bot', role: 'Trade Executor', status: 'working', currentTask: 'Monitoring OBI + RSI', color: 'bg-blue-500' },
  { id: 4, name: 'Content Writer', role: 'Script Writing', status: 'idle', currentTask: 'Waiting for ideas', color: 'bg-yellow-500' },
]

const officeAgents: OfficeAgent[] = [
  { id: 1, name: 'Apollo', role: 'Lead Developer', status: 'working', currentTask: 'Building Mission Control dashboard', color: 'bg-purple-500' },
  { id: 2, name: 'Research Agent', role: 'Researcher', status: 'idle', currentTask: 'Waiting for task', color: 'bg-green-500' },
  { id: 3, name: 'Trading Bot v9', role: 'Trader', status: 'working', currentTask: 'Monitoring Polymarket 5m BTC', color: 'bg-blue-500' },
  { id: 4, name: 'Writer Agent', role: 'Content Creator', status: 'waiting', currentTask: 'Pending script review', color: 'bg-yellow-500' },
]

// Navigation
const navItems = [
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'content', label: 'Content', icon: FileCheck },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'memory', label: 'Memory', icon: Brain },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'office', label: 'Office', icon: Building2 },
]

const contentStages = [
  { id: 'ideas', label: 'Ideas', icon: Lightbulb, color: 'text-yellow-400' },
  { id: 'scripting', label: 'Scripting', icon: PenTool, color: 'text-blue-400' },
  { id: 'thumbnail', label: 'Thumbnail', icon: Image, color: 'text-purple-400' },
  { id: 'filming', label: 'Filming', icon: Video, color: 'text-red-400' },
  { id: 'published', label: 'Published', icon: Check, color: 'text-green-400' },
]

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState('tasks')
  const [currentDate, setCurrentDate] = useState('')
  const [tasks, setTasks] = useState(initialTasks)
  const [content, setContent] = useState(contentPipeline)
  const [searchQuery, setSearchQuery] = useState('')
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskAssignee, setNewTaskAssignee] = useState<TaskAssignee>('apollo')

  useEffect(() => {
    const now = new Date()
    setCurrentDate(now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
  }, [])

  const addTask = () => {
    if (!newTaskTitle.trim()) return
    const newTask: Task = {
      id: tasks.length + 1,
      title: newTaskTitle,
      status: 'backlog',
      assignee: newTaskAssignee,
      project: 'General'
    }
    setTasks([...tasks, newTask])
    setNewTaskTitle('')
  }

  const moveTask = (taskId: number, newStatus: TaskStatus) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t))
  }

  const moveContent = (contentId: number, newStage: ContentItem['stage']) => {
    setContent(content.map(c => c.id === contentId ? { ...c, stage: newStage } : c))
  }

  const getTasksByStatus = (status: TaskStatus) => tasks.filter(t => t.status === status)
  const getContentByStage = (stage: ContentItem['stage']) => content.filter(c => c.stage === stage)
  const getTasksByAssignee = (assignee: TaskAssignee) => tasks.filter(t => t.assignee === assignee)

  // TASKS VIEW
  const renderTasks = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Tasks Board</h2>
        <div className="flex items-center gap-3">
          <select 
            value={newTaskAssignee}
            onChange={(e) => setNewTaskAssignee(e.target.value as TaskAssignee)}
            className="bg-[#161b22] border border-[#30363d] rounded-lg px-3 py-2 text-sm"
          >
            <option value="apollo">Assigned to Apollo</option>
            <option value="kam">Assigned to Kam</option>
          </select>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
              placeholder="Add new task..."
              className="bg-[#161b22] border border-[#30363d] rounded-lg px-3 py-2 text-sm w-64"
            />
            <button onClick={addTask} className="p-2 bg-[#238636] rounded-lg hover:bg-[#2ea043]">
              <Plus size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-[#161b22] p-4 rounded-lg border border-[#30363d]">
          <div className="text-2xl font-bold">{tasks.length}</div>
          <div className="text-sm text-[#8b949e]">Total Tasks</div>
        </div>
        <div className="bg-[#161b22] p-4 rounded-lg border border-[#30363d]">
          <div className="text-2xl font-bold text-[#58a6ff]">{getTasksByAssignee('apollo').length}</div>
          <div className="text-sm text-[#8b949e]">Apollo's Tasks</div>
        </div>
        <div className="bg-[#161b22] p-4 rounded-lg border border-[#30363d]">
          <div className="text-2xl font-bold text-[#f0883e]">{getTasksByAssignee('kam').length}</div>
          <div className="text-sm text-[#8b949e]">Kam's Tasks</div>
        </div>
        <div className="bg-[#161b22] p-4 rounded-lg border border-[#30363d]">
          <div className="text-2xl font-bold text-[#3fb950]">{getTasksByStatus('done').length}</div>
          <div className="text-sm text-[#8b949e]">Completed</div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-5 gap-4">
        {[
          { id: 'backlog', label: 'Backlog', color: 'text-[#8b949e]' },
          { id: 'todo', label: 'To Do', color: 'text-[#58a6ff]' },
          { id: 'in_progress', label: 'In Progress', color: 'text-[#a371f7]' },
          { id: 'review', label: 'Review', color: 'text-[#f0883e]' },
          { id: 'done', label: 'Done', color: 'text-[#3fb950]' },
        ].map((column) => (
          <div key={column.id} className="bg-[#161b22] rounded-lg p-4 border border-[#30363d] min-h-[400px]">
            <h3 className={`font-medium mb-4 flex items-center gap-2 ${column.color}`}>
              {column.id === 'done' && <CheckCircle2 size={16} />}
              {column.id === 'in_progress' && <Play size={16} />}
              {column.label}
              <span className="ml-auto text-xs bg-[#21262d] px-2 py-0.5 rounded">
                {getTasksByStatus(column.id as TaskStatus).length}
              </span>
            </h3>
            <div className="space-y-3">
              {getTasksByStatus(column.id as TaskStatus).map(task => (
                <div key={task.id} className="bg-[#0d1117] p-3 rounded-lg border border-[#30363d] hover:border-[#58a6ff] cursor-pointer transition-colors">
                  <div className="font-medium text-sm">{task.title}</div>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      task.assignee === 'apollo' ? 'bg-purple-500/20 text-purple-400' : 'bg-orange-500/20 text-orange-400'
                    }`}>
                      {task.assignee === 'apollo' ? 'Apollo' : 'Kam'}
                    </span>
                    <span className="text-xs text-[#8b949e]">{task.project}</span>
                  </div>
                  {task.dueDate && (
                    <div className="mt-2 text-xs text-[#8b949e] flex items-center gap-1">
                      <Clock size={12} /> {task.dueDate}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // CONTENT PIPELINE VIEW
  const renderContent = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Content Pipeline</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#238636] rounded-lg hover:bg-[#2ea043]">
          <Plus size={16} />
          Add Idea
        </button>
      </div>

      {/* Pipeline Stages */}
      <div className="grid grid-cols-5 gap-4">
        {contentStages.map((stage) => (
          <div key={stage.id} className="bg-[#161b22] rounded-lg p-4 border border-[#30363d] min-h-[300px]">
            <h3 className={`font-medium mb-4 flex items-center gap-2 ${stage.color}`}>
              <stage.icon size={16} />
              {stage.label}
              <span className="ml-auto text-xs bg-[#21262d] px-2 py-0.5 rounded">
                {getContentByStage(stage.id as ContentItem['stage']).length}
              </span>
            </h3>
            <div className="space-y-3">
              {getContentByStage(stage.id as ContentItem['stage']).map((item) => (
                <div key={item.id} className="bg-[#0d1117] p-3 rounded-lg border border-[#30363d] hover:border-[#58a6ff] cursor-pointer transition-colors">
                  <div className="font-medium text-sm">{item.title}</div>
                  {item.script && (
                    <div className="mt-2 text-xs text-[#8b949e] line-clamp-2">{item.script}</div>
                  )}
                  <div className="flex items-center gap-2 mt-3">
                    {/* Move controls */}
                    {stage.id !== 'ideas' && (
                      <button 
                        onClick={() => {
                          const stages = contentStages.map(s => s.id)
                          const currentIdx = stages.indexOf(stage.id)
                          if (currentIdx > 0) moveContent(item.id, stages[currentIdx - 1] as ContentItem['stage'])
                        }}
                        className="p-1 hover:bg-[#21262d] rounded"
                      >
                        <ChevronRight size={14} className="rotate-180" />
                      </button>
                    )}
                    <span className="text-xs text-[#8b949e]">#{item.id}</span>
                    {stage.id !== 'published' && (
                      <button 
                        onClick={() => {
                          const stages = contentStages.map(s => s.id)
                          const currentIdx = stages.indexOf(stage.id)
                          if (currentIdx < stages.length - 1) moveContent(item.id, stages[currentIdx + 1] as ContentItem['stage'])
                        }}
                        className="ml-auto p-1 hover:bg-[#21262d] rounded"
                      >
                        <ChevronRight size={14} />
                      </button>
                    )}
                  </div>
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
        <button className="flex items-center gap-2 px-4 py-2 bg-[#238636] rounded-lg hover:bg-[#2ea043]">
          <Plus size={16} />
          Add Event
        </button>
      </div>

      {/* Always Running */}
      <div className="bg-[#161b22] rounded-lg p-4 mb-6 border border-[#3fb950]/30">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-[#3fb950] rounded-full animate-pulse" />
          <h3 className="font-medium">Always Running</h3>
        </div>
        <p className="text-sm text-[#8b949e]">Bot monitoring every 30 seconds</p>
      </div>

      {/* Schedule */}
      <div className="bg-[#161b22] rounded-lg p-6 border border-[#30363d]">
        <h3 className="font-medium mb-4">Scheduled Tasks & Cron Jobs</h3>
        <div className="space-y-3">
          {calendarEvents.map((event) => (
            <div key={event.id} className="flex items-center gap-4 p-3 bg-[#0d1117] rounded-lg">
              <div className={`w-2 h-2 rounded-full ${
                event.type === 'cron' ? 'bg-[#a371f7]' : event.type === 'scheduled' ? 'bg-[#58a6ff]' : 'bg-[#f0883e]'
              }`} />
              <div className="w-24 text-sm font-medium">{event.time}</div>
              <div className="flex-1">{event.title}</div>
              <span className={`text-xs px-2 py-1 rounded ${
                event.type === 'cron' ? 'bg-purple-500/20 text-purple-400' : 
                event.type === 'scheduled' ? 'bg-blue-500/20 text-blue-400' : 'bg-orange-500/20 text-orange-400'
              }`}>
                {event.type}
              </span>
              <span className={`text-xs px-2 py-1 rounded ${
                event.assignedTo === 'apollo' ? 'bg-purple-500/20 text-purple-400' : 'bg-orange-500/20 text-orange-400'
              }`}>
                {event.assignedTo === 'apollo' ? 'Apollo' : 'Kam'}
              </span>
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
          <input 
            type="text" 
            placeholder="Search memories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#161b22] border border-[#30363d] rounded-lg pl-10 pr-4 py-2 w-80 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          {memories
            .filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()) || m.content.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((mem) => (
            <div key={mem.id} className="bg-[#161b22] rounded-lg p-6 border border-[#30363d]">
              <div className="flex items-center gap-2 mb-2">
                <Brain size={16} className="text-[#a371f7]" />
                <span className="text-xs text-[#8b949e]">{mem.date}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  mem.type === 'decision' ? 'bg-blue-500/20 text-blue-400' :
                  mem.type === 'result' ? 'bg-green-500/20 text-green-400' :
                  mem.type === 'system' ? 'bg-purple-500/20 text-purple-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {mem.type}
                </span>
              </div>
              <h3 className="font-bold text-lg">{mem.title}</h3>
              <p className="text-sm text-[#8b949e] mt-2">{mem.content}</p>
            </div>
          ))}
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-[#8b949e] mb-4">Categories</h3>
          <div className="space-y-2">
            {['Decisions', 'Results', 'System', 'Research'].map((cat) => (
              <button key={cat} className="w-full text-left px-4 py-2 bg-[#161b22] rounded-lg text-sm hover:bg-[#21262d] border border-[#30363d]">
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // TEAM VIEW
  const renderTeam = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Team</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#238636] rounded-lg hover:bg-[#2ea043]">
          <Plus size={16} />
          Add Agent
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* By Role */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Agents by Role</h3>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-[#161b22] p-6 rounded-lg border border-[#30363d]">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${member.color} rounded-full flex items-center justify-center text-lg font-bold`}>
                      {member.name[0]}
                    </div>
                    <div>
                      <h3 className="font-bold">{member.name}</h3>
                      <p className="text-sm text-[#8b949e]">{member.role}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs ${
                    member.status === 'active' ? 'bg-blue-500/20 text-blue-400' :
                    member.status === 'working' ? 'bg-green-500/20 text-green-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {member.status}
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-[#30363d]">
                  <div className="text-xs text-[#8b949e]">Current Task</div>
                  <div className="text-sm mt-1">{member.currentTask}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Team Stats</h3>
          <div className="space-y-4">
            <div className="bg-[#161b22] p-4 rounded-lg border border-[#30363d]">
              <div className="text-2xl font-bold">{teamMembers.length}</div>
              <div className="text-sm text-[#8b949e]">Total Agents</div>
            </div>
            <div className="bg-[#161b22] p-4 rounded-lg border border-[#30363d]">
              <div className="text-2xl font-bold text-[#3fb950]">{teamMembers.filter(m => m.status === 'working').length}</div>
              <div className="text-sm text-[#8b949e]">Working</div>
            </div>
            <div className="bg-[#161b22] p-4 rounded-lg border border-[#30363d]">
              <div className="text-2xl font-bold text-[#f0883e]">{teamMembers.filter(m => m.status === 'idle').length}</div>
              <div className="text-sm text-[#8b949e]">Idle</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // OFFICE VIEW
  const renderOffice = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Office</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-[#161b22] rounded-lg text-sm hover:bg-[#21262d]">All</button>
          <button className="px-3 py-1.5 bg-[#238636] rounded-lg text-sm">Working</button>
          <button className="px-3 py-1.5 bg-[#161b22] rounded-lg text-sm hover:bg-[#21262d]">Idle</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {officeAgents.map((agent) => (
          <div key={agent.id} className="bg-[#161b22] rounded-lg p-6 border border-[#30363d]">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-16 h-16 ${agent.color} rounded-lg flex items-center justify-center text-2xl`}>
                {agent.name[0]}
              </div>
              <div className={`w-3 h-3 rounded-full ${
                agent.status === 'working' ? 'bg-[#3fb950] animate-pulse' :
                agent.status === 'idle' ? 'bg-[#f0883e]' :
                'bg-[#8b949e]'
              }`} />
            </div>
            <h3 className="font-bold">{agent.name}</h3>
            <p className="text-sm text-[#8b949e]">{agent.role}</p>
            <div className="mt-4 bg-[#0d1117] rounded p-3">
              <div className="text-xs text-[#8b949e]">Working on</div>
              <div className="text-sm mt-1">{agent.currentTask}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Feed */}
      <div className="mt-6 pt-6 border-t border-[#30363d]">
        <h3 className="text-sm font-medium text-[#8b949e] mb-4">Live Activity</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-sm">
            <Clock size={14} className="text-[#8b949e]" />
            <span className="text-[#8b949e]">Bot placed trade UP @ OBI:0.81</span>
            <span className="text-[#484f58]">2m ago</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <CheckCircle2 size={14} className="text-[#3fb950]" />
            <span className="text-[#8b949e]">Task completed: Build Mission Control</span>
            <span className="text-[#484f58]">1h ago</span>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-[#0d1117] text-white font-sans">
      {/* Left Sidebar */}
      <div className="w-56 bg-[#010409] border-r border-[#21262d] flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-[#21262d]">
          <h1 className="text-lg font-bold text-[#58a6ff] tracking-wide">MISSION CONTROL</h1>
        </div>

        {/* Navigation */}
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

        {/* Bot Status */}
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
        {/* Header */}
        <header className="h-14 bg-[#010409] border-b border-[#21262d] flex items-center justify-between px-6">
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
          
          <div className="flex items-center gap-2">
            <button className="p-2 text-[#8b949e] hover:text-white hover:bg-[#21262d] rounded-md transition-colors">
              <RefreshCw size={18} />
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

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Welcome back</h2>
            <p className="text-[#8b949e] text-sm mt-1">{currentDate}</p>
          </div>

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
