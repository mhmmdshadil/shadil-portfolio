import React, { useEffect, useState } from 'react';

const WaterDistortion = () => {
    return (
        <svg className="absolute w-0 h-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="water-filter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.01 0.015"
                        numOctaves="3"
                        result="noise"
                    >
                        <animate
                            attributeName="baseFrequency"
                            dur="60s"
                            values="0.01 0.015;0.015 0.02;0.01 0.015"
                            repeatCount="indefinite"
                        />
                    </feTurbulence>
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale="15"
                        xChannelSelector="R"
                        yChannelSelector="G"
                    />
                </filter>

                <filter id="subtle-water">
                    <feTurbulence
                        type="turbulence"
                        baseFrequency="0.02 0.03"
                        numOctaves="2"
                        result="turbulence"
                    >
                        <animate
                            attributeName="baseFrequency"
                            dur="30s"
                            values="0.02 0.03; 0.01 0.02; 0.02 0.03"
                            repeatCount="indefinite"
                        />
                    </feTurbulence>
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="turbulence"
                        scale="8"
                        xChannelSelector="R"
                        yChannelSelector="G"
                    />
                </filter>
            </defs>
        </svg>
    );
};

export default WaterDistortion;
