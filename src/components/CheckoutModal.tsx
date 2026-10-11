import React, { useState, useEffect } from 'react';
import { UCPackage, PaymentMethodType, Order } from '../types';
import { STORE_INFO, UC_PACKAGES } from '../data/storeData';
import { X, ShieldAlert, Copy, Check, Upload, ArrowRight, Smartphone, Coins, Info } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: UCPackage | null;
  initialPlayerId?: string;
  onOrderPlaced: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedPackage,
  initialPlayerId = '',
  onOrderPlaced,
}) => {
  const [pkg, setPkg] = useState<UCPackage>(selectedPackage || UC_PACKAGES[1]);
  const [pubgPlayerId, setPubgPlayerId] = useState(initialPlayerId);
  const [playerNickname, setPlayerNickname] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('jazzcash');
  const [transactionId, setTransactionId] = useState('');
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedPackage) {
      setPkg(selectedPackage);
    }
  }, [selectedPackage]);

  useEffect(() => {
    if (initialPlayerId) {
      setPubgPlayerId(initialPlayerId);
    }
  }, [initialPlayerId]);

  if (!isOpen) return null;

  const handleCopyAccount = (number: string) => {
    navigator.clipboard.writeText(number);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateSampleTid = () => {
    const prefix = paymentMethod === 'jazzcash' ? 'JC' : 'EP';
    const randomDigits = Math.floor(1000000000 + Math.random() * 9000000000);
    setTransactionId(`${prefix}${randomDigits}`);
  };

  const handleUseSampleScreenshot = () => {
    // Generate a clean mock canvas receipt
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 250;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(0, 0, 400, 250);
      ctx.fillStyle = '#EAB308';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(`BattleZone Top-Up Receipt (${paymentMethod.toUpperCase()})`, 20, 40);
      ctx.fillStyle = '#94A3B8';
      ctx.font = '13px sans-serif';
      ctx.fillText(`Sent To: Raja Ali Noor (${STORE_INFO.contactPhone})`, 20, 80);
      ctx.fillText(`Amount: Rs. ${pkg.pricePKR.toLocaleString()}`, 20, 110);
      ctx.fillText(`PUBG ID: ${pubgPlayerId || '5124892019'}`, 20, 140);
      ctx.fillStyle = '#38BDF8';
      ctx.fillText(`TID: ${transactionId || 'EP9283019284'}`, 20, 175);
      ctx.fillStyle = '#10B981';
      ctx.fillText('STATUS: SUCCESSFUL TRANSFER', 20, 215);
      setScreenshotPreview(canvas.toDataURL());
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!pubgPlayerId.trim() || !/^\d{7,12}$/.test(pubgPlayerId.trim())) {
      errs.pubgPlayerId = 'Please enter a valid numeric PUBG Character ID (7-12 digits).';
    }
    if (!whatsappNumber.trim() || whatsappNumber.trim().length < 10) {
      errs.whatsappNumber = 'Please enter your WhatsApp contact number (e.g. 03405505283).';
    }
    if (!transactionId.trim() || transactionId.trim().length < 6) {
      errs.transactionId = 'Please enter the Transaction ID (TID) received via SMS/App.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newOrderId = `BZ-${randomSuffix}`;

    const newOrder: Order = {
      orderId: newOrderId,
      pubgPlayerId: pubgPlayerId.trim(),
      playerNickname: playerNickname.trim() || undefined,
      packageId: pkg.id,
      packageName: `${pkg.name} (${pkg.totalUC} UC)`,
      totalUC: pkg.totalUC,
      amountPKR: pkg.pricePKR,
      whatsappNumber: whatsappNumber.trim(),
      paymentMethod,
      transactionId: transactionId.trim(),
      screenshotUrl: screenshotPreview || undefined,
      createdAt: new Date().toISOString(),
      status: 'verified',
      statusNotes: 'Order submitted. Payment verification underway.',
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onOrderPlaced(newOrder);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#090E1A] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-6">
        
        {/* Modal Top Bar */}
        <div className="p-5 sm:p-6 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-slate-950 font-black text-sm">
              BZ
            </span>
            <div>
              <h2 className="text-lg font-black text-white font-heading">
                PUBG UC Checkout Form
              </h2>
              <p className="text-xs text-slate-400">
                Official direct top-up · Manual verification (5-15 mins)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* Security Tip Banner as explicitly mandated */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300">Security tip:</strong> Only request the PUBG Player ID needed for a legitimate top-up. Never ask customers for their PUBG password or email password.
            </div>
          </div>

          {/* Field 1: PUBG Player ID */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-white uppercase tracking-wider">
                1. PUBG Player ID <span className="text-rose-400">*</span>
              </label>
              <button
                type="button"
                onClick={() => setPubgPlayerId('5124892019')}
                className="text-[11px] text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
              >
                Use Sample ID (5124892019)
              </button>
            </div>
            <input
              type="text"
              required
              maxLength={12}
              value={pubgPlayerId}
              onChange={(e) => setPubgPlayerId(e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 5124892019 (7-12 digits)"
              className={`w-full bg-[#060911] border rounded-lg px-3.5 py-2.5 text-sm font-mono-numbers text-white placeholder:text-slate-500 focus:outline-none ${
                errors.pubgPlayerId ? 'border-rose-500' : 'border-slate-700 focus:border-amber-400'
              }`}
            />
            {errors.pubgPlayerId && (
              <p className="text-[11px] text-rose-400 mt-1">{errors.pubgPlayerId}</p>
            )}
            <p className="text-[11px] text-slate-400 mt-1">
              Find this in PUBG Mobile lobby &gt; Avatar &gt; Basic Info &gt; Character ID.
            </p>
          </div>

          {/* Field 2: Player/Nickname (Optional) */}
          <div>
            <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1.5">
              2. Player / Nickname <span className="text-slate-400 font-normal normal-case">(Optional)</span>
            </label>
            <input
              type="text"
              value={playerNickname}
              onChange={(e) => setPlayerNickname(e.target.value)}
              placeholder="e.g. Raja_Ali_Sniper (for double-check confirmation)"
              className="w-full bg-[#060911] border border-slate-700 focus:border-amber-400 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none"
            />
          </div>

          {/* Field 3: Selected UC Package */}
          <div>
            <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">
              3. Selected UC Package <span className="text-rose-400">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {UC_PACKAGES.slice(0, 4).map((p) => {
                const isSelected = pkg.id === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPkg(p)}
                    className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-400/15 border-amber-400 text-white shadow-sm'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold font-heading">{p.name}</div>
                    <div className="text-sm font-extrabold text-amber-400 font-mono-numbers">
                      {p.totalUC} UC
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono-numbers mt-0.5">
                      Rs. {p.pricePKR.toLocaleString()}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Package Summary Box */}
            <div className="mt-2.5 p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-400" />
                <span className="text-slate-300">
                  Total UC to be received: <strong className="text-amber-400">{pkg.totalUC} UC</strong>
                </span>
              </div>
              <div className="text-white font-mono-numbers font-bold text-sm">
                Payable: Rs. {pkg.pricePKR.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Field 4: Customer WhatsApp Number */}
          <div>
            <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1.5">
              4. Customer WhatsApp Number <span className="text-rose-400">*</span>
            </label>
            <input
              type="tel"
              required
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="e.g. 03405505283"
              className={`w-full bg-[#060911] border rounded-lg px-3.5 py-2.5 text-sm font-mono-numbers text-white placeholder:text-slate-500 focus:outline-none ${
                errors.whatsappNumber ? 'border-rose-500' : 'border-slate-700 focus:border-amber-400'
              }`}
            />
            {errors.whatsappNumber && (
              <p className="text-[11px] text-rose-400 mt-1">{errors.whatsappNumber}</p>
            )}
            <p className="text-[11px] text-slate-400 mt-1">
              Order confirmation & delivery notification will be sent to this WhatsApp.
            </p>
          </div>

          {/* Field 5: Payment Method */}
          <div>
            <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">
              5. Payment Method <span className="text-rose-400">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label
                className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-colors ${
                  paymentMethod === 'jazzcash'
                    ? 'bg-red-500/10 border-red-500 text-white'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="jazzcash"
                  checked={paymentMethod === 'jazzcash'}
                  onChange={() => setPaymentMethod('jazzcash')}
                  className="accent-red-500"
                />
                <span className="text-xs font-bold">JazzCash</span>
              </label>

              <label
                className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-colors ${
                  paymentMethod === 'easypaisa'
                    ? 'bg-emerald-500/10 border-emerald-500 text-white'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="easypaisa"
                  checked={paymentMethod === 'easypaisa'}
                  onChange={() => setPaymentMethod('easypaisa')}
                  className="accent-emerald-500"
                />
                <span className="text-xs font-bold">Easypaisa</span>
              </label>
            </div>

            {/* Live Payment Account Details Box */}
            <div className="mt-3 p-3.5 rounded-xl bg-[#060911] border border-slate-800 flex items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <div className="text-slate-400 text-[11px]">
                  Send <strong className="text-white">Rs. {pkg.pricePKR.toLocaleString()}</strong> to {paymentMethod === 'jazzcash' ? 'JazzCash' : 'Easypaisa'}:
                </div>
                <div className="font-bold text-white flex items-center gap-2 font-mono-numbers">
                  <span className="text-amber-400 text-sm">{STORE_INFO.contactPhone}</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-slate-300">Title: Raja Ali Noor</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopyAccount(STORE_INFO.contactPhone)}
                className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] font-semibold border border-slate-700 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
              >
                {copiedAccount ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Field 6: Transaction ID / Payment Screenshot */}
          <div className="space-y-3 pt-1">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-white uppercase tracking-wider">
                  6. Transaction ID (TID) <span className="text-rose-400">*</span>
                </label>
                <button
                  type="button"
                  onClick={handleGenerateSampleTid}
                  className="text-[11px] text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
                >
                  Generate Test TID
                </button>
              </div>
              <input
                type="text"
                required
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder={paymentMethod === 'jazzcash' ? 'e.g. 02938471928 (from 8558 SMS)' : 'e.g. 94820194821 (from 3737 SMS)'}
                className={`w-full bg-[#060911] border rounded-lg px-3.5 py-2.5 text-sm font-mono-numbers text-white placeholder:text-slate-500 focus:outline-none ${
                  errors.transactionId ? 'border-rose-500' : 'border-slate-700 focus:border-amber-400'
                }`}
              />
              {errors.transactionId && (
                <p className="text-[11px] text-rose-400 mt-1">{errors.transactionId}</p>
              )}
            </div>

            {/* Payment Screenshot Upload */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-white uppercase tracking-wider">
                  Payment Screenshot <span className="text-slate-400 font-normal normal-case">(Optional but speeds up approval)</span>
                </label>
                <button
                  type="button"
                  onClick={handleUseSampleScreenshot}
                  className="text-[11px] text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
                >
                  Create Mock Receipt
                </button>
              </div>

              {screenshotPreview ? (
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={screenshotPreview}
                      alt="Uploaded Screenshot"
                      className="w-16 h-12 object-cover rounded border border-slate-700"
                    />
                    <div className="text-xs text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Payment receipt attached</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setScreenshotPreview(null)}
                    className="text-xs text-rose-400 hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <label className="border border-dashed border-slate-700 hover:border-slate-500 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-900/30">
                  <Upload className="w-6 h-6 text-slate-400 mb-1" />
                  <span className="text-xs text-slate-300 font-medium">Click to upload payment screenshot</span>
                  <span className="text-[10px] text-slate-500 mt-0.5">JPG, PNG up to 5MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleScreenshotUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Total & Place Order Button */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider">Total Payable</div>
              <div className="text-2xl font-black text-amber-400 font-mono-numbers">
                Rs. {pkg.pricePKR.toLocaleString()}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm rounded-lg shadow-lg shadow-amber-400/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Verifying details...</span>
              ) : (
                <>
                  <span>Place Order</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
