import { useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';
import LeadForm from '@/components/LeadForm';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export default function ContactsSection() {
  const ref1 = useReveal();
  const ref2 = useReveal();

  return (
    <section id="contacts" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/8 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600/20 to-blue-900/30 border border-blue-500/30 mb-4 glow-blue">
            <Icon name="Phone" size={28} className="text-blue-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Контакты
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Свяжитесь с нами — ответим на любые вопросы и запишем на удобное время
          </p>
          <div className="section-divider w-40 mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Info */}
          <div ref={ref1} className="reveal-left space-y-5">
            {[
              {
                icon: 'Phone',
                title: 'Телефон',
                value: '+7 919 007-21-69',
                href: 'tel:+79190072169',
                sub: 'Звонки и WhatsApp',
              },
              {
                icon: 'MapPin',
                title: 'Адрес',
                value: 'г. Кольчугино, Советская 90',
                href: 'https://yandex.ru/maps/?text=Кольчугино+Советская+90',
                sub: 'Открыть на карте',
              },
              {
                icon: 'Clock',
                title: 'Режим работы',
                value: 'Пн–Сб: 10:00 – 18:00',
                href: null,
                sub: 'Воскресенье — по записи',
              },
            ].map((item) => (
              <div key={item.title} className="service-card rounded-2xl p-5 flex items-start gap-4">
                <div className="w-11 h-11 flex-shrink-0 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center">
                  <Icon name={item.icon} size={20} className="text-blue-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-0.5">{item.title}</div>
                  {item.href ? (
                    <a href={item.href} className="text-white font-bold text-lg hover:text-blue-400 transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-white font-bold text-lg">{item.value}</div>
                  )}
                  <div className="text-gray-500 text-sm">{item.sub}</div>
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="service-card rounded-2xl p-5">
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-3">Написать нам</div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://wa.me/79190072169"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-600/15 border border-green-600/25 text-green-400 hover:bg-green-600/25 transition-all text-sm font-medium"
                >
                  <Icon name="MessageCircle" size={16} />
                  WhatsApp
                </a>
                <a
                  href="https://vk.com/dsservis"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600/15 border border-blue-500/25 text-blue-400 hover:bg-blue-600/25 transition-all text-sm font-medium"
                >
                  <Icon name="Users" size={16} />
                  ВКонтакте
                </a>
                <a
                  href="https://max.ru/dsservis"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600/15 border border-purple-500/25 text-purple-400 hover:bg-purple-600/25 transition-all text-sm font-medium"
                >
                  <Icon name="Send" size={16} />
                  Макс
                </a>
                <a
                  href="tel:+79190072169"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600/15 border border-blue-500/25 text-blue-400 hover:bg-blue-600/25 transition-all text-sm font-medium"
                >
                  <Icon name="Phone" size={16} />
                  Позвонить
                </a>
              </div>
            </div>
          </div>

          {/* Form card */}
          <div ref={ref2} className="reveal-right">
            <div className="service-card rounded-2xl p-8 border-blue-500/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/20 to-blue-900/30 border border-blue-500/30 flex items-center justify-center glow-blue flex-shrink-0">
                  <Icon name="ClipboardList" size={22} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    Оставить заявку
                  </h3>
                  <p className="text-gray-500 text-xs">Перезвоним в течение 30 минут</p>
                </div>
              </div>
              <LeadForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}