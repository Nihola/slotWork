import { useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useJobs } from '../hooks/useJobs'
import { candidates } from '../data/candidates'
import { computeCoverage, coverageLabel } from '../utils/coverage'
import { matchingService } from '../services/matchingService'
import { useToast } from '../context/ToastContext'
import CoverageTimeline, { PERSON_COLORS } from '../components/CoverageTimeline'
import CandidateCard from '../components/CandidateCard'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
export default function EmployerCoveragePage() {
  const { id } = useParams()
  const nav = useNavigate()
  const toast = useToast()
  const { jobs, loading, error, reload } = useJobs()
  const [picked, setPicked] = useState<string[]>(['c1', 'c2'])
  const [dayIdx, setDayIdx] = useState(0)
  const job = jobs.find(j => j.id === id)

  const ranked = useMemo(() => job ? candidates.map(p => ({ p, m: matchingService.calculateMatch(job, p) })).sort((a, b) => b.m.overall - a.m.overall) : [], [job])
  const people = useMemo(() => picked.map(pid => candidates.find(c => c.id === pid)!).filter(Boolean), [picked])
  const cov = useMemo(() => job ? computeCoverage(job, people) : null, [job, people])

  if (!id) return <Navigate to="/employer/jobs/j2" replace />
  if (loading) return <div className="h-80 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />
  if (error) return <div className="rounded-2xl border p-8 text-center"><p className="font-bold">Something went wrong.</p><p className="text-slate-500">We couldn't load your jobs. Please try again.</p><button onClick={reload} className="mt-3 rounded-xl bg-brand px-4 py-2 font-bold text-white">Try again</button></div>
  if (!job || !cov) return <div className="rounded-2xl border p-8 text-center"><p className="font-bold">We couldn't find that job.</p></div>

  const pct = Math.round(cov.ratio * 100)
  const day = job.schedule.days[Math.min(dayIdx, job.schedule.days.length - 1)]
  const dayCov = cov.perDay.find(d => d.day === day)!
  const full = pct === 100
  const card = 'rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-[#131839]'
  const toggle = (pid: string) => setPicked(l => l.includes(pid) ? l.filter(x => x !== pid) : [...l, pid])
  const gapText = dayCov.gaps.length ? `Nobody covers ${DAYS[day]} ${dayCov.gaps.map(([a, b]) => `${a}:00–${b}:00`).join(' and ')}.` : `${DAYS[day]} is fully staffed.`

  return (
    <div className="grid gap-5 pb-16">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="text-3xl font-extrabold tracking-tight">Shift coverage</h1>
          <p className="text-slate-500">Combine candidates to cover every required hour.</p></div>
        <label className="text-sm font-bold">Job
          <select value={job.id} onChange={e => { nav(`/employer/jobs/${e.target.value}`); setDayIdx(0) }} className="ml-2 rounded-xl border border-slate-200 bg-transparent px-3 py-2 dark:border-slate-700">
            {jobs.map(j => <option key={j.id} value={j.id} className="text-ink">{j.title}</option>)}</select></label>
      </div>

      <section className={card}>
        <div className="flex flex-wrap items-center gap-4">
          <span className={`text-6xl font-extrabold tracking-tight ${full ? 'text-mint' : 'text-amber-500'}`} aria-live="polite">{pct}%</span>
          <div><span className={`rounded-full px-3 py-1 text-sm font-extrabold text-white ${full ? 'bg-mint' : 'bg-amber-500'}`}>{coverageLabel(pct)}</span>
            <p className="mt-1 text-sm text-slate-500">{people.length ? `${cov.covered} of ${cov.total} required hours staffed by ${people.length} ${people.length === 1 ? 'person' : 'people'}.` : 'Add candidates below to start covering this shift.'}</p></div>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className={`h-3 rounded-full transition-all duration-500 ${full ? 'bg-mint' : 'bg-amber-500'}`} style={{ width: `${pct}%` }} /></div>

        <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Day">
          {job.schedule.days.map((d, i) => {
            const r = Math.round(cov.perDay[i].ratio * 100)
            return <button key={d} role="tab" aria-selected={i === dayIdx} onClick={() => setDayIdx(i)}
              className={`rounded-xl border px-3 py-1.5 text-sm font-bold ${i === dayIdx ? 'border-brand bg-brand text-white' : 'border-slate-200 dark:border-slate-700'}`}>{DAYS[d]} <span className={`text-xs ${i === dayIdx ? '' : r === 100 ? 'text-mint' : 'text-amber-500'}`}>{r}%</span></button>
          })}
        </div>
        <div className="mt-4"><CoverageTimeline job={job} people={people} day={day} /></div>
        <p className={`mt-3 text-sm font-semibold ${dayCov.gaps.length ? 'text-red-500' : 'text-mint'}`}>{gapText}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button disabled={!people.length} onClick={() => toast(`${people.length} candidate${people.length > 1 ? 's' : ''} shortlisted`)} className="rounded-xl bg-gradient-to-br from-brand to-violet px-5 py-3 font-bold text-white disabled:opacity-50">Shortlist selected</button>
          <button disabled={full} onClick={() => toast('Gap posted as an open shift')} className="rounded-xl border border-slate-200 px-5 py-3 font-bold disabled:opacity-50 dark:border-slate-700">Post the gap as an open shift</button>
        </div>
      </section>

      <section aria-label="Recommended candidates" className="grid gap-3">
        <h2 className="text-xl font-extrabold">Recommended candidates</h2>
        {ranked.map(({ p, m }) => { const i = picked.indexOf(p.id); return <CandidateCard key={p.id} person={p} match={m} selected={i >= 0} color={PERSON_COLORS[Math.max(i, 0) % PERSON_COLORS.length]} onToggle={() => toggle(p.id)} /> })}
      </section>
    </div>
  )
}
