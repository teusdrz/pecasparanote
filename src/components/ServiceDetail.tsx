'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Check, ArrowRight, Power } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceDetailProps {
  id: string;
  tag: string;
  title: string;
  desc: string;
  items: string[];
  image: string;
  reverse?: boolean;
  altBg?: boolean;
}

export default function ServiceDetail({
  id,
  tag,
  title,
  desc,
  items,
  image,
  reverse = false,
  altBg = false,
}: ServiceDetailProps) {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal
      gsap.from(`.detail-reveal-${id}`, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      // Parallax
      gsap.fromTo(
        imageRef.current,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [id]);

  return (
    <section
      ref={containerRef}
      id={id}
      className={cn(
        "py-40 bg-navy relative overflow-hidden border-t border-white/5",
        altBg && "bg-[#0e1b32]"
      )}
    >
      <div className="container">
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-24 items-center",
            reverse && "lg:flex-row-reverse"
          )}
          style={{ direction: reverse ? 'rtl' : 'ltr' }}
        >
          <div className="detail-content" style={{ direction: 'ltr' }}>
            <p className={cn(`detail-reveal-${id}`, "text-[10px] font-bold tracking-[4px] uppercase text-white/20 mb-8 flex items-center gap-3")}>
              <Power strokeWidth={2.5} className="w-3 h-3 text-white/40" />
              {tag}
            </p>
            <h2 className={cn(`detail-reveal-${id}`, "text-4xl md:text-6xl font-black text-white tracking-[-2px] uppercase leading-[1] mb-10")}>
              {title}
            </h2>
            <p className={cn(`detail-reveal-${id}`, "text-lg font-light leading-relaxed text-white/40 mb-12 max-w-[480px]")}>
              {desc}
            </p>

            <div className="flex flex-col gap-5 mb-14">
              {items.map((item, i) => (
                <div key={i} className={cn(`detail-reveal-${id}`, "flex items-center gap-4 group")}>
                  <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white transition-colors duration-500">
                    <Check className="w-3 h-3 text-white group-hover:text-navy transition-colors duration-500" />
                  </div>
                  <span className="text-sm font-medium text-white/60 tracking-wide">{item}</span>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/5511997246578"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(`detail-reveal-${id}`, "inline-flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-navy bg-white px-10 py-5 rounded-full transition-all duration-500 hover:scale-105 group")}
            >
              Inquire Now
              <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
            </a>
          </div>

          <div
            className={cn(`detail-reveal-${id}`, "relative rounded-[40px] overflow-hidden aspect-[4/5] bg-mid group shadow-2xl")}
            style={{ direction: 'ltr' }}
          >
            <div className="absolute inset-0 bg-navy/20 z-10 group-hover:bg-transparent transition-colors duration-700" />
            <img
              ref={imageRef}
              src={image}
              alt={title}
              className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
