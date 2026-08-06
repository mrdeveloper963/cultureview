import Image from 'next/image'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  style?: React.CSSProperties
  sizes?: string
}

export function OptimizedImage({
  src,
  alt,
  width = 80,
  height = 80,
  priority = false,
  className,
  style,
  sizes = '100vw',
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      style={style}
      sizes={sizes}
      quality={85}
      loading={priority ? 'eager' : 'lazy'}
    />
  )
}
