import React, { createContext, useContext, useState, ReactNode } from 'react'

interface UIContextType {
  sidebarCollapsed: boolean
  toggleSidebar: () => void
  activeScreen: string
  setActiveScreen: (screen: string) => void
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const UIContext = createContext<UIContextType | undefined>(undefined)

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeScreen, setActiveScreen] = useState('dashboard')
  const [isDarkMode, setIsDarkMode] = useState(true)

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed)
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  return (
    <UIContext.Provider value={{
      sidebarCollapsed,
      toggleSidebar,
      activeScreen,
      setActiveScreen,
      isDarkMode,
      toggleDarkMode
    }}>
      {children}
    </UIContext.Provider>
  )
}

export const useUI = () => {
  const context = useContext(UIContext)
  if (!context) {
    throw new Error('useUI must be used within a UIProvider')
  }
  return context
}
