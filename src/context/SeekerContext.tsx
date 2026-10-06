import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { mockSeeker } from '../services/mockSeeker'
import { cellsToRanges, rangesToCells } from '../utils/availability'
import type { JobSeeker, SlotKind } from '../types'

interface Ctx { seeker: JobSeeker; cells: Map<string, SlotKind>; setCells: (c: Map<string, SlotKind>) => void }
const SeekerCtx = createContext<Ctx | null>(null)

/** Single source of truth for the signed-in seeker's live availability. */
export function SeekerProvider({ children }: { children: ReactNode }) {
  const [cells, setCells] = useState(() => rangesToCells(mockSeeker.availability))
  const value = useMemo(() => ({ seeker: { ...mockSeeker, availability: cellsToRanges(cells) }, cells, setCells }), [cells])
  return <SeekerCtx.Provider value={value}>{children}</SeekerCtx.Provider>
}
export function useSeeker() {
  const c = useContext(SeekerCtx)
  if (!c) throw new Error('useSeeker must be used inside SeekerProvider')
  return c
}
