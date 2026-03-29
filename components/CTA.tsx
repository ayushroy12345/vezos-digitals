import React from "react";
import { motion } from "framer-motion";

interface PremiumCardProps {
  badge?: string;
  title: React.ReactNode;
  description: string;
  primaryActionText: string;
  secondaryActionText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export const PremiumCard: React.FC<PremiumCardProps> = ({
  badge = "Exclusive",
  title,
  description,
  primaryActionText,
  secondaryActionText,
  onPrimaryClick,
  onSecondaryClick,
}) => {
  // Animation Variants
  const fadeInUpBlur = {
    hidden: { 
      opacity: 0, 
      filter: "blur(15px)", 
      y: 20 
    },
    visible: (custom: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        delay: custom * 0.15,
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    }),
  };

  return (
    // 1. Changed fixed height (150vh) to be desktop only (md:h-[150vh])
    // 2. Added vertical padding on mobile (py-12) to give it breathing room
    <div className="flex w-full justify-center bg-[#050505] px-4 md:p-8 md:py-0 h-auto md:h-[150vh] relative">
      
      {/* 
         3. Sticky behavior applied ONLY to desktop (md:sticky). 
         On mobile, it acts as a standard block element.
         Removed the negative margins (-my-32) on mobile to prevent overlap.
      */}
      <div className="w-full md:sticky md:top-0 md:h-screen flex items-center justify-center md:-my-32">
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="group relative w-full max-w-5xl overflow-hidden rounded-2xl bg-neutral-950 border border-white/5 shadow-2xl transition-all duration-500 hover:border-white/10 hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.07)]"
        >
          {/* --- Texture & Lighting Layers --- */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
              backgroundRepeat: "repeat",
            }}
          />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-white/5 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-white/[0.02] blur-[60px] md:blur-[100px] rounded-full pointer-events-none" />

          {/* --- Content --- */}
          {/* 4. Adjusted padding for mobile (px-6 py-12) vs desktop (px-20 py-24) */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 py-12 md:px-20 md:py-24">
            
            {/* Badge */}
            {badge && (
              <motion.span 
                variants={fadeInUpBlur}
                custom={0}
                className="mb-6 md:mb-8 inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] md:text-[11px] font-medium tracking-[0.2em] uppercase text-neutral-400 backdrop-blur-md"
              >
                {badge}
              </motion.span>
            )}

            {/* Headline - Responsive Text Size */}
            <motion.h2 
              variants={fadeInUpBlur}
              custom={1}
              className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-6 md:mb-8 leading-tight"
            >
              {title}
            </motion.h2>

            {/* Description - Responsive Text Size */}
            <motion.p 
              variants={fadeInUpBlur}
              custom={2}
              className="max-w-xl text-neutral-500 text-base md:text-xl leading-relaxed mb-10 md:mb-12 font-light"
            >
              {description}
            </motion.p>

            {/* Primary Button */}
            <motion.div variants={fadeInUpBlur} custom={3} className="w-full md:w-auto">
              <button
                onClick={onPrimaryClick}
                className="group/btn relative inline-flex h-12 w-full md:w-auto overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-950"
              >
                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#333_0%,#fff_50%,#333_100%)] opacity-0 transition-opacity duration-500 group-hover/btn:opacity-30" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-white px-10 text-sm font-semibold tracking-wide text-black backdrop-blur-3xl transition-all duration-300 group-hover/btn:bg-neutral-200">
                  {primaryActionText}
                </span>
              </button>
            </motion.div>

            {/* Secondary Action */}
            {secondaryActionText && (
              <motion.div 
                variants={fadeInUpBlur} 
                custom={4}
                className="mt-8 md:mt-10"
              >
                <button
                  onClick={onSecondaryClick}
                  className="text-xs text-neutral-600 hover:text-white transition-colors duration-300 border-b border-transparent hover:border-neutral-500 pb-0.5 tracking-wide"
                >
                  {secondaryActionText}
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PremiumCard;