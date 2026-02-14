import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];
const EASE_OUT_QUART = [0.22, 1, 0.36, 1];

const projects = [
    {
        title: 'CashFlow',
        subtitle: 'Expense Tracker',
        description: 'Smart expense tracking with real-time insights and beautiful analytics.',
        url: 'http://cashflow-expense.vercel.app/',
        tags: ['React', 'Finance'],
        image: 'https://raw.githubusercontent.com/mhmmdshadil/shadil-portfolio/main/dollar.jpg',
    },
    {
        title: 'ToolNexus',
        subtitle: 'Productivity Hub',
        description: 'Developer tools bundled into one sleek, fast interface.',
        url: 'https://toolnexus.vercel.app/',
        tags: ['React', 'Tools'],
        image: 'https://raw.githubusercontent.com/mhmmdshadil/shadil-portfolio/main/tools.jpg',
    },
    {
        title: 'Kalastra',
        subtitle: 'Leaderboard',
        description: 'A competitive leaderboard platform with real-time rankings.',
        url: 'https://kalastra-leaderboard.vercel.app/',
        tags: ['React', 'Web App'],
        image: 'https://raw.githubusercontent.com/mhmmdshadil/shadil-portfolio/main/1190c1d6176009d625f7d93b0d973f5b.jpg',
    },
];

/* ===== GALLERY CARD ===== */
const GalleryCard = ({ project, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const imgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
    const contentY = useTransform(scrollYProgress, [0, 1], [15, -15]);

    return (
        <motion.a
            ref={ref}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 80 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: index * 0.12, ease: EASE_OUT_EXPO }}
            className="group relative block rounded-[20px] overflow-hidden no-underline flex-1 min-w-0"
            style={{ aspectRatio: '3/4' }}
        >
            {/* Background image with zoom on scroll */}
            <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                />
            </motion.div>

            {/* Dark gradient overlay — heavier at bottom for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 group-hover:from-black/95 transition-all duration-700" />

            {/* Hover shine sweep */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Content at bottom */}
            <motion.div
                className="absolute inset-x-0 bottom-0 p-5 md:p-7 flex flex-col z-10"
                style={{ y: contentY }}
            >
                {/* Tags */}
                <div className="flex gap-2 mb-3">
                    {project.tags.map((tag, i) => (
                        <motion.span
                            key={tag}
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.4 + index * 0.12 + i * 0.06, ease: EASE_OUT_QUART }}
                            className="text-[8px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full text-white/40 border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm font-medium"
                        >
                            {tag}
                        </motion.span>
                    ))}
                </div>

                {/* Title */}
                <div className="overflow-hidden">
                    <motion.h3
                        initial={{ y: '100%' }}
                        animate={isInView ? { y: 0 } : {}}
                        transition={{ duration: 0.9, delay: 0.3 + index * 0.12, ease: EASE_OUT_EXPO }}
                        className="text-xl md:text-2xl lg:text-3xl font-bold text-white/95 tracking-tight leading-tight"
                    >
                        {project.title}
                    </motion.h3>
                </div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.12, ease: EASE_OUT_QUART }}
                    className="text-[11px] text-white/40 mt-1 font-light tracking-wide"
                >
                    {project.description}
                </motion.p>

                {/* Hover arrow */}
                <div className="mt-4 flex items-center gap-2 text-white/0 group-hover:text-white/60 transition-all duration-500">
                    <span className="text-[9px] uppercase tracking-[0.15em] font-medium">Visit</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
            </motion.div>
        </motion.a>
    );
};

/* ===== SECTION ===== */
const Projects = () => {
    const titleRef = useRef(null);
    const titleInView = useInView(titleRef, { once: true, margin: '-100px' });

    return (
        <section
            id="projects"
            className="relative py-32 md:py-44 px-6 md:px-12"
            style={{ background: '#0e0e12' }}
        >
            {/* Header */}
            <div ref={titleRef} className="max-w-6xl mx-auto mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={titleInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, ease: EASE_OUT_QUART }}
                >
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-4 font-medium">
                        Selected Work
                    </p>
                    <div className="overflow-hidden">
                        <motion.h2
                            initial={{ y: '100%' }}
                            animate={titleInView ? { y: 0 } : {}}
                            transition={{ duration: 1, ease: EASE_OUT_QUART }}
                            className="text-3xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-white/90 uppercase"
                        >
                            Favorite Projects
                        </motion.h2>
                    </div>
                </motion.div>
            </div>

            {/* Gallery Grid — 3 cards */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-5">
                {projects.map((project, i) => (
                    <GalleryCard key={project.title} project={project} index={i} />
                ))}
            </div>
        </section>
    );
};

export default Projects;
