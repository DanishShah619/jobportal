import { useState, useEffect } from 'react';
import { motion, stagger, useAnimate } from 'framer-motion';

export default function LogoWithTextArc() {
  const [opacity, setOpacity] = useState(0);
  const [showTagline, setShowTagline] = useState(false);
  const [scope, animate] = useAnimate();
  const words = "YOUR AMBITION OUR ALGORITHM";

  useEffect(() => {
    animate("span", 
      {
        opacity: 1,
        filter: "blur(0px)",
      },
      {
        duration: 2.0,
        delay: stagger(0.05),
      }
    );

    const logoTimer = setTimeout(() => {
      setOpacity(1);
    }, 500);

    const taglineTimer = setTimeout(() => {
      setShowTagline(true);
    }, 2500);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(taglineTimer);
    };
  }, [animate]);

  const renderArcText = () => {
    const chars = words.split("");
    const totalChars = chars.length;
    const angleRange = 180;
    const radius = 160;

    return chars.map((char, index) => {
      const angle = (index / (totalChars - 1)) * angleRange - (angleRange / 2);
      const rad = (angle * Math.PI) / 180;
      const x = radius * Math.sin(rad);
      const y = -radius * Math.cos(rad);

      const gradientPosition = index / (totalChars - 1);
      let textColor = gradientPosition < 0.5 ? 
        (gradientPosition < 0.2 ? 'text-white' : 'text-green-400') : 
        (gradientPosition > 0.8 ? 'text-white' : 'text-green-400');

      return (
        <motion.span
          key={index}
          className={`absolute font-extrabold text-lg ${textColor} opacity-0`}
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
            textShadow: '0 0 5px #39FF14, 0 0 10px #39FF14',
            filter: 'blur(4px)'
          }}
        >
          {char}
        </motion.span>
      );
    });
  };

  return (
    <div className="flex items-center justify-center w-full h-[40vh] bg-black">
      <div className="relative flex flex-col items-center justify-center" ref={scope}>

        <div className="relative w-96 h-64 flex items-center justify-center">

          <div className="relative w-full h-full">
            {renderArcText()}
          </div>

          {/* Logo positioned at the center of the arc */}
          <motion.div 
            className="absolute w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-bold z-10"
            style={{
              opacity: opacity,
              transition: 'opacity 2s ease-in-out',
              boxShadow: '0 0 20px rgba(57, 255, 20, 0.6)',
              transform: 'translateY(-40px)'
            }}
          >
            <img src="/logojob.jpeg" alt="Logo" className="w-24 h-24 rounded-full" />
          </motion.div>

          {/* Tagline animation after logo finishes */}
          {showTagline && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-[85%] text-neon-green text-xl font-semibold"
            >
              Apna Career
            </motion.p>
          )}

        </div>

      </div>
    </div>
  );
}
