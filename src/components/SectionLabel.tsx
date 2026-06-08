interface Props {
  children: React.ReactNode
  light?: boolean
}

export default function SectionLabel({ children, light = false }: Props) {
  return (
    <span
      className={`font-body text-[11px] tracking-[0.2em] uppercase ${
        light ? 'text-white/40' : 'text-muted'
      }`}
    >
      {children}
    </span>
  )
}
