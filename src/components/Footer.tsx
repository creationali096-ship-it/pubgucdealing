import React from 'react';
import { STORE_INFO } from '../data/storeData';
import { ShieldCheck, MessageSquare, Mail, Phone, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#05080F] border-t border-slate-800/80 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center text-slate-950 font-black text-xs">
                BZ
              </span>
              <span className="text-base font-extrabold text-white font-heading tracking-tight">
                {STORE_INFO.name}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fast, simple aur reliable gaming top-up store in Pakistan. Direct Character ID recharge for PUBG Mobile with instant JazzCash and Easypaisa support.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-amber-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Zero Password Policy · 100% In-Game Mail Safe</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Explore Store
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Home &amp; Featured Offers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('packages')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  All UC Packages &amp; Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('order-guide')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  How to Find PUBG ID &amp; Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('payments')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  JazzCash &amp; Easypaisa Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('track')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Track Order Status
                </button>
              </li>
            </ul>
          </div>

          {/* Supported Wallets */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Payment Channels
            </h4>
            <div className="space-y-2.5">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <div className="font-bold text-white text-[11px]">JazzCash Account</div>
                <div className="text-amber-400 font-mono-numbers">{STORE_INFO.contactPhone}</div>
                <div className="text-[10px] text-slate-400">Title: Raja Ali Noor</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <div className="font-bold text-white text-[11px]">Easypaisa Account</div>
                <div className="text-amber-400 font-mono-numbers">{STORE_INFO.contactPhone}</div>
                <div className="text-[10px] text-slate-400">Title: Raja Ali Noor</div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Store Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`tel:${STORE_INFO.contactPhone}`} className="hover:text-white transition-colors font-mono-numbers">
                  {STORE_INFO.formattedPhone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${STORE_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: {STORE_INFO.contactPhone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <a href={`mailto:${STORE_INFO.email}`} className="hover:text-white transition-colors truncate">
                  {STORE_INFO.email}
                </a>
              </li>
              <li className="text-[11px] text-slate-500 pt-1">
                Domain: {STORE_INFO.website} · Pakistan
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer & Copyright Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {STORE_INFO.name}. All rights reserved. Official gaming top-up store for PUBG Mobile in Pakistan.
          </div>
          <div className="flex items-center gap-3">
            <span className="text-amber-400">Original verified store prices</span>
            <span aria-hidden="true">·</span>
            <span>Manual Order Fulfillment (5-15 Mins)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
