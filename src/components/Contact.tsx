'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Clock, Triangle } from 'lucide-react';
import gsap from 'gsap';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    servico: '',
    mensagem: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // WhatsApp logic
    const phone = '5511997246578';
    const text = `*Nova Solicitação de Orçamento - Pecasparanote*%0A%0A` +
                 `*Nome:* ${formData.nome}%0A` +
                 `*Telefone:* ${formData.telefone}%0A` +
                 `*E-mail:* ${formData.email}%0A` +
                 `*Serviço:* ${formData.servico}%0A` +
                 `*Mensagem:* ${formData.mensagem}`;
    
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-reveal', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power2.out',
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
    <section ref={sectionRef} id="contato" className="py-40 bg-navy selection-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="contact-info">
            <p className="text-[10px] font-bold tracking-[4px] uppercase text-white/30 mb-6 flex items-center gap-3">
              <Triangle className="w-2 h-2 fill-white text-white" />
              Localização & Contato
            </p>
            <h2 className="contact-reveal text-5xl md:text-7xl font-black text-white tracking-[-3px] mb-8 uppercase leading-[0.9]">
              Visite<br />nossa loja.
            </h2>
            <p className="contact-reveal text-lg font-light text-white/40 leading-relaxed mb-12 max-w-md">
              Estamos na Vila Nhocuné, zona leste de São Paulo. Atendimento rápido e transparente.
            </p>
            
            <div className="flex flex-col gap-8">
              {[
                { icon: MapPin, label: 'Endereço', value: 'R. São Vitório, 229\nVila Nhocune — SP, 03561-000' },
                { icon: Phone, label: 'WhatsApp', value: '(11) 99724-6578' },
                { icon: Clock, label: 'Horário', value: 'Seg a Sex — 09:00 às 18:00' },
              ].map((item, i) => (
                <div key={i} className="contact-reveal flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center shrink-0 group-hover:border-white/30 transition-colors">
                    <item.icon className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-white/20 tracking-[2px] uppercase mb-1">
                      {item.label}
                    </div>
                    <div className="text-[16px] font-medium text-white leading-relaxed whitespace-pre-line group-hover:text-white/80 transition-colors">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-reveal bg-white/[0.02] border border-white/[0.06] rounded-[40px] p-8 md:p-14 relative overflow-hidden">
            {/* Decorative background triangle */}
            <Triangle className="absolute -bottom-10 -right-10 w-40 h-40 text-white/[0.02] rotate-12" />
            
            <h3 className="text-3xl font-black text-white mb-2 tracking-[-1px] uppercase">
              Orçamento Rápido
            </h3>
            <p className="text-sm text-white/30 mb-10 font-light">
              Preencha os dados abaixo e fale direto no WhatsApp.
            </p>
            
            <form className="space-y-4 relative z-10" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-[2px] ml-1">Nome</label>
                  <input
                    required
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Seu nome"
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4 text-sm text-white outline-none focus:border-white/20 transition-all placeholder:text-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-[2px] ml-1">WhatsApp</label>
                  <input
                    required
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    type="tel"
                    placeholder="(00) 00000-0000"
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4 text-sm text-white outline-none focus:border-white/20 transition-all placeholder:text-white/10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-[2px] ml-1">E-mail</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4 text-sm text-white outline-none focus:border-white/20 transition-all placeholder:text-white/10"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-[2px] ml-1">Serviço</label>
                <div className="relative">
                  <select
                    required
                    name="servico"
                    value={formData.servico}
                    onChange={handleInputChange}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4 text-sm text-white outline-none focus:border-white/20 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-navy">Selecione o serviço</option>
                    <option value="Notebook / PC" className="bg-navy">Notebook / PC</option>
                    <option value="Televisor" className="bg-navy">Televisor</option>
                    <option value="Impressora" className="bg-navy">Impressora</option>
                    <option value="Outros" className="bg-navy">Outros</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-20">
                    <Triangle className="w-2 h-2 fill-white rotate-180" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-[2px] ml-1">Mensagem</label>
                <textarea
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleInputChange}
                  placeholder="Descreva o problema brevemente..."
                  rows={3}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4 text-sm text-white outline-none focus:border-white/20 transition-all placeholder:text-white/10 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white text-navy font-bold text-xs uppercase tracking-[2px] py-5 rounded-xl hover:bg-white/90 hover:scale-[1.02] transition-all mt-4 shadow-2xl shadow-black/40"
              >
                Enviar solicitação via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
