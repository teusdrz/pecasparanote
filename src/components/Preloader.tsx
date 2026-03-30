'use strict';
'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

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
      className="fixed inset-0 z-[9999] bg-navy flex flex-col items-center justify-center gap-8"
    >
      <div
        ref={logoRef}
        className="text-2xl font-bold text-white tracking-tight opacity-0"
      >
        Pecasparanote
      </div>
      <div className="w-[200px] h-0.5 bg-white/10 rounded-full overflow-hidden relative">
        <div
          ref={fillRef}
          className="absolute top-0 left-0 h-full w-0 bg-white rounded-full"
        />
      </div>
      <div className="text-[13px] font-normal text-white/30 tabular-nums">
        {progress}%
      </div>
    </div>
  );
}
