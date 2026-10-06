import { jobs } from '../data/jobs'
import type { Job } from '../types'
const delay = <T,>(v: T, ms = 400) => new Promise<T>(r => setTimeout(() => r(v), ms))
// Swap these bodies for fetch('/api/jobs') later; signatures stay the same.
export const jobService = {
  getJobs: (): Promise<Job[]> => delay(jobs.filter(j => j.moderation === 'approved')),
  getJobById: (id: string): Promise<Job | undefined> => delay(jobs.find(j => j.id === id)),
}
