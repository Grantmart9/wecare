"use client"

import {
    animate,
    motion,
    useMotionValue,
    useMotionValueEvent,
    useScroll,
} from "motion/react"
import { useRef } from "react"
import HelpChildren from "../images/HelpChildren.svg"
import SupportFamilies from "../images/SupportFamilies.svg"
import Empower from "../images/Empower.svg"
import Image from "next/image";

export default function FeaturedCauses() {
    const ref = useRef(null)
    const { scrollXProgress } = useScroll({ container: ref })
    const maskImage = useScrollOverflowMask(scrollXProgress)

    return (
        <div className="mx-auto px-0.5" id="example">
            <motion.ul
             ref={ref} 
             style={{ 
                display: "flex",
                listStyle: "none",
                height: "400px",
                overflowX: "scroll",
                padding: "20px 0",
                flex: "0 0 600px",
                margin: "0 auto",
                gap: "20px",
             }}>
                <li style={{ background: "transparent" }}>
                    <div className="grid grid-flow-row gap-1.5 px-2 py-3 border-1 border-gray-500 rounded-md">
                        <Image src={SupportFamilies} alt={"no image found"} />
                        <div className="text-darkgray text-xl text-bold text-left">Support Local Families</div>
                        <div className="text-gray-500 text-md text-bold text-left">Donate to families affected by recent events.</div>
                    </div>
                </li>
                <li style={{ background: "transparent" }}>
                    <div className="grid grid-flow-row gap-1.5 px-2 py-3 border-1 border-gray-500 rounded-md">
                        <Image src={HelpChildren} alt={"no image found"} />
                        <div className="text-darkgray text-xl text-bold text-left">Help children in need</div>
                        <div className="text-gray-500 text-md text-bold text-left">Provide esential supplies to children in underserved areas.</div>
                    </div>
                </li>
                <li style={{ background: "transparent" }}>
                    <div className="grid grid-flow-row gap-1.5 px-2 py-3 border-1 border-gray-500 rounded-md">
                        <Image src={Empower} alt={"no image found"} />
                        <div className="text-darkgray text-xl text-bold text-left">Empower communities</div>
                        <div className="text-gray-500 text-md text-bold text-left">Contribute to projects that foster community growth.</div>
                    </div>
                </li>
            </motion.ul>
            <StyleSheet1 />
        </div>
    )
}

const left = `0%`
const right = `100%`
const leftInset = `20%`
const rightInset = `80%`
const transparent = `#0000`
const opaque = `#000`

function useScrollOverflowMask(scrollXProgress) {
    const maskImage = useMotionValue(
        `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
    )

    useMotionValueEvent(scrollXProgress, "change", (value) => {
        if (value === 0) {
            animate(
                maskImage,
                `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
            )
        } else if (value === 1) {
            animate(
                maskImage,
                `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${right}, ${opaque})`
            )
        } else if (
            scrollXProgress.getPrevious() === 0 ||
            scrollXProgress.getPrevious() === 1
        ) {
            animate(
                maskImage,
                `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`
            )
        }
    })

    return maskImage
}

function StyleSheet1() {
    return (
        <style>{`
            #example {
              width: 100vw;
              max-width: 400px;
              position: relative;
            }

            #example #progress {
                position: absolute;
                top: -65px;
                left: -15px;
                transform: rotate(-90deg);
            }

            #example .bg {
                stroke: #0b1011;
            }

            #example #progress circle {
                stroke-dashoffset: 0;
                stroke-width: 10%;
                fill: none;
            }

            #progress .indicator {
                stroke: var(--accent);
            }

            #example ::-webkit-scrollbar {
                height: 5px;
                width: 5px;
                background: #fff3;
                -webkit-border-radius: 1ex;
            }

            #example ::-webkit-scrollbar-thumb {
                background: var(--accent);
                -webkit-border-radius: 1ex;
            }

            #example ::-webkit-scrollbar-corner {
                background: #fff3;
            }

            #example li {
                flex: 0 0 200px;
                background: var(--accent);
            }
        `}</style>
    )
}
