import { useEffect, useRef, useState, PropsWithChildren } from 'react'

/**
 * useRevealOnScroll
 * 进入视口时触发 visible=true，只触发一次，用于滚动显隐动画。
 * 返回 { ref, visible }，ref 绑定到目标元素。
 */
export function useRevealOnScroll(opts?: { threshold?: number; rootMargin?: string }) {
  const { threshold = 0.12, rootMargin = '0px 0px -5% 0px' } = opts || {}
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver((entries) => {
      entries.forEach(ent => {
        if (ent.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      })
    }, { threshold, rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, rootMargin])

  return { ref, visible }
}

/**
 * Reveal 组件：包装 children，进入视口时添加动画类。
 * 使用示例：
 * <Reveal className="my-block">...</Reveal>
 * 可配合全局 CSS:
 * .reveal-pre { opacity:0; transform: translateY(16px) scale(.98); transition: all .6s cubic-bezier(.17,.67,.35,1); }
 * .reveal-in { opacity:1; transform: translateY(0) scale(1); }
 */
export function Reveal({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  const { ref, visible } = useRevealOnScroll()
  return <div ref={ref as any} className={`${className} ${visible ? 'reveal-in' : 'reveal-pre'}`}>{children}</div>
}

// 无默认导出
