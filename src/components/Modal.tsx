import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'
export default function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [onClose])
  return (
    <div className="fixed inset-0 z-40 grid place-items-end bg-ink/60 sm:place-items-center" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={title} onClick={e => e.stopPropagation()}
        className="max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-white p-6 dark:bg-[#131839] sm:max-w-lg sm:rounded-3xl">
        <div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-extrabold">{title}</h2>
          <button onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 dark:border-slate-700"><X size={16} /></button></div>
        {children}
      </div>
    </div>
  )
}
