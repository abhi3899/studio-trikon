import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if ('ontouchstart' in window) return

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)
    const onOver = (e: MouseEvent) => {
      setHovering(!!(e.target as Element).closest('a, button, [role="button"]'))
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseover', onOver)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseover', onOver)
    }
  }, [])

  return (
    <div
      className="fixed z-[9998] pointer-events-none"
      style={{
        left: pos.x,
        top: pos.y,
        transform: 'translate(-50%, -50%)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.2s',
      }}
    >
      {/* Outer ring — expands on hover */}
      <div
        className="absolute rounded-full border border-accent/50 transition-all duration-300 ease-out"
        style={{
          width: hovering ? 36 : 20,
          height: hovering ? 36 : 20,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      {/* Inner dot */}
      <div
        className="rounded-full bg-accent transition-all duration-150"
        style={{
          width: hovering ? 4 : 5,
          height: hovering ? 4 : 5,
          marginLeft: hovering ? -2 : -2.5,
          marginTop: hovering ? -2 : -2.5,
        }}
      />
    </div>
  )
}
