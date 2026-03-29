import React from 'react';
import { ArrowUpRight, Github, Twitter, Linkedin, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="text-5xl font-bold mb-8 leading-tight">
              Let's build something <br />
              <span className="text-pink-500">extraordinary</span> together.
            </h2>
            <div className="flex flex-wrap gap-4">
               <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-pink-500 hover:text-white transition-colors duration-300 flex items-center gap-2">
                 Start a Project <ArrowUpRight size={20} />
               </button>
               <button className="px-8 py-4 rounded-full font-bold border border-gray-700 hover:border-pink-500 hover:text-pink-500 transition-colors duration-300">
                 hello@vezos.digitals
               </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-gray-400">
            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-pink-500 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-pink-500 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-pink-500 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-pink-500 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Services</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-pink-500 transition-colors">Web Development</a></li>
                <li><a href="#" className="hover:text-pink-500 transition-colors">Mobile Apps</a></li>
                <li><a href="#" className="hover:text-pink-500 transition-colors">UI/UX Design</a></li>
                <li><a href="#" className="hover:text-pink-500 transition-colors">Marketing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Social</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-pink-500 transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-pink-500 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-pink-500 transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-pink-500 transition-colors">Dribbble</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                <span className="text-black font-bold text-xs">V</span>
            </div>
            <span className="font-bold text-lg">Vezos.</span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2024 Vezos Digitals. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Github size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
