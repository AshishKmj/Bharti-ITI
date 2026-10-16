import { useState, useEffect, useRef } from 'react';
import { GraduationCap, Wrench, Award, TrendingUp } from 'lucide-react';

const iconMap = {
  GraduationCap: GraduationCap,
  Wrench: Wrench,
  Award: Award,
  TrendingUp: TrendingUp,
};

export default function StatCounter({ value, suffix = "", label, iconName }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Check if reduced motion is requested
          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (prefersReducedMotion) {
            setCount(value);
            return;
          }

          const duration = 1800; // ms
          const startTime = performance.now();

          const updateCount = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            // Ease-out expo function
            const easeOut = 1 - Math.pow(2, -10 * progress);
            const currentCount = Math.floor(easeOut * value);

            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              setCount(value);
            }
          };

          requestAnimationFrame(updateCount);
        }
      },
      { threshold: 0.25 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  const IconComponent = iconMap[iconName] || Award;

  return (
    <div
      ref={elementRef}
      className="bg-white rounded-xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center group relative overflow-hidden"
    >
      <div className="w-14 h-14 rounded-2xl bg-[#FFF4E8] text-[#F28C28] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#F28C28] group-hover:text-white transition-all duration-300 shadow-xs">
        <IconComponent className="w-7 h-7" />
      </div>

      <div className="text-3xl sm:text-4xl font-black text-[#1B2A5C] tracking-tight">
        <span>{count.toLocaleString('en-IN')}</span>
        <span className="text-[#F28C28]">{suffix}</span>
      </div>

      <p className="mt-2 text-xs sm:text-sm font-semibold text-[#5C677D] uppercase tracking-wider">
        {label}
      </p>

      {/* Subtle bottom orange accent strip */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F28C28]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
