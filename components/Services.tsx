import React from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, Monitor, Rocket, PenTool, Database, 
  BarChart3, ArrowRight, CheckCircle2, Layers 
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ExtendedServiceItem extends ServiceItem {
  features: string[];
}

const services: ExtendedServiceItem[] = [
  {
    title: "Web Development",
    description: "We build high-performance websites using React, Next.js, and modern architectural patterns. Our code is clean, scalable, and SEO-optimized from the ground up.",
    icon: Monitor,
    features: ["Custom React & Next.js", "Progressive Web Apps", "Headless CMS", "API Integration"]
  },
  {
    title: "Mobile Applications",
    description: "Expand your reach with native and cross-platform mobile applications. We prioritize fluid animations, intuitive gestures, and offline capabilities.",
    icon: Smartphone,
    features: ["React Native & Flutter", "iOS & Android Native", "App Store Optimization", "Real-time Sync"]
  },
  {
    title: "UI/UX Design",
    description: "Design is not just about how it looks, but how it works. We create user-centric interfaces that blend stunning aesthetics with logical functionality.",
    icon: PenTool,
    features: ["User Research", "Interactive Prototyping", "Design Systems", "User Testing"]
  },
  {
    title: "Growth & Strategy",
    description: "Building the product is half the battle. We use data-driven marketing strategies and growth hacking techniques to scale your business.",
    icon: Rocket,
    features: ["Conversion Optimization", "Go-to-Market Strategy", "Acquisition funnels", "Brand Positioning"]
  },
  {
    title: "Backend Architecture",
    description: "The backbone of your application. We design robust, secure, and scalable server-side solutions that can handle high traffic loads.",
    icon: Database,
    features: ["Cloud (AWS/GCP)", "Microservices", "Database Design", "Security & Compliance"]
  },
  {
    title: "Analytics & SEO",
    description: "Stop guessing. We implement advanced analytics to track every user interaction, coupled with technical SEO strategies that improve your visibility.",
    icon: BarChart3,
    features: ["Technical SEO Audits", "Custom Dashboards", "User Behavior Tracking", "Performance Monitoring"]
  }
];

export const Services: React.FC = () => {
  return (
    // NOTE: Removed 'overflow-hidden' from section, as it breaks position: sticky
    <section id="services" className="sm:py-24 relative pb-0"> 
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-pink-500 font-semibold tracking-wide uppercase text-sm mb-3">Our Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Full-cycle digital <span className="underline decoration-pink-500 decoration-4 underline-offset-4">mastery</span>.
            </h3>
            <p className="text-xl text-zinc-400">
              We don't just write code; we build business solutions. Explore our core services designed to scale your vision.
            </p>
          </motion.div>
        </div>

        {/* Services Stacking Container */}
        <div className="flex flex-col relative pb-24">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

const ServiceCard: React.FC<{ service: ExtendedServiceItem; index: number }> = ({ service, index }) => {
  const isEven = index % 2 === 0;

  // CARD STACKING LOGIC
  // 1. We start the stickiness at 120px from top (leaving room for header/nav)
  // 2. We add an increment of 40px per card index, so they cascade like a deck of cards
  const stickyTop = 120 + (index * 40); 
  
  // We calculate a slight scale/brightness difference for visual depth if desired,
  // but standard CSS sticky is cleanest.

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="sticky top-0 mb-12" // 'sticky' enables the effect
      style={{ 
        top: `${stickyTop}px`, // Dynamic top position
        zIndex: index + 1 
      }} 
    >
      {/* 
        THE CARD ITSELF 
        Needs a solid background (bg-zinc-900) to hide cards scrolling underneath.
        Added border, shadow, and rounded corners to define the card edges.
      */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden min-h-[500px] relative">
        
        {/* Decorative Gradient Blob for Card Internal */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20 relative z-10`}>
          
          {/* Text Content Side */}
          <div className="flex-1 w-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-zinc-950 border border-zinc-800 rounded-lg text-pink-500 shadow-sm">
                <service.icon size={24} />
              </div>
              <span className="text-zinc-500 font-bold opacity-50 uppercase tracking-widest text-4xl select-none">
                0{index + 1}
              </span>
            </div>

            <h4 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {service.title}
            </h4>
            
            <p className="text-lg text-zinc-400 leading-relaxed mb-8">
              {service.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />
                  <span className="text-zinc-300 text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <a href="#" className="group inline-flex items-center text-white font-semibold border-b border-pink-500 pb-1 hover:text-pink-400 transition-colors">
              View Case Studies 
              <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={18} />
            </a>
          </div>

          {/* Visual/Image Side */}
          <div className="flex-1 w-full relative group">
            <div className="relative h-[350px] w-full bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col shadow-inner">
              
              {/* Browser Header UI */}
              <div className="h-10 border-b border-zinc-800 bg-zinc-900 flex items-center px-4 gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
              </div>

              {/* Card Image Area */}
              <div className="flex-1 flex items-center justify-center p-8 bg-zinc-950 relative overflow-hidden">
                 {/* Grid Background */}
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
                 
                 <motion.div 
                   whileHover={{ scale: 1.05, rotate: isEven ? 2 : -2 }}
                   transition={{ type: "spring", stiffness: 300 }}
                   className="relative z-10 w-40 h-40 bg-zinc-900 rounded-3xl border border-zinc-700 flex items-center justify-center shadow-2xl group-hover:border-pink-500/50 transition-colors duration-500"
                 >
                    <service.icon size={80} className="text-zinc-200 group-hover:text-pink-500 transition-colors duration-500" strokeWidth={1} />
                    
                    {/* Floating Badges */}
                    <div className="absolute -top-5 -right-5 bg-zinc-800 p-3 rounded-xl border border-zinc-700 shadow-xl">
                      <Layers size={20} className="text-pink-500" />
                    </div>
                 </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};