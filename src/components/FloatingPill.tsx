import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollWobble } from '../hooks/useScrollWobble';
import { Menu, X, Home, Github, User } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FloatingPillProps {
  activeTab: 'home' | 'repos' | 'about';
  onTabChange: (tab: 'home' | 'repos' | 'about') => void;
  onMaxWobble?: () => void;
}

const FloatingPill = ({ activeTab, onTabChange, onMaxWobble }: FloatingPillProps) => {
  const { rotateX, rotateY, scale } = useScrollWobble();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleProfileClick = () => {
    const newCount = clickCount + 1;
    if (newCount >= 5) {
      onMaxWobble?.();
      setClickCount(0);
    } else {
      setClickCount(newCount);
    }
  };

  // Reset clicks after 2 seconds of inactivity
  useEffect(() => {
    if (clickCount > 0) {
      const timer = setTimeout(() => setClickCount(0), 2000);
      return () => clearTimeout(timer);
    }
  }, [clickCount]);

  // Lock scroll when dropdown is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('lock-scroll');
    } else {
      document.body.classList.remove('lock-scroll');
    }
    return () => document.body.classList.remove('lock-scroll');
  }, [isMenuOpen]);

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'repos', label: 'Repos', icon: Github },
    { id: 'about', label: 'About', icon: User },
  ] as const;

  const handleTabClick = (id: 'home' | 'repos' | 'about') => {
    onTabChange(id);
    setIsMenuOpen(false);
  };

  return (
    <div className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-[9999] w-[95%] sm:w-[400px] flex flex-col items-end">
      <motion.div
        style={{ 
          rotateX, 
          rotateY, 
          scale,
          perspective: 1000
        }}
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="flex items-center justify-between gap-4 px-4 py-2 bg-slate-900/90 border border-slate-700/50 rounded-full shadow-2xl backdrop-blur-xl w-full"
      >
        <div className="flex items-center gap-3">
          <button 
            onClick={handleProfileClick}
            className="relative transition-transform active:scale-90 outline-none"
          >
            <img 
              src="https://github.com/sudoloser.png" 
              alt="sudoloser" 
              className="w-7 h-7 rounded-full border border-slate-600 shadow-sm"
            />
            {clickCount > 0 && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full flex items-center justify-center text-[8px] text-white font-bold animate-bounce">
                {clickCount}
              </div>
            )}
          </button>
          <span className="font-bold text-slate-100 tracking-tight text-sm sm:text-base font-inter select-none">@sudoloser</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "p-1.5 rounded-full transition-all duration-300",
              isMenuOpen 
                ? "bg-slate-100 text-slate-900 rotate-90" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            )}
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.95, rotateX: -5 }}
            animate={{ 
              opacity: 1, 
              y: 8, 
              scale: 1, 
              rotateX: 0,
              transition: {
                type: "spring",
                damping: 15,
                stiffness: 200
              }
            }}
            exit={{ opacity: 0, y: -5, scale: 0.95, rotateX: 5 }}
            className="w-36 bg-slate-900/95 border border-slate-700/50 rounded-2xl shadow-2xl backdrop-blur-2xl overflow-hidden p-1 flex flex-col gap-0.5 mt-0.5 origin-top-right"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-200 font-inter font-bold text-[13px]",
                    activeTab === tab.id 
                      ? "bg-slate-100 text-slate-900" 
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                  )}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingPill;
