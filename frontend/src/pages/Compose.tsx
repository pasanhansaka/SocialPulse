import React, { useState } from 'react'
import { PLATFORMS, PlatformId } from '../utils/platformConfig.js'
import { 
  Send, 
  Calendar, 
  Image as ImageIcon, 
  Video, 
  Hash, 
  AtSign,
  Smartphone,
  CheckCircle2,
  X
} from 'lucide-react'

const Compose = () => {
  const [content, setContent] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformId[]>(['twitter'])
  const [media, setMedia] = useState<any[]>([])
  
  const togglePlatform = (id: PlatformId) => {
    if (selectedPlatforms.includes(id)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter(p => p !== id))
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, id])
    }
  }

  return (
    <div className="flex gap-8 h-[calc(100vh-140px)] animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. Left - Editor Panel */}
      <div className="flex-1 flex flex-col gap-6 min-w-0">
        <div className="flex items-center justify-between">
           <h1 className="text-3xl syne font-bold">New Publication</h1>
           <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-text-secondary hover:bg-white/10 transition-all font-medium">
               <Calendar size={18} />
               <span>Schedule</span>
             </button>
             <button className="flex items-center gap-2 px-6 py-2 rounded-xl bg-accent text-white font-bold glow hover:scale-105 active:scale-95 transition-all">
               <Send size={18} />
               <span>Publish Now</span>
             </button>
           </div>
        </div>

        <div className="flex-1 glass rounded-3xl p-8 flex flex-col gap-6">
          {/* Platform Selector */}
          <div className="flex flex-wrap gap-3">
             {Object.values(PLATFORMS).map(platform => (
               <button
                 key={platform.id}
                 onClick={() => togglePlatform(platform.id)}
                 className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                   selectedPlatforms.includes(platform.id)
                     ? 'bg-accent/20 border-accent/50 text-white'
                     : 'bg-white/5 border-white/5 text-text-muted hover:border-white/20'
                 }`}
               >
                 <div 
                   className="w-2 h-2 rounded-full" 
                   style={{ backgroundColor: selectedPlatforms.includes(platform.id) ? platform.color : 'transparent' }} 
                 />
                 <span className="text-sm font-medium">{platform.name}</span>
               </button>
             ))}
          </div>

          {/* Main Editor */}
          <div className="flex-1 flex flex-col gap-4">
             <div className="relative flex-1">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's on your mind? Share across all platforms..."
                  className="w-full h-full bg-transparent border-none outline-none text-xl resize-none placeholder:text-text-muted font-medium py-4"
                />
                
                {/* Character Counters */}
                <div className="absolute bottom-0 right-0 p-4 flex gap-4">
                   {selectedPlatforms.map(p => {
                     const config = PLATFORMS[p]
                     const remaining = config.charLimit - content.length
                     const isOver = remaining < 0
                     return (
                       <div key={p} className={`text-xs font-bold px-2 py-1 rounded bg-white/5 border ${
                         isOver ? 'text-error border-error/50' : 'text-text-muted border-white/5'
                       }`}>
                         {p.charAt(0).toUpperCase()}: {remaining}
                       </div>
                     )
                   })}
                </div>
             </div>

             {/* Editor Toolbar */}
             <div className="flex items-center justify-between py-4 border-t border-white/5">
                <div className="flex items-center gap-4">
                   <button className="p-2 rounded-lg hover:bg-white/5 text-text-secondary">
                      <ImageIcon size={20} />
                   </button>
                   <button className="p-2 rounded-lg hover:bg-white/5 text-text-secondary">
                      <Video size={20} />
                   </button>
                   <button className="p-2 rounded-lg hover:bg-white/5 text-text-secondary">
                      <Hash size={20} />
                   </button>
                   <button className="p-2 rounded-lg hover:bg-white/5 text-text-secondary">
                      <AtSign size={20} />
                   </button>
                </div>
                <div className="text-xs text-text-muted">
                  Press <b>⌘+Enter</b> to Publish
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* 2. Right - Preview Panel */}
      <div className="w-[420px] flex flex-col gap-6">
        <div className="flex items-center justify-between">
           <h2 className="text-xl syne font-bold flex items-center gap-2">
             <Smartphone size={20} className="text-accent" />
             Live Previews
           </h2>
           <span className="text-xs text-text-muted italic">Visual Simulator</span>
        </div>

        <div className="flex-1 glass rounded-3xl overflow-y-auto p-6 space-y-8 custom-scrollbar relative">
           {selectedPlatforms.map(platform => (
             <div key={platform} className="space-y-4 animate-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <div className="w-8 h-8 rounded bg-white/5 border border-white/5 flex items-center justify-center">
                        <span className="text-xs font-bold" style={{ color: PLATFORMS[platform].color }}>
                           {platform.charAt(0).toUpperCase()}
                        </span>
                     </div>
                     <span className="text-sm font-bold text-text-secondary">{PLATFORMS[platform].name}</span>
                  </div>
                  <CheckCircle2 size={16} className="text-success opacity-50" />
                </div>
                
                {/* Platform Card Mock */}
                <div className="bg-[#1a1a24] rounded-2xl border border-white/5 p-4 space-y-3">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/5" />
                      <div className="flex flex-col">
                         <span className="text-sm font-bold">Alex Rivera</span>
                         <span className="text-[10px] text-text-muted">@socialpulse_alex</span>
                      </div>
                   </div>
                   <p className="text-sm leading-relaxed whitespace-pre-wrap">
                     {content || 'Enter your message to see a preview...'}
                   </p>
                   <div className="h-40 bg-white/5 rounded-xl border border-dashed border-white/10 flex items-center justify-center text-text-muted text-xs">
                     Media Placeholder
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  )
}

export default Compose
