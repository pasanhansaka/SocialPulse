import React from 'react'
import { BarChart3, TrendingUp, Users, Target, MoreHorizontal } from 'lucide-react'

const Analytics = () => {
  const stats = [
    { label: 'Total Engagement', value: '84.2k', change: '+18.4%', icon: TrendingUp },
    { label: 'New Followers', value: '1,248', change: '+5.2%', icon: Users },
    { label: 'Click Rate', value: '4.8%', change: '-0.3%', icon: Target },
  ]

  return (
    <div className="space-y-8 animate-in fade-in transition-all duration-700">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl syne font-bold">Pulse Analytics</h1>
        <div className="flex items-center gap-3">
           <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-sm font-medium hover:bg-white/10 transition-all">
              Last 7 Days
           </button>
           <button className="px-4 py-2 rounded-xl bg-accent text-white text-sm font-bold glow hover:scale-105 transition-all">
              Export PDF
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="glass rounded-3xl p-8 space-y-4">
             <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-white/5 text-accent">
                   <stat.icon size={24} />
                </div>
                <MoreHorizontal size={20} className="text-text-muted cursor-pointer hover:text-white" />
             </div>
             <div className="flex flex-col">
                <span className="text-sm font-medium text-text-muted">{stat.label}</span>
                <span className="text-3xl font-bold syne mt-1">{stat.value}</span>
             </div>
             <div className={`text-sm font-bold ${stat.change.startsWith('+') ? 'text-success' : 'text-error'}`}>
               {stat.change} <span className="text-text-muted font-normal">vs prev cycle</span>
             </div>
          </div>
        ))}
      </div>

      {/* Main Analysis Chart Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="glass rounded-3xl p-8 h-[400px]">
            <h3 className="text-xl syne font-bold mb-6 flex items-center gap-2">
               <BarChart3 className="text-accent" />
               Performance Overview
            </h3>
            <div className="h-full w-full flex items-center justify-center text-text-muted font-medium italic border-t border-white/5 pt-8">
                Interactive Chart Engine (Recharts) Initializing...
            </div>
         </div>

         <div className="glass rounded-3xl p-8 h-[400px]">
             <h3 className="text-xl syne font-bold mb-6">Best Performing Platforms</h3>
             <div className="space-y-6 flex flex-col justify-center h-full pb-12">
               {['Twitter', 'Instagram', 'LinkedIn'].map((p, i) => (
                 <div key={p} className="space-y-2">
                   <div className="flex justify-between text-sm font-bold">
                     <span>{p}</span>
                     <span className="text-accent">{92 - (i * 15)}% Reach</span>
                   </div>
                   <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-accent glow" style={{ width: `${92 - (i * 15)}%` }} />
                   </div>
                 </div>
               ))}
             </div>
         </div>
      </div>
    </div>
  )
}

export default Analytics
