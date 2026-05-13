'use client';

import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import ServiceDetail from '@/components/ServiceDetail';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [loading]);

  return (
    <main className="relative selection-white bg-navy">
      <Preloader onComplete={() => setLoading(false)} />

      {!loading && (
        <>
          <Navbar />
          <Hero />
          <Stats />
          <Services />

          <ServiceDetail
            id="detail-notebooks"
            tag="Unidade 01 — Restauração"
            title="Engenharia de Hardware"
            desc="Especialistas em microeletrônica. Restauramos a performance original de notebooks Dell, Apple, Lenovo e HP através de intervenções precisas em placa-mãe e CPU."
            items={[
              'Reparo avançado em trilhas e micro-componentes',
              'Upgrade estratégico de taxa de transferência NVMe',
              'Substituição de displays de alta fidelidade',
              'Calibração de sistemas de refrigeração',
            ]}
            image="/image-hadware/image.png"
          />

          <ServiceDetail
            id="detail-tvs"
            tag="Unidade 02 — Display"
            title="Restauração Visual Smart"
            desc="Sua experiência visual restaurada ao padrão de fábrica. Diagnóstico técnico de painéis LED e Smart TVs de última geração com peças certificadas."
            items={[
              'Restauração técnica de Backlight',
              'Calibração de cores e brilho original',
              'Substituição de placas lógicas centrais',
              'Garantia técnica estendida em reparos',
            ]}
            image="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80"
            reverse
            altBg
          />

          <ServiceDetail
            id="detail-impressoras"
            tag="Unidade 03 — Sistemas de Saída"
            title="Engenharia de Impressão"
            desc="Manutenção focada em continuidade operacional. Soluções definitivas para sistemas de impressão laser e multifuncionais de alto desempenho."
            items={[
              'Manutenção preventiva em unidades fusoras',
              'Calibração de precisão em scanners e sensores',
              'Substituição de kits de tração de papel',
              'Otimização de firmware e rede',
            ]}
            image="https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&q=80"
          />

          <ServiceDetail
            id="detail-pecas"
            tag="Unidade 04 — Componentes"
            title="Suprimentos High-End"
            desc="Acesso imediato aos melhores componentes globais. Fornecemos apenas hardware de performance superior para substituições imediatas."
            items={[
              'Displays IPS e OLED de alta definição',
              'Teclados retroiluminados e touchpads',
              'Módulos de memória de baixa latência',
              'Baterias de alta densidade energética',
            ]}
            image="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80"
            reverse
            altBg
          />

          <Process />
          <Testimonials />
          <CTA />
          <Contact />
          <Footer />
        </>
      )}
    </main>
  );
}
