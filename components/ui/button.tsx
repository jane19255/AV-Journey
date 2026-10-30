import type { ReactNode } from 'react'

export default function Button({ children, onClick, secondary = false, disabled = false }: { children: ReactNode; onClick?: () => void; secondary?: boolean; disabled?: boolean }) {
  return <button className={secondary ? 'btn secondary' : 'btn'} type="button" onClick={onClick} disabled={disabled}>{children}</button>
}
