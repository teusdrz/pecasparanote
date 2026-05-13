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
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    tl.to(logoRef.current, { opacity: 1, duration: 0.6, ease: 'power2.out' })
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
        className="flex flex-col items-center gap-2 opacity-0"
      >
        <div className="flex items-center gap-4 mb-1">
          <Power className="w-8 h-8 text-white opacity-90" />
          <span className="text-[26px] md:text-[32px] font-black text-white tracking-[4px] uppercase">
            Pecasparanote
          </span>
          <span className="text-[11px] font-medium text-white/40 tracking-[6px] uppercase self-end mb-1">
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
