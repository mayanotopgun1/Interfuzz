import { Link, Outlet, useLocation } from 'react-router-dom'
import { Github, Home as HomeIcon, BookOpen, PlaySquare, Bug, Users } from 'lucide-react'

export default function App() {
  const { pathname } = useLocation()
  const NavLink = ({ to, label, icon: Icon }: { to: string; label: string; icon: any }) => (
    <Link
      to={to}
      aria-label={label}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
        pathname === to ? 'bg-card text-accent' : 'text-white/80 hover:text-white hover:bg-card'
      }`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </Link>
  )

  return (
    <div className="relative min-h-screen bg-background text-white">
      <div className="app-bg" aria-hidden="true" />
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3" aria-label="返回首页">
            <div className="w-8 h-8 rounded-lg bg-accent/20 grid place-items-center text-accent font-bold">IF</div>
            <div>
              <h1 className="text-lg font-semibold">InterFuzz</h1>
              <p className="text-xs text-white/60">复杂类间结构 · Java 优化编译器测试</p>
            </div>
          </Link>
          <nav className="flex items-center gap-2">
            <NavLink to="/" label="首页" icon={HomeIcon} />
            <NavLink to="/principle" label="原理" icon={BookOpen} />
            <NavLink to="/demo" label="功能演示" icon={PlaySquare} />
            <NavLink to="/effects" label="效果展示" icon={Bug} />
            <NavLink to="/about" label="关于我们" icon={Users} />
            <a
              href="#"
              aria-label="GitHub 仓库"
              className="ml-2 p-2 rounded-xl hover:bg-card text-white/80 hover:text-white"
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
