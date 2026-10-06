import { Check } from 'lucide-react'
import type { ApplicationStatus as Status } from '../types'
const STEPS: { key: Status; label: string }[] = [
  { key: 'submitted', label: 'Submitted' }, { key: 'under_review', label: 'Under review' }, { key: 'shortlisted', label: 'Shortlisted' },
  { key: 'interview', label: 'Interview' }, { key: 'accepted', label: 'Accepted' },
]
export default function ApplicationStatus({ status }: { status: Status }) {
  const idx = Math.max(0, STEPS.findIndex(s => s.key === status))
  return (
    <ol className="grid gap-0" aria-label="Application progress">
      {STEPS.map((s, i) => (
        <li key={s.key} className="flex gap-3" aria-current={i === idx ? 'step' : undefined}>
          <div className="flex flex-col items-center">
            <span className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold ${i < idx ? 'bg-mint text-white' : i === idx ? 'bg-brand text-white ring-4 ring-brand/20' : 'bg-slate-200 text-slate-500 dark:bg-slate-700'}`}>
              {i < idx ? <Check size={14} /> : i + 1}</span>
            {i < STEPS.length - 1 && <span className={`h-6 w-0.5 ${i < idx ? 'bg-mint' : 'bg-slate-200 dark:bg-slate-700'}`} />}
          </div>
          <span className={`pt-0.5 text-sm ${i === idx ? 'font-bold' : i < idx ? '' : 'text-slate-500'}`}>{s.label}</span>
        </li>
      ))}
    </ol>
  )
}
