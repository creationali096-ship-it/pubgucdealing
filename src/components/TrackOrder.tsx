import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';
import { Search, CheckCircle2, Clock, AlertCircle, Copy, Check, MessageSquare, ChevronRight, Package } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

interface TrackOrderProps {
  orders: Order[];
  onOpenCheckout: () => void;
}

export const TrackOrder: React.FC<TrackOrderProps> = ({ orders, onOpenCheckout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0] || null);
  const [searched, setSearched] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    setSearched(true);

    if (!query) return;

    const found = orders.find(
      (o) =>
        o.orderId.toLowerCase() === query ||
        o.pubgPlayerId === query ||
        o.whatsappNumber.replace(/\D/g, '').includes(query.replace(/\D/g, ''))
    );

    setSelectedOrder(found || null);
  };

  const handleSelectSample = (order: Order) => {
    setSelectedOrder(order);
    setSearchQuery(order.orderId);
    setSearched(true);
  };

  const handleCopyOrderId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Delivered & Completed</span>
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-3.5 h-3.5 animate-spin" />
            <span>In Processing (5-15 Mins)</span>
          </span>
        );
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Check className="w-3.5 h-3.5" />
            <span>Payment Verified</span>
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-slate-500/10 text-slate-400 border border-slate-500/20">
            <Clock className="w-3.5 h-3.5" />
            <span>Pending Verification</span>
          </span>
        );
    }
  };

  const timelineSteps = [
    { label: 'Order Submitted', done: true },
    {
      label: 'Payment Verified',
      done: selectedOrder ? ['verified', 'processing', 'completed'].includes(selectedOrder.status) : false,
    },
    {
      label: 'UC Transfer Queued',
      done: selectedOrder ? ['processing', 'completed'].includes(selectedOrder.status) : false,
    },
    {
      label: 'Delivered to In-Game Mail',
      done: selectedOrder ? selectedOrder.status === 'completed' : false,
    },
  ];

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
            <span>Real-Time Status Check</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Manual Top-Up Tracker</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-heading tracking-tight">
            Track Your PUBG UC Order
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            Enter your BattleZone Order ID or registered WhatsApp number to see live fulfillment status.
          </p>
        </div>

        {/* Search Bar Container */}
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="flex gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-xl shadow-lg">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Order ID (e.g. BZ-77821) or PUBG ID..."
                className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm rounded-lg shadow transition-colors flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>Track Status</span>
            </button>
          </form>

          {/* Quick Clickable Sample Order Tags for testing */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span>Quick test orders:</span>
            {orders.slice(0, 3).map((o) => (
              <button
                key={o.orderId}
                onClick={() => handleSelectSample(o)}
                className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-mono-numbers hover:text-amber-300 cursor-pointer text-[11px] transition-colors"
              >
                {o.orderId} ({o.status})
              </button>
            ))}
          </div>
        </div>

        {/* Order Details View */}
        {selectedOrder ? (
          <div className="max-w-3xl mx-auto bg-[#0B101E] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            
            {/* Order Card Header */}
            <div className="p-6 bg-slate-900/80 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="text-xl font-black text-white font-mono-numbers">
                    {selectedOrder.orderId}
                  </span>
                  <button
                    onClick={() => handleCopyOrderId(selectedOrder.orderId)}
                    className="text-slate-400 hover:text-amber-400 transition-colors p-1"
                    title="Copy Order ID"
                  >
                    {copiedId ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Placed on {new Date(selectedOrder.createdAt).toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })}
                </div>
              </div>

              <div>{getStatusBadge(selectedOrder.status)}</div>
            </div>

            {/* Stepper Timeline */}
            <div className="p-6 border-b border-slate-800/80 bg-slate-950/40">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                Fulfillment Progress
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {timelineSteps.map((step, index) => (
                  <div key={index} className="flex flex-col items-start space-y-1.5">
                    <div className="flex items-center gap-2 w-full">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          step.done
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {step.done ? '✓' : index + 1}
                      </div>
                      <div
                        className={`h-1 flex-1 rounded ${
                          step.done ? 'bg-emerald-500/80' : 'bg-slate-800'
                        } ${index === timelineSteps.length - 1 ? 'hidden md:hidden' : ''}`}
                      />
                    </div>
                    <span
                      className={`text-xs ${
                        step.done ? 'text-white font-medium' : 'text-slate-500'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Specification Breakdown */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                
                <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="text-slate-400 mb-1">Target PUBG Character ID</div>
                  <div className="text-base font-bold text-amber-400 font-mono-numbers">
                    {selectedOrder.pubgPlayerId}
                  </div>
                  {selectedOrder.playerNickname && (
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Nickname: {selectedOrder.playerNickname}
                    </div>
                  )}
                </div>

                <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="text-slate-400 mb-1">Ordered UC Package</div>
                  <div className="text-base font-bold text-white">
                    {selectedOrder.packageName}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 font-mono-numbers">
                    Total: {selectedOrder.totalUC} UC (Rs. {selectedOrder.amountPKR.toLocaleString()})
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="text-slate-400 mb-1">Payment Method Used</div>
                  <div className="text-sm font-bold text-white capitalize">
                    {selectedOrder.paymentMethod}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 font-mono-numbers">
                    TID: {selectedOrder.transactionId}
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="text-slate-400 mb-1">Delivery Protocol</div>
                  <div className="text-sm font-semibold text-emerald-400">
                    Direct Character Recharge
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Est. Speed: 5–15 Minutes
                  </div>
                </div>

              </div>

              {selectedOrder.statusNotes && (
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                  <strong>Status Note:</strong> {selectedOrder.statusNotes}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <a
                  href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Hi%20BattleZone%2C%20checking%20status%20for%20Order%20${selectedOrder.orderId}%20(PUBG%20ID%3A%20${selectedOrder.pubgPlayerId})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Inquire on WhatsApp</span>
                </a>

                <button
                  onClick={onOpenCheckout}
                  className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-lg border border-slate-700 transition-colors cursor-pointer"
                >
                  Order Another Package
                </button>
              </div>

            </div>

          </div>
        ) : (
          searched && (
            <div className="max-w-md mx-auto text-center p-8 bg-slate-900/50 rounded-2xl border border-slate-800">
              <AlertCircle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white mb-1">Order Not Found</h3>
              <p className="text-xs text-slate-400 mb-4">
                No active order matches "{searchQuery}". Please check your Order ID format (e.g. BZ-77821) or contact our WhatsApp support.
              </p>
              <button
                onClick={() => handleSelectSample(orders[0])}
                className="text-xs text-amber-400 hover:underline cursor-pointer"
              >
                View sample completed order instead
              </button>
            </div>
          )
        )}

      </div>
    </section>
  );
};
