import React from 'react'
import AppShell from './components/layout/AppShell.js'
import { useUI } from './context/UIContext.js'
import Compose from './pages/Compose.js'
import Inbox from './pages/Inbox.js'
import Analytics from './pages/Analytics.js'
import { Activity, Users, Eye, TrendingUp, ArrowUpRight, BarChart3 } from 'lucide-react'

const StatCard = ({ title, value, trend, icon: Icon, delay }: any) => (
  <div 
    className="glass p-6 rounded-3xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-300"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[50px] group-hover:bg-accent/20 transition-all duration-500" />
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className="p-3 bg-white/5 rounded-2xl border border-white/5 group-hover:border-accent/30 transition-colors">
        <Icon className="w-6 h-6 text-accent group-hover:text-white transition-colors" />
      </div>
      <div className="flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg text-xs font-semibold border border-emerald-400/20">
        <ArrowUpRight className="w-3 h-3" />
        {trend}
      </div>
    </div>
    <div className="relative z-10">
      <h3 className="text-muted font-medium mb-1 text-sm">{title}</h3>
      <p className="text-4xl font-bold syne tracking-tight text-white drop-shadow-md">{value}</p>
    </div>
  </div>
)

const Dashboard = () => (
  <div className="space-y-8 animate-fade-in">
    <div className="flex justify-between items-end">
      <div>
        <h1 className="text-4xl syne font-bold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
          Welcome Back, Alex.
        </h1>
        <p className="text-muted">Here's what's happening across your networks today.</p>
      </div>
      <button className="bg-white text-black hover:bg-white/90 px-6 py-2.5 rounded-xl font-semibold transition-colors shadow-lg shadow-white/10 active:scale-95">
        Create Post
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Audience" value="142.8k" trend="12.4%" icon={Users} delay={0} />
      <StatCard title="Impressions" value="2.4M" trend="8.2%" icon={Eye} delay={100} />
      <StatCard title="Engagement Rate" value="5.8%" trend="1.1%" icon={Activity} delay={200} />
      <StatCard title="Follower Growth" value="+2,491" trend="4.3%" icon={TrendingUp} delay={300} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 h-[450px] glass rounded-3xl p-8 flex flex-col hover:border-white/10 transition-colors relative overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/5 blur-[100px] rounded-full pointer-events-none" />
         <div className="flex justify-between items-center mb-6 relative z-10">
           <h3 className="text-xl font-bold syne">Audience Growth</h3>
           <select className="bg-background/50 border border-white/10 rounded-lg px-3 py-1.5 text-sm outline-none text-secondary hover:text-white transition-colors">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
           </select>
         </div>
         <div className="flex-1 border-2 border-dashed border-white/5 rounded-2xl flex items-center justify-center relative z-10">
            <span className="text-muted font-medium flex items-center gap-2">
              <BarChart3 className="w-5 h-5 opacity-50" />
              Chart Data Loading...
            </span>
         </div>
      </div>
      
      <div className="h-[450px] glass rounded-3xl p-8 flex flex-col hover:border-white/10 transition-colors">
        <h3 className="text-xl font-bold syne mb-6">Recent Activity</h3>
        <div className="flex-1 border-2 border-dashed border-white/5 rounded-2xl flex items-center justify-center">
            <span className="text-muted text-sm">No recent activity found.</span>
        </div>
      </div>
    </div>
  </div>
)

const Accounts = () => (
  <div className="space-y-8 animate-fade-in">
    <div>
       <h1 className="text-4xl syne font-bold tracking-tight mb-2">Connect your Pulse</h1>
       <p className="text-muted">Link your social media profiles to start managing them centrally.</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {['Twitter', 'Instagram', 'Facebook', 'LinkedIn', 'TikTok', 'YouTube', 'Pinterest'].map((p, i) => (
        <div key={p} className="glass rounded-2xl p-6 flex flex-col gap-5 hover:-translate-y-1 transition-all duration-300 group" style={{ animationDelay: `${i * 50}ms` }}>
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-accent/50 transition-colors">
               <span className="font-bold text-lg text-white/50 group-hover:text-white transition-colors">{p[0]}</span>
            </div>
          </div>
          <div>
            <span className="font-bold text-lg block">{p}</span>
            <span className="text-xs text-muted block mt-1">Not connected</span>
          </div>
          <button className="w-full py-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white hover:text-black font-semibold transition-all shadow-sm">
            Connect
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
