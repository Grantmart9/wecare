"use client"

import {
    animate,
    motion,
    useMotionValue,
    useMotionValueEvent,
    useScroll,
} from "motion/react"
import { useRef, useEffect, useState } from "react"
import HelpChildren from "../images/HelpChildren.svg"
import SupportFamilies from "../images/SupportFamilies.svg"
import Empower from "../images/Empower.svg"
import ConnectOption from "../images/ConnectOption.png"
import DeliverOption from "../images/DeliverOption.png"
import DonatOption from "../images/DonatOption.png"
import Picture1 from "../images/Picture1.png"
import Picture2 from "../images/Picture2.png"
import Image from "next/image";

// Card data structure
const cardData = [
    {
        id: 1,
        image: SupportFamilies,
        title: "Support Local Families",
        description: "Donate to families affected by recent events."
    },
    {
        id: 2,
        image: HelpChildren,
        title: "Help children in need",
        description: "Provide essential supplies to children in underserved areas."
    },
    {
        id: 3,
        image: Empower,
        title: "Empower communities",
        description: "Contribute to projects that foster community growth."
    },
    {
        id: 4,
        image: ConnectOption,
        title: "Connect with others",
        description: "Join our community and make a difference together."
    },
    {
        id: 5,
        image: DeliverOption,
        title: "Deliver donations",
        description: "Help us distribute donations to those in need."
    },
    {
        id: 6,
        image: DonatOption,
        title: "Donate goods",
        description: "Give items you no longer need to help others."
    },
    {
        id: 7,
        image: Picture1,
        title: "Community events",
        description: "Participate in local events that support our mission."
    },
    {
        id: 8,
        image: Picture2,
        title: "Volunteer opportunities",
        description: "Find ways to contribute your time and skills."
    }
];

export default function FeaturedCauses() {
    const ref = useRef(null)
    const { scrollXProgress } = useScroll({ container: ref })
    const maskImageValue = useScrollOverflowMask(scrollXProgress)
    
    // Duplicate card data for seamless looping
    const duplicatedCardData = [...cardData, ...cardData]

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
                maskImage: maskImageValue
             }}
             onMouseEnter={(e) => {
                e.currentTarget.style.animationPlayState = 'paused';
             }}
             onMouseLeave={(e) => {
                e.currentTarget.style.animationPlayState = 'running';
             }}
             onTouchStart={(e) => {
                e.currentTarget.style.animationPlayState = 'paused';
             }}
             onTouchEnd={(e) => {
                e.currentTarget.style.animationPlayState = 'running';
             }}
            >
                {duplicatedCardData.map((card, index) => (
                    <li key={`${card.id}-${index}`} style={{ background: "transparent" }}>
                        <div className="grid grid-flow-row gap-1.5 px-2 py-3 border-1 border-gray-500 rounded-md">
                            <Image src={card.image} alt={"no image found"} />
                            <div className="text-darkgray text-xl text-bold text-left">{card.title}</div>
                            <div className="text-gray-500 text-md text-bold text-left">{card.description}</div>
                        </div>
                    </li>
                ))}
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

            #example ul {
                animation: slide 30s linear infinite;
                animation-play-state: running;
            }

            #example ul:hover {
                animation-play-state: paused;
            }

            @keyframes slide {
                0% {
                    transform: translateX(0);
                }
                100% {
                    transform: translateX(-50%);
                }
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
