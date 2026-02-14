import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import CursorSystem from './components/CursorSystem';



function App() {
    const [loading, setLoading] = useState(true);

    return (
        <div className="antialiased">
            <CursorSystem />
            {/* Film grain overlay */}
            <div className="grain-overlay" />

            <AnimatePresence mode="wait">
                {loading && (
                    <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
                )}
            </AnimatePresence>

            {!loading && (
                <>
                    <Hero />
                    <Projects />
                    <Skills />
                    <Experience />
                    <Contact />
                </>
            )}
        </div>
    );
}

export default App;
