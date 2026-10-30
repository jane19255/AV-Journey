export default function Header({ kicker, title, subtitle }: { kicker: string; title: string; subtitle: string }) {
  return <header className="screen-header"><p>{kicker}</p><h1>{title}</h1><span>{subtitle}</span></header>
}
