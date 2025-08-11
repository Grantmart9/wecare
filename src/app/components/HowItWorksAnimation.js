"use client"

import {
    animate,
    motion,
    useMotionValue,
    useMotionValueEvent,
    useScroll,
} from "motion/react"
import { useRef, useEffect, useState } from "react"
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import DonateImage from "../images/DonatOption.png"
import DeliverImage from "../images/DeliverOption.png"
import ConnectImage from "../images/ConnectOption.png"

import Image from "next/image";

// Card data structure
const cardData = [
    {
        id: 1,
        icon: 'donate',
        title: 'Donate',
        image: DonateImage,
        description: 'Choose from a variety of causes and donate goods, cash or services.'
    },
    {
        id: 2,
        icon: 'deliver',
        title: 'Deliver',
        image: DeliverImage,
        description: 'Choose to deliver the goods or pick a date for us to pick them up.'
    },
    {
        id: 3,
        icon: 'connect',
        title: 'Connect',
        image: ConnectImage,
        description: "Join our community and see how your donations change other's lives."
    }
];

// Icon component mapping
const IconComponent = ({ icon }) => {
    switch (icon) {
        case 'donate':
            return <VolunteerActivismOutlinedIcon />;
        case 'deliver':
            return <LocalShippingOutlinedIcon />;
        case 'connect':
            return <Diversity3OutlinedIcon />;
        default:
            return null;
    }
};

export default function HowItWorksAnimation() {
    const ref = useRef(null)
    const { scrollXProgress } = useScroll({ container: ref })
    const maskImageValue = useScrollOverflowMask(scrollXProgress)
    const [currentIndex, setCurrentIndex] = useState(0)
    const autoScrollTimer = useRef(null)

    // Scroll to specific index
    const scrollToIndex = (index) => {
        if (ref.current) {
            const clientWidth = ref.current.clientWidth
            const itemWidth = clientWidth / 3 // Assuming 3 items
            const scrollPosition = index * itemWidth
            ref.current.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            })
        }
    }

    // Auto-scroll to next card every 4 seconds
    useEffect(() => {
        const startAutoScroll = () => {
            autoScrollTimer.current = setInterval(() => {
                setCurrentIndex(prevIndex => {
                    const nextIndex = (prevIndex + 1) % 3 // Cycle through 0, 1, 2
                    scrollToIndex(nextIndex)
                    return nextIndex
                })
            }, 4000) // 4 seconds
        }

        startAutoScroll()

        return () => {
            if (autoScrollTimer.current) {
                clearInterval(autoScrollTimer.current)
            }
        }
    }, [])

    // Reset auto-scroll timer on manual interaction
    useEffect(() => {
        const handleScroll = () => {
            // Reset the auto-scroll timer on manual scroll
            if (autoScrollTimer.current) {
                clearInterval(autoScrollTimer.current)
            }
            
            // Restart auto-scroll after 10 seconds of inactivity
            autoScrollTimer.current = setTimeout(() => {
                setCurrentIndex(prevIndex => {
                    const nextIndex = (prevIndex + 1) % 3
                    scrollToIndex(nextIndex)
                    return nextIndex
                })
            }, 10000)
        }

        if (ref.current) {
            ref.current.addEventListener('scroll', handleScroll)
        }

        return () => {
            if (ref.current) {
                ref.current.removeEventListener('scroll', handleScroll)
            }
            if (autoScrollTimer.current) {
                clearTimeout(autoScrollTimer.current)
            }
        }
    }, [])

    return (
        <div className="mx-auto px-0.5" id="example">
            <motion.ul ref={ref} style={{ maskImage: maskImageValue }}>
                {cardData.map((card, index) => (
                    <li key={card.id} style={{ background: "transparent" }}>
                        <div className="grid grid-flow-row gap-1.5 p-4  rounded-3xl bg-gradient-to-br from-amber-600 to-amber-100 shadow-sm shadow-gray-700">
                            <div className="grid grid-flow-col gap-1">
                                <div className="grid grid-flow-row gap-1">
                                    <IconComponent icon={card.icon} />
                                    <div className="text-darkgray text-xl text-bold text-left">{card.title}</div>
                                </div>
                                <Image src={card.image} alt="no image found" className="max-w-16 max-h-16 mx-auto rounded-md" />
                            </div>
                            <div className="text-darkgray text-sm text-bold text-left">{card.description}</div>
                        </div>
                    </li>
                ))}
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
