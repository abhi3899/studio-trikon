import { useLazyImage } from '../hooks/useLazyImage'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  placeholderClass?: string
}

export default function LazyImage({ src, alt, className = '', placeholderClass = '' }: LazyImageProps) {
  const { loaded, error } = useLazyImage(src)

  if (error) {
    return (
      <div className={`bg-surface flex items-center justify-center ${placeholderClass || className}`}>
        <span className="text-subtle text-sm font-body">Image unavailable</span>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder shimmer */}
      {!loaded && (
        <div className={`absolute inset-0 bg-gradient-to-r from-surface via-surface-hover to-surface animate-pulse ${placeholderClass}`} />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
}
