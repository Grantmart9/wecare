"use client"

import { motion } from "motion/react"
import Image from "next/image";
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import DonateImage from "../images/DonatOption.png"
import DeliverImage from "../images/DeliverOption.png"
import ConnectImage from "../images/ConnectOption.png"

// Card data interfaces
interface CardData {
    id: number;
    icon: string;
    title: string;
    image: any; // Image import type
    description: string;
}

// Icon component props interface
interface IconComponentProps {
    icon: string;
}

// Card data structure
const cardData: CardData[] = [
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
const IconComponent = ({ icon }: IconComponentProps) => {
    switch (icon) {
        case 'donate':
            return <VolunteerActivismOutlinedIcon sx={{ color: 'white' }} />;
        case 'deliver':
            return <LocalShippingOutlinedIcon sx={{ color: 'white' }} />;
        case 'connect':
            return <Diversity3OutlinedIcon sx={{ color: 'white' }} />;
        default:
            return null;
    }
};

export default function HowItWorksAnimation() {
    return (
        <div className="mx-auto px-2 max-w-7xl py-12">
            <motion.ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {cardData.map((card, index) => (
                    <motion.li
                        key={card.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                        className="bg-teal-500
                                 rounded-3xl shadow-xl shadow-purple-900/20 p-8
                                 flex flex-col justify-between w-full h-72
                                 backdrop-blur-sm border border-white/10"
                    >
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="flex mx-auto mb-4"
                        >
                            <Image
                                src={card.image}
                                alt={`${card.title} image`}
                                width={150}
                                height={150}
                                className="object-cover rounded-xl
                                             shadow-lg transform"
                            />
                        </motion.div>
                        <motion.p
                            className="text-gray-50 text-lg leading-relaxed mt-4"
                            initial={{ opacity: 0.8 }}
                            whileHover={{ opacity: 1 }}
                        >
                            {card.description}
                        </motion.p>
                    </motion.li>
                ))}
            </motion.ul>
        </div>
    )
}