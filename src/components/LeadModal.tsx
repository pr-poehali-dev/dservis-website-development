import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import LeadForm from '@/components/LeadForm';

export default function LeadModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem('dsservis_lead_shown');
    if (alreadyShown) return;
    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem('dsservis_lead_shown', '1');
    }, 40000);
    return () => clearTimeout(timer);
  }, []);

  if (!open) return null;

  return (
    <div
      className="modal-overlay fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
    >
      <div className="relative w-full max-w-md service-card rounded-2xl p-8 animate-slide-up border border-blue-500/30 shadow-[0_20px_60px_rgba(0,102,255,0.3)]">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <Icon name="X" size={20} />
        </button>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

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
          Оставьте заявку и получите{' '}
          <span className="text-blue-400 font-semibold">скидку 10%</span>{' '}
          на первую услугу
        </p>

        <LeadForm />
      </div>
    </div>
  );
}
