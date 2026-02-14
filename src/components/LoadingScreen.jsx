import React from 'react';
import { motion } from 'framer-motion';

const EASE_OUT_QUART = [0.22, 1, 0.36, 1];

/* Bar config – 7 bars with staggered heights and timings to match
   the reference image's equalizer/sound-wave style */
const bars = [
    { height: 36, delay: 0.0 },
    { height: 52, delay: 0.08 },
    { height: 72, delay: 0.16 },
    { height: 90, delay: 0.24 },
    { height: 72, delay: 0.32 },
    { height: 52, delay: 0.40 },
    { height: 36, delay: 0.48 },
];

const LoadingScreen = ({ onComplete }) => {
    return (
        <motion.div
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
            style={{ background: 'radial-gradient(ellipse at 50% 50%, #1a1028 0%, #0e0e12 80%)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT_QUART }}
        >
            {/* Subtle background glow behind bars */}
            <div
                className="absolute w-[200px] h-[200px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                }}
            />

            {/* Equalizer bars */}
            <div className="relative flex items-end gap-[6px]">
                {bars.map((bar, i) => (
                    <motion.div
                        key={i}
                        className="relative rounded-full overflow-hidden"
                        style={{ width: 14 }}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                            height: [0, bar.height, bar.height * 0.5, bar.height, bar.height * 0.6, bar.height],
                            opacity: [0, 1, 1, 1, 1, 1],
                        }}
                        transition={{
                            height: {
                                duration: 2,
                                delay: bar.delay,
                                times: [0, 0.3, 0.5, 0.7, 0.85, 1],
                                ease: 'easeInOut',
                            },
                            opacity: {
                                duration: 0.3,
                                delay: bar.delay,
                            },
                        }}
                    >
                        {/* Bar body with gradient */}
                        <div
                            className="w-full h-full rounded-full"
                            style={{
                                background: `linear-gradient(to top, rgba(255,255,255,0.15) 0%, rgba(255,255,255,${0.5 + (i === 3 ? 0.4 : i === 2 || i === 4 ? 0.25 : 0.1)}) 60%, rgba(255,255,255,${0.7 + (i === 3 ? 0.3 : 0)}) 100%)`,
                            }}
                        />

                        {/* Top glow */}
                        <div
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-[20px] h-[20px] rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)',
                                filter: 'blur(6px)',
                            }}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Subtle text below */}
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8, ease: EASE_OUT_QUART }}
                className="mt-10 text-[10px] uppercase tracking-[0.3em] text-white/20 font-medium"
            >
                Loading
            </motion.p>

            {/* Pulse animation on bars after initial entrance – then fade out entire screen */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
                transition={{ delay: 2.8 }}
                onAnimationComplete={onComplete}
            />
        </motion.div>
    );
};

export default LoadingScreen;
