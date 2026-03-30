'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Triangle } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    num: '01',
    title: 'Avaliação Inicial',
    desc: 'Traga seu equipamento para uma análise técnica detalhada por nossos especialistas.',
  },
  {
    num: '02',
    title: 'Orçamento Transparente',
    desc: 'Enviamos o diagnóstico e o valor exato para o reparo em até 1 hora.',
  },
  {
    num: '03',
    title: 'Execução e Testes',
    desc: 'Realizamos o conserto com peças de qualidade e testamos tudo rigorosamente.',
  },
  {
    num: '04',
    title: 'Entrega com Garantia',
    desc: 'Você retira seu equipamento funcionando perfeitamente e com garantia total.',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.process-card', {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="sobre" className="py-40 bg-white border-t border-navy/5">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
          <div>
            <p className="text-[10px] font-bold tracking-[4px] uppercase text-navy/30 mb-6 flex items-center gap-3">
              <Triangle className="w-2 h-2 fill-navy text-navy rotate-90" />
              Nossa Metodologia
            </p>
            <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-[-3px] text-navy uppercase">
              Como<br />Atuamos.
            </h2>
          </div>
          <p className="text-lg font-light text-navy/40 max-w-[400px] leading-relaxed italic">
            "Transparência e agilidade são os pilares que sustentam nossos 16 anos de história."
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="process-card group">
              <div className="text-7xl font-black text-navy/[0.05] leading-none mb-8 tracking-[-4px] group-hover:text-navy/10 transition-colors">
                {step.num}
              </div>
              <h3 className="text-xl font-bold text-navy mb-4 uppercase tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-navy/50">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
