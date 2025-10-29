import { Link, Outlet, useLocation } from 'react-router-dom'
import { Github, Home as HomeIcon, BookOpen, PlaySquare, Bug, Users, Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem('if.theme') : null
    return (saved === 'light' || saved === 'dark') ? saved : 'dark'
  })
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') root.classList.add('theme-light')
    else root.classList.remove('theme-light')
    try { window.localStorage.setItem('if.theme', theme) } catch {}
  }, [theme])
  const { pathname } = useLocation()
  const NavLink = ({ to, label, icon: Icon }: { to: string; label: string; icon: any }) => {
    const isActive = pathname === to
    const base = 'flex items-center gap-2 px-4 py-2 rounded-xl transition-colors whitespace-nowrap'
    const cls = theme === 'light'
      ? isActive
        ? 'bg-[#3b82f6] text-white'
        : 'text-[#4b5563] hover:text-[#24292f] hover:bg-[#f1f5f9]'
      : isActive
        ? 'bg-card text-accent'
        : 'text-white/80 hover:text-white hover:bg-card'
    return (
      <Link to={to} aria-label={label} className={`${base} ${cls}`}>
        <Icon size={18} />
        <span>{label}</span>
      </Link>
    )
  }

  return (
    <div className={`relative min-h-screen bg-background ${theme === 'dark' ? 'text-white' : 'text-[#24292f]'}`}>
      <div className="app-bg" aria-hidden="true" />
      <header
        className={
          theme === 'light'
            ? 'sticky top-0 z-20 backdrop-blur bg-white/95 supports-[backdrop-filter]:bg-white/80 border-b border-[#d0d7de]'
            : 'sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-white/10'
        }
      >
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3" aria-label="返回首页">
            <div
              className={
                theme === 'light'
                  ? 'w-8 h-8 rounded-lg bg-[#3b82f6] grid place-items-center text-white font-bold'
                  : 'w-8 h-8 rounded-lg bg-accent/20 grid place-items-center text-accent font-bold'
              }
            >
              IF
            </div>
            <div>
              <h1 className="text-lg font-semibold">InterFuzz</h1>
              <p className="text-xs text-white/60">复杂类间结构 · Java 优化编译器测试</p>
            </div>
          </Link>
          <nav className="flex items-center gap-2">
            <NavLink to="/" label="首页" icon={HomeIcon} />
            <NavLink to="/principle" label="原理" icon={BookOpen} />
            <NavLink to="/demo" label="种子生成" icon={PlaySquare} />
            <NavLink to="/effects" label="效果展示" icon={Bug} />
            <NavLink to="/about" label="关于我们" icon={Users} />
            <button
              type="button"
              className={
                theme === 'light'
                  ? 'ml-2 inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors'
                  : 'ml-2 btn-secondary'
              }
              onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
              aria-pressed={theme === 'light'}
              aria-label="切换主题"
              title={theme === 'light' ? '切换到深色' : '切换到浅色'}
            >
              {theme === 'light' ? <Sun size={16} /> : <Moon size={16} />}
              <span className="text-xs">{theme === 'light' ? '浅色' : '深色'}</span>
            </button>
            <a
              href="#"
              aria-label="GitHub 仓库"
              className={
                theme === 'light'
                  ? 'ml-2 p-2 rounded-xl hover:bg-[#f6f8fa] text-[#656d76] hover:text-[#24292f]'
                  : 'ml-2 p-2 rounded-xl hover:bg-card text-white/80 hover:text-white'
              }
            >
              <Github size={18} />
            </a>
          </nav>
        </div>
      </header>
      <main className="relative mx-auto max-w-7xl px-4 py-8">
        <div key={pathname} className="route-in">
          <Outlet />
        </div>
      </main>
      <footer className="relative mx-auto max-w-7xl px-4 pb-10 text-xs text-white/50">
        主要技术与数据依据来源：InterFuzz 论文
      </footer>
    </div>
  )
}
