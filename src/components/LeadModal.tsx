import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

export default function LeadModal() {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem('dsservis_lead_shown');
    if (alreadyShown) return;
    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem('dsservis_lead_shown', '1');
    }, 40000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setSent(true);
  };

  if (!open) return null;

  return (
    <div
      className="modal-overlay fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
    >
      <div className="relative w-full max-w-md service-card rounded-2xl p-8 animate-slide-up border border-blue-500/30 shadow-[0_20px_60px_rgba(0,102,255,0.3)]">
        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <Icon name="X" size={20} />
        </button>

        {/* Glow top border */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

        {!sent ? (
          <>
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600/20 to-blue-900/30 border border-blue-500/30 flex items-center justify-center glow-blue">
                <Icon name="Gift" size={28} className="text-blue-400" />
              </div>
            </div>

            <h3
              className="text-2xl font-black text-white text-center mb-2"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              Специальное предложение!
            </h3>
            <p className="text-gray-400 text-center text-sm mb-6">
              Оставьте контакты и получите{' '}
              <span className="text-blue-400 font-semibold">скидку 10%</span>{' '}
              на первую услугу
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wider">
                  Номер телефона *
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

              <div>
                <label className="block text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wider">
                  Email (необязательно)
                </label>
                <div className="relative">
                  <Icon name="Mail" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@mail.ru"
                    className="w-full bg-[rgba(10,20,40,0.8)] border border-blue-500/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-blue-500/60 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2"
              >
                <Icon name="ArrowRight" size={16} />
                Получить скидку 10%
              </button>
            </form>

            <p className="text-center text-gray-600 text-xs mt-4">
              Нажимая кнопку, вы соглашаетесь на обработку персональных данных
            </p>
          </>
        ) : (
          <div className="text-center py-6 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-5 glow-blue">
              <Icon name="CheckCircle" size={40} className="text-blue-400" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Спасибо!
            </h3>
            <p className="text-gray-400 text-sm mb-2">Мы перезвоним вам в ближайшее время</p>
            <p className="text-blue-400 font-semibold text-sm">Ваша скидка 10% активирована ✓</p>
            <button
              onClick={() => setOpen(false)}
              className="mt-6 px-6 py-2.5 rounded-xl border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 transition-all text-sm font-medium"
            >
              Закрыть
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
