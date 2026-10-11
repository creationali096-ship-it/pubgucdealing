import React, { useState } from 'react';
import { UC_PACKAGES } from '../data/storeData';
import { UCPackage } from '../types';
import { PackageCard } from './PackageCard';
import { Info, Calculator, Sparkles } from 'lucide-react';
import crateImg from '../assets/images/pubg_uc_crate_gold_1791703220979.jpg';

interface PackagesSectionProps {
  onSelectPackage: (pkg: UCPackage) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onSelectPackage }) => {
  const [filter, setFilter] = useState<'all' | 'starter' | 'popular' | 'pro'>('all');
  const [customUcWanted, setCustomUcWanted] = useState<number>(5000);

  const filteredPackages = UC_PACKAGES.filter((pkg) => {
    if (filter === 'starter') return pkg.totalUC <= 2000;
    if (filter === 'popular') return pkg.totalUC === 5000;
    if (filter === 'pro') return pkg.totalUC >= 10000;
    return true;
  });

  // Calculate approximate rate based on closest pack ratio (~Rs. 0.8 to 1.2 per UC)
  const estimatedCost = Math.round(customUcWanted * 0.9);

  return (
    <section id="packages-section" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              <span>Official Top-Up Catalog</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Direct In-Game Delivery</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-heading tracking-tight">
              PUBG Mobile UC Packages
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-xl">
              Choose your desired package below. All recharges are delivered directly to your PUBG Character ID within 5 to 15 minutes.
            </p>
          </div>

          {/* Functional interactive filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                filter === 'all'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Packs ({UC_PACKAGES.length})
            </button>
            <button
              onClick={() => setFilter('starter')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                filter === 'starter'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Starter (2000 UC)
            </button>
            <button
              onClick={() => setFilter('popular')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                filter === 'popular'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Popular (5000 UC)
            </button>
            <button
              onClick={() => setFilter('pro')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                filter === 'pro'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Pro &amp; Ultimate (10K+ UC)
            </button>
          </div>
        </div>

        {/* Highlight Banner with Gold Crate Visual */}
        <div className="mb-10 rounded-2xl bg-gradient-to-r from-[#0C1428] via-[#101B36] to-[#0A0F1F] border border-amber-500/30 overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            <div className="p-6 sm:p-8 md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>Featured Crate Promotion</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-heading">
                Popular Pack: 5000 UC (4000 + 1000 Bonus) — Most Popular
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg">
                The most sought-after PUBG pack in Pakistan. Includes 1000 free bonus UC with direct Character ID delivery in 5 to 15 minutes.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div>
                  <span className="text-xs text-amber-400 font-semibold">Original Price: </span>
                  <span className="text-xl font-black text-white font-mono-numbers">Rs. 6,000</span>
                </div>
                <button
                  onClick={() => {
                    const popularPack = UC_PACKAGES.find((p) => p.id === 'popular-5000') || UC_PACKAGES[1];
                    onSelectPackage(popularPack);
                  }}
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-lg shadow-md transition-colors cursor-pointer"
                >
                  Order Popular Pack Now
                </button>
              </div>
            </div>

            <div className="md:col-span-4 h-48 md:h-full relative overflow-hidden">
              <img
                src={crateImg}
                alt="Golden PUBG UC Supply Crate"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0C1428] via-transparent to-transparent md:block hidden" />
            </div>
          </div>
        </div>

        {/* Verified Original Price Banner */}
        <div className="mb-8 p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-start sm:items-center gap-2.5">
          <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
          <span>
            <strong>Official Store Pricing:</strong> All packages are available at original verified rates in PKR (Rs.) with instant payment support via JazzCash and Easypaisa (Account: Raja Ali Noor).
          </span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPackages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              onSelect={onSelectPackage}
            />
          ))}
        </div>

        {/* Quick UC Cost Calculator */}
        <div className="mt-12 p-6 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>Estimate Custom UC Requirements</span>
              </div>
              <p className="text-xs text-slate-400">
                Planning for a special spin or airdrop event? Slide to calculate approximate PKR requirement.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-full sm:w-48 space-y-1">
                <div className="flex justify-between text-xs text-slate-300 font-mono-numbers">
                  <span>Target UC:</span>
                  <span className="font-bold text-amber-400">{customUcWanted.toLocaleString()} UC</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="25000"
                  step="500"
                  value={customUcWanted}
                  onChange={(e) => setCustomUcWanted(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-center min-w-[140px]">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Estimated Cost</div>
                <div className="text-base font-black text-white font-mono-numbers">
                  ~Rs. {estimatedCost.toLocaleString()}
                </div>
              </div>

              <button
                onClick={() => {
                  // Find closest package
                  const closest = UC_PACKAGES.reduce((prev, curr) =>
                    Math.abs(curr.totalUC - customUcWanted) < Math.abs(prev.totalUC - customUcWanted) ? curr : prev
                  );
                  onSelectPackage(closest);
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white rounded-lg border border-slate-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                Match Nearest Pack
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
