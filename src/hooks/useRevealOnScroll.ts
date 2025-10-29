import { useEffect, useRef, useState } from 'react'

/**
 * useRevealOnScroll
 * 简单进入视口检测，首次进入时设置 visible=true。
 * 提供 ref 绑定到元素，并返回 visible 布尔值。
 * 
 * 用法：
 * const { ref, visible } = useRevealOnScroll({ threshold: 0.15 });
 * <div ref={ref} className={visible ? 'reveal-in' : 'reveal-pre'}>...</div>
 */
export function useRevealOnScroll(opts?: { threshold?: number; rootMargin?: string }) {
  const { threshold = 0.1, rootMargin = '0px 0px -10% 0px' } = opts || {}
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver((entries) => {
      entries.forEach(ent => {
        if (ent.isIntersecting) {
          setVisible(true)
          io.disconnect() // 只触发一次
        }
      })
    }, { threshold, rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, rootMargin])

  return { ref, visible }
}

/**
 * Reveal 组件包装，简化写法。
 * <Reveal><YourContent/></Reveal>
 */
// 注意：该文件目前为 .ts，不支持直接书写 JSX。若需使用下面的包装组件，请改文件扩展名为 .tsx。
// 这里暂时移除 Reveal 包装组件以避免构建报错。需要再加时请创建 useRevealOnScroll.tsx。
