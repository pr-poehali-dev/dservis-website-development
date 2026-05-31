import Icon from '@/components/ui/icon';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const links = [
    { id: 'alarms', label: 'Сигнализации' },
    { id: 'tinting', label: 'Тонировка' },
    { id: 'armor', label: 'Бронирование' },
    { id: 'extras', label: 'Дооснащение' },
    { id: 'contacts', label: 'Контакты' },
  ];

  return (
    <footer className="relative border-t border-blue-500/10 bg-[rgba(5,10,20,0.8)]">
      <div className="section-divider w-full" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center">
                <Icon name="Car" size={18} className="text-white" />
              </div>
              <span className="text-lg font-black tracking-widest text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                DSSERVIS
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Профессиональный автосервис во Владимире. Сигнализации, тонировка, бронирование и дооснащение.
            </p>
          </div>

          {/* Nav */}
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Услуги</div>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => onNavigate(l.id)}
                    className="text-gray-400 text-sm hover:text-blue-400 transition-colors flex items-center gap-2"
                  >
                    <Icon name="ChevronRight" size={12} className="text-blue-500/50" />
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Контакты</div>
            <div className="space-y-3">
              <a
                href="tel:+79190072169"
                className="flex items-center gap-2 text-gray-400 text-sm hover:text-blue-400 transition-colors"
              >
                <Icon name="Phone" size={14} className="text-blue-400/60" />
                +7 919 007-21-69
              </a>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Icon name="MapPin" size={14} className="text-blue-400/60" />
                г. Владимир
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Icon name="Clock" size={14} className="text-blue-400/60" />
                Пн–Сб: 9:00 – 20:00
              </div>
              <a
                href="https://wa.me/79190072169"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-green-400/80 text-sm hover:text-green-400 transition-colors"
              >
                <Icon name="MessageCircle" size={14} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-blue-500/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">© 2024 DSSERVIS. Все права защищены.</p>
          <p className="text-gray-700 text-xs">г. Владимир — профессиональный автосервис</p>
        </div>
      </div>
    </footer>
  );
}
