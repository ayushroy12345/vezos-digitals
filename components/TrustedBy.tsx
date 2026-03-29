import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// --- DATA (UPDATED WITH REAL NAMES FROM FILE PATHS) ---
const clients = [
  // 1. Left Column
  { name: "ByteSkill", img: "/clients/ByteSkill.png" },
  { name: "Brixial Tech", img: "/clients/BrixialTech.png" },
  { name: "HKM", img: "/clients/hkm.png" },

  // 2. Middle Column - Top
  { name: "WebX", img: "/clients/webx.png" },
  { name: "Skilled", img: "/clients/Skilled.jpg" },
  { name: "Samaj Vikas School", img: "/clients/SamajVikasSchool.jpg" },

  // 3. Middle Column - Bottom
  { name: "Tejaswani", img: "/clients/tejaswani.png" },

  // 4. Right Column
  { name: "Technizee", img: "/clients/Technizee.jpg" },
  { name: "Testkart", img: "/clients/Testkart.png" },
  { name: "Genhybrid", img: "/clients/Genhybrid.jpg" },
];

export const ClientParallaxGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // --- DESKTOP TRANSFORM LOGIC ---
  const yMiddle = useTransform(scrollYProgress, [0, 0.4, 1], [0, -300, -2000]);
  const ySides = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [1, 1.25, 1.25]);
  const xLeft = useTransform(scrollYProgress, [0, 0.4, 1], [0, -100, -100]);
  const xRight = useTransform(scrollYProgress, [0, 0.4, 1], [0, 100, 100]);

  // --- DESKTOP SLICING LOGIC ---
  const col1Data = clients.slice(0, 3);
  const col2TopData = clients.slice(3, 6);
  const col2BottomData = clients.slice(6, 7);
  const col3Data = clients.slice(7, 10);

  // --- MOBILE SLICING LOGIC (HALF & HALF) ---
  // Split the 10 clients into two groups of 5
  const midpoint = Math.ceil(clients.length / 2);
  const topHalf = clients.slice(0, midpoint);    // First 5 companies
  const bottomHalf = clients.slice(midpoint);    // Last 5 companies

  // Duplicate data multiple times for smooth infinite loop without gaps
  const topMarqueeData = [...topHalf, ...topHalf, ...topHalf, ...topHalf];
  const bottomMarqueeData = [...bottomHalf, ...bottomHalf, ...bottomHalf, ...bottomHalf];

  return (
    <section 
      ref={containerRef} 
      className="py-12 md:py-24 relative md:h-500 overflow-hidden"
      id="partners"
    >
      
      {/* =========================================
          MOBILE VIEW (Visible < 768px)
          Top Marquee (5 Co's) -> Header -> Bottom Marquee (5 Co's)
         ========================================= */}
      <div className="md:hidden flex flex-col gap-10 w-full py-8">
        
        {/* 1. TOP MARQUEE (Moves Left) - Contains First Half of Companies */}
        <div className="w-full overflow-hidden flex relative z-10 opacity-90">
          <motion.div
            className="flex gap-4 min-w-full"
            animate={{ x: "-50%" }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {topMarqueeData.map((client, i) => (
              <MarqueeCard key={`mq-top-${i}`} client={client} />
            ))}
          </motion.div>
        </div>

        {/* 2. MOBILE HEADER (Centered) */}
        <div className="text-center px-4 relative z-10">
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tighter">
            Our Partners
          </h2>
          <p className="text-neutral-400 text-lg max-w-sm mx-auto">
            Trusted by the biggest brands in the industry.
          </p>
        </div>

        {/* 3. BOTTOM MARQUEE (Moves Right) - Contains Second Half of Companies */}
        <div className="w-full overflow-hidden flex relative z-10 opacity-90">
          <motion.div
            className="flex gap-4 min-w-full"
            initial={{ x: "-50%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {bottomMarqueeData.map((client, i) => (
              <MarqueeCard key={`mq-btm-${i}`} client={client} />
            ))}
          </motion.div>
        </div>
      </div>


      {/* =========================================
          DESKTOP VIEW (Visible >= 768px)
         ========================================= */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 w-full h-full">
        {/* HEADER */}
        <div className="text-center mb-10 relative z-10 pointer-events-none">
          <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tighter">
            Our Partners
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Trusted by the biggest brands in the industry.
          </p>
        </div>

        <div className="w-full relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full items-start mt-120">
            {/* COLUMN 1 */}
            <motion.div
              style={{ y: ySides, x: xLeft, scale }}
              className="flex flex-col gap-6"
            >
              {col1Data.map((client, i) => (
                <Card key={`col1-${i}`} client={client} />
              ))}
            </motion.div>

            {/* COLUMN 2 */}
            <motion.div
              style={{ y: yMiddle, scale }}
              className="flex flex-col gap-6"
            >
              {col2TopData.map((client, i) => (
                <Card key={`col2-top-${i}`} client={client} />
              ))}

              {/* CALL TO ACTION */}
              <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-8 flex flex-col items-center justify-center text-center text-white shadow-2xl relative overflow-hidden">
                <h3 className="text-3xl font-bold mb-2">Join Us</h3>
                <button className="mt-4 px-6 py-2 bg-white text-indigo-900 font-bold rounded-full cursor-pointer hover:bg-opacity-90 transition-colors">
                  Contact
                </button>
              </div>

              {col2BottomData.map((client, i) => (
                <Card key={`col2-btm-${i}`} client={client} />
              ))}
            </motion.div>

            {/* COLUMN 3 */}
            <motion.div
              style={{ y: ySides, x: xRight, scale }}
              className="flex flex-col gap-6"
            >
              {col3Data.map((client, i) => (
                <Card key={`col3-${i}`} client={client} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- DESKTOP CARD ---
const Card = ({ client }: { client: { name: string; img: string } }) => {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-800 shadow-md transition-all duration-300 group">
      <img
        src={client.img}
        alt={client.name}
        className="h-full w-full object-cover opacity-80 grayscale group-hover:grayscale-0 transition-all duration-500"
      />
    </div>
  );
};

// --- MOBILE MARQUEE CARD ---
const MarqueeCard = ({ client }: { client: { name: string; img: string } }) => {
  return (
    <div className="flex-shrink-0 flex items-center gap-3 p-3 bg-neutral-900 border border-neutral-800 rounded-full shadow-sm min-w-[180px]">
      <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-800 flex-shrink-0">
        <img
          src={client.img}
          alt={client.name}
          className="w-full h-full object-cover opacity-90"
        />
      </div>
      <span className="font-medium text-sm text-white whitespace-nowrap">
        {client.name}
      </span>
    </div>
  );
};