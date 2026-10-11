import React, { useState } from 'react';
import { STORE_INFO, UC_PACKAGES } from '../data/storeData';
import { UCPackage } from '../types';
import { ShieldCheck, Zap, ArrowRight, CheckCircle2, Search, Smartphone } from 'lucide-react';
import heroTacticalImg from '../assets/images/hero_pubg_tactical_1791703202623.jpg';

interface HeroProps {
  onSelectPackage: (pkg: UCPackage, initialPlayerId?: string) => void;
  onExplorePackages: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectPackage, onExplorePackages }) => {
  const [quickPlayerId, setQuickPlayerId] = useState('');
  const [playerIdStatus, setPlayerIdStatus] = useState<{
    valid: boolean;
    name?: string;
    checked: boolean;
  }>({ valid: false, checked: false });

  const handleVerifyId = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = quickPlayerId.trim();
    if (/^\d{7,12}$/.test(clean)) {
      setPlayerIdStatus({
        valid: true,
        name: 'BZ_Warrior_Pak',
        checked: true,
      });
    } else {
      setPlayerIdStatus({
        valid: false,
        checked: true,
      });
    }
  };

  const handleFastOrder = () => {
    const popularPack = UC_PACKAGES.find((p) => p.popular) || UC_PACKAGES[1];
    onSelectPackage(popularPack, quickPlayerId);
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pb-16 border-b border-slate-800/60">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-80 bg-blue-600/10 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-64 h-64 bg-amber-500/10 blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split grid for 1440px desktop baseline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines, Value Props & Quick ID Input */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Unboxed breadcrumb metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-amber-400 font-semibold tracking-wide">
              <span>{STORE_INFO.name}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Pakistan PUBG Mobile UC</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300">24/7 Order Requests</span>
            </div>

            {/* Display Headline with text-wrap: balance */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-heading tracking-tight leading-[1.12] [text-wrap:balance]">
              Fast, simple aur reliable <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                PUBG Mobile UC Store
              </span>
            </h1>

            {/* Body Copy */}
            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
              Apne favourite game ke liye UC packages select karein aur order place karein. 
              Direct character ID recharge with 100% guarantee through <strong className="text-white font-semibold">JazzCash</strong> and <strong className="text-white font-semibold">Easypaisa</strong>.
            </p>

            {/* Quick Player ID Bar */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-900/80 border border-slate-800 shadow-xl max-w-xl">
              <div className="text-xs font-semibold text-slate-300 mb-2.5 flex items-center justify-between">
                <span>Direct Top-Up Launcher</span>
                <span className="text-slate-400 font-normal">Need 7–12 digit Character ID</span>
              </div>

              <form onSubmit={handleVerifyId} className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={quickPlayerId}
                    onChange={(e) => {
                      setQuickPlayerId(e.target.value.replace(/\D/g, ''));
                      setPlayerIdStatus({ valid: false, checked: false });
                    }}
                    placeholder="Enter PUBG Player ID (e.g. 5124892019)"
                    maxLength={12}
                    className="w-full bg-[#070B14] border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-white rounded-lg px-3.5 py-2.5 text-sm font-mono-numbers placeholder:text-slate-500 focus:outline-none transition-colors"
                  />
                  {playerIdStatus.checked && playerIdStatus.valid && (
                    <span className="absolute right-3 top-3 text-emerald-400 flex items-center gap-1 text-xs">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Valid</span>
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 transition-colors whitespace-nowrap cursor-pointer shrink-0"
                >
                  Verify ID
                </button>
                <button
                  type="button"
                  onClick={handleFastOrder}
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black rounded-lg shadow-md shadow-amber-400/20 transition-all whitespace-nowrap cursor-pointer shrink-0 flex items-center justify-center gap-1.5"
                >
                  <span>Quick Buy</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Status or Helper Pill */}
              <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>No PUBG password or email required</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setQuickPlayerId('5124892019');
                    setPlayerIdStatus({ valid: true, name: 'BZ_Warrior_Pak', checked: true });
                  }}
                  className="text-amber-400 hover:text-amber-300 underline font-medium cursor-pointer"
                >
                  Try Sample ID: 5124892019
                </button>
              </div>

              {playerIdStatus.checked && !playerIdStatus.valid && (
                <div className="mt-2 text-xs text-rose-400">
                  Please enter a valid 7 to 12 digit numeric PUBG Player ID.
                </div>
              )}
            </div>

            {/* Quick Proof Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>5–15 Min Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>JazzCash & Easypaisa</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>100% In-Game Mail Safe</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-[#0B101E] group">
              <img
                src={heroTacticalImg}
                alt="PUBG Tactical Helmet and Golden UC Tokens"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-[#070A12]/40 to-transparent" />

              {/* In-Card Floating Info */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-amber-400 font-bold">
                      Most Popular Package
                    </div>
                    <div className="text-lg font-black text-white font-heading">
                      5000 UC (4000 + 1000 Bonus)
                    </div>
                    <div className="text-xs text-slate-300 font-mono-numbers">
                      Only Rs. 6,000 <span className="text-amber-400 font-medium">· Original price</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const popularPack = UC_PACKAGES.find((p) => p.popular) || UC_PACKAGES[1];
                      onSelectPackage(popularPack);
                    }}
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg shadow-md cursor-pointer whitespace-nowrap"
                  >
                    Buy Pack
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
