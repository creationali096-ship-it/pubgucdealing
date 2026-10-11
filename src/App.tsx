/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PackagesSection } from './components/PackagesSection';
import { HowToOrder } from './components/HowToOrder';
import { PaymentMethods } from './components/PaymentMethods';
import { TrackOrder } from './components/TrackOrder';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { UCPackage, Order } from './types';
import { UC_PACKAGES, INITIAL_ORDERS, STORE_INFO } from './data/storeData';
import { ShieldCheck, Zap, Smartphone, Clock, ArrowRight, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import crateImg from './assets/images/pubg_uc_crate_gold_1791703220979.jpg';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('battlezone_orders');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback to initial orders
    }
    return INITIAL_ORDERS;
  });

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<UCPackage | null>(null);
  const [prefilledPlayerId, setPrefilledPlayerId] = useState('');
  const [justCompletedOrder, setJustCompletedOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('battlezone_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving orders to localStorage', e);
    }
  }, [orders]);

  const handleOpenCheckoutWithPackage = (pkg: UCPackage, initialPlayerId?: string) => {
    setSelectedPackage(pkg);
    if (initialPlayerId) {
      setPrefilledPlayerId(initialPlayerId);
    }
    setIsCheckoutOpen(true);
  };

  const handleOpenGeneralCheckout = () => {
    setSelectedPackage(UC_PACKAGES[1]); // Default to Popular Pack (5000 UC)
    setIsCheckoutOpen(true);
  };

  const handleOrderPlaced = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setJustCompletedOrder(newOrder);
  };

  const handleTrackSpecificOrder = (order: Order) => {
    setJustCompletedOrder(null);
    setActiveTab('track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Recent simulated top-ups feed
  const recentActivities = [
    { player: '512489****', package: '10000 UC', method: 'JazzCash', time: '3 mins ago' },
    { player: '592019****', package: '5000 UC', method: 'Easypaisa', time: '7 mins ago' },
    { player: '531849****', package: '15000 UC', method: 'JazzCash', time: '12 mins ago' },
    { player: '584029****', package: '2000 UC', method: 'Easypaisa', time: '16 mins ago' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#070A12] text-slate-100 selection:bg-amber-400/30 selection:text-amber-200">
      
      {/* Navigation Header adhering strictly to the 3-zone contract */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCheckout={handleOpenGeneralCheckout}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
            <Hero
              onSelectPackage={handleOpenCheckoutWithPackage}
              onExplorePackages={() => setActiveTab('packages')}
            />

            {/* Live Top-Up Activity Marquee / Ticker */}
            <div className="border-b border-slate-800/80 bg-slate-950/60 py-3 overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-amber-400 font-bold shrink-0">
                  <TrendingUp className="w-4 h-4" />
                  <span>Recent Successful Top-Ups:</span>
                </div>
                <div className="flex items-center gap-6 overflow-x-auto text-slate-300 py-1 font-mono-numbers">
                  {recentActivities.map((act, i) => (
                    <div key={i} className="flex items-center gap-1.5 whitespace-nowrap">
                      <span className="text-white font-bold">{act.player}</span>
                      <span className="text-slate-500">·</span>
                      <span className="text-amber-300">{act.package}</span>
                      <span className="text-slate-500">via</span>
                      <span className="text-slate-400 capitalize">{act.method}</span>
                      <span className="text-[10px] text-emerald-400">({act.time})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Featured UC Packages Spotlight */}
            <PackagesSection onSelectPackage={handleOpenCheckoutWithPackage} />

            {/* Why BattleZone Trust Pillars */}
            <section className="py-12 sm:py-16 bg-[#090E1B] border-t border-slate-800/80">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                    Why Pakistani Gamers Trust Us
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
                    Fast, Simple &amp; 100% Reliable Top-Ups
                  </h2>
                  <p className="text-sm text-slate-300 mt-2">
                    Experience seamless PUBG Mobile top-ups with complete peace of mind.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  <div className="p-6 rounded-xl bg-[#0B101E] border border-slate-800 space-y-3">
                    <div className="w-12 h-12 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-white font-heading">
                      Zero Password Policy
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      We strictly request your numeric Character ID. We never ask for your PUBG login, email, or passwords.
                    </p>
                  </div>

                  <div className="p-6 rounded-xl bg-[#0B101E] border border-slate-800 space-y-3">
                    <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-white font-heading">
                      JazzCash &amp; Easypaisa
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Pay easily from your mobile account or USSD *786# code without international card restrictions.
                    </p>
                  </div>

                  <div className="p-6 rounded-xl bg-[#0B101E] border border-slate-800 space-y-3">
                    <div className="w-12 h-12 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                      <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-white font-heading">
                      5 – 15 Min Delivery
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Our human operations team validates your transaction ID and dispatches UC directly to your mailbox.
                    </p>
                  </div>

                  <div className="p-6 rounded-xl bg-[#0B101E] border border-slate-800 space-y-3">
                    <div className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                      <Clock className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-white font-heading">
                      24/7 WhatsApp Support
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Instant Pakistani support available round the clock at 03405505283 for quick inquiries.
                    </p>
                  </div>

                </div>

                {/* Banner Strip to How to Order */}
                <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="text-base font-bold text-white font-heading">
                      New to online PUBG top-ups?
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Check our step-by-step visual tutorial on where to find your Character ID and how to transfer via JazzCash.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('order-guide');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2"
                  >
                    <span>Read Ordering Guide</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </section>
          </div>
        )}

        {activeTab === 'packages' && (
          <PackagesSection onSelectPackage={handleOpenCheckoutWithPackage} />
        )}

        {activeTab === 'order-guide' && (
          <HowToOrder onStartOrder={handleOpenGeneralCheckout} />
        )}

        {activeTab === 'payments' && (
          <PaymentMethods onStartOrder={handleOpenGeneralCheckout} />
        )}

        {activeTab === 'track' && (
          <TrackOrder
            orders={orders}
            onOpenCheckout={handleOpenGeneralCheckout}
          />
        )}

        {activeTab === 'contact' && <ContactSection />}
      </main>

      {/* Footer */}
      <Footer onNavigate={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloatingButton />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        selectedPackage={selectedPackage}
        initialPlayerId={prefilledPlayerId}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Order Confirmed Receipt Modal */}
      <OrderSuccessModal
        order={justCompletedOrder}
        onClose={() => setJustCompletedOrder(null)}
        onTrackOrder={handleTrackSpecificOrder}
      />

    </div>
  );
}
