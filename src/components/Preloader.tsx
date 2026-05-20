'use strict';
'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Power } from 'lucide-react';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const nameEl = logoRef.current?.querySelector('.preloader-name') as HTMLElement | null;
    const infoEl = logoRef.current?.querySelector('.preloader-info') as HTMLElement | null;
    const iconEl = logoRef.current?.querySelector('.preloader-icon') as HTMLElement | null;
    const noteIconEl = logoRef.current?.querySelector('.preloader-note-icon') as HTMLElement | null;

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    tl.fromTo(iconEl, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.9, ease: 'expo.out' })
      .to(iconEl, { color: '#ef4444', filter: 'drop-shadow(0 0 6px rgba(239,68,68,0.5))', duration: 0.6, ease: 'power1.inOut' })
      .fromTo(nameEl, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.9, ease: 'expo.out' }, '-=0.4')
      .to(noteIconEl, { color: '#ef4444', filter: 'drop-shadow(0 0 6px rgba(239,68,68,0.5))', duration: 0.45, ease: 'power1.inOut' })
      .fromTo(infoEl, { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.8, ease: 'expo.out' }, '-=0.5')
      .to(
        fillRef.current,
        {
          width: '100%',
          duration: 1.8,
          ease: 'power2.inOut',
          onUpdate: function () {
            const p = Math.round(this.progress() * 100);
            setProgress(p);
          },
        },
        0.3
      )
      .to(preloaderRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut',
        delay: 0.2,
      });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] bg-navy flex flex-col items-center justify-center gap-10"
    >
      <div
        ref={logoRef}
        className="flex flex-col items-center gap-2"
      >
        <div className="flex items-center gap-4 mb-1">
          <Power strokeWidth={2.5} className="preloader-icon w-8 h-8 text-white opacity-0" />
          <span className="preloader-name flex items-center text-[26px] md:text-[32px] font-black text-white tracking-[4px] uppercase opacity-0">
            Pecasparan<Power strokeWidth={2.5} className="preloader-note-icon w-[20px] h-[20px] md:w-[24px] md:h-[24px] text-white inline-block mx-[2px]" />te
          </span>
          <span className="preloader-info text-[26px] md:text-[32px] font-black text-white tracking-[4px] uppercase opacity-0">
            Informática
          </span>
        </div>
      </div>
      <div className="w-[220px] h-[1px] bg-white/10 rounded-full overflow-hidden relative">
        <div
          ref={fillRef}
          className="absolute top-0 left-0 h-full w-0 bg-white rounded-full"
        />
      </div>
      <div className="text-[11px] font-normal text-white/25 tabular-nums tracking-widest">
        {progress}%
      </div>
    </div>
  );
}
