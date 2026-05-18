import { motion } from 'framer-motion';

const AboutTab = () => {
  return (
    <div className="space-y-8 animate-wobble">
      <section className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 font-inter">About Me</h3>
        <div className="space-y-6 text-slate-300 leading-relaxed font-medium">
          <p className="text-lg sm:text-xl text-slate-100">
            Hi, I'm sudoloser. A young developer trying to make the most of my time.
          </p>
          
          <p>
            It's true, I vibe-code. But before you judge me for that, I thoroughly test all my code and I do NOT vibe-code anything that requires root access. 
            (An exception is the <a href="https://github.com/sudoloser/axe" target="_blank" rel="noreferrer" className="text-primary hover:underline decoration-primary/30 underline-offset-4 transition-all">shizuku app detection in Axe</a>, but that doesn't use root). 
            I vibe-code things to make my life easier or to personalize apps to my liking. This means you don't have to use any of my projects, as I build them with myself in mind!
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutTab;
