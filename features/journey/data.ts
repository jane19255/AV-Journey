export type Screen =
  | 'plan'
  | 'routes'
  | 'tracking'
  | 'boarding'
  | 'journey'
  | 'disruption'
  | 'help'
  | 'recovery'
  | 'transfer'
  | 'transferBoarding'
  | 'arrival'
  | 'feedback'
  | 'done'
  | 'settings'

export type Stop = { name: string; note: string; left: number; top: number }
export type RouteChoice = 'A' | 'B'
export type OnboardBus = 'first' | 'transfer' | null

export const onboardStops: Stop[] = [
  { name: 'Maple Gate', note: 'Boarded', left: 10, top: 82 },
  { name: 'North Park', note: '2 min', left: 31, top: 52 },
  { name: 'Lake Junction', note: '4 min', left: 58, top: 58 },
  { name: 'Pine Street', note: 'Change to AV12', left: 84, top: 19 },
]

export const optionBStops: Stop[] = [
  { name: 'Maple Gate', note: 'Boarded', left: 8, top: 76 },
  { name: 'Garden Link', note: 'Service interrupted', left: 42, top: 49 },
  { name: 'North Park', note: 'Transfer', left: 84, top: 19 },
]

export const transferOnboardStops: Stop[] = [
  { name: 'Pine Street', note: 'Boarded', left: 16, top: 82 },
  { name: 'Library Walk', note: '3 min', left: 47, top: 48 },
  { name: 'Campus West', note: 'Final stop', left: 84, top: 19 },
]

export const replacementOnboardStops: Stop[] = [
  { name: 'Hill View', note: 'Boarded', left: 14, top: 81 },
  { name: 'Campus Library', note: '3 min', left: 49, top: 54 },
  { name: 'Campus West', note: 'Final stop', left: 87, top: 18 },
]
