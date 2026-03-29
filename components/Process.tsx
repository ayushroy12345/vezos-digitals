import React from 'react';
import { motion } from 'framer-motion';
import { ProcessStep } from '../types';

const steps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    description: "We dive deep into your business goals, target audience, and market landscape to build a solid foundation."
  },
  {
    number: "02",
    title: "Strategy & Design",
    description: "Our designers craft intuitive interfaces while our strategists map out the technical architecture."
  },
  {
    number: "03",
    title: "Development",
    description: "We code with precision using modern frameworks, ensuring your product is fast, secure, and scalable."
  },
  {
    number: "04",
    title: "Launch & Scale",
    description: "We handle the deployment and provide ongoing support to help your product grow and evolve."
  }
];

export const Process: React.FC = () => {
  return (
    <section 
      id="process" 
      // Changed mx-16 to responsive margins (mx-4 on mobile, mx-16 on desktop)
      // Adjusted vertical padding for mobile
      className="py-16 md:py-24 bg-white relative overflow-hidden mx-4 md:mx-8 lg:mx-16 rounded-3xl"
    >
      {/* Decorative Blob - made smaller on mobile */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-pink-50 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Adjusted gap for mobile vs desktop */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div>
            <h2 className="text-pink-600 font-semibold tracking-wide uppercase text-sm mb-3">How We Work</h2>
            
            {/* Responsive font size */}
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 md:mb-8">
              A proven 4-step process to success.
            </h3>
            
            {/* Responsive text size and margin */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-12">
              We don't just write code; we partner with you to solve complex problems and deliver measurable results.
            </p>
            
            <div className="space-y-6 md:space-y-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  // Tighter gap on mobile
                  className="flex gap-4 md:gap-6 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-gray-100 flex items-center justify-center font-bold text-gray-400 group-hover:border-pink-600 group-hover:text-pink-600 group-hover:bg-pink-50 transition-all duration-300">
                    {step.number}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative mt-4 lg:mt-0"
          >
            {/* Responsive padding inside the black card */}
            <div className="bg-black rounded-[32px] md:rounded-[40px] p-6 md:p-12 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20" />
              
              <div className="relative z-10 text-center">
                <img 
                  src="/steps.png" 
                  alt="Mobile App" 
                  // Added max-width constraint for mobile responsiveness
                  className="mx-auto rounded-3xl border-8 border-gray-800 shadow-2xl mb-8 w-full max-w-md lg:max-w-full"
                />
                <h4 className="text-2xl font-bold mb-2">Ready to start?</h4>
                <p className="text-gray-400 mb-6">Let's turn your vision into the next big thing.</p>
                <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-pink-50 transition-colors w-full sm:w-auto">
                  Book a Consultation
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};