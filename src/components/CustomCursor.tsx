'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth <= 1024) {
      return;
    }

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const onMouseEnter = () => setIsActive(true);
    const onMouseLeave = () => setIsActive(false);

    document.addEventListener('mousemove', onMouseMove);
    
    const interactiveElements = document.querySelectorAll('a, button, .service-card');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className={cn(
        "fixed w-4 h-4 border-[1.5px] border-white/50 rounded-full pointer-events-none z-[9998] transition-[width,height,border-color,transform] duration-300 -translate-x-1/2 -translate-y-1/2 mix-blend-difference",
        isActive && "w-12 h-12 border-white"
      )}
    />
  );
}
