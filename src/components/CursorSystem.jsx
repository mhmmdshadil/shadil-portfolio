import React, { useEffect, useRef, useState } from 'react';

const CursorSystem = () => {
    const cursorRef = useRef(null);
    const canvasRef = useRef(null);
    const requestRef = useRef(null);
    const particles = useRef([]);

    // Mouse state
    const mouse = useRef({ x: -100, y: -100 });

    // State for visual changes
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        // 1. Mouse Tracking (Instant)
        const onMouseMove = (e) => {
            mouse.current = { x: e.clientX, y: e.clientY };

            // Direct transform update for zero latency
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            }
        };

        const onMouseDown = () => {
            setIsClicking(true);
            createBurst(mouse.current.x, mouse.current.y);
        };

        const onMouseUp = () => setIsClicking(false);

        // 2. Particle Burst System
        const createBurst = (x, y) => {
            const particleCount = 12;
            for (let i = 0; i < particleCount; i++) {
                const angle = (Math.PI * 2 * i) / particleCount;
                particles.current.push({
                    x,
                    y,
                    vx: Math.cos(angle) * (2 + Math.random() * 2), // Speed
                    vy: Math.sin(angle) * (2 + Math.random() * 2),
                    life: 1.0,
                });
            }
        };

        // 3. Animation Loop (Only for Particles)
        const animate = () => {
            const cvs = canvasRef.current;
            if (cvs && particles.current.length > 0) {
                const ctx = cvs.getContext('2d');
                ctx.clearRect(0, 0, cvs.width, cvs.height);

                // Update and draw particles
                for (let i = particles.current.length - 1; i >= 0; i--) {
                    const p = particles.current[i];
                    p.x += p.vx;
                    p.y += p.vy;
                    p.life -= 0.05; // Fade out faster

                    if (p.life <= 0) {
                        particles.current.splice(i, 1);
                    } else {
                        ctx.beginPath();
                        // Draw line flowing outward
                        const trailLen = 4;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p.x - p.vx * trailLen, p.y - p.vy * trailLen);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${p.life})`;
                        ctx.lineWidth = 1.5;
                        ctx.stroke();
                    }
                }
            } else if (cvs && particles.current.length === 0) {
                // Clear canvas if no particles left (optimization)
                const ctx = cvs.getContext('2d');
                ctx.clearRect(0, 0, cvs.width, cvs.height);
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        // 4. Hover Logic (Optimized)
        const handleMouseOver = (e) => {
            const target = e.target;
            const isInteractive =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('hover-target') ||
                target.closest('.hover-target') ||
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA';

            setIsHovering(isInteractive);
        };

        // Resize canvas
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
        };
        handleResize();

        // Listeners
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('resize', handleResize);

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    // Hide on touch
    if (typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent)) {
        return null;
    }

    return (
        <>
            <style jsx global>{`
                @media (hover: hover) and (pointer: fine) {
                    body, a, button, input, textarea {
                        cursor: none !important;
                    }
                }
            `}</style>

            <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden hidden md:block">
                {/* Canvas for Click Burst */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full block"
                />

                {/* Main Cursor Dot - Instant Tracking */}
                <div
                    ref={cursorRef}
                    className={`absolute top-0 left-0 bg-white rounded-full mix-blend-difference will-change-transform flex items-center justify-center
                        transition-[width,height,opacity,margin] duration-200 ease-out
                        ${isHovering ? 'w-8 h-8 opacity-80' : 'w-3 h-3 opacity-100'}
                        ${isClicking ? 'scale-75' : 'scale-100'}
                    `}
                    style={{
                        marginTop: isHovering ? -16 : -6, // Center offset
                        marginLeft: isHovering ? -16 : -6
                    }}
                />
            </div>
        </>
    );
};

export default CursorSystem;
