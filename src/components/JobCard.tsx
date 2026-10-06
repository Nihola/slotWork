import { Link } from 'react-router-dom'
import { BadgeCheck, MapPin, Clock } from 'lucide-react'
import MatchScore from './MatchScore'
import type { Job, MatchScore as Score } from '../types'
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
export default function JobCard({ job, match }: { job: Job; match: Score }) {
  const { days, startHour, endHour } = job.schedule
  return (
    <article className="relative flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131839] p-4 transition hover:-translate-y-0.5 hover:border-brand">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand to-violet font-extrabold text-white">{job.company[0]}</div>
      <div className="min-w-0 flex-1">
        <h3 className="font-bold"><Link to={`/jobs/${job.id}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">{job.title}</Link></h3>
        <p className="flex flex-wrap items-center gap-x-2 text-sm text-slate-500">{job.company}
          {job.verification !== 'unverified' && <span className="inline-flex items-center gap-1 text-cyan-600"><BadgeCheck size={14} />Verified</span>}</p>
        <p className="mt-1 flex flex-wrap gap-x-3 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1"><MapPin size={14} />{job.district || job.city}</span>
          <span className="inline-flex items-center gap-1"><Clock size={14} />{DAYS[days[0]]}–{DAYS[days[days.length - 1]]} {startHour}:00–{endHour}:00</span></p>
        <p className="mt-1 text-xs font-semibold text-mint">{match.schedule === 100 ? 'Schedule compatible' : `You cover ${match.schedule}% of the hours`}</p>
      </div>
      <MatchScore value={match.overall} />
    </article>
  )
}
