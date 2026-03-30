'use client';

import { useEffect, useRef } from 'react';
import { Laptop, Tv, Printer, Cpu, ArrowRight, Triangle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    id: '01',
    title: 'Notebooks',
    desc: 'Conserto de tela, dobradiças, teclado e reparos em placa-mãe de todas as marcas.',
    icon: Laptop,
    link: '#detail-notebooks',
  },
  {
    id: '02',
    title: 'Televisores',
    desc: 'Manutenção de TVs LED, LCD e Smart TV com garantia e peças originais.',
    icon: Tv,
    link: '#detail-tvs',
  },
  {
    id: '03',
    title: 'Impressoras',
    desc: 'Manutenção preventiva e corretiva em impressoras laser e multifuncionais.',
    icon: Printer,
    link: '#detail-impressoras',
  },
  {
    id: '04',
    title: 'Upgrade de PC',
    desc: 'Instalação de SSD, memória RAM e otimização para deixar seu PC mais rápido.',
    icon: Cpu,
    link: '#detail-pecas',
  },
];

export default function Services() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.service-card') as HTMLElement[];
      
      gsap.to(items, {
        xPercent: -100 * (items.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (items.length - 1),
          start: 'top 80px',
          end: () => `+=${scrollRef.current?.offsetWidth}`,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="servicos" className="min-h-screen bg-white overflow-hidden py-24 md:py-0 flex flex-col justify-center">
      <div className="container mb-12 md:mb-20">
        <p className="text-[10px] font-bold tracking-[4px] uppercase text-navy/30 mb-6 flex items-center gap-3">
          <Triangle className="w-2 h-2 fill-navy text-navy" />
          Serviços Especializados
        </p>
        <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-[-3px] text-navy uppercase">
          O que<br />Fazemos.
        </h2>
      </div>

      <div className="relative">
        <div ref={scrollRef} className="flex gap-8 px-8 md:px-16 w-fit">
          {services.map((service) => (
            <div
              key={service.id}
              className="service-card w-[85vw] md:w-[450px] shrink-0 bg-white border border-navy/5 rounded-[40px] p-12 md:p-16 hover:bg-navy transition-all duration-700 group cursor-pointer shadow-2xl shadow-navy/5"
            >
              <div className="text-[11px] font-black text-navy/10 mb-10 tracking-[2px] group-hover:text-white/10 transition-colors">
                {service.id}
              </div>
              <div className="text-navy mb-10 group-hover:text-white transition-colors">
                <service.icon className="w-16 h-16 stroke-[1]" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-navy mb-6 tracking-[-1.5px] uppercase group-hover:text-white transition-colors">
                {service.title}
              </h3>
              <p className="text-base font-light leading-relaxed text-navy/50 mb-12 group-hover:text-white/50 transition-colors">
                {service.desc}
              </p>
              <a href={service.link} className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-navy group-hover:text-white border-b border-navy/10 group-hover:border-white/20 pb-1">
                Ver detalhes
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
