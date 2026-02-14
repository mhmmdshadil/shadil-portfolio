import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE_OUT_QUART = [0.22, 1, 0.36, 1];

const experiences = [
    {
        role: 'Documentation & Poster Lead',
        org: "INVENTO'26 · GEC Sreekrishnapuram",
        year: '2026',
        desc: 'Created visual assets, event posters, and maintained comprehensive documentation for the technical fest.',
        color: 'bg-violet-500',
    },
    {
        role: 'Instagram Management',
        org: "INVENTO'26, SAPTHA'26, GEC Palakkad",
        year: '2026',
        desc: 'Developed social media strategy, created engaging visual content, and managed audience growth.',
        color: 'bg-rose-500',
    },
    {
        role: 'Arts Convenor',
        org: 'TICHSS',
        year: '2022',
        desc: 'Led arts initiatives and cultural events, coordinating creative activities across the institution.',
        color: 'bg-cyan-500',
    },
    {
        role: 'Magazine Editor',
        org: 'TICHSS',
        year: '2022',
        desc: 'Managed editorial content, layout design, typography, and publication workflow.',
        color: 'bg-amber-500',
    },
];

const education = [
    {
        degree: 'B.Tech in Information Technology',
        institution: 'GEC Sreekrishnapuram',
        year: '2025',
        status: 'Current',
        color: 'bg-violet-500',
    },
    {
        degree: 'Biology Science',
        institution: 'GHSS Purathur',
        year: '2023',
        status: 'Completed',
        color: 'bg-rose-500',
    },
    {
        degree: 'Secondary Graduate',
        institution: 'TIC Secondary',
        year: '2022',
        status: 'Completed',
        color: 'bg-cyan-500',
    },
];

const TimelineItem = ({ item, index, type }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: index * 0.1, ease: EASE_OUT_QUART }}
            className={`relative flex flex-col md:flex-row gap-8 md:gap-0 mb-16 last:mb-0 w-full ${isEven ? 'md:flex-row-reverse' : ''
                }`}
        >
            {/* Content Side */}
            <div className={`flex-1 md:w-1/2 ${isEven ? 'md:pl-12 md:text-left' : 'md:pr-12 md:text-right'}`}>
                {/* Year badge (visible on desktop in correct position) */}
                <div className={`hidden md:flex items-center gap-3 mb-2 ${isEven ? 'justify-start' : 'justify-end'}`}>
                    <span className="text-[10px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full bg-white/[0.04] text-white/25 font-medium border border-white/[0.04]">
                        {item.year}
                    </span>
                    {item.status && (
                        <span className={`text-[9px] uppercase tracking-[0.15em] font-semibold ${item.status === 'Current' ? 'text-emerald-400/70' : 'text-white/20'}`}>
                            {item.status}
                        </span>
                    )}
                </div>

                {/* Mobile Year Badge */}
                <div className="flex md:hidden items-center gap-3 mb-2">
                    <span className="text-[10px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full bg-white/[0.04] text-white/25 font-medium border border-white/[0.04]">
                        {item.year}
                    </span>
                </div>

                {type === 'experience' ? (
                    <>
                        <h4 className="text-xl md:text-2xl font-semibold text-white/90 mb-1 tracking-tight">{item.role}</h4>
                        <p className="text-xs uppercase tracking-[0.12em] text-white/40 mb-3 font-medium bg-gradient-to-r from-white/40 to-white/20 bg-clip-text text-transparent inline-block">
                            {item.org}
                        </p>
                        <p className={`text-sm text-white/40 leading-relaxed font-light ${isEven ? 'mr-auto' : 'ml-auto'} md:max-w-md`}>
                            {item.desc}
                        </p>
                    </>
                ) : (
                    <>
                        <h4 className="text-xl md:text-2xl font-semibold text-white/90 mb-1 tracking-tight">{item.degree}</h4>
                        <p className="text-xs uppercase tracking-[0.12em] text-white/40 font-medium">{item.institution}</p>
                    </>
                )}
            </div>

            {/* Center Line & Dot */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 flex flex-col items-center">
                {/* Line */}
                <div className="h-full w-px bg-white/[0.04] absolute top-0" />

                {/* Dot */}
                <div className={`relative z-10 w-4 h-4 rounded-full border-2 border-[#0e0e12] ${item.color} shadow-[0_0_20px_rgba(255,255,255,0.1)]`} />
            </div>

            {/* Empty Side for alignment */}
            <div className="flex-1 md:w-1/2 hidden md:block" />
        </motion.div>
    );
};

const Experience = () => {
    const titleRef = useRef(null);
    const titleInView = useInView(titleRef, { once: true, margin: '-80px' });
    const eduTitleRef = useRef(null);
    const eduTitleInView = useInView(eduTitleRef, { once: true, margin: '-80px' });

    return (
        <section
            id="experience"
            className="relative py-32 md:py-44 px-6 md:px-12 overflow-hidden"
            style={{ background: '#0e0e12' }}
        >
            <div className="max-w-5xl mx-auto">
                {/* Experience Title */}
                <div ref={titleRef} className="mb-24 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={titleInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, ease: EASE_OUT_QUART }}
                    >
                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-4 font-medium">
                            Roles & Responsibilities
                        </p>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold text-white/90">
                            Experience
                        </h2>
                    </motion.div>
                </div>

                <div className="mb-40 relative">
                    {/* Items */}
                    {experiences.map((item, i) => (
                        <TimelineItem key={item.role} item={item} index={i} type="experience" />
                    ))}
                </div>

                {/* Education Title */}
                <div ref={eduTitleRef} className="mb-24 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={eduTitleInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, ease: EASE_OUT_QUART }}
                    >
                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-4 font-medium">
                            Academic Journey
                        </p>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold text-white/90">
                            Education
                        </h2>
                    </motion.div>
                </div>

                <div className="relative">
                    {education.map((item, i) => (
                        <TimelineItem key={item.degree} item={item} index={i} type="education" />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
