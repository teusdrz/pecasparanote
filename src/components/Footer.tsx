'use client';

import { Power } from 'lucide-react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin);
}

export default function Footer() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    gsap.to(window, {
      scrollTo: { y: id, offsetY: 72 },
      duration: 1,
      ease: 'power3.inOut',
    });
  };

  return (
    <footer className="bg-[#070e1a] py-24 border-t border-white/[0.04] selection-white">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 pb-20 border-b border-white/[0.04]">
          <div className="footer-brand">
            <a href="#" onClick={(e) => scrollToSection(e, 'body')} className="flex items-center gap-3 group">
              <Power className="w-6 h-6 text-white transition-transform group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
              <span className="text-[14px] font-black text-white tracking-[2px] uppercase">
                Pecasparanote
              </span>
            </a>
            <p className="text-sm font-light text-white/20 leading-relaxed max-w-[280px] mt-8 italic">
              "Performance restored through precision engineering."
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-[3px] mb-8">Units</h4>
            <ul className="space-y-4">
              {['Notebooks', 'Televisores', 'Impressoras', 'Hardware'].map((item) => (
                <li key={item}>
                  <a
                    href={`#detail-${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                    onClick={(e) => scrollToSection(e, `#detail-${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`)}
                    className="text-[11px] uppercase tracking-widest text-white/35 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-[3px] mb-8">Company</h4>
            <ul className="space-y-4">
              {['Serviços', 'Avaliações', 'Contato'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => scrollToSection(e, `#${item.toLowerCase()}`)}
                    className="text-[11px] uppercase tracking-widest text-white/35 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-[3px] mb-8">Direct</h4>
            <ul className="space-y-4">
              <li><a href="tel:+5511997246578" className="text-[11px] uppercase tracking-widest text-white/35 hover:text-white transition-colors font-bold">(11) 99724-6578</a></li>
              <li><a href="https://wa.me/5511997246578" className="text-[11px] uppercase tracking-widest text-white/35 hover:text-white transition-colors font-bold">WhatsApp</a></li>
              <li><span className="text-[11px] uppercase tracking-widest text-white/20">Vila Nhocune, SP</span></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 gap-6">
          <p className="text-[9px] font-bold tracking-[2px] uppercase text-white/10">
            &copy; 2026 Pecasparanote Lab. Restoration Excellence.
          </p>
          <div className="flex gap-8">
            <span className="text-[9px] font-bold tracking-[2px] uppercase text-white/5">5.0 Google Rating</span>
            <span className="text-[9px] font-bold tracking-[2px] uppercase text-white/5">949 Reviews</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
