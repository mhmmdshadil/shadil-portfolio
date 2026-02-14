import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE_OUT_QUART = [0.22, 1, 0.36, 1];

const skillGroups = [
    {
        label: 'Design',
        color: 'from-rose-500/20 to-pink-500/10',
        border: 'hover:border-rose-400/20',
        skills: ['Figma', 'UI/UX Design', 'Canva', 'Poster Design', 'Branding'],
    },
    {
        label: 'Development',
        color: 'from-violet-500/20 to-indigo-500/10',
        border: 'hover:border-violet-400/20',
        skills: ['React', 'HTML/CSS', 'JavaScript', 'Python', 'C'],
    },
    {
        label: 'Tools & Workflow',
        color: 'from-cyan-500/20 to-teal-500/10',
        border: 'hover:border-cyan-400/20',
        skills: ['Git & GitHub', 'Vercel', 'Framer Motion', 'Notion', 'VS Code'],
    },
    {
        label: 'Other',
        color: 'from-amber-500/20 to-orange-500/10',
        border: 'hover:border-amber-400/20',
        skills: ['85 WPM Typing', 'Content Strategy', 'Social Media', 'Documentation'],
    },
];

const SkillGroup = ({ group, groupIndex }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: groupIndex * 0.12, ease: EASE_OUT_QUART }}
            className="liquid-glass-subtle glass-highlight rounded-2xl p-6 md:p-8"
        >
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/25 mb-5 font-medium">
                {group.label}
            </p>
            <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill, i) => (
                    <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: groupIndex * 0.12 + i * 0.05, ease: EASE_OUT_QUART }}
                        className={`px-4 py-2.5 rounded-full text-xs font-medium tracking-wide text-white/50 bg-white/[0.04] border border-white/[0.06] ${group.border} hover:bg-gradient-to-r ${group.color} hover:text-white/80 transition-all duration-500`}
                    >
                        {skill}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    );
};

const Skills = () => {
    const titleRef = useRef(null);
    const titleInView = useInView(titleRef, { once: true, margin: '-80px' });

    return (
        <section
            id="skills"
            className="relative py-32 md:py-44 px-6 md:px-12"
            style={{ background: '#0e0e12' }}
        >
            <div className="max-w-5xl mx-auto">
                <div ref={titleRef} className="mb-24 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={titleInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, ease: EASE_OUT_QUART }}
                    >
                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-4 font-medium">
                            What I Work With
                        </p>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold text-white/90">
                            Skills
                        </h2>
                    </motion.div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {skillGroups.map((group, i) => (
                        <SkillGroup key={group.label} group={group} groupIndex={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
