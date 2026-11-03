import Icon from '../ui/Icon'
import Button from '../ui/button'

export default function AlertModal({
  idPrefix,
  iconName,
  kicker,
  title,
  place,
  actionIcon,
  actionLabel,
  onAction,
  onDismiss,
}: {
  idPrefix: string
  iconName: string
  kicker: string
  title: string
  place: string
  actionIcon: string
  actionLabel: string
  onAction: () => void
  onDismiss: () => void
}) {
  return (
    <div className="modal-backdrop">
      <section className="arrival-modal" role="alertdialog" aria-modal="true" aria-labelledby={`${idPrefix}-title`}>
        <div className="modal-icon"><Icon name={iconName} size={30} /></div>
        <p>{kicker}</p>
        <h2 id={`${idPrefix}-title`}>
          <span className="modal-lead">{title}</span>{' '}
          <span className="modal-place">{place}</span>
        </h2>
        <Button onClick={onAction}><Icon name={actionIcon} size={20} /> {actionLabel}</Button>
        <button className="text-button" onClick={onDismiss}>Dismiss</button>
      </section>
    </div>
  )
}