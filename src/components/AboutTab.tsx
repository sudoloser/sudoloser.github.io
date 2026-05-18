import { useState, useRef, useEffect, useMemo } from 'react';

interface Subtitle {
  start: number;
  end: number;
  text: string;
}

interface AboutTabProps {
  onVoiceToggle?: (isPlaying: boolean) => void;
}

const AboutTab = ({ onVoiceToggle }: AboutTabProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const requestRef = useRef<number>();

  useEffect(() => {
    onVoiceToggle?.(isPlaying);
  }, [isPlaying, onVoiceToggle]);

  const subtitles: Subtitle[] = useMemo(() => [
    { start: 0.08, end: 5.08, text: "Hi, I'm sudoloser, a young developer trying to make the most of my time." },
    { start: 5.08, end: 7.08, text: "It's true, I vibe code." },
    { start: 7.08, end: 14.08, text: "But before you judge me for that, I thoroughly test all my code and I do not vibe code anything that requires root access." },
    { start: 14.08, end: 21.079, text: "An exception, is shizuku app detection in axe, but that doesn't necessarily use root access." },
    { start: 21.079, end: 24.75, text: "You know, it uses ADB." },
    { start: 24.75, end: 29.75, text: "I vibe code things to make my life easier or to personalize apps to my liking." },
    { start: 29.75, end: 34.75, text: "This means you don't have to use any of my projects as I build them with myself in mind." }
  ], []);

  const updateTime = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      requestRef.current = requestAnimationFrame(updateTime);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/about.mp3');
      audioRef.current.onended = () => {
        setIsPlaying(false);
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
      };
    }

    if (isPlaying) {
      audioRef.current.pause();
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    } else {
      audioRef.current.play();
      requestRef.current = requestAnimationFrame(updateTime);
    }
    setIsPlaying(!isPlaying);
  };

  const renderText = () => {
    return subtitles.map((sub, subIdx) => {
      const isSubActive = currentTime >= sub.start && currentTime <= sub.end;
      
      return (
        <span 
          key={subIdx} 
          className={`block mb-4 transition-all duration-500 ${
            isSubActive 
              ? 'text-primary drop-shadow-[0_0_12px_rgba(56,189,248,0.8)] scale-[1.01] font-bold origin-left' 
              : 'text-slate-400 opacity-60'
          }`}
        >
          {sub.text}
        </span>
      );
    });
  };

  return (
    <div className="space-y-8 animate-wobble">
      <section className="space-y-4">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 font-inter">About Me</h3>
          
          <button
            onClick={togglePlay}
            className={`btn-flip ${isPlaying ? 'flipped' : ''}`}
            data-front="Listen"
            data-back="Pause"
          />
        </div>

        <div className="space-y-2 text-lg sm:text-xl leading-relaxed font-medium font-inter">
          {renderText()}
        </div>
      </section>
    </div>
  );
};

export default AboutTab;
