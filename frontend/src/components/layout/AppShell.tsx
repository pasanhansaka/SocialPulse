import React from 'react'
import Sidebar from './Sidebar.js'
import { Bell, Search } from 'lucide-react'

interface AppShellProps {
  children: React.ReactNode
}

const AppShell = ({ children }: AppShellProps) => {
  return (
    <div className="flex bg-[#0d0d14] min-h-screen text-white overflow-hidden">
      {/* Permanent Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-8 border-b border-white/5">
          <div className="flex items-center bg-white/5 rounded-xl px-4 py-2 w-96">
            <Search className="text-text-muted w-4 h-4 mr-3" />
            <input 
              type="text" 
              placeholder="Search posts, analytics, accounts..." 
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-text-muted"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-3 rounded-xl hover:bg-white/5 text-text-secondary relative">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-accent rounded-full glow" />
            </button>
            
            <div className="flex items-center gap-3 pl-4 border-l border-white/5">
              <div className="text-right flex flex-col">
                <span className="text-sm font-semibold">Alex Rivera</span>
                <span className="text-[11px] text-text-muted">Pro Account</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent to-purple-400 p-[1px]">
                <div className="w-full h-full rounded-[11px] bg-[#14141d] flex items-center justify-center overflow-hidden">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=SocialPulse" alt="Avatar" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  )
}

export default AppShell
