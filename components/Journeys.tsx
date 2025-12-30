import React from 'react';
import { Journey } from '../types';

interface JourneysProps {
    lang: 'ar' | 'en';
}

// --- OPTION 1: Absolute paths ---
const JOURNEY_ICONS = {
    admissions: "/images/Asset 1.png",
    university: "/images/Asset 2.png",
    financial: "/images/Asset 3.png",
    academic: "/images/Asset 4.png",
    values: "/images/Asset 5.png"
};

const DECORATIVE_ROCKET_ICON = "/images/Asset 9.png";

// --- OPTION 2: With process.env.PUBLIC_URL ---
// const JOURNEY_ICONS = {
//     admissions: `${process.env.PUBLIC_URL}/images/Asset 1.png`,
//     university: `${process.env.PUBLIC_URL}/images/Asset 2.png`,
//     financial: `${process.env.PUBLIC_URL}/images/Asset 3.png`,
//     academic: `${process.env.PUBLIC_URL}/images/Asset 4.png`,
//     values: `${process.env.PUBLIC_URL}/images/Asset 5.png`
// };
// const DECORATIVE_ROCKET_ICON = `${process.env.PUBLIC_URL}/images/Asset 9.png`;

const Journeys: React.FC<JourneysProps> = ({ lang }) => {
    
  const content = {
      ar: {
          header: 'رحلات سند',
          btn: 'ابدأ الرحلة',
          items: [
            'رحلة القبول',
            'رحلة الحياة الجامعية',
            'رحلة المنح الدراسية والحلول المالية',
            'رحلة الأكاديمية',
            'رحلة قيمية'
          ]
      },
      en: {
          header: 'Sanad Journeys',
          btn: 'Start Journey',
          items: [
            'Admissions Journey',
            'University Life Journey',
            'Scholarships & Financial Solutions',
            'Academic Journey',
            'Values Journey'
          ]
      }
  };

  const t = content[lang];

  // Data ordered to match the RTL/LTR layout
  const journeys: Journey[] = [
    { 
        id: '1', 
        title: t.items[0], 
        icon: JOURNEY_ICONS.admissions
    },
    { 
        id: '2', 
        title: t.items[1], 
        icon: JOURNEY_ICONS.university
    },
    { 
        id: '3', 
        title: t.items[2], 
        icon: JOURNEY_ICONS.financial
    },
    { 
        id: '4', 
        title: t.items[3], 
        icon: JOURNEY_ICONS.academic
    },
    { 
        id: '5', 
        title: t.items[4], 
        icon: JOURNEY_ICONS.values
    },
  ];

  return (
    <section className="relative z-20 bg-[#f0f6ff] pb-20">
      
      {/* Floating Header Pill */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-full flex justify-center">
            <div className="bg-gradient-to-r from-[#b05df5] to-[#5582f6] text-white px-24 py-3 rounded-full shadow-[0_10px_20px_rgba(168,85,247,0.3)]">
                <h2 className="text-3xl md:text-4xl font-bold pb-1">{t.header}</h2>
            </div>
      </div>

      <div className="container mx-auto px-4 pt-24">
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {journeys.map((journey) => (
                <div key={journey.id} className="relative group h-full flex flex-col items-center">
                     {/* Card Container */}
                    <div className="w-full flex-1 bg-gradient-to-tl from-white from-50% to-[#E4D3FC] rounded-[2.5rem] p-5 py-10 shadow-[0_15px_35px_-12px_rgba(0,0,0,0.08)] hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white flex flex-col items-center justify-center text-center min-h-[240px]">
                        
                        {/* Icon Area */}
                        <div className="mb-6 transform transition-transform group-hover:scale-110 duration-300">
                            <img 
                                src={journey.icon} 
                                alt={journey.title}
                                className="w-24 h-24 object-contain drop-shadow-sm" 
                                onError={(e) => {
                                    console.error(`Failed to load image: ${journey.icon}`);
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-2xl font-bold leading-tight px-1 min-h-[4rem] flex items-center justify-center bg-gradient-to-r from-[#a855f7] to-[#3b82f6] bg-clip-text text-transparent">
                            {journey.title}
                        </h3>
                        
                    </div>

                    {/* Button */}
                    <button className="mt-8 bg-gradient-to-r from-[#be63f9] to-[#4b74f6] hover:opacity-95 text-white text-xl font-bold py-2.5 px-14 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap">
                        {t.btn}
                    </button>
                </div>
            ))}
        </div>
        
        {/* Decorative Rocket */}
        <div className={`flex justify-center md:justify-start relative mt-4 ${lang === 'ar' ? 'md:mr-32 lg:mr-64' : 'md:ml-32 lg:ml-64 transform scale-x-[-1]'}`}>
             <div className="w-20 h-20 md:w-32 md:h-32 transform rotate-[45deg] relative animate-pulse" style={{ animationDuration: '4s' }}>
                <img 
                    src={DECORATIVE_ROCKET_ICON} 
                    alt="Rocket" 
                    className="w-full h-full object-contain drop-shadow-md"
                    onError={(e) => console.error(`Failed to load rocket: ${DECORATIVE_ROCKET_ICON}`)}
                />
             </div>
        </div>

      </div>
    </section>
  );
};

export default Journeys;