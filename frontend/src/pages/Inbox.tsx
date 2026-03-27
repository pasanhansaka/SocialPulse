import React from 'react'
import { Inbox as InboxIcon, MessageSquare, Heart, RefreshCw, MoreHorizontal } from 'lucide-react'

const Inbox = () => {
  const mockEngagements = [
    { id: 1, platform: 'twitter', user: 'jack_dev', type: 'mention', content: "Love the new update! When's the API coming?", time: '2m ago' },
    { id: 2, platform: 'instagram', user: 'sarah.creater', type: 'comment', content: "This aesthetic is exactly what I needed. 🔥", time: '15m ago' },
    { id: 3, platform: 'linkedin', user: 'Michael Scott', type: 'share', content: "SocialPulse is changing the game for managers.", time: '1h ago' },
  ]

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-left-4 duration-700">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl syne font-bold font-heading">Unified Inbox</h1>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/20 text-accent text-xs font-bold border border-accent/20">
           <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
           Live Feedback
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Feed Column */}
        <div className="lg:col-span-2 space-y-4">
          {mockEngagements.map(item => (
            <div key={item.id} className="glass rounded-2xl p-6 flex gap-4 group hover:border-white/10 transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex-shrink-0 flex items-center justify-center text-text-muted">
                 {item.type === 'mention' ? <AtSign size={20} /> : item.type === 'comment' ? <MessageSquare size={20} /> : <RefreshCw size={20} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm">{item.user} <span className="text-text-muted font-normal">on {item.platform}</span></span>
                  <span className="text-xs text-text-muted">{item.time}</span>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">{item.content}</p>
                <div className="flex items-center gap-4">
                   <button className="flex items-center gap-2 text-xs font-medium text-text-muted hover:text-accent transition-all">
                      <Heart size={14} /> Like
                   </button>
                   <button className="flex items-center gap-2 text-xs font-medium text-text-muted hover:text-accent transition-all">
                      <MessageSquare size={14} /> Reply
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters/Stats */}
        <div className="space-y-6">
           <div className="glass rounded-2xl p-6">
              <h3 className="font-bold syne mb-4">Filters</h3>
              <div className="space-y-2">
                 {['Mentions', 'Comments', 'Direct Messages', 'Shares'].map(f => (
                   <label key={f} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer text-sm text-text-secondary">
                      <input type="checkbox" defaultChecked className="accent-accent" />
                      {f}
                   </label>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}

const AtSign = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></svg>
)

export default Inbox
