import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const LiquidCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth spring physics for fluid feel - slightly delayed
    const springConfig = { damping: 25, stiffness: 120, mass: 0.8 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleHoverStart = () => setIsHovering(true);
        const handleHoverEnd = () => setIsHovering(false);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        // Add hover listeners to interactive elements
        const addListeners = () => {
            document.querySelectorAll('a, button, input, textarea, .hover-target').forEach(el => {
                el.addEventListener('mouseenter', handleHoverStart);
                el.addEventListener('mouseleave', handleHoverEnd);
            });
        };

        addListeners();
        const observer = new MutationObserver(addListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            observer.disconnect();
        };
    }, []);

    return (
        <>
            {/* Global style to hide default cursor */}
            <style jsx global>{`
                body, a, button, input, textarea {
                    cursor: none !important;
                }
            `}</style>

            {/* Main Fluid Cursor */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-exclusion"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
            >
                <div className={`relative transition-all duration-300 ease-out flex items-center justify-center
                    ${isHovering ? 'w-20 h-20' : 'w-5 h-5'}
                    ${isClicking ? 'scale-90' : 'scale-100'}
                `}>
                    {/* Core Dot */}
                    <div className={`absolute bg-white rounded-full transition-all duration-300
                        ${isHovering ? 'opacity-0' : 'w-2 h-2 opacity-100'}
                    `} />

                    {/* Fluid Ring / Highlight */}
                    <div className={`absolute rounded-full border border-white/40 transition-all duration-300 backdrop-blur-[1px]
                        ${isHovering ? 'w-full h-full bg-white/10' : 'w-5 h-5 opacity-40'}
                    `} />

                    {/* Ripple Effect on Hover */}
                    {isHovering && (
                        <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-white/20" />
                    )}
                </div>
            </motion.div>
        </>
    );
};

export default LiquidCursor;
