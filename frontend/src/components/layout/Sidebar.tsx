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
  ChevronRight
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
    <aside className={`h-screen glass-deep flex flex-col transition-all duration-500 ease-in-out border-r border-white/5 relative z-20 ${sidebarCollapsed ? 'w-24' : 'w-72'
      }`}>
      {/* Brand Header */}
      <div className={`p-6 flex items-center gap-4 transition-all duration-300 ${sidebarCollapsed ? 'justify-center' : ''}`}>
        <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center overflow-hidden shrink-0 border border-white/10 shadow-lg relative group">
          <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          {/* Use object-contain and max constraints to prevent the logo from growing out of bounds */}
          <img src={logo} alt="SocialPulse" className="w-8 h-8 object-contain z-10" />
        </div>
        
        {!sidebarCollapsed && (
          <div className="flex flex-col animate-fade-in">
            <span className="text-xl font-bold syne tracking-tight bg-gradient-to-r from-white via-white/80 to-accent bg-clip-text text-transparent">SocialPulse</span>
            <span className="text-[10px] text-accent tracking-widest uppercase font-medium mt-[-2px]">Studio</span>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 space-y-2 mt-6 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveScreen(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-[14px] transition-all duration-300 group ${
                  isActive 
                  ? 'bg-accent/10 glow-border text-white'
                  : 'text-muted hover:bg-white/5 hover:text-white'
                } ${sidebarCollapsed ? 'justify-center' : ''}`}
            >
              <div className={`relative flex items-center justify-center shrink-0 ${isActive ? 'text-accent' : 'text-muted group-hover:text-primary transition-colors'}`}>
                <item.icon className="w-[22px] h-[22px]" />
                {isActive && (
                  <span className="absolute inset-0 bg-accent/30 blur-md rounded-full" />
                )}
              </div>
              {!sidebarCollapsed && (
                <span className={`font-medium tracking-wide text-[15px] ${isActive ? 'text-primary' : ''}`}>
                  {item.label}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-4 border-t border-white/5 mt-auto">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center p-3 rounded-xl hover:bg-white/5 text-muted hover:text-white transition-all duration-300"
        >
          {sidebarCollapsed ? <ChevronRight size={22} className="opacity-70 hover:opacity-100" /> : <ChevronLeft size={22} className="opacity-70 hover:opacity-100" />}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
