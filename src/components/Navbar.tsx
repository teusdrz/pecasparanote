'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Power } from 'lucide-react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin);
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    gsap.to(window, {
      scrollTo: { y: id, offsetY: 72 },
      duration: 1,
      ease: 'power3.inOut',
    });
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] h-[72px] md:h-[80px] flex items-center justify-between px-5 md:px-16 transition-all duration-400 ease-in-out bg-transparent",
        isScrolled && "bg-navy/85 backdrop-blur-2xl border-b border-white/5 h-[64px] md:h-[72px]"
      )}
    >
      <a href="#" className="flex items-center gap-3 md:gap-4 group shrink-0" onClick={(e) => scrollToSection(e, 'body')}>
        <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
          <Power className="w-5 h-5 md:w-7 md:h-7 text-white transition-all duration-500 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        </div>
        <span className="text-[15px] md:text-[18px] font-black text-white tracking-[2px] md:tracking-[3px] uppercase transition-all duration-500 group-hover:tracking-[4px] md:group-hover:tracking-[5px] group-hover:opacity-90">
          Pecasparanote
        </span>
      </a>

      <ul className="hidden md:flex gap-12">
        {['servicos', 'sobre', 'depoimentos', 'contato'].map((item) => (
          <li key={item}>
            <a
              href={`#${item}`}
              onClick={(e) => scrollToSection(e, `#${item}`)}
              className="text-[11px] font-bold text-white hover:text-white/70 transition-all tracking-[2px] uppercase"
            >
              {item === 'servicos' ? 'Serviços' : item}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="https://wa.me/5511997246578"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[10px] md:text-[11px] font-bold text-navy bg-white px-5 md:px-8 py-2.5 md:py-3.5 rounded-full hover:bg-white/90 hover:-translate-y-0.5 transition-all duration-500 tracking-[1px] uppercase shadow-xl shrink-0"
      >
        Fale conosco
      </a>
    </nav>
  );
}
