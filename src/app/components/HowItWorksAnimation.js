"use client"

import {
    animate,
    motion,
    useMotionValue,
    useMotionValueEvent,
    useScroll,
} from "motion/react"
import { useRef } from "react"
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import DonateImage from "../images/DonatOption.png"
import DeliverImage from "../images/DeliverOption.png"
import ConnectImage from "../images/ConnectOption.png"

import Image from "next/image";

export default function HowItWorksAnimation() {
    const ref = useRef(null)
    const { scrollXProgress } = useScroll({ container: ref })
    const maskImage = useScrollOverflowMask(scrollXProgress)

    return (
        <div className="mx-auto px-0.5" id="example">
            <motion.ul ref={ref} style={{ maskImage }}>
                <li style={{ background: "transparent" }}>
                    <div className="grid grid-flow-row gap-1.5 px-2 py-3 border-1 border-gray-500 rounded-md">
                        <div className="grid grid-flow-col gap-1">
                            <div className="grid grid-flow-row gap-1">
                                <VolunteerActivismOutlinedIcon />
                                <div className="text-darkgray text-xl text-bold text-left">Donate</div>
                            </div>
                            <Image src={DonateImage} alt="no image found" className="max-w-16 max-h-16 mx-auto rounded-md" />
                        </div>
                        <div className="text-gray-400 text-sm text-bold text-left">Choose from a variety of causes and donate goods, cash or services.</div>
                    </div>
                </li>
                <li style={{ background: "transparent" }}>
                    <div className="grid grid-flow-row gap-1.5 px-2 py-3 border-1 border-gray-500 rounded-md">
                        <div className="grid grid-flow-col gap-1">
                            <div className="grid grid-flow-row gap-1">
                                <LocalShippingOutlinedIcon />
                                <div className="text-darkgray text-xl text-bold text-left">Deliver</div>
                            </div>
                            <Image src={DeliverImage} alt="no image found" className="max-w-16 max-h-16 mx-auto rounded-md" />
                        </div>
                        <div className="text-gray-400 text-sm text-bold text-left">Choose to dilliver the goods or pick a date for us to pick them up.</div>
                    </div>
                </li>
                <li style={{ background: "transparent" }}>
                    <div className="grid grid-flow-row gap-1.5 px-2 py-3 border-1 border-gray-500 rounded-md">
                        <div className="grid grid-flow-col gap-1">
                            <div className="grid grid-flow-row gap-1">
                                <Diversity3OutlinedIcon />
                                <div className="text-darkgray text-xl text-bold text-left">Connect</div>
                            </div>
                            <Image src={ConnectImage} alt="no image found" className="max-w-16 max-h-16 mx-auto rounded-md" />
                        </div>
                        <div className="text-gray-400 text-sm text-bold text-left">Join our community and see how your donations change other's lives.</div>
                    </div>
                </li>
            </motion.ul>
            <StyleSheet />
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

function StyleSheet() {
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

            #example ul {
                display: flex;
                list-style: none;
                height: 220px;
                overflow-x: scroll;
                padding: 20px 0;
                flex: 0 0 600px;
                margin: 0 auto;
                gap: 20px;
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
