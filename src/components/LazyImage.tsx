import { useLazyImage } from '../hooks/useLazyImage'
import { getImageUrl, type ImageSize } from '../utils/imageUtils'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  size?: ImageSize
}

export default function LazyImage({ src, alt, className = '', size = 'cover' }: LazyImageProps) {
  const resolved = getImageUrl(src, size)
  const { loaded, error } = useLazyImage(resolved)

  if (error) {
    return (
      <div className={`bg-surface flex items-center justify-center ${className}`}>
        <span className="text-subtle text-xs font-body">Image unavailable</span>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface-hover to-surface animate-pulse" />
      )}
      <img
        src={resolved}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
}
