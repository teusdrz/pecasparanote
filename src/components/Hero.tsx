'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Triangle } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(
        [titleLine1Ref.current, titleLine2Ref.current],
        {
          y: 0,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.1,
        }
      )
        .from(
          descRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.6'
        )
        .from(
          ctaRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .from(
          scrollRef.current,
          {
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
          },
          '-=0.2'
        );

      gsap.to('.hero-bg-img', {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-navy selection-white">
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-image/image.png"
          alt="Bancada de assistência técnica"
          className="hero-bg-img w-full h-full object-cover opacity-40 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-transparent to-navy" />
      </div>

      <div className="relative z-10 w-full px-8 md:px-16">
        <div className="max-w-[850px]">
          <h1 className="text-5xl md:text-7xl lg:text-[90px] font-black leading-[0.9] tracking-[-4px] text-white mb-10 uppercase">
            <span className="block overflow-hidden pb-2">
              <span ref={titleLine1Ref} className="inline-block translate-y-full">Seu equipamento</span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span ref={titleLine2Ref} className="inline-block translate-y-full text-white/30">em boas mãos.</span>
            </span>
          </h1>

          <p
            ref={descRef}
            className="text-lg md:text-xl font-light leading-relaxed text-white/60 mb-12 max-w-[580px]"
          >
            Assistência técnica especializada. Conserto de computadores, impressoras, notebooks e TVs. Também temos peças para reposição, consulte a disponibilidade.
          </p>

          <div className="flex flex-wrap gap-6">
            <a
              ref={ctaRef}
              href="https://wa.me/5511997246578"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-navy bg-white px-10 py-5 rounded-full transition-all duration-500 hover:scale-105 group"
            >
              Solicitar Orçamento
              <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
            </a>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-12 left-8 md:left-16 z-10 flex items-center gap-4 text-[9px] font-bold tracking-[3px] uppercase text-white/20"
      >
        <div className="w-16 h-[1px] bg-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/40 animate-scrollLine -left-full" />
        </div>
        Role para explorar
      </div>
    </section>
  );
}
