'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { value: 954, label: 'Avaliações Google', suffix: '' },
  { value: 5.0, label: 'Nota Máxima', suffix: '', isFloat: true },
  { value: 16, label: 'Anos de Experiência', suffix: '' },
  { value: 5000, label: 'Equipamentos Atendidos', suffix: '+' },
];

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      stats.forEach((stat, i) => {
        const el = numberRefs.current[i];
        if (!el) return;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 3,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            once: true,
          },
          onUpdate: () => {
            if (stat.isFloat) {
              el.textContent = obj.val.toFixed(1) + stat.suffix;
            } else {
              el.textContent = Math.round(obj.val).toLocaleString('pt-BR') + stat.suffix;
            }
          },
        });
      });

      // Subtle parallax for the bg text
      gsap.to('.stats-bg-text', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-40 bg-[#070e1a] overflow-hidden border-b border-white/5">
      {/* Background Large Text for "Senior" feel */}
      <div className="stats-bg-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.03] uppercase pointer-events-none whitespace-nowrap select-none">
        Confiança
      </div>

      <div className="container relative z-10 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="text-center group">
            <div
              ref={(el) => { numberRefs.current[i] = el; }}
              className="text-6xl md:text-8xl font-black text-white tracking-[-4px] mb-4 transition-transform duration-700 group-hover:scale-110"
            >
              0
            </div>
            <div className="text-[10px] font-bold text-white uppercase tracking-[3px]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
