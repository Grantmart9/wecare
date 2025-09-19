import { useEffect, useState } from "react";
import {
    motion,
    useMotionValue,
    useTransform,
    animate,
} from "framer-motion";
import { interpolate } from "flubber";

/* -------------------------- MUI -------------------------- */
import {
    Box,
    Container,
    TextField,
    Button,
    Grid,
    Paper,
} from "@mui/material";

const colors = [
    "#fff312",
    "#ff0088",
    "#dd00ee",
    "#9911ff",
    "#0d63f8",
    "#0cdcf7",
    "#4ff0b7",
];

const paths =
    ["M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
        "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"]

/* -------------------------------------------------
   Functional Component for the morphing SVG
   ------------------------------------------------- */
function MorphingSVG() {
    // index of the *current* shape
    const [current, setCurrent] = useState(0);
    // progress goes from 0 → 1 for each transition
    const progress = useMotionValue(0);

    const next = (current + 1) % paths.length;

    // Interpolate the path and the fill colour based on progress 0‑1
    const d = useTransform(
        progress,
        [0, 1],
        [paths[current], paths[next]],
        {
            mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 0.1 }),
        }
    );
    const fill = useTransform(
        progress,
        [0, 1],
        [colors[current], colors[next]]
    );

    // Run the animation loop
    useEffect(() => {
        const controls = animate(progress, 1, {
            duration: 3,
            ease: "easeInOut",
            onComplete: () => {
                setCurrent(next);            // advance to the next shape
                progress.set(0);             // restart progress for the next cycle
            },
        });
        return () => controls.stop();
    }, [current, next, progress]);

    return (
        <svg width={240} height={240} viewBox="0 0 24 24">
            {/* a faint glowing circle behind the shape – just for visual flair */}
            <motion.circle
                cx={12}
                cy={12}
                r={9}
                fill={fill}
                opacity={0.2}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
            />
            {/* actual morphing shape */}
            <motion.path
                d={d}
                fill={fill}
                stroke="#ffffff"
                strokeWidth={0.5}
                style={{ filter: "drop-shadow(0 0 6px rgba(0,0,0,0.4))" }}
            />
        </svg>
    );
}

/* -------------------------------------------------
   Contact‑Us page
   ------------------------------------------------- */
export default function ContactUs() {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
            {/* -------------------------------------------------
        1️⃣  Blue‑to‑purple banner (same as other pages)
        ------------------------------------------------- */}
            <div className="relative h-[300px] bg-gradient-to-r from-blue-600 to-purple-700">
                <div className="absolute inset-0 bg-black opacity-30"></div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                    </motion.div>

                    <motion.p
                        className="text-xl max-w-3xl"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Have a question, suggestion, or just want to say hi? Fill the form
                        below and we’ll get back to you as soon as possible.
                    </motion.p>
                </div>
            </div>

            {/* -------------------------------------------------
        2️⃣  Main content (gradient bg + nice spacing)
        ------------------------------------------------- */}
            <motion.main
                className="py-12"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.15 },
                    },
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={6} alignItems="center">

                        {/* ----- Right side: the contact form inside a Paper ----- */}
                        <Grid item xs={12} md={7}>
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                            >
                                <Paper
                                    elevation={6}
                                    sx={{
                                        p: 4,
                                        borderRadius: 3,
                                        background: "rgba(255,255,255,0.85)",   // translucent background
                                        backdropFilter: "blur(8px)",
                                    }}
                                >
                                    {/* Render the MorphingSVG component directly */}
                                    <MorphingSVG />
                                </Paper>

                            </motion.div>
                        </Grid>
                    </Grid>
                </Container>
            </motion.main>
        </div>
    );
}
