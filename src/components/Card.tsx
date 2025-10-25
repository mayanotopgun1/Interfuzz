import { PropsWithChildren } from 'react'

export default function Card({ children, className = '', ...rest }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`card ${className}`} {...rest}>
      {children}
    </div>
  )
}
