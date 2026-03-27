import React from 'react'
import AppShell from './components/layout/AppShell.js'
import { useUI } from './context/UIContext.js'
import Compose from './pages/Compose.js'
import Inbox from './pages/Inbox.js'
import Analytics from './pages/Analytics.js'

const Dashboard = () => (
  <div className="space-y-6 animate-in fade-in duration-500">
    <h1 className="text-4xl syne">Welcome Back, Alex.</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-48 glass rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl -mr-16 -mt-16 group-hover:bg-accent/20 transition-all" />
          <h3 className="text-text-secondary font-medium mb-1">Total Reach</h3>
          <p className="text-3xl font-bold syne">142.8k</p>
          <div className="absolute bottom-6 left-6 flex items-center gap-2 text-success text-sm font-medium">
            <span>↑ 12.4%</span>
            <span className="text-text-muted">vs last wk</span>
          </div>
        </div>
      ))}
    </div>
    <div className="h-96 glass rounded-3xl" />
  </div>
)

// Simple placeholder for Accounts screen
const Accounts = () => (
  <div className="space-y-6 animate-in fade-in duration-500">
    <h1 className="text-3xl syne font-bold">Connect your Pulse</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {['Twitter', 'Instagram', 'Facebook', 'LinkedIn', 'TikTok', 'YouTube', 'Pinterest', 'Threads', 'Bluesky'].map(p => (
        <div key={p} className="glass rounded-2xl p-6 flex flex-col gap-4 group">
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">{p}</span>
            <span className="text-xs text-text-muted">v2.0</span>
          </div>
          <button className="w-full py-3 rounded-xl bg-white/5 border border-white/5 hover:bg-accent hover:text-white hover:border-accent transition-all font-bold">
            Connect {p}
          </button>
        </div>
      ))}
    </div>
  </div>
)

const App = () => {
  const { activeScreen } = useUI()

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard': return <Dashboard />
      case 'compose': return <Compose />
      case 'accounts': return <Accounts />
      case 'inbox': return <Inbox />
      case 'analytics': return <Analytics />
      default: return <Dashboard />
    }
  }

  return (
    <AppShell>
      {renderScreen()}
    </AppShell>
  )
}

export default App
