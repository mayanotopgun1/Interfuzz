import React, { useEffect, useMemo, useState } from 'react'

export type ThemedImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  lightSrc: string
  darkSrc: string
}

function getIsLightTheme(): boolean {
  if (typeof document === 'undefined') return false
  const el = document.documentElement
  return el.classList.contains('theme-light')
}

/**
 * ThemedImage
 * - Chooses between lightSrc and darkSrc based on `html.theme-light` class
 * - Reacts to theme changes at runtime via MutationObserver
 */
export default function ThemedImage({ lightSrc, darkSrc, alt, className, ...rest }: ThemedImageProps) {
  const [isLight, setIsLight] = useState<boolean>(() => getIsLightTheme())

  useEffect(() => {
    const el = document.documentElement
    // Guard
    if (!('MutationObserver' in window)) {
      setIsLight(getIsLightTheme())
      return
    }
    const obs = new MutationObserver(() => {
      setIsLight(getIsLightTheme())
    })
    obs.observe(el, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  const src = useMemo(() => (isLight ? lightSrc : darkSrc), [isLight, lightSrc, darkSrc])

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img src={src} alt={alt} className={className} loading={rest.loading ?? 'lazy'} {...rest} />
  )
}
