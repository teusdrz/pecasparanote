'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight, Triangle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-reveal', {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-40 bg-white text-center selection-white border-t border-navy/5">
      <div className="container">
        <div className="flex justify-center mb-10">
          <Triangle className="w-10 h-10 fill-navy text-navy" />
        </div>
        <h2 className="cta-reveal text-5xl md:text-8xl font-black text-navy tracking-[-4px] leading-[0.9] mb-12 uppercase">
          Sua máquina,<br />nova de novo.
        </h2>
        <p className="cta-reveal text-xl font-light text-navy/40 mb-16 max-w-[600px] mx-auto leading-relaxed">
          Nossa equipe técnica está pronta para restaurar a performance do seu equipamento hoje mesmo.
        </p>
        
        <div className="cta-reveal flex flex-col sm:flex-row gap-6 justify-center">
          <a
            href="https://wa.me/5511997246578"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white bg-navy px-12 py-6 rounded-full transition-all duration-500 hover:scale-105 group shadow-2xl shadow-navy/20"
          >
            Iniciar Orçamento
            <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
          </a>
        </div>
      </div>
    </section>
  );
}
