"use client"

import { animate } from "framer-motion"
import { useEffect, useRef } from "react"

// Simple stagger function implementation
const stagger = (delay: number, options: { startDelay?: number } = {}) => {
  const { startDelay = 0 } = options;
  return (index: number) => startDelay + (index * delay);
};

interface SplitTextResult {
  chars: HTMLElement[];
}

const WavyText: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!containerRef.current) return

      const element = containerRef.current.querySelector(".wavy")
      if (!element) return

      const { chars } = splitText(element)
      containerRef.current.style.visibility = "visible"

      const staggerDelay = 0.2
      const staggerFn = stagger(staggerDelay, { startDelay: -staggerDelay * chars.length })

      chars.forEach((char, index) => {
        animate(
          char,
          { y: [-5, 1] },
          {
            repeat: Infinity,
            repeatType: "mirror" as const,
            ease: "easeInOut",
            duration: 2,
            delay: staggerFn(index),
          }
        )
      })
    })
  }, [])

  return (
    <div className="flex" ref={containerRef}>
      <h1 className="h1">
        <span style={{ fontFamily: "unset" }} className="wavy text-gray-50 text-6xl">WeCare</span>
      </h1>
      <Stylesheet />
    </div>
  )
}

// 👇 Custom helper to replace 'motion-plus'
function splitText(element: Element): SplitTextResult {
  const text = element.textContent || ""
  element.textContent = ""
  const chars = text.split("").map((char) => {
    const span = document.createElement("span")
    span.textContent = char
    span.classList.add("split-char")
    element.appendChild(span)
    return span
  })
  return { chars }
}

const Stylesheet: React.FC = () => {
  return (
    <style>{`
      .split-char {
        display: inline-block;
        will-change: transform, opacity;
      }
    `}</style>
  )
}

export default WavyText;