import React from 'react'
import Sidebar from './Sidebar.js'
import { Bell, Search, Settings2 } from 'lucide-react'

interface AppShellProps {
  children: React.ReactNode
}

const AppShell = ({ children }: AppShellProps) => {
  return (
    <div className="flex bg-background min-h-screen text-primary overflow-hidden font-inter selection:bg-accent/30">
      
      {/* Dynamic Background Elements */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] pointer-events-none opacity-50" />
      <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none opacity-40" />

      {/* Permanent Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-full relative z-10">
        
        {/* Top Header - Glassmorphic floating island */}
        <div className="px-8 pt-6 pb-2 z-20">
          <header className="h-[72px] glass rounded-2xl flex items-center justify-between px-6 shadow-xl">
            {/* Search Bar */}
            <div className="flex items-center bg-background/50 border border-white/5 rounded-xl px-4 py-2.5 w-[400px] focus-within:border-accent/50 focus-within:ring-1 focus-within:ring-accent/50 transition-all duration-300 group">
              <Search className="text-muted group-focus-within:text-accent w-4 h-4 mr-3 transition-colors" />
              <input 
                type="text" 
                placeholder="Search posts, analytics, accounts..." 
                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted text-primary"
              />
              <div className="hidden group-focus-within:flex items-center gap-1 opacity-50">
                <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">⌘</kbd>
                <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">K</kbd>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <button className="p-2.5 rounded-xl hover:bg-white/5 text-secondary hover:text-white transition-all relative">
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.6)]" />
              </button>

              <button className="p-2.5 rounded-xl hover:bg-white/5 text-secondary hover:text-white transition-all">
                <Settings2 size={20} />
              </button>
              
              <div className="flex items-center gap-3 pl-5 py-1 border-l border-white/10 h-10">
                <div className="hidden md:flex flex-col text-right justify-center">
                  <span className="text-sm font-semibold leading-tight text-white">Alex Rivera</span>
                  <span className="text-[11px] text-accent font-medium leading-tight">Pro Account</span>
                </div>
                {/* Fixed Avatar Constraints */}
                <div className="relative group cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent to-purple-400 rounded-xl blur-[2px] opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="w-10 h-10 rounded-xl relative p-[1.5px] bg-gradient-to-tr from-accent to-purple-500">
                    <div className="w-full h-full rounded-[10px] bg-surface flex items-center justify-center overflow-hidden z-10 relative">
                       <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=SocialPulse" alt="Avatar" className="w-[120%] h-[120%] object-cover mt-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </div>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto px-8 pb-8 pt-4 custom-scrollbar">
          <div className="max-w-[1400px] mx-auto w-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}

export default AppShell
