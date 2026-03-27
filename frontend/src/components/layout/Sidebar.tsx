import React from 'react'
import {
  LayoutDashboard,
  PenSquare,
  FolderOpen,
  Inbox,
  BarChart3,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react'
import { useUI } from '../../context/UIContext.js'
import logo from '../../assets/logo.png'

const Sidebar = () => {
  const { sidebarCollapsed, toggleSidebar, activeScreen, setActiveScreen } = useUI()

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'compose', icon: PenSquare, label: 'Compose' },
    { id: 'library', icon: FolderOpen, label: 'Library' },
    { id: 'inbox', icon: Inbox, label: 'Unified Inbox' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'accounts', icon: User, label: 'Accounts' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <aside className={`h-screen glass flex flex-col transition-all duration-300 border-r border-white/5 ${sidebarCollapsed ? 'w-20' : 'w-64'
      }`}>
      {/* Brand Header */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#14141d] flex items-center justify-center overflow-hidden shrink-0 border border-white/10 shadow-lg">
          <img src={logo} alt="SocialPulse" className="w-full h-full object-cover" />
        </div>
        {!sidebarCollapsed && (
          <span className="text-xl font-bold syne tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">SocialPulse</span>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 space-y-1 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveScreen(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${activeScreen === item.id
                ? 'bg-accent/20 text-accent glow border border-accent/20'
                : 'text-text-secondary hover:bg-white/5 hover:text-white'
              }`}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-white/5 text-text-muted"
        >
          {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
