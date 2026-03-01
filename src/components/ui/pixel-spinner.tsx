import { useMemo } from 'react'
import * as motion from 'motion/react-client'

interface PixelSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function PixelSpinner({ size = 'md', className = '' }: PixelSpinnerProps) {
  const sizeConfig = {
    sm: { container: 24, pixel: 4, count: 5 },
    md: { container: 32, pixel: 5, count: 6 },
    lg: { container: 48, pixel: 6, count: 8 },
  }

  const config = sizeConfig[size]

  const pixels = useMemo(() => {
    return Array.from({ length: config.count }, (_, i) => ({
      id: i,
      delay: i * 0.15,
    }))
  }, [config.count])

  return (
    <div
      className={`relative ${className}`}
      style={{ width: config.container, height: config.container }}
    >
      {pixels.map((pixel, index) => {
        // Position pixels in a circular pattern
        const angle = (index / config.count) * Math.PI * 2
        const radius = config.container / 2 - config.pixel
        const x = Math.cos(angle) * radius + config.container / 2 - config.pixel / 2
        const y = Math.sin(angle) * radius + config.container / 2 - config.pixel / 2

        return (
          <motion.div
            key={pixel.id}
            className="absolute rounded-sm bg-white"
            style={{
              width: config.pixel,
              height: config.pixel,
              left: x,
              top: y,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1,
              delay: pixel.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )
      })}
    </div>
  )
}
