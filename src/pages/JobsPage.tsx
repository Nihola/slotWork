import { useMemo } from 'react'
import { useJobs } from '../hooks/useJobs'
import { useSeeker } from '../context/SeekerContext'
import { matchingService } from '../services/matchingService'
import AvailabilityCalendar from '../components/AvailabilityCalendar'
import JobCard from '../components/JobCard'
export default function JobsPage() {
  const { jobs, loading, error, reload } = useJobs()
  const { seeker, cells, setCells } = useSeeker()
  const ranked = useMemo(() => {
    return jobs.map(job => ({ job, match: matchingService.calculateMatch(job, seeker) })).sort((a, b) => b.match.overall - a.match.overall)
  }, [jobs, seeker])
  return (
    <div className="grid gap-6 pb-16">
      <div><h1 className="text-4xl font-extrabold tracking-tight">Find work that fits your life.</h1>
        <p className="mt-2 text-slate-500">Paint the hours you can work. Jobs re-rank instantly.</p></div>
      <section className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131839] p-5"><AvailabilityCalendar value={cells} onChange={setCells} /></section>
      <section className="grid gap-3" aria-live="polite">
        {loading && Array.from({ length: 4 }, (_, i) => <div key={i} className="h-24 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />)}
        {error && <div className="rounded-2xl border p-6 text-center"><p className="font-bold">Something went wrong.</p><p className="text-slate-500">We couldn't load your opportunities. Please try again.</p>
          <button onClick={reload} className="mt-3 rounded-xl bg-brand px-4 py-2 font-bold text-white">Try again</button></div>}
        {!loading && !error && ranked.map(({ job, match }) => <JobCard key={job.id} job={job} match={match} />)}
      </section>
    </div>
  )
}
