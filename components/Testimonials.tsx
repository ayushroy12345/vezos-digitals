import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Quote, MessageCircle, ArrowRight } from 'lucide-react';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechStart",
    content: "Vezos Digitals transformed our outdated platform into a modern machine.",
    avatar: "https://picsum.photos/100/100?random=1"
  },
  {
    name: "Michael Chen",
    role: "Founder",
    company: "Bloom",
    content: "The team moved fast without breaking things. Delivered beyond expectations.",
    avatar: "https://picsum.photos/100/100?random=2"
  },
  {
    name: "Emily Davis",
    role: "Director",
    company: "Aura Inc.",
    content: "Professional, creative, and technically proficient.",
    avatar: "https://picsum.photos/100/100?random=3"
  },
  {
    name: "James Wilson",
    role: "Product",
    company: "Nexo",
    content: "Absolutely blown away by the attention to detail and speed.",
    avatar: "https://picsum.photos/100/100?random=4"
  },
  {
    name: "Elena Rodriguez",
    role: "CTO",
    company: "Vortex",
    content: "Clean code, great communication, and a stunning final product.",
    avatar: "https://picsum.photos/100/100?random=5"
  },
  {
    name: "Marcus Thorne",
    role: "Lead",
    company: "Horizon",
    content: "They understood our brand voice immediately. Highly recommended.",
    avatar: "https://picsum.photos/100/100?random=6"
  }
];

// --- CARD COMPONENT (Desktop) ---
const Card = ({ 
  data, 
  y, 
  className,
  blur = false
}: { 
  data: Testimonial; 
  y: MotionValue<number>; 
  className: string;
  blur?: boolean;
}) => (
  <motion.div 
    style={{ y }}
    className={`absolute w-[280px] xl:w-[320px] p-6 rounded-2xl bg-neutral-900/80 border border-white/10 shadow-2xl backdrop-blur-xl ${blur ? 'blur-[1px]' : ''} ${className}`}
  >
    <div className="flex flex-col gap-4">
      <p className="text-gray-200 text-sm font-medium leading-relaxed tracking-wide">
        "{data.content}"
      </p>
      <div className="flex items-center gap-3 pt-3 border-t border-white/5">
        <img 
          src={data.avatar} 
          alt={data.name} 
          className="w-9 h-9 rounded-full object-cover ring-2 ring-white/10 grayscale" 
        />
        <div>
          <h5 className="text-white font-bold text-xs">{data.name}</h5>
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">{data.company}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- FLOATING ICON COMPONENT ---
const FloatingIcon = ({ 
  icon: Icon, 
  y, 
  className 
}: { 
  icon: any; 
  y: MotionValue<number>; 
  className: string 
}) => {
    const rotate = useTransform(y, [0, 500], [0, 45]);
    
    return (
        <motion.div 
            style={{ y, rotate }}
            className={`absolute w-16 h-16 rounded-full bg-neutral-800/50 border border-white/5 backdrop-blur-md flex items-center justify-center shadow-2xl z-0 ${className}`}
        >
            <Icon className="text-white/20 w-8 h-8" />
        </motion.div>
    )
}

export const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // --- PARALLAX CONFIGURATION ---
  const y1 = useTransform(scrollYProgress, [0, 1], [400, -600]); 
  const y2 = useTransform(scrollYProgress, [0, 1], [300, -400]); 
  const y3 = useTransform(scrollYProgress, [0, 1], [500, -500]); 
  const y4 = useTransform(scrollYProgress, [0, 1], [250, -350]); 
  const y5 = useTransform(scrollYProgress, [0, 1], [600, -600]); 
  const y6 = useTransform(scrollYProgress, [0, 1], [350, -450]); 

  const yIcon1 = useTransform(scrollYProgress, [0, 1], [200, -100]); 
  const yIcon2 = useTransform(scrollYProgress, [0, 1], [800, -800]); 

  return (
    <section 
      ref={containerRef} 
      // Changed to min-h-screen to accommodate mobile vertical scrolling if needed
      className="relative min-h-[100dvh] bg-black overflow-hidden flex flex-col items-center justify-center py-20 lg:py-0"
      id="testimonials"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-neutral-900/30 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10 pointer-events-none opacity-60" />

      {/* --- CENTRAL CONTENT BLOCK --- */}
      <div className="relative z-20 text-center select-none flex flex-col items-center justify-center px-4">
        
        {/* Title */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter mb-4 drop-shadow-2xl">
          Testimonials
        </h2>
        
        {/* Subtitle */}
        <p className="text-neutral-500 uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold mb-8 md:mb-10">
          Trusted by the best
        </p>

        {/* --- ACTION BUTTON --- */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative px-8 py-3 rounded-full bg-white border border-white backdrop-blur-md overflow-hidden transition-all duration-300 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          <div className="flex items-center gap-2 relative z-10">
            <span className="text-sm font-medium tracking-wide">View All Stories</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </motion.button>
      </div>

      {/* --- SCATTERED ELEMENTS (Desktop/Large Screens Only) --- */}
      {/* Changed hidden md:block to hidden lg:block for better tablet responsiveness */}
      <div className="hidden lg:block absolute inset-0 w-full h-full max-w-[1600px] mx-auto z-0 pointer-events-none">
        
        {/* Floating Icons */}
        <FloatingIcon icon={Quote} y={yIcon1} className="left-[15%] top-[25%]" />
        <FloatingIcon icon={MessageCircle} y={yIcon2} className="right-[20%] bottom-[15%]" />

        {/* Scattered Cards */}
        <div className="pointer-events-auto">
          <Card data={testimonials[0]} y={y1} className="left-[15%] top-[5%]" blur />
          <Card data={testimonials[1]} y={y2} className="right-[12%] top-[10%]" />
          <Card data={testimonials[2]} y={y3} className="left-[5%] top-[40%]" />
          <Card data={testimonials[3]} y={y4} className="right-[5%] top-[45%]" blur />
          <Card data={testimonials[4]} y={y5} className="left-[12%] bottom-[5%]" />
          <Card data={testimonials[5]} y={y6} className="right-[8%] bottom-[8%]" />
        </div>
      </div>

      {/* --- MOBILE/TABLET LAYOUT --- */}
      {/* Visible on screens smaller than lg */}
      <div className="lg:hidden w-full relative z-30 mt-12 md:mt-20">
         <div className="flex gap-4 overflow-x-auto px-6 pb-8 snap-x mandatory no-scrollbar w-full">
           {testimonials.map((t, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="snap-center shrink-0 w-[280px] md:w-[350px] bg-neutral-900/80 border border-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-md"
             >
                <div className="mb-4 text-white/20"><Quote size={20} /></div>
                <p className="text-gray-300 text-sm md:text-base mb-6 leading-relaxed">"{t.content}"</p>
                <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full grayscale object-cover" />
                  <div>
                      <span className="text-white text-sm font-bold block">{t.name}</span>
                      <span className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider">{t.company}</span>
                  </div>
                </div>
             </motion.div>
           ))}
           {/* Spacer for end of list scrolling */}
           <div className="w-2 shrink-0" />
         </div>
      </div>

    </section>
  );
};