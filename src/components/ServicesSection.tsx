import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

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

function SectionHeader({ title, subtitle, icon }: { title: string; subtitle: string; icon: string }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal text-center mb-14">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600/20 to-blue-900/30 border border-blue-500/30 mb-4 glow-blue">
        <Icon name={icon} size={28} className="text-blue-400" />
      </div>
      <h2
        className="text-3xl sm:text-4xl font-black text-white mb-3"
        style={{ fontFamily: 'Orbitron, sans-serif' }}
      >
        {title}
      </h2>
      <p className="text-gray-400 text-lg max-w-xl mx-auto">{subtitle}</p>
      <div className="section-divider w-40 mt-6" />
    </div>
  );
}

interface PriceCardProps {
  name: string;
  price: string;
  note?: string;
  features: string[];
  highlight?: boolean;
  delay?: number;
}

function PriceCard({ name, price, note, features, highlight, delay = 0 }: PriceCardProps) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="reveal price-card rounded-2xl p-6 relative"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
          Популярно
        </div>
      )}
      <div className="mb-4">
        <h4 className="text-white font-bold text-lg mb-1">{name}</h4>
        {note && <p className="text-gray-500 text-xs mb-3">{note}</p>}
        <div className="text-3xl font-black text-blue-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          {price}
        </div>
      </div>
      <ul className="space-y-2">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
            <Icon name="Check" size={14} className="text-blue-400 mt-0.5 flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── СИГНАЛИЗАЦИИ ───────────────────────────────────────────────
