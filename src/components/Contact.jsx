import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Github, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';

const EASE_OUT_QUART = [0.22, 1, 0.36, 1];

const socials = [
    {
        label: 'Email',
        href: 'mailto:muhammedshadilmp7@gmail.com',
        display: 'muhammedshadilmp7@gmail.com',
        icon: Mail,
        color: 'group-hover:text-amber-400',
        glow: 'group-hover:shadow-[0_0_30px_rgba(251,191,36,0.08)]',
    },
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/mhmmd.shadil/',
        display: '@mhmmd.shadil',
        icon: Instagram,
        color: 'group-hover:text-rose-400',
        glow: 'group-hover:shadow-[0_0_30px_rgba(251,113,133,0.08)]',
    },
    {
        label: 'GitHub',
        href: 'https://github.com/mhmmdshadil',
        display: 'mhmmdshadil',
        icon: Github,
        color: 'group-hover:text-white',
        glow: 'group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]',
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/mhmmdshadil/',
        display: 'mhmmdshadil',
        icon: Linkedin,
        color: 'group-hover:text-cyan-400',
        glow: 'group-hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]',
    },
];

const Contact = () => {
    const titleRef = useRef(null);
    const titleInView = useInView(titleRef, { once: true, margin: '-80px' });
    const linksRef = useRef(null);
    const linksInView = useInView(linksRef, { once: true, margin: '-80px' });

    return (
        <section
            id="contact"
            className="relative py-32 md:py-44 px-6 md:px-12"
            style={{ background: '#0e0e12' }}
        >
            <div className="max-w-5xl mx-auto flex flex-col items-center">
                {/* Header */}
                <div ref={titleRef} className="mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={titleInView ? { opacity: 1 } : {}}
                        transition={{ duration: 1, ease: EASE_OUT_QUART }}
                    >
                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-4 font-medium">
                            Let's Connect
                        </p>
                        <div className="overflow-hidden">
                            <motion.h2
                                initial={{ y: '100%' }}
                                animate={titleInView ? { y: 0 } : {}}
                                transition={{ duration: 1, ease: EASE_OUT_QUART }}
                                className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold text-white/90"
                            >
                                Get in Touch
                            </motion.h2>
                        </div>
                    </motion.div>
                </div>

                {/* CTA description */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={titleInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.3, ease: EASE_OUT_QUART }}
                    className="mb-20 max-w-xl text-center"
                >
                    <p className="text-base md:text-lg text-white/35 leading-relaxed font-light">
                        I'm always open to new opportunities, collaborations, and creative
                        conversations. Feel free to reach out — let's build something
                        beautiful together.
                    </p>
                </motion.div>

                {/* Social cards */}
                <div ref={linksRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl w-full">
                    {socials.map((social, i) => {
                        const Icon = social.icon;
                        return (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                target={social.label !== 'Email' ? '_blank' : undefined}
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 40 }}
                                animate={linksInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE_OUT_QUART }}
                                className={`group flex items-center gap-4 p-5 rounded-2xl liquid-glass glass-highlight transition-all duration-500 no-underline ${social.glow}`}
                            >
                                <div className="w-10 h-10 rounded-full bg-white/[0.04] flex items-center justify-center group-hover:bg-white/[0.08] transition-all duration-500">
                                    <Icon className={`w-4 h-4 text-white/30 ${social.color} transition-colors duration-500`} />
                                </div>
                                <div className="flex-1 min-w-0 text-left">
                                    <p className="text-[9px] uppercase tracking-[0.15em] text-white/20 font-medium mb-0.5">
                                        {social.label}
                                    </p>
                                    <p className="text-sm text-white/50 font-medium truncate group-hover:text-white/70 transition-colors duration-500">
                                        {social.display}
                                    </p>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-white/10 group-hover:text-white/30 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </motion.a>
                        );
                    })}
                </div>
            </div>

            {/* Footer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={linksInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.6, ease: EASE_OUT_QUART }}
                className="max-w-6xl mx-auto mt-32 pt-8 border-t border-white/[0.04] flex flex-col items-center gap-4 text-center"
            >
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/15 font-medium">
                    © 2026 Muhammed Shadil MP
                </p>
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/10 font-medium">
                    Built with React · Framer Motion · Tailwind CSS
                </p>
            </motion.div>
        </section>
    );
};

export default Contact;
