import React, { useState, useEffect, useCallback } from 'react';
import {
    motion,
    useSpring,
    useMotionValue,
    useTransform,
    AnimatePresence,
} from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';

const SMOOTH_SPRING = { damping: 40, stiffness: 90, mass: 1 };
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];
const EASE_OUT_QUART = [0.22, 1, 0.36, 1];

const PROFILE_IMG =
    'https://raw.githubusercontent.com/mhmmdshadil/shadil-portfolio/main/1766291627024.jpg';

/* ===== MOUSE PARALLAX (background only) ===== */
const useMouseParallax = () => {
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const x = useSpring(rawX, SMOOTH_SPRING);
    const y = useSpring(rawY, SMOOTH_SPRING);
    const handleMouseMove = useCallback(
        (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            rawX.set((clientX / innerWidth - 0.5) * 2);
            rawY.set((clientY / innerHeight - 0.5) * 2);
        },
        [rawX, rawY]
    );
    return { x, y, handleMouseMove };
};

/* ===== NAVIGATION ===== */
const navItems = ['Home', 'Projects', 'Skills', 'Experience', 'Contact'];

const Navigation = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.2, ease: EASE_OUT_EXPO }}
                className={`fixed top-0 left-0 w-full px-6 md:px-12 py-5 z-[60] flex justify-between items-center transition-all duration-700 ${scrolled ? 'bg-[#0e0e12]/70 backdrop-blur-xl' : ''
                    }`}
            >
                <motion.a
                    href="#home"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: EASE_OUT_QUART }}
                    className="text-lg font-semibold tracking-tight text-white"
                >
                    Shadil
                    <span className="text-violet-400/70 font-light ml-0.5">.dev</span>
                </motion.a>

                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: EASE_OUT_QUART }}
                    className="hidden md:flex items-center gap-10"
                >
                    {navItems.map((item, i) => (
                        <motion.a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.6 + i * 0.08,
                                ease: EASE_OUT_QUART,
                            }}
                            className="nav-link text-[11px] uppercase tracking-[0.18em] font-medium text-white/50 hover:text-white transition-colors duration-500"
                        >
                            {item}
                        </motion.a>
                    ))}
                </motion.div>

                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden z-[70] text-white"
                >
                    {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.button>
            </motion.nav>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 bg-[#0e0e12]/98 backdrop-blur-2xl z-[55] flex flex-col items-center justify-center gap-8"
                    >
                        {navItems.map((item, i) => (
                            <motion.a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.06 + i * 0.06, ease: EASE_OUT_QUART }}
                                onClick={() => setMobileOpen(false)}
                                className="text-3xl font-serif italic text-white"
                            >
                                {item}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

/* ===== BACKGROUND (blobs only, no sphere) ===== */
const BackgroundLayer = ({ mouseX, mouseY }) => {
    const bg1X = useTransform(mouseX, [-1, 1], [-30, 30]);
    const bg1Y = useTransform(mouseY, [-1, 1], [-20, 20]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div style={{ x: bg1X, y: bg1Y }} className="absolute inset-0">
                {/* Pink / coral */}
                <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2.5, ease: EASE_OUT_EXPO }}
                    className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] max-w-[800px] max-h-[800px]"
                    style={{
                        background:
                            'radial-gradient(circle, rgba(251,113,133,0.35) 0%, rgba(244,63,94,0.15) 40%, transparent 70%)',
                        animation: 'blobMorph1 20s ease-in-out infinite',
                        filter: 'blur(80px)',
                    }}
                />
                {/* Violet */}
                <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2.5, delay: 0.3, ease: EASE_OUT_EXPO }}
                    className="absolute -bottom-[10%] -right-[5%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px]"
                    style={{
                        background:
                            'radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(109,40,217,0.15) 40%, transparent 70%)',
                        animation: 'blobMorph2 25s ease-in-out infinite',
                        filter: 'blur(90px)',
                    }}
                />
                {/* Cyan */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.8 }}
                    transition={{ duration: 3, delay: 0.6, ease: EASE_OUT_EXPO }}
                    className="absolute top-[35%] left-[25%] w-[30vw] h-[30vw] max-w-[450px] max-h-[450px]"
                    style={{
                        background:
                            'radial-gradient(circle, rgba(34,211,238,0.3) 0%, rgba(6,182,212,0.1) 50%, transparent 70%)',
                        animation: 'blobMorph3 18s ease-in-out infinite',
                        filter: 'blur(70px)',
                    }}
                />
                {/* Amber */}
                <motion.div
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.6 }}
                    transition={{ duration: 3, delay: 0.9, ease: EASE_OUT_EXPO }}
                    className="absolute top-[10%] right-[20%] w-[22vw] h-[22vw] max-w-[340px] max-h-[340px]"
                    style={{
                        background:
                            'radial-gradient(circle, rgba(251,191,36,0.25) 0%, rgba(245,158,11,0.1) 50%, transparent 70%)',
                        animation: 'blobMorph1 22s ease-in-out infinite reverse',
                        filter: 'blur(60px)',
                    }}
                />
            </motion.div>

            {/* Subtle particles (no sphere) */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={`p-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{
                        duration: 4 + i * 1.2,
                        delay: 2 + i * 0.4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute rounded-full"
                    style={{
                        top: `${15 + i * 13}%`,
                        left: `${10 + i * 15}%`,
                        width: `${2 + i % 3}px`,
                        height: `${2 + i % 3}px`,
                        background:
                            i % 2 === 0 ? 'rgba(251,113,133,0.4)' : 'rgba(139,92,246,0.4)',
                        animation: `floatMedium ${6 + i * 1.5}s ease-in-out infinite`,
                    }}
                />
            ))}
        </div>
    );
};

/* ===== AVATAR (no parallax) ===== */
const Avatar = () => (
    <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 80, damping: 15, delay: 0.5 }}
        className="relative mb-10 group"
    >
        {/* Conic gradient ring on hover */}
        <div
            className="absolute -inset-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
                background:
                    'conic-gradient(from 0deg, rgba(251,113,133,0.3), rgba(139,92,246,0.3), rgba(34,211,238,0.3), rgba(251,191,36,0.3), rgba(251,113,133,0.3))',
                filter: 'blur(8px)',
                animation: 'ringRotate 8s linear infinite',
            }}
        />
        <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full overflow-hidden relative transition-transform duration-700 ease-out group-hover:scale-[1.06] ring-2 ring-white/10 group-hover:ring-white/25">
            <img
                src={PROFILE_IMG}
                alt="Muhammed Shadil MP"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div
            className="absolute -inset-6 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-1000"
            style={{
                border: '1px dashed rgba(255,255,255,0.2)',
                animation: 'ringRotate 12s linear infinite',
            }}
        />
    </motion.div>
);

const WORDS = ['unexpected', 'solutions', 'experiences', 'emotions', 'impact'];

const HeroHeading = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % WORDS.length);
        }, 4000); // Slower interval (4s)
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative z-20 flex flex-col items-center">
            <div className="overflow-hidden">
                <motion.h1
                    initial={{ y: '120%', rotateX: -40 }}
                    animate={{ y: '0%', rotateX: 0 }}
                    transition={{ duration: 1.3, delay: 0.6, ease: EASE_OUT_QUART }}
                    className="font-serif italic text-[clamp(2rem,6vw,6rem)] font-normal leading-[0.95] text-white/70"
                >
                    Creating the
                </motion.h1>
            </div>
            <div className="mt-[-0.2em] h-[0.9em] relative w-full flex justify-center perspective-[1000px]">
                {/* Spacer to hold height */}
                <h1 className="font-sans font-extrabold text-[clamp(2.5rem,8.5vw,9rem)] tracking-[-0.04em] leading-[0.9] opacity-0 pointer-events-none select-none" aria-hidden="true">
                    experiences
                </h1>

                <AnimatePresence mode="popLayout">
                    <motion.h1
                        key={WORDS[index]}
                        initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
                        transition={{
                            duration: 1.2,
                            ease: [0.16, 1, 0.3, 1], // Smooth expo ease
                            opacity: { duration: 0.8 }, // Fade faster than move
                        }}
                        className="font-sans font-extrabold text-[clamp(2.5rem,8.5vw,9rem)] tracking-[-0.04em] leading-[0.9] absolute top-0 left-0 w-full text-center"
                        style={{
                            background:
                                'linear-gradient(135deg, #f0eef5 0%, #c4b5fd 40%, #f9a8d4 70%, #fbbf24 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        {WORDS[index]}
                    </motion.h1>
                </AnimatePresence>
            </div>
        </div>
    );
};

/* ===== CTA (no parallax) ===== */
const CTAButton = () => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.0, ease: EASE_OUT_QUART }}
        className="mt-14 md:mt-16"
    >
        <a
            href="#projects"
            className="btn-sheen group relative inline-flex items-center gap-3 px-8 py-4 rounded-full liquid-glass glass-highlight text-white/90 transition-all duration-500 ease-out hover:scale-[1.04] hover:shadow-[0_20px_60px_rgba(139,92,246,0.15)] no-underline"
        >
            <span className="relative flex items-center gap-3 text-sm font-medium tracking-[0.05em] uppercase">
                View my work
                <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-1.5" />
            </span>
        </a>
    </motion.div>
);

/* ===== SCROLL INDICATOR ===== */
const ScrollIndicator = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
    >
        <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-[9px] uppercase tracking-[0.25em] text-white/20 font-medium"
        >
            Scroll
        </motion.span>
        <div className="w-[1px] h-10 overflow-hidden">
            <motion.div
                className="w-full h-full bg-white/15"
                style={{ animation: 'scrollLine 2.5s ease-in-out infinite' }}
            />
        </div>
    </motion.div>
);

/* ===== HERO ===== */
const Hero = () => {
    const { x: mouseX, y: mouseY, handleMouseMove } = useMouseParallax();

    return (
        <section
            id="home"
            onMouseMove={handleMouseMove}
            className="relative w-full min-h-[100vh] overflow-hidden flex flex-col"
            style={{
                background: 'radial-gradient(ellipse at 50% 30%, #1a1028 0%, #0e0e12 70%)',
            }}
        >
            <Navigation />
            <BackgroundLayer mouseX={mouseX} mouseY={mouseY} />

            <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-6 md:px-12">
                <Avatar />
                <HeroHeading />
                <div className="relative z-30 mt-32">
                    <CTAButton />
                </div>
            </div>
        </section>
    );
};

export default Hero;
