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
  { name: 'Maple Gate', note: 'Boarded', left: 8, top: 76 },
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
  { name: 'Pine Street', note: 'Boarded', left: 8, top: 76 },
  { name: 'Library Walk', note: '3 min', left: 47, top: 48 },
  { name: 'Campus West', note: 'Final stop', left: 84, top: 19 },
]

export const replacementOnboardStops: Stop[] = [
  { name: 'North Park', note: 'Boarded', left: 8, top: 76 },
  { name: 'Hill View', note: '3 min', left: 33, top: 51 },
  { name: 'Campus Library', note: '5 min', left: 61, top: 57 },
  { name: 'Campus West', note: 'Final stop', left: 84, top: 19 },
]
