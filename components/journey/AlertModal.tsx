import type { ReactNode } from 'react'
import Icon from '../ui/Icon'
import Button from '../ui/Button'

export default function AlertModal({
  idPrefix,
  iconName,
  kicker,
  title,
  description,
  actionIcon,
  actionLabel,
  onAction,
  onDismiss,
}: {
  idPrefix: string
  iconName: string
  kicker: string
  title: string
  description: ReactNode
  actionIcon: string
  actionLabel: string
  onAction: () => void
  onDismiss: () => void
}) {
  return (
    <div className="modal-backdrop">
      <section className="arrival-modal" role="alertdialog" aria-modal="true" aria-labelledby={`${idPrefix}-title`} aria-describedby={`${idPrefix}-description`}>
        <div className="modal-icon"><Icon name={iconName} size={30} /></div>
        <p>{kicker}</p>
        <h2 id={`${idPrefix}-title`}>{title}</h2>
        <span id={`${idPrefix}-description`}>{description}</span>
        <Button onClick={onAction}><Icon name={actionIcon} size={20} /> {actionLabel}</Button>
        <button className="text-button" onClick={onDismiss}>Dismiss</button>
      </section>
    </div>
  )
}
