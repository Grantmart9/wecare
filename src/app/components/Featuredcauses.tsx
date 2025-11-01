"use client"

import { motion } from "framer-motion"
import HelpChildren from "../images/HelpChildren.svg"
import SupportFamilies from "../images/SupportFamilies.svg"
import Empower from "../images/Empower.svg"
import Image, { StaticImageData } from "next/image"

interface CardData {
  id: number;
  image: StaticImageData;
  title: string;
  description: string;
}

const cardData: CardData[] = [
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
];

const FeaturedCauses: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {cardData.map((card) => (
          <motion.div
            key={card.id}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
            }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="relative w-full h-48 overflow-hidden">
              <Image
                src={card.image}
                alt={card.title}
                className="object-cover transform hover:scale-110 transition-transform duration-500"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {card.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {card.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FeaturedCauses;