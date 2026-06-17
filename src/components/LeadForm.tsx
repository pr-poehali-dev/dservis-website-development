import { useState } from 'react';
import Icon from '@/components/ui/icon';

const LEAD_URL = 'https://functions.poehali.dev/80a23462-891e-4ef2-9b31-0fd81dedb464';

const SERVICES = [
  'Автосигнализация — Центральный замок',
  'Автосигнализация — С автозапуском Pandora',
  'Автосигнализация — GSM связь с авто',
  'Тонировка 5%',
  'Бронирование — Фары',
  'Бронирование — Зоны риска',
  'Бронирование — Кузов целиком',
  'Дооснащение',
];

export default function LeadForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(LEAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, service }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError('Что-то пошло не так. Попробуйте ещё раз.');
      }
    } catch {
      setError('Ошибка соединения. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center py-10 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-5 glow-blue">
          <Icon name="CheckCircle" size={40} className="text-blue-400" />
        </div>
        <h3 className="text-2xl font-black text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Заявка принята!
        </h3>
        <p className="text-gray-400 text-sm">Мы перезвоним вам в ближайшее время</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Имя */}
      <div>
        <label className="block text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wider">
          Ваше имя *
        </label>
        <div className="relative">
          <Icon name="User" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Иван"
            required
            className="w-full bg-[rgba(10,20,40,0.8)] border border-blue-500/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-blue-500/60 transition-colors"
          />
        </div>
      </div>

      {/* Телефон */}
      <div>
        <label className="block text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wider">
          Телефон *
        </label>
        <div className="relative">
          <Icon name="Phone" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 (___) ___-__-__"
            required
            className="w-full bg-[rgba(10,20,40,0.8)] border border-blue-500/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-blue-500/60 transition-colors"
          />
        </div>
      </div>

      {/* Услуга */}
      <div>
        <label className="block text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wider">
          Что интересует?
        </label>
        <div className="relative">
          <Icon name="Wrench" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none" />
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full bg-[rgba(10,20,40,0.8)] border border-blue-500/20 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500/60 transition-colors appearance-none text-white"
          >
            <option value="" className="bg-[#0a1020] text-gray-400">Выберите услугу</option>
            {SERVICES.map((s) => (
              <option key={s} value={s} className="bg-[#0a1020] text-white">{s}</option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <p className="text-red-400 text-xs flex items-center gap-1">
          <Icon name="AlertCircle" size={13} />
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {loading ? (
          <Icon name="Loader" size={18} className="animate-spin" />
        ) : (
          <Icon name="Send" size={16} />
        )}
        {loading ? 'Отправляем...' : 'Отправить заявку'}
      </button>

      <p className="text-center text-gray-600 text-xs">
        Нажимая кнопку, вы соглашаетесь на обработку персональных данных
      </p>
    </form>
  );
}
