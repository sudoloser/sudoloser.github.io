import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AboutTab = () => {
  const [showGames, setShowGames] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (!showGames) {
      timer = setTimeout(() => setShowHint(true), 5000);
    } else {
      setShowHint(false);
    }
    return () => clearTimeout(timer);
  }, [showGames]);

  const handlePhoneClick = () => {
    setShowHint(false);
    setShowGames(true);
  };

  const games = [
    { name: 'Minecraft', icon: '/images/icons/minecraft.png' },
    { name: 'NTE: Neverness To Everness', icon: '/images/icons/nte.png' },
    { name: 'Fortnite', icon: '/images/icons/fortnite.png' },
    { name: 'Rainbow Six Siege', icon: '/images/icons/r6s.png' },
  ];

  const variants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -50, opacity: 0 }
  };

  return (
    <div className="w-full min-h-screen overflow-y-auto p-4 text-slate-200 scrollbar-hide">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }
        .scrollbar-hide { -ms-overflow-style: none !important; scrollbar-width: none !important; }
      `}</style>
      
      <section className="flex flex-col items-center justify-center gap-6 mt-8">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 font-inter">About Me</h3>
        <p className="text-lg leading-relaxed font-medium max-w-sm text-center">
          Hi, I'm sudoloser. A young developer trying to make the most of my time.
        </p>

        <div className="relative w-full h-80 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!showGames ? (
              <motion.div 
                key="phone"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute flex flex-col items-center gap-2 cursor-pointer"
                onClick={handlePhoneClick}
              >
                <p className="font-semibold text-center mt-2">Motorola G stylus 2024</p>
                <img 
                  src="/images/phone.png" 
                  alt="Phone" 
                  className="w-40 h-64 object-contain" 
                />
                <AnimatePresence>
                  {showHint && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute top-1/2 left-3/4 text-white text-3xl"
                      transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 0.5
                      }}
                    >
                      👆
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="flex items-center gap-2">
                  <img src="/images/icons/derpfest.png" alt="OS" className="w-5 h-5" />
                  <p className="text-xs text-slate-400">Hello Moto OS (Android 15), former DerpFest user.</p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="games"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute flex flex-col items-center justify-center p-4"
                onClick={() => setShowGames(false)}
              >
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 cursor-pointer">
                  Favorite Games (Tap to return)
                </h3>
                <div className="grid grid-cols-2 gap-4 max-w-sm">
                  {games.map((game) => (
                    <div key={game.name} className="flex flex-col items-center gap-2 p-4 rounded-lg border border-white/5 bg-white/5">
                      <img src={game.icon} alt={game.name} className="w-16 h-16 rounded-lg" />
                      <span className="text-xs text-center">{game.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="fixed bottom-6 flex gap-3">
          <div className={`liquidGL animate-wobble w-3 h-3 rounded-full ${!showGames ? 'bg-white' : 'bg-slate-600'}`} />
          <div className={`liquidGL animate-wobble w-3 h-3 rounded-full ${showGames ? 'bg-white' : 'bg-slate-600'}`} />
        </div>
      </section>
    </div>
  );
};

export default AboutTab;
