import type { ReactNode } from 'react'

// Defined once at module level so the JSX isn't rebuilt on every render
const paths: Record<string, ReactNode> = {
  back: <path d="m15 18-6-6 6-6" />,
  bus: <><rect x="5" y="3" width="14" height="15" rx="3" /><path d="M5 11h14M8 7h.01M16 7h.01M8 18v3M16 18v3M8 15h.01M16 15h.01" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  help: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 1-1 1.7M12 17h.01" /></>,
  home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></>,
  location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" /><path d="M9 3v15M15 6v15" /></>,
  phone: <path d="M7 3h3l2 4-2 2a14 14 0 0 0 5 5l2-2 4 2v3c0 2-2 4-4 4A14 14 0 0 1 3 7c0-2 2-4 4-4Z" />,
  route: <><circle cx="6" cy="5" r="2" /><circle cx="18" cy="19" r="2" /><path d="M6 7v3c0 2 2 3 4 3h4c2 0 4 1 4 4" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19 13.5v-3l-2-.7-.7-1.7.9-1.9-2.1-2.1-1.9.9-1.7-.7L10.5 2h-3l-.7 2.3-1.7.7-1.9-.9-2.1 2.1.9 1.9-.7 1.7-2 .7v3l2 .7.7 1.7-.9 1.9 2.1 2.1 1.9-.9 1.7.7.7 2.3h3l.7-2.3 1.7-.7 1.9.9 2.1-2.1-.9-1.9.7-1.7 2-.7Z" transform="translate(1.5) scale(.88)" /></>,
  walk: <><circle cx="13" cy="4" r="2" /><path d="m10 21 2-7-3-3 3-3 3 2 3 1M14 14l3 3v4M8 14l-3 5" /></>,
  warning: <><path d="M12 3 2.8 20h18.4L12 3Z" /><path d="M12 9v4M12 17h.01" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  swap: <path d="M7 7h12l-3-3M17 17H5l3 3" />,
}

export default function Icon({ name, size = 24 }: { name: string; size?: number }) {
  return <svg aria-hidden="true" fill="none" height={size} viewBox="0 0 24 24" width={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">{paths[name]}</svg>
}
