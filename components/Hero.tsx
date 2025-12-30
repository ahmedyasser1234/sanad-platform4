import React, { useState, useEffect } from 'react';
import SanadCharacter from './SanadCharacter';

interface HeroProps {
    lang: 'ar' | 'en';
}

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const content = {
      ar: {
          welcome: 'هلا وغلا معاك',
          secondLine: 'سند.. إذا أردت التحدث لا تتردد',
          title: 'مركز سند نموذجاً رائداً في رعاية وتمكين المستفيدين بالجامعة.',
      },
      en: {
          welcome: 'Hello & Welcome',
          secondLine: 'Sanad.. Do not hesitate to chat',
          title: 'Sanad Center is a pioneering model in caring for and empowering beneficiaries at the university.',
      }
  };

  const t = content[lang];
  
  // Typewriter Effect State
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    // Reset text when language changes to restart animation
    setDisplayedText('');
    
    const messages = [t.welcome, t.secondLine];
    let msgIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const type = () => {
      const currentMsg = messages[msgIndex];
      
      if (isDeleting) {
        // Deleting
        setDisplayedText(currentMsg.substring(0, charIndex - 1));
        charIndex--;
        
        if (charIndex === 0) {
          isDeleting = false;
          msgIndex = (msgIndex + 1) % messages.length; // Switch to next message
          timeoutId = setTimeout(type, 500); // Wait before typing next
        } else {
          timeoutId = setTimeout(type, 30); // Deleting speed
        }
      } else {
        // Typing
        setDisplayedText(currentMsg.substring(0, charIndex + 1));
        charIndex++;
        
        if (charIndex === currentMsg.length) {
          isDeleting = true;
          timeoutId = setTimeout(type, 2000); // Wait before starting to delete
        } else {
          timeoutId = setTimeout(type, 100); // Typing speed
        }
      }
    };

    timeoutId = setTimeout(type, 500);

    return () => clearTimeout(timeoutId);
  }, [t.welcome, t.secondLine, lang]);

  return (
    <section className="relative w-full pt-32 md:pt-32 pb-20 overflow-visible">
        <div className="container mx-auto px-4 relative min-h-[350px] lg:min-h-[450px]">
            
            {/* Visuals (Character + Pill) */}
            <div className={`absolute top-0 z-0 flex flex-col pointer-events-none transition-all duration-500 ${lang === 'ar' ? 'right-0 items-end' : 'left-0 items-start'}`}>
                {/* Visual Group Wrapper */}
                {/* Updated: Negative margins to move character closer to/past the edge (Right for AR) */}
                <div className={`relative mt-6 md:mt-0 ${lang === 'ar' ? '-mr-12 lg:-mr-20' : '-ml-12 lg:-ml-20'}`}>
                    
                    {/* Speech Bubble Container */}
                    {/* Adjusted position: Changed bottom from 75% to 65% to move bubbles down closer to character */}
                    {/* Shifted left by 15px using negative translate-x */}
                    <div className={`absolute bottom-[65%] z-20 flex items-end min-w-max -translate-x-[15px] ${lang === 'ar' ? 'right-[55%]' : 'left-[55%]'}`}>
                         <div className="flex items-end gap-2">
                             
                             {/* Dots Component */}
                             <div className="flex items-end mb-1 gap-1">
                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-sanad-soft rounded-full"></div>
                                <div className="w-3 h-3 md:w-5 md:h-5 bg-sanad-soft rounded-full"></div>
                            </div>

                             {/* Pill Component with Typewriter Effect */}
                             <div className="bg-sanad-soft text-white px-6 py-2 md:px-10 md:py-4 rounded-full text-sm md:text-2xl font-bold shadow-sm whitespace-nowrap mb-2 min-w-[120px] md:min-w-[200px]">
                                {displayedText}
                                <span className="animate-pulse">|</span>
                             </div>

                         </div>
                    </div>

                    {/* The Character SVG */}
                    {/* Increased size from w-[380px]/md:w-[650px] to w-[450px]/md:w-[800px] */}
                    <div className="w-[450px] md:w-[800px] flex items-end justify-center relative z-0 mt-2 md:mt-4">
                         <SanadCharacter className="w-full h-auto drop-shadow-lg relative z-10" />
                         {/* Ground Shadow */}
                         <div className="absolute bottom-[8%] left-1/2 transform -translate-x-1/2 w-[70%] h-4 md:h-8 bg-black/15 blur-lg rounded-[100%] z-0"></div>
                    </div>
                </div>
            </div>

            {/* Center: Text Box (Sanad Center Message) */}
            <div className={`w-full flex justify-center lg:justify-center items-center relative z-10 pt-80 md:pt-[30rem] lg:pt-96 ${lang === 'ar' ? 'md:justify-start' : 'md:justify-end'}`}>
                <div className={`bg-[#f1f5f9] px-4 py-4 md:px-10 md:py-8 lg:px-12 lg:py-10 rounded-[2rem] md:rounded-[2.5rem] w-full max-w-[260px] md:max-w-[420px] lg:max-w-2xl shadow-sm text-center mx-auto lg:mx-auto ${lang === 'ar' ? 'md:mx-0 md:mr-96 lg:mr-[46rem]' : 'md:mx-0 md:ml-96 lg:ml-[46rem]'}`}>
                    <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-600 leading-relaxed">
                        {t.title}
                    </h2>
                </div>
            </div>

        </div>
    </section>
  );
};

export default Hero;