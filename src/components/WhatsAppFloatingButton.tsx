import React, { useState } from 'react';
import { STORE_INFO } from '../data/storeData';
import { MessageSquare, X } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Quick Tooltip Bubble on desktop hover */}
      {showTooltip && (
        <div className="mb-2 bg-slate-900 border border-slate-700 text-white text-xs px-3.5 py-2 rounded-xl shadow-xl max-w-xs animate-in fade-in">
          <div className="font-bold text-amber-400">Need Help? Chat on WhatsApp</div>
          <div className="text-[11px] text-slate-300">03405505283 · 24/7 Live Assistance</div>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Hi%20BattleZone%2C%20I%20need%20help%20with%20PUBG%20UC%20top-up.`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-2xl shadow-emerald-500/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95 group focus:outline-none"
        aria-label="WhatsApp Support"
      >
        <MessageSquare className="w-7 h-7 fill-white/20" />
      </a>
    </div>
  );
};
