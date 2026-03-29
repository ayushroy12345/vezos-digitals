import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, ArrowUpRight, Sparkles } from 'lucide-react';

// --- Types ---
interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  linkedin: string;
}

const team: TeamMember[] = [
  {
    id: 1,
    name: "Aditya Prasad",
    role: "CEO & Founder",
    image: "/team/Aditya Prasad Photo.jpg",
    linkedin: "#"
  },
  {
    id: 2,
    name: "Agrim Thevar Jain",
    role: "Co-Founder",
    image: "/team/agrim photo.png",
    linkedin: "#"
  },
  {
    id: 3,
    name: "Gourav Bansal",
    role: "Social Media Head",
    image: "/team/Gourav Photo.jpg",
    linkedin: "#"
  },
  {
    id: 4,
    name: "Arpan Kr. De",
    role: "Tech Head",
    image: "/team/unknown.png",
    linkedin: "#"
  },
  {
    id: 5,
    name: "Mayank kumar",
    role: "Digital Marketing Head",
    image: "/team/Mayank Photo.jpg",
    linkedin: "#"
  }
];

export const TeamSection: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden px-6">
      
      {/* --- Ambient Background (Pink/Rose tones) --- */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-900/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-900/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 md:mb-28">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <Sparkles className="w-5 h-5 text-pink-500" />
              <span className="text-pink-400 font-medium tracking-wider uppercase text-xs">Our Squad</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-white leading-[1.1]"
            >
              The <span className="text-pink-500">Creative Minds</span> Driving Your Growth.
            </motion.h2>
          </div>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-pink-50 transition-colors"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* --- Unique Staggered Layout --- */}
        <div className="relative">
          {/* Row 1: Top 3 items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 justify-items-center">
            {team.slice(0, 3).map((member) => (
              <TeamCard 
                key={member.id} 
                member={member} 
                hoveredId={hoveredId} 
                setHoveredId={setHoveredId} 
              />
            ))}
          </div>
          
          {/* Row 2: Bottom 2 items (Centered) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-8 justify-items-center mt-16 lg:max-w-4xl lg:mx-auto">
             {team.slice(3, 5).map((member) => (
              <TeamCard 
                key={member.id} 
                member={member} 
                hoveredId={hoveredId} 
                setHoveredId={setHoveredId} 
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

// --- Sub-Component: The Magic Card ---
const TeamCard = ({ 
  member, 
  hoveredId, 
  setHoveredId 
}: { 
  member: TeamMember; 
  hoveredId: number | null; 
  setHoveredId: (id: number | null) => void;
}) => {
  const isHovered = hoveredId === member.id;
  // If we are hovering SOMEONE, but not THIS one, dim this one.
  const isDimmed = hoveredId !== null && !isHovered;

  return (
    <div 
      className="relative group w-full max-w-[300px]"
      onMouseEnter={() => setHoveredId(member.id)}
      onMouseLeave={() => setHoveredId(null)}
    >
      {/* Floating Animation Wrapper (Pauses on hover) */}
      <motion.div
        animate={isHovered ? { y: 0 } : { y: [0, -10, 0] }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: member.id * 0.5 // Stagger the float animation
        }}
        // Apply dimming opacity
        className={`transition-opacity duration-500 ${isDimmed ? 'opacity-30 blur-[2px] grayscale' : 'opacity-100'}`}
      >
        {/* --- The Unique Shape Image --- */}
        <div className="relative aspect-square mb-6">
            {/* Decorative ring that spins on hover */}
            <div className={`absolute -inset-4 border border-dashed border-pink-500/30 rounded-full transition-all duration-700 ${isHovered ? 'rotate-180 scale-110 opacity-100' : 'opacity-0'}`} />

            {/* The Image Container with "Leaf" Shape */}
            <div 
              className="w-full h-full overflow-hidden relative transition-all duration-500 ease-out bg-neutral-900 justify-center items-center flex"
              style={{
                // Leaf shape: TopRight and BottomLeft are sharp corners
                borderRadius: '50% 0 50% 50%',
                transform: 'rotate(-45deg)', 
                // Pink glow on hover
                boxShadow: isHovered ? '0 0 40px rgba(236, 72, 153, 0.4)' : 'none'
              }}
            >
              {/* Counter-rotate image so it stands straight */}
              <img 
                src={member.image} 
                alt={member.name}
                className={`w-full h- object-cover rotate-[22.5deg] transition-all duration-500 ${isHovered ? 'grayscale-0 scale-[1.2]' : 'grayscale'}`}
              />
              
              {/* Overlay Pink Gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-t from-pink-900/60 to-transparent rotate-45 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
            </div>

            {/* LinkedIn Badge - Appears on Hover */}
            <motion.a 
              href={member.linkedin}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
              className="absolute bottom-0 right-0 w-12 h-12 bg-white rounded-full flex items-center justify-center text-black hover:bg-pink-600 hover:text-white transition-colors shadow-lg z-20"
            >
              <Linkedin size={20} />
            </motion.a>
        </div>

        {/* --- Text Content --- */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-pink-400 transition-colors">
            {member.name}
          </h3>
          <p className="text-sm font-medium text-neutral-500 uppercase tracking-widest group-hover:text-neutral-300 transition-colors">
            {member.role}
          </p>
        </div>

      </motion.div>
    </div>
  );
};