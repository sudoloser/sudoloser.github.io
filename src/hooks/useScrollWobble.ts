import { useEffect, useState } from 'react';
import { useScroll, useSpring, useTransform } from 'framer-motion';

export const useScrollWobble = () => {
  const { scrollYProgress } = useScroll();
  const [velocity, setVelocity] = useState(0);

  // Track scroll velocity for physics-based wobble
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = Date.now();

    const updateVelocity = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const dt = currentTime - lastTime;
      const dy = currentScrollY - lastScrollY;
      
      if (dt > 0) {
        // Smooth out the velocity and clamp it
        const rawV = (dy / dt) * 5; // Reduced multiplier
        const clampedV = Math.max(Math.min(rawV, 20), -20); // Clamp to prevent glitching
        setVelocity(prev => prev * 0.8 + clampedV * 0.2);
      }

      lastScrollY = currentScrollY;
      lastTime = currentTime;
      requestAnimationFrame(updateVelocity);
    };

    const animId = requestAnimationFrame(updateVelocity);
    return () => cancelAnimationFrame(animId);
  }, []);

  const springConfig = { damping: 15, stiffness: 100 };
  const rotateX = useSpring(useTransform(() => velocity * 0.5), springConfig);
  const rotateY = useSpring(useTransform(() => velocity * 0.2), springConfig);
  const scale = useSpring(useTransform(() => 1 - Math.abs(velocity) * 0.005), springConfig);

  return { rotateX, rotateY, scale };
};
