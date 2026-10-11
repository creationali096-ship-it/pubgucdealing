import React, { useState } from 'react';
import { Order } from '../types';
import { STORE_INFO } from '../data/storeData';
import { CheckCircle2, Copy, Check, MessageSquare, ArrowRight, ShieldCheck, X } from 'lucide-react';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
  onTrackOrder: (order: Order) => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onTrackOrder,
}) => {
  const [copiedId, setCopiedId] = useState(false);

  if (!order) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi BattleZone, I have placed an order!\n\nOrder ID: ${order.orderId}\nPUBG Player ID: ${order.pubgPlayerId}\nPackage: ${order.packageName}\nAmount: Rs. ${order.amountPKR}\nPayment Method: ${order.paymentMethod.toUpperCase()}\nTID: ${order.transactionId}\n\nPlease verify and deliver my UC. Thanks!`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#0A0F1E] border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden my-6">
        
        {/* Header with celebration */}
        <div className="p-6 bg-gradient-to-b from-amber-500/20 via-slate-900 to-[#0A0F1E] text-center border-b border-slate-800">
          <div className="w-16 h-16 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-400/30">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
            Order Placed Successfully!
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
            Your top-up request has been registered in the BattleZone manual processing queue.
          </p>
        </div>

        {/* Order Details Body */}
        <div className="p-6 space-y-4">
          
          {/* Order ID Pill */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider">Your Order ID</div>
              <div className="text-xl font-black text-amber-400 font-mono-numbers">
                {order.orderId}
              </div>
            </div>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copiedId ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy ID</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Receipt Summary */}
          <div className="p-4 rounded-xl bg-[#060911] border border-slate-800 text-xs space-y-2.5">
            <div className="flex justify-between text-slate-400">
              <span>Target PUBG Character ID:</span>
              <strong className="text-white font-mono-numbers">{order.pubgPlayerId}</strong>
            </div>
            {order.playerNickname && (
              <div className="flex justify-between text-slate-400">
                <span>Player Nickname:</span>
                <span className="text-white">{order.playerNickname}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-400">
              <span>Selected Package:</span>
              <span className="text-amber-400 font-bold">{order.packageName}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Amount Paid:</span>
              <strong className="text-white font-mono-numbers">Rs. {order.amountPKR.toLocaleString()}</strong>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Payment Channel:</span>
              <span className="text-white uppercase font-bold">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Transaction ID (TID):</span>
              <strong className="text-sky-400 font-mono-numbers">{order.transactionId}</strong>
            </div>
            <div className="flex justify-between text-slate-400 pt-2 border-t border-slate-800/80">
              <span>Estimated Delivery:</span>
              <span className="text-emerald-400 font-bold">5 – 15 Minutes</span>
            </div>
          </div>

          {/* WhatsApp Confirmation Callout */}
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-slate-300 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              Send your Order ID to our WhatsApp team at <strong className="text-white font-mono-numbers">03405505283</strong> for instant priority verification!
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-2">
            <a
              href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Confirm on WhatsApp (03405505283)</span>
            </a>

            <div className="flex gap-2">
              <button
                onClick={() => onTrackOrder(order)}
                className="flex-1 py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Track This Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg border border-slate-700 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
