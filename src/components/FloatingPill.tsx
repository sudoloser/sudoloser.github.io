import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollWobble } from '../hooks/useScrollWobble';
import { Menu, X, Home, Github, User, Twitter, Activity } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

interface FloatingPillProps {
  activeTab: 'home' | 'repos' | 'about' | 'twitter';
  onTabChange: (tab: 'home' | 'repos' | 'about' | 'twitter') => void;
  onMaxWobble?: () => void;
  isMuted?: boolean;
  onMuteToggle?: () => void;
  onMenuToggle?: (isOpen: boolean) => void;
  audioTime?: number;
  audioDuration?: number;
}

const FloatingPill = ({ activeTab, onTabChange, onMaxWobble, isMuted, onMuteToggle, onMenuToggle, audioTime = 0, audioDuration = 0 }: FloatingPillProps) => {
  const { rotateX, rotateY, scale } = useScrollWobble();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    onMenuToggle?.(isMenuOpen);
  }, [isMenuOpen, onMenuToggle]);

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
    { id: 'twitter', label: 'X Posts', icon: Twitter },
    { id: 'status', label: 'Status', icon: Activity, href: 'https://sudoloser.hyperping.app' },
  ] as const;

  const handleTabClick = (id: 'home' | 'repos' | 'about' | 'twitter') => {
    onTabChange(id);
    setIsMenuOpen(false);
  };

  return (
    <div className="fixed top-4 sm:top-6 lg:top-8 left-1/2 -translate-x-1/2 z-[9999] w-[95%] sm:w-[400px] lg:w-[560px] xl:w-[640px]">
      <div className="flex flex-col items-end animate-wobble w-full">
        <motion.div
          style={{ 
            rotateX, 
            rotateY, 
            scale,
            perspective: 1000
          }}
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="flex items-center justify-between gap-4 px-4 py-2 lg:px-5 lg:py-2.5 xl:px-6 xl:py-3 bg-slate-900/90 border border-slate-700/50 rounded-full shadow-2xl backdrop-blur-xl w-full"
        >
          <div className="flex items-center gap-3">
            <button 
              onClick={handleProfileClick}
              className="relative transition-transform active:scale-90 outline-none"
            >
              <img 
                src="https://github.com/sudoloser.png" 
                alt="sudoloser" 
                className="w-7 h-7 lg:w-9 lg:h-9 xl:w-10 xl:h-10 rounded-full border border-slate-600 shadow-sm"
              />
              {clickCount > 0 && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full flex items-center justify-center text-[8px] text-white font-bold animate-bounce">
                  {clickCount}
                </div>
              )}
            </button>
            <span className="font-bold text-slate-100 tracking-tight text-sm sm:text-base lg:text-lg font-inter select-none">@sudoloser</span>
          </div>

<div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <button
                onClick={onMuteToggle}
                className={cn("mute-btn shrink-0 lg:scale-110 xl:scale-125", isMuted && "muted")}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                <div className="speaker">
                  <svg className="icon" viewBox="0 0 24 24">
                    <path d="M14.667 0v24L4.667 15H0V9h4.667l10-9z" />
                  </svg>
                  <div className="wave" />
                  <div className="cross">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </div>
                </div>
              </button>

              {audioDuration > 0 && (
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <div className="flex items-end gap-0.5 h-4 lg:h-5 xl:h-6 w-8 lg:w-10 xl:w-12 shrink-0">
                    {Array.from({ length: 4 }).map((_, i) => {
                      const seed = (i * 17 + Math.floor(audioTime * 2)) % 100;
                      const height = isMuted ? 20 : Math.max(20, Math.min(100, seed + 20));
                      return (
                        <motion.div
                          key={i}
                          animate={{ height: `${height}%` }}
                          transition={{ duration: 0.2 }}
                          className="w-1 lg:w-1.5 bg-primary rounded-full"
                        />
                      );
                    })}
                  </div>
                  
                  <div className="flex items-center gap-1.5 min-w-0 flex-1">
                    <span className="text-[10px] text-slate-400 font-mono shrink-0">{formatTime(audioTime)}</span>
                    <div className="flex-1 h-1 bg-slate-700 rounded-full min-w-0 overflow-hidden">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(audioTime / audioDuration) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono shrink-0">{formatTime(audioDuration)}</span>
                  </div>
                </div>
              )}

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={cn(
                  "p-1.5 rounded-full transition-all duration-300 shrink-0",
                  isMenuOpen 
                    ? "bg-slate-100 text-slate-900 rotate-90" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                )}
              >
                {isMenuOpen ? <X size={18} className="lg:w-5 lg:h-5 xl:w-6 xl:h-6" /> : <Menu size={18} className="lg:w-5 lg:h-5 xl:w-6 xl:h-6" />}
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
              className="w-48 lg:w-56 bg-slate-900/95 border border-slate-700/50 rounded-2xl shadow-2xl backdrop-blur-2xl overflow-hidden p-1.5 flex flex-col gap-1 mt-0.5 origin-top-right"
            >
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const sharedClass = cn(
                  "flex items-center gap-3 px-4 py-2.5 lg:px-5 lg:py-3 rounded-xl transition-all duration-200 font-inter font-bold text-sm lg:text-base",
                  activeTab === tab.id 
                    ? "bg-slate-100 text-slate-900" 
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                );
                if (tab.id === 'status') {
                  return (
                    <a
                      key={tab.id}
                      href={tab.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMenuOpen(false)}
                      className={sharedClass}
                    >
                      <Icon size={16} className="lg:w-5 lg:h-5" />
                      <span>{tab.label}</span>
                    </a>
                  );
                }
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={sharedClass}
                  >
                    <Icon size={16} className="lg:w-5 lg:h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FloatingPill;
