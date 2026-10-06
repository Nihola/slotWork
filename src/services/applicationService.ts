import type { Application } from '../types'
interface ApplyInput { jobId: string; seekerId: string; shiftId?: string; message?: string }
// Replace with POST /api/applications later.
export const applicationService = {
  apply: (input: ApplyInput): Promise<Application> =>
    new Promise(resolve => setTimeout(() => resolve({ id: `app-${Date.now()}`, ...input, status: 'submitted', createdAt: new Date().toISOString() }), 700)),
}
