import React from 'react';
import { UCPackage } from '../types';
import { Coins, Check, ArrowRight } from 'lucide-react';

interface PackageCardProps {
  pkg: UCPackage;
  onSelect: (pkg: UCPackage) => void;
  featured?: boolean;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg, onSelect, featured = false }) => {
  return (
    <div
      className={`relative rounded-xl transition-all duration-200 flex flex-col justify-between group ${
        featured || pkg.popular
          ? 'bg-gradient-to-b from-[#111A33] to-[#0A1021] border border-amber-500/50 shadow-xl shadow-amber-500/10'
          : 'bg-[#0B101E] border border-slate-800 hover:border-slate-700 shadow-lg'
      } p-5 sm:p-6`}
    >
      {/* Top Banner Tag if popular or featured */}
      {(pkg.popular || pkg.badge) && (
        <div className="absolute -top-3 left-6">
          <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 bg-amber-400 text-slate-950 rounded shadow-md">
            {pkg.badge || 'Featured'}
          </span>
        </div>
      )}

      <div>
        {/* Header & UC Count */}
        <div className="flex items-start justify-between gap-3 mb-4 pt-1">
          <div>
            <h3 className="text-lg font-bold text-white font-heading group-hover:text-amber-300 transition-colors">
              {pkg.name}
            </h3>
            {/* Clean unboxed metadata with typographic separators */}
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <span>PUBG Mobile</span>
              <span aria-hidden="true">·</span>
              <span>Direct Top-Up</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-400/90 font-medium">Instant</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
            <Coins className="w-5 h-5" />
          </div>
        </div>

        {/* Big UC Figure */}
        <div className="my-5 p-4 rounded-lg bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-heading tracking-tight">
              {pkg.totalUC.toLocaleString()} <span className="text-sm font-semibold text-amber-200/80">UC</span>
            </span>
            {pkg.bonusUC > 0 && (
              <span className="text-xs text-emerald-400 font-medium font-mono-numbers">
                +{pkg.bonusUC} Bonus
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            {pkg.description}
          </p>
        </div>

        {/* Feature Points */}
        <ul className="space-y-2 mb-6 text-xs text-slate-300">
          <li className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Character ID only · No password required</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>JazzCash & Easypaisa 0% transaction fee</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>5-15 min dispatch to your in-game mailbox</span>
          </li>
        </ul>
      </div>

      {/* Pricing & CTA Button */}
      <div className="pt-4 border-t border-slate-800/80 mt-auto">
        <div className="flex items-baseline justify-between mb-3.5">
          <div>
            <div className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider">Original Price</div>
            <div className="text-xl sm:text-2xl font-black text-white font-mono-numbers">
              Rs. {pkg.pricePKR.toLocaleString()}
            </div>
          </div>
          <div className="text-right text-[11px] text-slate-400">
            ~Rs. {(pkg.pricePKR / pkg.totalUC).toFixed(2)} / UC
          </div>
        </div>

        <button
          onClick={() => onSelect(pkg)}
          className={`w-full py-2.5 px-4 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
            featured || pkg.popular
              ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-md shadow-amber-400/20 active:scale-98'
              : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600 active:scale-98'
          }`}
        >
          <span>Buy Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
