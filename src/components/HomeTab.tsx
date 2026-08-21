import { motion } from 'framer-motion';
import { MapPin, ExternalLink, Twitter, Instagram, Share2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SocialLink = ({ icon: Icon, label, username, href }: { icon: any, label: string, username: string, href: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noreferrer"
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    className="flex items-center gap-4 p-4 lg:p-5 bg-slate-900/60 border border-slate-700/50 backdrop-blur-xl transition-all group no-underline rounded-2xl shadow-xl"
  >
    <div className="text-slate-400 group-hover:text-primary transition-colors">
      <Icon size={20} />
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold font-inter">{label}</span>
      <span className="text-sm text-slate-200 font-medium">{username}</span>
    </div>
    <div className="ml-auto p-1 text-slate-600 group-hover:text-slate-400 transition-colors">
      <ExternalLink size={12} />
    </div>
  </motion.a>
);

const HomeTab = ({ skipIntro = false, introAnimation = {}, isMaxWobble = false }: { skipIntro?: boolean, introAnimation?: any, isMaxWobble?: boolean }) => {
  const terminalCommand = ["$", "echo", "\"Hi,", "I'm", "sudoloser\""];
  
  const socials = [
    { icon: Twitter, label: "X / Twitter", username: "explysm", href: "https://x.com/explysm" },
    { icon: Share2, label: "Reddit", username: "Agreeable_Elk2698", href: "https://www.reddit.com/u/Agreeable_Elk2698/s/8ZkJPOBUuV" },
    { icon: Share2, label: "TikTok", username: "asnced", href: "https://tiktok.com/@asnced" },
    { icon: Instagram, label: "Instagram", username: "huxhml", href: "https://instagram.com/huxhml" },
  ];

  return (
    <div className="space-y-12">
      <section className="space-y-6 flex flex-col items-center text-center">
        <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-4 gap-y-2 items-center">
          {terminalCommand.map((word, i) => (
            <div key={i} className="relative min-w-fit">
              <motion.span
                animate={{ 
                  opacity: 1, 
                  scale: isMaxWobble ? [1, 1.2, 0.8, 1] : 1,
                  rotate: isMaxWobble ? [0, -10, 10, -5, 5, 0] : [0, -1, 1, 0],
                  y: isMaxWobble ? [0, -15, 15, 0] : [0, -2, 2, 0],
                }}
                transition={{ 
                  rotate: { repeat: Infinity, duration: isMaxWobble ? 0.3 : 6, ease: "easeInOut", delay: i * 0.1 },
                  y: { repeat: Infinity, duration: isMaxWobble ? 0.4 : 7, ease: "easeInOut", delay: i * 0.05 },
                  scale: { repeat: Infinity, duration: 0.5 },
                  opacity: { duration: 0.5 },
                }}
                className={cn(
                  "text-3xl sm:text-4xl md:text-5xl font-bold font-inter inline-block whitespace-nowrap transition-colors duration-300",
                  (i === 0 || i === 1) ? (isMaxWobble ? "text-accent" : "text-primary font-mono opacity-80") : "text-slate-100"
                )}
              >
                {word}
              </motion.span>
            </div>
          ))}
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: isMaxWobble ? 0.2 : 0.5, ease: "linear", repeatType: "mirror" }}
            className={cn(
              "w-3 h-8 sm:w-4 sm:h-10 md:w-5 md:h-12 ml-1 rounded-sm transition-colors duration-300",
              isMaxWobble ? "bg-accent shadow-[0_0_15px_rgba(251,146,60,0.5)]" : "bg-primary/60"
            )}
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-2 text-slate-400 font-medium font-inter text-sm lg:text-base"
        >
          <MapPin size={18} />
          <span>USA</span>
        </motion.div>
      </section>

      <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-5 lg:gap-12 lg:items-start">
        <section className="lg:col-span-2">
          <div className="flex flex-col gap-3 lg:gap-4">
            {socials.map((social, i) => (
              <div
                key={i}
                className="animate-float"
                style={{ animationDelay: `${i * 0.7}s`, animationDuration: `${5.5 + i * 0.8}s` }}
              >
                <SocialLink {...social} />
              </div>
            ))}
          </div>
        </section>

        <section className="w-full lg:col-span-3">
          <div
            className="animate-float rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-xl shadow-2xl"
            style={{ animationDelay: '1.2s', animationDuration: '7s' }}
          >
            <img
              src="https://lanyard.cnrad.dev/api/752899252866515025?showDisplayName=true&bg=0F172A"
              className="w-full h-auto opacity-90"
              alt="Discord Status"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeTab;
