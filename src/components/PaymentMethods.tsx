import React, { useState } from 'react';
import { STORE_INFO } from '../data/storeData';
import { Copy, Check, Smartphone, Hash, ShieldCheck, ArrowRight, FileCheck } from 'lucide-react';
import paymentImg from '../assets/images/payment_mobile_wallets_1791703236923.jpg';

interface PaymentMethodsProps {
  onStartOrder: () => void;
}

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({ onStartOrder }) => {
  const [activeWallet, setActiveWallet] = useState<'jazzcash' | 'easypaisa'>('jazzcash');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
            <span>Pakistan Mobile Wallets</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Manual Verification</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-heading tracking-tight">
            JazzCash & Easypaisa Payment Guide
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            Follow the instructions below to make a zero-fee transfer from your mobile wallet. Keep your Transaction ID (TID) ready for the checkout form.
          </p>
        </div>

        {/* Wallet Switcher Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setActiveWallet('jazzcash')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeWallet === 'jazzcash'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-white shrink-0" />
              <span>JazzCash Transfer</span>
            </button>
            <button
              onClick={() => setActiveWallet('easypaisa')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeWallet === 'easypaisa'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-white shrink-0" />
              <span>Easypaisa Transfer</span>
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Official Account Details Card */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Account Information Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#0B101E] border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white font-heading">
                    {activeWallet === 'jazzcash' ? 'JazzCash Official Account' : 'Easypaisa Official Account'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Transfer the exact package amount to this account
                  </p>
                </div>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded text-white ${
                    activeWallet === 'jazzcash' ? 'bg-red-600' : 'bg-emerald-600'
                  }`}
                >
                  {activeWallet === 'jazzcash' ? 'JazzCash' : 'Easypaisa'}
                </span>
              </div>

              {/* Data Rows with Copy Buttons */}
              <div className="space-y-4 my-6">
                
                {/* Account Number */}
                <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">Account Number / Mobile</div>
                    <div className="text-lg font-black text-amber-400 font-mono-numbers">
                      {STORE_INFO.contactPhone}
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(STORE_INFO.contactPhone, 'accountNumber')}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded border border-slate-700 cursor-pointer transition-colors shrink-0"
                  >
                    {copiedField === 'accountNumber' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Number</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Account Title */}
                <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">Account Title / Receiver</div>
                    <div className="text-base font-bold text-white">
                      {STORE_INFO.jazzCashAccount.accountTitle}
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(STORE_INFO.jazzCashAccount.accountTitle, 'accountTitle')}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded border border-slate-700 cursor-pointer transition-colors shrink-0"
                  >
                    {copiedField === 'accountTitle' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Title</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Bank / Provider Name */}
                <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">Financial Institution</div>
                    <div className="text-sm font-semibold text-slate-300">
                      {activeWallet === 'jazzcash'
                        ? STORE_INFO.jazzCashAccount.bankName
                        : STORE_INFO.easyPaisaAccount.bankName}
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">Microfinance</span>
                </div>
              </div>

              {/* Step-by-Step App & USSD Instructions */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <h4 className="text-sm font-bold text-white">How to send from mobile:</h4>
                
                {activeWallet === 'jazzcash' ? (
                  <div className="space-y-3 text-xs text-slate-300">
                    <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5">
                      <div className="font-semibold text-amber-400 flex items-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5" />
                        <span>Method A: Via JazzCash App (Recommended)</span>
                      </div>
                      <ol className="list-decimal list-inside space-y-1 text-slate-300 pl-1">
                        <li>Open the JazzCash App on your phone and log in.</li>
                        <li>Tap on <strong>Money Transfer</strong> &gt; <strong>Mobile Account</strong>.</li>
                        <li>Enter recipient number: <strong className="text-white font-mono-numbers">03405505283</strong>.</li>
                        <li>Verify Account Title shows <strong className="text-white">Raja Ali Noor</strong>.</li>
                        <li>Enter exact package price (e.g. Rs. 3,000, Rs. 6,000, or Rs. 9,000) and authorize with your MPIN.</li>
                        <li>Copy the 11-12 digit <strong>TID (Transaction ID)</strong> from the confirmation screen or SMS from 8558.</li>
                      </ol>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5">
                      <div className="font-semibold text-amber-400 flex items-center gap-1.5">
                        <Hash className="w-3.5 h-3.5" />
                        <span>Method B: Via USSD Dial Code</span>
                      </div>
                      <p className="text-slate-300">
                        Dial <code className="text-amber-400 bg-slate-900 px-1.5 py-0.5 rounded font-mono-numbers">*786#</code> from your Jazz SIM &gt; Select 1 (Send Money) &gt; Select 1 (To Mobile Account) &gt; Enter <code className="text-amber-400 font-mono-numbers">03405505283</code> &gt; Enter Amount &gt; Confirm with MPIN.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 text-xs text-slate-300">
                    <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5">
                      <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5" />
                        <span>Method A: Via Easypaisa App (Recommended)</span>
                      </div>
                      <ol className="list-decimal list-inside space-y-1 text-slate-300 pl-1">
                        <li>Open Easypaisa App and sign in.</li>
                        <li>Tap on <strong>Send Money</strong> &gt; <strong>Easypaisa Transfer</strong>.</li>
                        <li>Enter Receiver Number: <strong className="text-white font-mono-numbers">03405505283</strong>.</li>
                        <li>Confirm the receiver name matches <strong className="text-white">Raja Ali Noor</strong>.</li>
                        <li>Enter the exact package amount (e.g. Rs. 3,000, Rs. 6,000, or Rs. 9,000) and click <strong>Send Now</strong>.</li>
                        <li>Save the screenshot or copy the <strong>Transaction ID (TID)</strong> sent via SMS from 3737.</li>
                      </ol>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5">
                      <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
                        <Hash className="w-3.5 h-3.5" />
                        <span>Method B: Via USSD Dial Code</span>
                      </div>
                      <p className="text-slate-300">
                        Dial <code className="text-emerald-400 bg-slate-900 px-1.5 py-0.5 rounded font-mono-numbers">*786#</code> from your Telenor SIM &gt; Select 1 (Money Transfer) &gt; Select 1 (Easypaisa) &gt; Enter <code className="text-emerald-400 font-mono-numbers">03405505283</code> &gt; Enter Amount &gt; Confirm with PIN.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-400">
                  Already completed payment?
                </div>
                <button
                  onClick={onStartOrder}
                  className="w-full sm:w-auto px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Go to Checkout & Submit TID</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Guide & Transaction ID Tutorial */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual Graphic Card */}
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#0B101E] shadow-xl">
              <img
                src={paymentImg}
                alt="Secure Mobile Payment Verification"
                referrerPolicy="no-referrer"
                className="w-full h-56 object-cover object-center"
              />
              <div className="p-5">
                <h4 className="text-sm font-bold text-white font-heading">
                  What is a Transaction ID (TID)?
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  A unique 11 or 12-digit numeric reference code assigned to your transfer by JazzCash (SMS 8558) or Easypaisa (SMS 3737). Our team matches this TID with our ledger in under 5 minutes to approve your UC top-up.
                </p>
              </div>
            </div>

            {/* Mock SMS Receipt Examples */}
            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <FileCheck className="w-4 h-4 text-amber-400" />
                <span>Example SMS Confirmation Formats:</span>
              </div>

              <div className="p-3 rounded-lg bg-black/60 border border-slate-800 text-[11px] font-mono-numbers text-slate-300 space-y-1">
                <div className="text-red-400 font-semibold">JazzCash SMS (From 8558):</div>
                <div className="text-slate-400">
                  "Rs. 6,000 sent to Raja Ali Noor (03405505283). Balance: Rs. 4,120. <strong className="text-amber-300">TID: 02938471928</strong>. 11-Oct-26 10:15"
                </div>
              </div>

              <div className="p-3 rounded-lg bg-black/60 border border-slate-800 text-[11px] font-mono-numbers text-slate-300 space-y-1">
                <div className="text-emerald-400 font-semibold">Easypaisa SMS (From 3737):</div>
                <div className="text-slate-400">
                  "You have successfully sent Rs. 3,000 to Raja Ali Noor 03405505283. <strong className="text-amber-300">TRX ID: 94820194821</strong>. Fee: Rs. 0.00."
                </div>
              </div>
            </div>

            {/* 24/7 Manual Support Callout */}
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-amber-400 shrink-0" />
              <div className="text-xs text-slate-300">
                <span className="font-semibold text-white">Manual Verification Promise:</span> Every transaction is reviewed by human operators in Pakistan for 100% order accuracy.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
