import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Process", href: "#process" },
    { name: "Partners", href: "#partners" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  // --- Smooth Scroll Handler ---
  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    
    // Close mobile menu if it's open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }

    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    
    if (element) {
      // Offset so the floating navbar doesn't cover the section content
      const offset = 100; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      {/* --- Main Floating Pill --- */}
      <motion.nav
        initial={{ y: -110, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-6 inset-x-0 mx-auto z-50 w-[94%] max-w-6xl transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div
          className={`relative grid grid-cols-2 md:grid-cols-3 items-center px-4 py-2 rounded-full transition-all duration-300 ${
            isScrolled 
              ? "bg-white backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)]" 
              : "bg-transparent"
          }`}
        >
          {/* 1. Logo Section (Grid Col 1) */}
          <div className="flex items-center justify-start ml-2">
            <span className="font-bold text-xl md:text-2xl tracking-tight text-gray-900">
              Vezos <span className="text-pink-500">Digitals</span>
            </span>
          </div>

          {/* 2. Desktop Links (Grid Col 2 - Perfectly Centered) */}
          <div className="hidden md:flex justify-self-center">
            <div className="flex items-center gap-1 bg-black p-1 rounded-full">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="px-5 py-2 text-sm font-medium text-white hover:text-black hover:bg-white rounded-full transition-all duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* 3. CTA & Mobile Toggle (Grid Col 3) */}
          <div className="flex items-center justify-end gap-2">
            <button className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-full text-sm font-bold hover:bg-pink-600 transition-all active:scale-95 group">
              Let's Talk
              <ArrowRight
                size={14}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-3 rounded-full text-gray-900 transition-colors"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* --- Mobile Full Screen Menu Overlay --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-white p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-bold text-2xl tracking-tight">
                Vezos <span className="text-pink-500">Digitals</span>
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-5xl font-bold text-gray-900 tracking-tight"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto">
              <button className="w-full py-5 bg-black text-white rounded-2xl text-xl font-bold">
                Start a Project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};