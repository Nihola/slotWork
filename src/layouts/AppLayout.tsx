import { Link, NavLink, Outlet } from 'react-router-dom'
import { Moon } from 'lucide-react'
export default function AppLayout() {
  const toggle = () => {
    const on = document.documentElement.classList.toggle('dark')
    try { localStorage.setItem('theme', on ? 'dark' : 'light') } catch { /* storage unavailable */ }
  }
  return (
    <div className="mx-auto max-w-5xl px-5">
      <header className="flex items-center justify-between py-4">
        <Link to="/" className="text-xl font-extrabold">Slotwork</Link>
        <nav aria-label="Main" className="ml-auto mr-3 flex gap-1 text-sm font-bold">{[['/jobs', 'Find jobs'], ['/employer', 'Employer']].map(([to, l]) => <NavLink key={to} to={to} className={({ isActive }) => `rounded-lg px-3 py-2 ${isActive ? 'bg-brand/10 text-brand' : 'text-slate-500'}`}>{l}</NavLink>)}</nav>
        <button onClick={toggle} aria-label="Toggle dark mode" className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 dark:border-slate-700"><Moon size={18} /></button>
      </header>
      <main><Outlet /></main>
    </div>
  )
}