export function AlarmSection() {
  const [tab, setTab] = useState<'install' | 'remove' | 'diag'>('install');

  const tabs = [
    { id: 'install', label: 'Установка', icon: 'Plus' },
    { id: 'remove', label: 'Демонтаж', icon: 'Minus' },
    { id: 'diag', label: 'Диагностика', icon: 'Search' },
  ] as const;

  const data = {
    install: [
      { name: 'Центральный замок', price: 'от 3 000 ₽', note: 'Управление замками с пульта', features: ['Открыть двери с пульта', 'Закрыть двери с пульта', 'Подключение к штатной проводке', 'Гарантия на монтаж'], highlight: false },
      { name: 'С автозапуском Pandora', price: 'от 7 000 ₽', note: 'Официальная продукция Pandora', features: ['Автозапуск по таймеру', 'Прогрев двигателя', 'Управление со смартфона', 'Гарантия 1 год'], highlight: true },
      { name: 'GSM связь с авто', price: 'от 12 000 ₽', note: 'Полный онлайн-контроль', features: ['Управление через приложение', 'Уведомления на телефон', 'Блокировка двигателя', 'Работа в любой точке мира'], highlight: false },
    ],
    remove: [
      { name: 'Удаление блокировок и систем', price: 'от 3 000 ₽', note: 'Полное снятие охранных систем', features: ['Демонтаж всех блоков и модулей', 'Восстановление штатной проводки', 'Проверка работы автомобиля', 'Без следов вмешательства'], highlight: true },
    ],
    diag: [
      { name: 'Диагностика автосигнализации', price: 'от 1 000 ₽', note: 'Полная проверка системы', features: ['Диагностика всех датчиков', 'Тест пультов и брелков', 'Проверка автозапуска', 'Поиск неисправностей'], highlight: true },
    ],
  };

  return (
    <section id="alarms" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          icon="Shield"
          title="Автосигнализации"
          subtitle="Надёжная защита вашего автомобиля — установка, демонтаж, диагностика"
        />

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all duration-300 ${
                tab === t.id ? 'tab-active' : 'border-white/10 text-gray-400 hover:border-blue-500/30 hover:text-gray-200'
              }`}
            >
              <Icon name={t.icon} size={15} />
              {t.label}
            </button>
          ))}
        </div>

        <div className={`flex flex-wrap justify-center gap-6 ${data[tab].length > 1 ? '' : ''}`}>
          {data[tab].map((card, i) => (
            <div key={card.name} className={data[tab].length === 1 ? 'w-full max-w-sm' : 'w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]'}>
              <PriceCard {...card} delay={i * 100} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ТОНИРОВКА ────────────────────────────────────────────────
export function TintingSection() {
  const cards = [
    { name: 'Без передних стёкол', price: 'от 5 000 ₽', note: 'Задние + боковые задние, 5%', features: ['Защита от солнца 99%', 'Максимальная приватность', 'Теплоизоляция', 'Профессиональная укладка'], highlight: true },
  ];

  return (
    <section id="tinting" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          icon="Sun"
          title="Тонировка"
          subtitle="Качественная плёнка — защита от солнца, приватность и стиль"
        />

        <div className="flex justify-center mb-10">
          <div className="tab-active px-6 py-2.5 rounded-xl border text-sm font-semibold">
            5% — Лимузин
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <PriceCard key={card.name} {...card} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── БРОНИРОВАНИЕ ─────────────────────────────────────────────
export function ArmorSection() {
  const [tab, setTab] = useState<'lights' | 'zones' | 'body'>('lights');

  const tabs = [
    { id: 'lights', label: 'Фары', icon: 'Lightbulb' },
    { id: 'zones', label: 'Зоны риска', icon: 'AlertTriangle' },
    { id: 'body', label: 'Кузов целиком', icon: 'Car' },
  ] as const;

  const data = {
    lights: [
      { name: 'Передние фары', price: 'После консультации', note: 'Антигравийная плёнка', features: ['Полное покрытие фар', 'Защита от камней', 'Прозрачный глянец'], highlight: false },
      { name: 'Передние + задние', price: 'После консультации', note: 'Все 4 оптики', features: ['Комплектное покрытие', 'Толщина 200 мкм', 'Гарантия 3 года'], highlight: true },
      { name: 'Туманки + ПТФ', price: 'После консультации', note: 'Противотуманные фонари', features: ['Полное покрытие', 'Без пожелтения', 'Самовосстановление'], highlight: false },
    ],
    zones: [
      { name: 'Пороги + арки', price: 'После консультации', note: 'Самые уязвимые места', features: ['Матовая или глянцевая плёнка', 'Толщина 300 мкм', 'Стойкость к гравию'], highlight: false },
      { name: 'Капот + бампер', price: 'После консультации', note: 'Ударная зона', features: ['Антигравий на капот', 'Передний бампер', 'Самовосстановление царапин'], highlight: true },
      { name: 'Полный пакет зон риска', price: 'После консультации', note: 'Все уязвимые зоны', features: ['Капот + бампер + арки + пороги', 'Зеркала', 'Гарантия 5 лет'], highlight: false },
    ],
    body: [
      { name: 'Кузов — матовая плёнка', price: 'После консультации', note: 'Полное матовое покрытие', features: ['Смена цвета', 'Защита лакокрасочного', 'Гарантия 5 лет'], highlight: false },
      { name: 'Кузов — глянцевая плёнка', price: 'После консультации', note: 'Защита заводского цвета', features: ['Сохранение оттенка', 'Антигравий по всему кузову', 'Самовосстановление'], highlight: true },
      { name: 'Кузов — PPF (полиуретан)', price: 'После консультации', note: 'Максимальная защита', features: ['Военный полиуретан', 'Защита от глубоких царапин', 'Гарантия 7 лет'], highlight: false },
    ],
  };

  return (
    <section id="armor" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          icon="ShieldCheck"
          title="Бронирование"
          subtitle="Защитные плёнки — сохраним кузов и оптику в идеальном состоянии"
        />

        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all duration-300 ${
                tab === t.id ? 'tab-active' : 'border-white/10 text-gray-400 hover:border-blue-500/30 hover:text-gray-200'
              }`}
            >
              <Icon name={t.icon} size={15} />
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data[tab].map((card, i) => (
            <PriceCard key={card.name} {...card} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ДООСНАЩЕНИЕ ──────────────────────────────────────────────
export function ExtrasSection() {
  const [tab, setTab] = useState<'park' | 'media' | 'cam' | 'dvr'>('park');

  const tabs = [
    { id: 'park', label: 'Парктроники', icon: 'Radio' },
    { id: 'media', label: 'Мультимедиа', icon: 'Monitor' },
    { id: 'cam', label: 'Камеры', icon: 'Camera' },
    { id: 'dvr', label: 'Видеорегистраторы', icon: 'Video' },
  ] as const;

  const data = {
    park: [
      { name: '4 датчика (задние)', price: 'от 2 500 ₽', note: 'Парковочные датчики', features: ['4 датчика сзади', 'Звуковой сигнал', 'Дисплей в комплекте'], highlight: false },
      { name: '8 датчиков (перед + зад)', price: 'от 4 500 ₽', note: 'Полный контроль', features: ['8 датчиков 360°', 'Цветной дисплей', 'Уровни расстояния'], highlight: true },
      { name: 'Интеграция в штатный дисплей', price: 'от 6 000 ₽', note: 'Вывод на штатный экран', features: ['Без доп. дисплея', 'Интеграция с CAN', 'Профессиональная укладка'], highlight: false },
    ],
    media: [
      { name: '7" Android магнитола', price: 'от 8 000 ₽', note: 'Установка с навигацией', features: ['Android Auto / CarPlay', 'Навигация + Wi-Fi', 'Bluetooth, USB'], highlight: false },
      { name: '9–10" штатная замена', price: 'от 15 000 ₽', note: 'Штатный вид + умная начинка', features: ['Штатный вид панели', 'Android 11+', 'Подключение камер'], highlight: true },
      { name: 'Подключение Apple CarPlay', price: 'от 3 500 ₽', note: 'Для штатных систем', features: ['Беспроводной CarPlay', 'Android Auto', 'Без замены магнитолы'], highlight: false },
    ],
    cam: [
      { name: 'Камера заднего вида', price: 'от 2 000 ₽', note: 'Помощь при парковке', features: ['HD 1080p', 'Угол обзора 170°', 'Ночной режим'], highlight: false },
      { name: 'Камера + парктроники', price: 'от 5 500 ₽', note: 'Комплексное решение', features: ['Камера + 4 датчика', 'Единый дисплей', 'Гарантия 1 год'], highlight: true },
      { name: 'Камеры 360° (4 камеры)', price: 'от 14 000 ₽', note: 'Вид сверху на авто', features: ['4 камеры вокруг авто', 'Bird-view режим', 'Запись на карту'], highlight: false },
    ],
    dvr: [
      { name: 'Одноканальный регистратор', price: 'от 3 000 ₽', note: 'Запись вперёд', features: ['Full HD 1080p', 'Датчик удара', 'Скрытая установка'], highlight: false },
      { name: 'Двухканальный (перед + зад)', price: 'от 6 000 ₽', note: 'Запись спереди и сзади', features: ['Два канала HD', 'Цикличная запись', 'GPS-трекер'], highlight: true },
      { name: 'Регистратор с 4G и облаком', price: 'от 12 000 ₽', note: 'Онлайн-мониторинг', features: ['Трансляция в онлайн', '4G + Wi-Fi', 'Облачное хранение 30 дней'], highlight: false },
    ],
  };

  return (
    <section id="extras" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          icon="Settings"
          title="Дооснащение"
          subtitle="Расширьте возможности автомобиля — удобство и технологии на борту"
        />

        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-300 ${
                tab === t.id ? 'tab-active' : 'border-white/10 text-gray-400 hover:border-blue-500/30 hover:text-gray-200'
              }`}
            >
              <Icon name={t.icon} size={14} />
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data[tab].map((card, i) => (
            <PriceCard key={card.name} {...card} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}