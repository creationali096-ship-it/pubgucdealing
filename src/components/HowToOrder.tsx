import React, { useState } from 'react';
import { User, PackageCheck, Smartphone, CheckCircle, ShieldAlert, Copy, Check } from 'lucide-react';

interface HowToOrderProps {
  onStartOrder: () => void;
}

export const HowToOrder: React.FC<HowToOrderProps> = ({ onStartOrder }) => {
  const [copiedSample, setCopiedSample] = useState(false);

  const handleCopySample = () => {
    navigator.clipboard.writeText('5124892019');
    setCopiedSample(true);
    setTimeout(() => setCopiedSample(false), 2000);
  };

  const steps = [
    {
      step: '01',
      title: 'Find Your PUBG Player ID',
      description:
        'Open PUBG Mobile on your phone. Tap on your avatar/profile picture in the top-left corner. Under "Basic Info", you will find your 7 to 12 digit numeric Character ID.',
      icon: User,
      badge: 'Step 1: In-Game',
    },
    {
      step: '02',
      title: 'Select Your UC Package',
      description:
        'Choose from our 2000 UC, 5000 UC, 10000 UC, or 15000 UC packages. Each pack clearly shows bonus amounts and original verified PKR rates with 0% extra gateway fees.',
      icon: PackageCheck,
      badge: 'Step 2: On BattleZone',
    },
    {
      step: '03',
      title: 'Transfer Payment (JazzCash / Easypaisa)',
      description:
        'Send the exact package amount to our official store number 03405505283 (Account Title: Raja Ali Noor) via your Easypaisa app, JazzCash app, or USSD code *786#.',
      icon: Smartphone,
      badge: 'Step 3: Instant Transfer',
    },
    {
      step: '04',
      title: 'Submit TID & Receive UC',
      description:
        'Enter the 11-12 digit Transaction ID (TID) from your payment SMS/app and click "Place Order". Your UC will be manually credited to your in-game mailbox in 5 to 15 minutes!',
      icon: CheckCircle,
      badge: 'Step 4: Top-Up Arrived',
    },
  ];

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
            <span>Simple 4-Step Process</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Takes Under 3 Minutes</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-heading tracking-tight">
            How to Order PUBG UC on BattleZone
          </h2>
          <p className="text-sm text-slate-300 mt-2.5">
            Follow our straightforward steps to top up safely. We never ask for your passwords or confidential credentials.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#0B101E] border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono-numbers font-black text-amber-400/80 bg-amber-400/10 px-2 py-0.5 rounded">
                      {item.step}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {item.badge}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-base font-bold text-white font-heading mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Phase {idx + 1} of 4</span>
                  <span className="text-amber-400">Verified Step</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual Player ID Guide & Security Alert Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left: Player ID Finder Mockup */}
          <div className="lg:col-span-7 p-6 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white font-heading mb-2">
                Where is my PUBG Character ID located?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                In PUBG Mobile lobby, tap your profile avatar on the upper-left. Go to the <strong>Main / Basic Info</strong> tab. Right next to your avatar, you will see a numeric code like <code className="text-amber-400 font-mono-numbers bg-slate-950 px-1.5 py-0.5 rounded">5124892019</code> with a small copy icon. That is your Character ID.
              </p>

              {/* In-Game Profile Simulation Card */}
              <div className="p-4 rounded-lg bg-[#070B14] border border-slate-800 space-y-3 font-sans">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                  <span>PUBG MOBILE · PROFILE SUMMARY</span>
                  <span className="text-emerald-400">STATUS: ONLINE</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-black text-base shadow">
                    BZ
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-white truncate">Player_Noor_PK</div>
                    <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5 font-mono-numbers">
                      <span>UID: 5124892019</span>
                      <button
                        onClick={handleCopySample}
                        className="text-amber-400 hover:text-amber-300 text-[11px] flex items-center gap-1 cursor-pointer"
                      >
                        {copiedSample ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Sample ID</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-amber-400 font-bold">Ace Dominator</div>
                    <div className="text-[11px] text-slate-500">Season 2026</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Ready to top-up?</span>
              <button
                onClick={onStartOrder}
                className="px-4 py-2 bg-amber-400 text-slate-950 font-bold rounded-lg hover:bg-amber-300 transition-colors cursor-pointer"
              >
                Place Your Order Now
              </button>
            </div>
          </div>

          {/* Right: Security Guarantee Box */}
          <div className="lg:col-span-5 p-6 rounded-xl bg-gradient-to-br from-[#12111E] to-[#0A0E1A] border border-amber-500/30 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white font-heading">
                Security Guarantee & Fraud Prevention
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Security tip:</strong> Only request the PUBG Player ID needed for a legitimate top-up. Never ask customers for their PUBG password or email password.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>100% Ban-Safe: Recharges are officially injected through authorized server channels.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>No login required: Your social accounts and login tokens remain completely untouched.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Direct WhatsApp support on every single transaction with receipt verification.</span>
                </li>
              </ul>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] text-slate-400">
              Helpline: 03405505283 · rajaalinoor327@gmail.com
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
