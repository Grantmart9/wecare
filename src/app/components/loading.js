
import React from "react";
import { DrawerBackgroundHoverColor } from "../supabase";
import { motion } from "motion/react";

function LoadingThreeDotsJumping() {
    const dotCount = 20; // Number of dots
    const radius = 77; // Radius of the circle in pixels
    const centerX = 5; // X-coordinate of the circle center
    const centerY = 5; // Y-coordinate of the circle center

    // Generate dot positions based on circle geometry
    const dots = Array.from({ length: dotCount }).map((_, index) => {
        const angle = (index / dotCount) * 2 * Math.PI; // Angle in radians
        const x = centerX + radius * Math.cos(angle); // X-position
        const y = centerY + radius * Math.sin(angle); // Y-position
        return { x, y };
    });

    return (
        <div
            className="flex"
            style={{
                position: "relative",
                width: radius * 2 + 50, // Circle container size
                height: radius * 2 + 50,

            }}
        >
            {dots.map((dot, i) => (
                <motion.div
                    key={i}
                    initial={{ backgroundColor: "#00838f" }}
                    animate={{ backgroundColor: "#f57c00" }}
                    transition={{
                        duration: 0.17,
                        repeat: Infinity,
                        delay: i * 0.015,
                        ease: "circInOut",
                    }}
                    style={{
                        position: "absolute",
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        top: `${dot.y + radius}px`,
                        left: `${dot.x + radius}px`,
                    }}
                />
            ))}
        </div>
    );
};

export default LoadingThreeDotsJumping;