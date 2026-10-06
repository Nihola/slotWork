export type Role = 'seeker' | 'employer' | 'admin'
export type VerificationLevel = 'unverified' | 'identity' | 'business' | 'trusted'
export type JobType = 'one-time' | 'short-term' | 'part-time' | 'full-time' | 'shift-based' | 'remote'
export type SlotKind = 'available' | 'preferred'
export type ApplicationStatus = 'submitted' | 'under_review' | 'shortlisted' | 'interview' | 'accepted' | 'rejected'

export interface User { id: string; name: string; email: string; role: Role; avatarUrl?: string }
export interface Availability { id: string; dayOfWeek: number; startHour: number; endHour: number; kind: SlotKind }
export interface JobSeeker extends User { headline: string; city: string; district: string; skills: string[]; languages: string[]; availability: Availability[]; rating: number }
export interface Employer extends User { companyName: string; verification: VerificationLevel; industry: string; rating: number }
export interface Shift { id: string; label: string; startHour: number; endHour: number }
export interface JobSchedule { days: number[]; startHour: number; endHour: number; flexible: boolean; shifts: Shift[] }
export interface Job {
  id: string; title: string; employerId: string; company: string; verification: VerificationLevel
  city: string; district: string; type: JobType; salaryMin: number; salaryMax: number; salaryPeriod: 'day' | 'month'
  skills: string[]; schedule: JobSchedule; postedAt: string; moderation: 'pending' | 'approved' | 'rejected'
}
export interface MatchScore { overall: number; skills: number; schedule: number; location: number; experience: number; preferences: number; uncoveredHours: number }
export interface Application { id: string; jobId: string; seekerId: string; shiftId?: string; status: ApplicationStatus; message?: string; createdAt: string; conversationId?: string }
export interface Message { id: string; conversationId: string; senderId: string; body: string; sentAt: string }
export interface Conversation { id: string; applicationId: string; jobTitle: string; lastMessage: string; unread: number }
export interface Notification { id: string; category: 'applications' | 'messages' | 'jobs' | 'interviews' | 'system'; body: string; createdAt: string; read: boolean }
export interface Report { id: string; targetType: 'job' | 'employer' | 'user'; targetId: string; reason: 'scam' | 'fake_employer' | 'misleading' | 'inappropriate' | 'harassment' | 'payment_scam' | 'other'; details?: string }
