import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Star,
  Rocket,
  Lightbulb,
  PenTool,
  Video,
} from "lucide-react";

// --- 1. Background Grid Component ---
import { gsap } from "gsap";
import RotatingText from "./RotatingText";

const GridMotion = ({
  image = "https://images.unsplash.com/photo-1748370987492-eb390a61dcda?q=80&w=3464&auto=format&fit=crop",
  items = [],
}) => {
  const gridRef = useRef(null);
  const rowRefs = useRef([]);
  const mouseXRef = useRef(
    typeof window !== "undefined" ? window.innerWidth / 2 : 0,
  );

  const totalItems = 28;
  const displayItems = items.length > 0 ? items : Array(totalItems).fill(image);

  // The specific futuristic image for the "Stand out" card
  const futuristicImage =
    "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?q=80&w=1315&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);
    const handleMouseMove = (e) => {
      mouseXRef.current = e.clientX;
    };

    const updateMotion = () => {
      const maxMoveAmount = 400;
      const baseDuration = 0.8;
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2];

      rowRefs.current.forEach((row, index) => {
        if (row) {
          const direction = index % 2 === 0 ? 1 : -1;
          const moveAmount =
            ((mouseXRef.current / window.innerWidth) * maxMoveAmount -
              maxMoveAmount / 2) *
            direction;

          gsap.to(row, {
            x: moveAmount,
            duration:
              baseDuration + inertiaFactors[index % inertiaFactors.length],
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      });
    };

    const removeAnimationLoop = gsap.ticker.add(updateMotion);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      removeAnimationLoop();
    };
  }, []);

  return (
    <div
      className="w-full h-screen overflow-hidden bg-white absolute top-0 right-0 opacity-50"
      ref={gridRef}
    >
      <section className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {/* RESPONSIVE: Increased width to 200vw on mobile to cover taller screens, gap reduced on mobile */}
        <div className="gridMotion-container flex flex-col gap-2 sm:gap-4 w-[200vw] md:w-[150vw] h-[150vh] rotate-[-12deg] origin-center z-10">
          {[...Array(4)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid-row flex gap-2 sm:gap-4 w-full h-1/4 will-change-transform"
              ref={(el) => (rowRefs.current[rowIndex] = el)}
            >
              {[...Array(7)].map((_, itemIndex) => {
                const content = displayItems[rowIndex * 7 + itemIndex];
                const isSpecial = rowIndex === 2 && itemIndex === 5;

                return (
                  <div
                    key={itemIndex}
                    // RESPONSIVE: min-w adjusted (150px mobile -> 250px desktop)
                    className={`relative flex-1 min-w-[150px] sm:min-w-[200px] md:min-w-[250px] aspect-square h-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm transition-transform duration-500`}
                  >
                    <div
                      className={`w-full h-full bg-cover bg-center transition-all duration-700 
                        ${
                          isSpecial
                            ? "grayscale-0 opacity-100 brightness-110 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                            : "grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
                        }`}
                      style={{
                        backgroundImage: `url(${isSpecial ? futuristicImage : content})`,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      <div className="absolute inset-0 pointer-events-none z-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_0%,rgba(255,255,255,0.5)_40%,white_90%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent z-30 pointer-events-none" />
    </div>
  );
};

// --- 3. Main Hero Component ---
export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white py-12">
      <GridMotion />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-20 flex flex-col items-center text-center">
        {/* Top Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 bg-white/80 backdrop-blur-sm rounded-full border border-gray-100 shadow-sm mb-6 sm:mb-8"
        >
          <Star size={14} className="text-pink-500 fill-pink-500" />
          <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Trusted by founders in Jamshedpur & beyond
          </span>
        </motion.div>

        {/* Main Headline */}
        <div className="relative w-full">
          {/* RESPONSIVE: Text size scales from 3xl to 6xl */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1] sm:leading-[1.2] mb-6 drop-shadow-sm">
            
            {/* Line 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mx-auto flex flex-wrap items-center justify-center gap-y-2 text-nowrap flex-nowrap">
                <span className="whitespace-nowrap">We Craft Your</span>
                <RotatingText
                  texts={["Brand", "Website", "App", "Content"]}
                  // RESPONSIVE: Padding and margin adjusted for smaller text
                  mainClassName="inline-flex px-2 sm:px-3 bg-pink-500 text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg transition-all ml-2 -rotate-1"
                  staggerFrom="last"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
              </div>
            </motion.div>

            {/* Line 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-1 sm:mt-2"
            >
              From Concept
              {/* RESPONSIVE: Icon container scaled down slightly on mobile */}
              <span className="inline-flex align-middle justify-center items-center w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 bg-gray-900 rounded-lg sm:rounded-xl mx-2 sm:mx-3 text-white shadow-lg rotate-3 transform hover:scale-105 transition-transform">
                <Lightbulb
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-yellow-300"
                />
              </span>
              To
            </motion.div>

            {/* Line 3 */}
            <motion.div
              className="flex items-center justify-center gap-1 mt-1 sm:mt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="mx-auto flex flex-wrap items-center justify-center gap-x-2">
                <RotatingText
                  texts={["Growth", "Success", "Real", "Online"]}
                  mainClassName="inline-flex px-2 sm:px-3 bg-black text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg transition-all rotate-1"
                  staggerFrom="last"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
                {/* RESPONSIVE: Changed from 'hidden sm:inline' to just 'inline' so text isn't cut off on mobile */}
                <span className="inline">Impact.</span>
              </div>
            </motion.div>
          </h1>
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm sm:text-base md:text-lg text-gray-500 mb-4 sm:mb-10 max-w-xl mx-auto leading-relaxed backdrop-blur-xs rounded-lg p-2"
        >
          <span className="font-bold text-gray-900">Vezos Digitals</span> is a
          full-service agency turning ideas into premium digital experiences.
          Web, Marketing, and Design — all in one place.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <button className="w-full sm:w-auto px-7 py-3.5 bg-gray-900 text-white rounded-full font-bold text-sm sm:text-base hover:bg-pink-600 hover:shadow-lg hover:shadow-pink-100 transition-all duration-300 flex items-center justify-center gap-2.5 group">
            Start Your Project
            <Rocket
              size={18}
              className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
            />
          </button>

          <button className="w-full sm:w-auto px-7 py-3.5 bg-white text-gray-900 border border-gray-200 rounded-full font-bold text-sm sm:text-base hover:border-pink-200 hover:bg-pink-50 transition-all duration-300 flex items-center justify-center gap-2">
            Our Work
            <ArrowRight size={18} className="text-gray-400" />
          </button>
        </motion.div>

        {/* Service Anchor Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          // RESPONSIVE: Reduced gap on mobile
          className="mt-8 sm:mt-16 flex gap-6 sm:gap-10 md:gap-14 opacity-30 grayscale hover:grayscale-0 transition-all duration-500"
        >
          {[
            { icon: <Zap size={20} />, label: "Code" },
            { icon: <PenTool size={20} />, label: "Design" },
            { icon: <Video size={20} />, label: "Video" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <div className="group-hover:text-pink-600 transition-colors">
                {item.icon}
              </div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};