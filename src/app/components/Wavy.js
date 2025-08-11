"use client"

import { animate, stagger } from "motion"
import { useEffect, useRef } from "react"

export default function WavyText() {
    const containerRef = useRef(null)

    useEffect(() => {
        document.fonts.ready.then(() => {
            if (!containerRef.current) return

            const element = containerRef.current.querySelector(".wavy")
            if (!element) return

            const { chars } = splitText(element)
            containerRef.current.style.visibility = "visible"

            const staggerDelay = 0.2

            animate(
                chars,
                { y: [-5, 1] },
                {
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    duration: 2,
                    delay: stagger(
                        staggerDelay,
                        { startDelay: -staggerDelay * chars.length }
                    ),
                }
            )
        })
    }, [])

    return (
        <div className="flex" ref={containerRef}>
            <h1 className="h1">
                <span style={{fontFamily:"unset"}} className="wavy text-gray-50 text-6xl">WeCare</span>
            </h1>
            <Stylesheet />
        </div>
    )
}

// 👇 Custom helper to replace 'motion-plus'
function splitText(element) {
    const text = element.textContent
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

function Stylesheet() {
    return (
        <style>{`
            .split-char {
                display: inline-block;
                will-change: transform, opacity;
            }
        `}</style>
    )
}
