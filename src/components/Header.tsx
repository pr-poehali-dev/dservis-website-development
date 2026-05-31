import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: 'alarms', label: 'Сигнализации', icon: 'Shield' },
  { id: 'tinting', label: 'Тонировка', icon: 'Sun' },
  { id: 'armor', label: 'Бронирование', icon: 'ShieldCheck' },
  { id: 'extras', label: 'Дооснащение', icon: 'Settings' },
];

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(5,10,20,0.95)] backdrop-blur-md border-b border-[rgba(0,102,255,0.2)] shadow-[0_4px_30px_rgba(0,102,255,0.15)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center animate-pulse-blue">
              <Icon name="Car" size={20} className="text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span
                className="text-xl font-black tracking-widest text-white group-hover:text-blue-400 transition-colors duration-300"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                DSSERVIS
              </span>
              <span className="text-[10px] text-blue-400 tracking-[0.25em] uppercase">
                Авто-сервис
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`nav-link flex items-center gap-2 text-sm font-medium transition-colors duration-300 pb-1 ${
                  activeSection === item.id
                    ? 'text-blue-400 active'
                    : 'text-gray-300 hover:text-blue-400'
                }`}
              >
                <Icon name={item.icon} size={15} />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Phone + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+79190072169"
              className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              <Icon name="Phone" size={16} />
              +7 919 007-21-69
            </a>
            <button
              onClick={() => onNavigate('contacts')}
              className="btn-primary px-4 py-2 rounded-lg text-sm font-semibold text-white"
            >
              Записаться
            </button>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Icon name={mobileOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-[rgba(0,102,255,0.2)] pt-4 animate-fade-in">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
                className={`flex items-center gap-3 w-full text-left px-3 py-3 rounded-lg mb-1 transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-[rgba(0,102,255,0.15)] text-blue-400'
                    : 'text-gray-300 hover:bg-[rgba(0,102,255,0.08)] hover:text-blue-400'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
            <a
              href="tel:+79190072169"
              className="flex items-center gap-3 px-3 py-3 text-blue-400 font-medium"
            >
              <Icon name="Phone" size={18} />
              +7 919 007-21-69
            </a>
          </div>
        )}
      </div>
    </header>
  );
}