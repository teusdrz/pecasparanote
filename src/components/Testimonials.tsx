'use client';

import { useEffect, useRef } from 'react';
import { Star, Triangle, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    name: 'Amauri Pedro',
    avatar: 'A',
    quote: 'Excelente atendimento, os técnicos são bem atenciosos e paciente com clientes que algumas vezes chegam e não tem muito conhecimento. Parabéns.',
    via: 'Google Local Guide',
    date: '4 meses atrás'
  },
  {
    name: 'Sarah Melissa',
    avatar: 'S',
    quote: 'Atendimento excelente e serviço de qualidade. Recomendo fortemente para quem precisa de manutenção especializada.',
    via: 'Google Review',
    date: '1 mês atrás'
  },
  {
    name: 'Roberto S.',
    avatar: 'R',
    quote: 'Consertaram meu equipamento que outros disseram não ter mais jeito. Transparência total e preço justo.',
    via: 'Google Review',
    date: '2 meses atrás'
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonial-reveal', {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="depoimentos" className="py-24 md:py-40 bg-navy selection-white border-t border-white/5 overflow-hidden">
      <div className="container relative">
        {/* Background Decorative Quote */}
        <Quote className="absolute -top-10 -right-10 w-32 h-32 md:w-64 md:h-64 text-white/[0.02] -rotate-12 pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-24 gap-8 md:gap-12 relative z-10">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold tracking-[4px] uppercase text-white/30 mb-4 md:mb-6 flex items-center gap-3">
              <Triangle className="w-2 h-2 fill-white text-white rotate-180" />
              Avaliações Verificadas
            </p>
            <h2 className="testimonial-reveal text-4xl md:text-8xl font-black text-white tracking-[-2px] md:tracking-[-3px] uppercase leading-[0.9]">
              949 Notas<br />Google. <span className="text-white/20">5.0</span>
            </h2>
          </div>
          
          <div className="flex flex-col items-start lg:items-end gap-4">
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-white text-white" />
              ))}
            </div>
            <a 
              href="https://www.google.com/search?q=pecasparanote+informatica" 
              target="_blank" 
              className="testimonial-reveal text-[10px] md:text-[11px] font-bold text-white/50 hover:text-white transition-colors tracking-[2px] uppercase border-b border-white/10 pb-2"
            >
              Ver todas no Google
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-reveal bg-white/[0.02] border border-white/5 rounded-2xl md:rounded-[32px] p-8 md:p-10 hover:bg-white/[0.04] transition-all duration-700 group flex flex-col justify-between min-h-[300px] md:min-h-[340px]"
            >
              <div>
                <div className="text-white/10 mb-6 group-hover:text-white/20 transition-colors">
                  <Quote className="w-6 h-6 md:w-8 md:h-8 fill-current" />
                </div>
                <p className="text-base md:text-lg font-light leading-relaxed text-white/70 mb-8 md:mb-10">
                  {t.quote}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-xs md:text-sm font-black border border-white/10">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-[12px] md:text-[13px] font-bold text-white tracking-wide uppercase">{t.name}</div>
                  <div className="text-[9px] md:text-[10px] text-white/30 uppercase tracking-widest mt-0.5">{t.via} • {t.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
