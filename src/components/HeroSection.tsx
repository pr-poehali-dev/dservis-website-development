import { useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!particlesRef.current) return;
    const container = particlesRef.current;
    for (let i = 0; i < 12; i++) {
      const p = document.createElement('div');
      const size = Math.random() * 80 + 20;
      p.className = 'particle';
      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 4}s;
        animation-duration: ${6 + Math.random() * 6}s;
      `;
      container.appendChild(p);
    }
    return () => { container.innerHTML = ''; };
  }, []);

  const stats = [
    { value: '500+', label: 'Выполненных работ' },
    { value: '5 лет', label: 'На рынке' },
    { value: '100%', label: 'Гарантия качества' },
    { value: '24/7', label: 'Поддержка' },
  ];

  return (
    <section id="hero" className="relative min-h-screen hero-bg flex items-center overflow-hidden pt-20">
      {/* Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,102,255,1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,102,255,1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Blue glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-600/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-500/8 blur-2xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium mb-6 animate-slide-left">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Профессиональный автосервис во Владимире
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 animate-slide-left"
              style={{ fontFamily: 'Orbitron, sans-serif', animationDelay: '0.1s' }}
            >
              <span className="gradient-text">DSSERVIS</span>
              <br />
              <span className="text-white text-3xl sm:text-4xl lg:text-5xl leading-tight">
                Оснащение и защита
                <br />
                вашего автомобиля
              </span>
            </h1>

            <p className="text-gray-400 text-lg mb-8 leading-relaxed animate-slide-left" style={{ animationDelay: '0.2s' }}>
              Сигнализации, тонировка, бронирование и дооснащение —
              всё для вашего авто в одном месте. Опыт, качество, гарантия.
            </p>

            <div className="flex flex-wrap gap-4 animate-slide-left" style={{ animationDelay: '0.3s' }}>
              <button
                onClick={() => onNavigate('alarms')}
                className="btn-primary px-6 py-3 rounded-xl font-semibold text-white flex items-center gap-2"
              >
                <Icon name="Wrench" size={18} />
                Наши услуги
              </button>
              <a
                href="tel:+79190072169"
                className="px-6 py-3 rounded-xl font-semibold text-blue-400 border border-blue-500/40 hover:border-blue-400 hover:bg-blue-500/10 transition-all duration-300 flex items-center gap-2"
              >
                <Icon name="Phone" size={18} />
                Позвонить
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 animate-slide-up" style={{ animationDelay: '0.5s' }}>
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-black text-blue-400 glow-text" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    {s.value}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual */}
          <div className="hidden lg:flex justify-center animate-slide-right">
            <div className="relative">
              {/* Big circle */}
              <div className="w-80 h-80 rounded-full border border-blue-500/20 flex items-center justify-center animate-border-glow">
                <div className="w-60 h-60 rounded-full border border-blue-500/30 flex items-center justify-center">
                  <div className="w-44 h-44 rounded-full bg-gradient-to-br from-blue-600/20 to-blue-900/30 flex items-center justify-center glow-blue">
                    <Icon name="Car" size={72} className="text-blue-400" />
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              {[
                { icon: 'Shield', label: 'Сигнализации', top: '5%', left: '-10%', delay: '0.2s' },
                { icon: 'Sun', label: 'Тонировка', top: '5%', right: '-10%', delay: '0.4s' },
                { icon: 'ShieldCheck', label: 'Бронирование', bottom: '5%', left: '-10%', delay: '0.6s' },
                { icon: 'Settings', label: 'Дооснащение', bottom: '5%', right: '-10%', delay: '0.8s' },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="absolute flex items-center gap-2 bg-[rgba(10,20,40,0.9)] border border-blue-500/30 rounded-xl px-3 py-2 animate-fade-in"
                  style={{
                    top: badge.top,
                    bottom: badge.bottom,
                    left: badge.left,
                    right: badge.right,
                    animationDelay: badge.delay,
                  }}
                >
                  <Icon name={badge.icon} size={16} className="text-blue-400" />
                  <span className="text-xs text-white font-medium whitespace-nowrap">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-gray-600 tracking-widest uppercase">Прокрутите вниз</span>
          <Icon name="ChevronDown" size={20} className="text-blue-500/60" />
        </div>
      </div>
    </section>
  );
}
