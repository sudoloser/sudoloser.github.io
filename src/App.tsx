import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import FloatingPill from './components/FloatingPill';
import HomeTab from './components/HomeTab';
import ReposTab from './components/ReposTab';
import AboutTab from './components/AboutTab';
import TwitterTab from './components/TwitterTab';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

declare global {
  interface Window {
    liquidGL: any;
  }
}

const words = ["Hi", "I'm", "sudoloser"];

const introAnimation = { 
  initial: { scale: 0.8, opacity: 0, y: 20 }, 
  animate: { scale: 1, opacity: 1, y: 0 }, 
  transition: { type: "spring", stiffness: 200, damping: 15 } 
};

const RainEffect = () => {
  return (
    <div className="rain">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="drop"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${0.5 + Math.random() * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
};

function App() {
  const [introStep, setIntroStep] = useState(0); // 0: Hi, 1: Hi I'm, 2: Hi I'm sudoloser, 3: Complete
  const [activeTab, setActiveTab] = useState<'home' | 'repos' | 'about' | 'twitter'>('home');
  const [isMaxWobble, setIsMaxWobble] = useState(false);
  
  // Audio State
  const [isMuted, setIsMuted] = useState(false);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [audioTime, setAudioTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const musicRef = useRef<HTMLAudioElement | null>(null);

  const handleNextStep = () => {
    if (introStep < words.length) {
      setIntroStep(prev => prev + 1);
    }
  };

  const triggerMaxWobble = () => {
    setIsMaxWobble(true);
    setTimeout(() => setIsMaxWobble(false), 5000);
  };

  const introComplete = introStep === words.length;

  useEffect(() => {
    if (introComplete) {
      if (activeTab === 'repos') {
        document.body.classList.add('allow-scroll');
      } else {
        document.body.classList.remove('allow-scroll');
        window.scrollTo(0, 0);
      }
    }
  }, [activeTab, introComplete]);

  // Background Music Effect
  useEffect(() => {
    if (introComplete) {
      if (!musicRef.current) {
        musicRef.current = new Audio('/audio/music/lofi-1.mp3');
        musicRef.current.loop = true;
        musicRef.current.volume = 0.4;
        
        musicRef.current.addEventListener('loadedmetadata', () => {
          setAudioDuration(musicRef.current?.duration || 0);
        });
        
        musicRef.current.addEventListener('timeupdate', () => {
          setAudioTime(musicRef.current?.currentTime || 0);
        });
      }

      if (isMuted || isVoicePlaying) {
        musicRef.current.pause();
      } else {
        musicRef.current.play().catch(e => console.log("Music play blocked:", e));
      }
    }
    return () => {
      if (musicRef.current) {
        musicRef.current.pause();
      }
    };
  }, [introComplete, isMuted, isVoicePlaying]);

  useEffect(() => {
    if (introComplete && window.liquidGL) {
      const timer = setTimeout(() => {
        try {
          // Cleanup old canvases to prevent stacking/disappearing issues
          document.querySelectorAll('canvas[id^="liquidGL"]').forEach(canvas => canvas.remove());
          
          // Only init if targets exist
          const targets = document.querySelectorAll(".liquid-glass");
          if (targets.length > 0) {
            window.liquidGL({
              target: ".liquid-glass",
              snapshot: "#root",
              refraction: isMaxWobble ? 0.05 : 0.005, // 10x refraction for Max Wobble
              frost: isMaxWobble ? 5 : 2,
              tilt: true,
              interactive: true
            });
            window.liquidGL.registerDynamic(".blob");
          }
        } catch (e) {
          console.error("LiquidGL init failed:", e);
        }
      }, isMaxWobble ? 100 : 2000); // Further increased delay for animation completion
      return () => clearTimeout(timer);
    }
  }, [introComplete, activeTab, isMaxWobble]);

  return (
    <div 
      className={cn(
        "min-h-screen w-full flex flex-col items-center justify-center selection:bg-primary/30 relative overflow-hidden transition-all duration-700",
        !introComplete && "cursor-pointer",
        isMaxWobble && "scale-110 blur-[1px]"
      )}
      onClick={!introComplete ? handleNextStep : undefined}
    >
      <RainEffect />
      
      <div className="bg-blobs">
        <div className={cn(
          "blob w-[500px] h-[500px] bg-primary top-[-10%] left-[-10%] animate-[move_25s_infinite_alternate]",
          isMaxWobble && "animate-[move_2s_infinite_alternate] opacity-40 blur-0"
        )} />
        <div className={cn(
          "blob w-[400px] h-[400px] bg-secondary bottom-[-10%] right-[-10%] animate-[move_30s_infinite_alternate-reverse]",
          isMaxWobble && "animate-[move_3s_infinite_alternate-reverse] opacity-40 blur-0"
        )} />
        <div className={cn(
          "blob w-[300px] h-[300px] bg-accent top-[40%] left-[60%] animate-[move_20s_infinite_alternate]",
          isMaxWobble && "animate-[move_1.5s_infinite_alternate] opacity-40 blur-0"
        )} />
      </div>

      <AnimatePresence>
        {introComplete && (
          <motion.div
            key="pill-container"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 50, damping: 12, delay: 0.5 }}
            className="fixed top-0 left-0 w-full z-[9999]"
          >
            <FloatingPill 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
              onMaxWobble={triggerMaxWobble}
              isMuted={isMuted}
              onMuteToggle={() => setIsMuted(!isMuted)}
              audioTime={audioTime}
              audioDuration={audioDuration}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!introComplete ? (
          <motion.div 
            key="intro"
            exit={{ opacity: 0, y: -40, filter: "blur(20px)" }}
            transition={{ duration: 0.8, ease: "backIn" }}
            className="z-[1000] flex flex-col items-center justify-center gap-16 min-h-screen w-full"
          >
            <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-8 px-6 text-center max-w-4xl">
              {words.map((word, i) => (
                <div key={i} className="relative min-w-fit py-4">
                  <motion.span
                    initial={introAnimation.initial}
                    animate={{
                      opacity: i <= introStep ? 1 : 0,
                      scale: i <= introStep ? 1 : 0,
                      rotate: [0, -1.5, 1.5, 0],
                      y: [0, -3, 3, 0]
                    }}
                    transition={{
                      ...introAnimation.transition,
                      rotate: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: i * 0.2 },
                      y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: i * 0.1 }
                    }}
                    className="text-6xl sm:text-7xl md:text-9xl font-bold text-slate-100 font-inter select-none inline-block whitespace-nowrap"
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-slate-500 font-inter uppercase tracking-[0.2em] text-[10px] sm:text-xs z-[1001] mt-8"
            >
              Click anywhere to continue
            </motion.div>
          </motion.div>
        ) : (
          <div className={cn(
            "w-full flex flex-col items-center pt-24 sm:pt-32 pb-12 px-4 sm:px-6 z-10 min-h-screen justify-start animate-wobble",
            isMaxWobble && "animate-wobble-extreme"
          )}>
            <main className="w-full max-w-2xl mt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {activeTab === 'home' && <HomeTab skipIntro={true} introAnimation={introAnimation} isMaxWobble={isMaxWobble} />}
                  {activeTab === 'repos' && <ReposTab />}
                  {activeTab === 'about' && <AboutTab onVoiceToggle={setIsVoicePlaying} />}
                  {activeTab === 'twitter' && <TwitterTab />}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
