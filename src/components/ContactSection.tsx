import React, { useState } from 'react';
import { STORE_INFO, FAQS } from '../data/storeData';
import { MessageSquare, Phone, Mail, Clock, Send, ChevronDown, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryWhatsapp, setInquiryWhatsapp] = useState('');
  const [inquiryPubgId, setInquiryPubgId] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryWhatsapp || !inquiryMessage) return;

    const ticketId = 'TKT-' + Math.floor(10000 + Math.random() * 90000);
    setSubmittedTicket(ticketId);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
            <span>24/7 Support Desk</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Pakistan Team</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-heading tracking-tight">
            Contact BattleZone UC Store
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            Need help with an order, JazzCash transfer, or character verification? Our support team is online 24/7 on WhatsApp and email.
          </p>
        </div>

        {/* 3 Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: WhatsApp */}
          <div className="p-6 rounded-xl bg-[#0B101E] border border-slate-800 hover:border-emerald-500/50 transition-colors flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white font-heading">
                WhatsApp Live Help
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Fastest response for order issues & transaction verification.
              </p>
              <div className="text-lg font-bold text-emerald-400 font-mono-numbers mt-3">
                {STORE_INFO.formattedPhone}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800">
              <a
                href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Hi%20BattleZone%2C%20I%20have%20an%20inquiry%20regarding%20PUBG%20UC%20top-up.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Card 2: Phone */}
          <div className="p-6 rounded-xl bg-[#0B101E] border border-slate-800 hover:border-amber-500/50 transition-colors flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-105 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white font-heading">
                Direct Helpline
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Call our Pakistani helpline during active top-up hours.
              </p>
              <div className="text-lg font-bold text-amber-400 font-mono-numbers mt-3">
                {STORE_INFO.formattedPhone}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800">
              <a
                href={`tel:${STORE_INFO.contactPhone}`}
                className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-lg border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Call Hotline</span>
              </a>
            </div>
          </div>

          {/* Card 3: Email */}
          <div className="p-6 rounded-xl bg-[#0B101E] border border-slate-800 hover:border-sky-500/50 transition-colors flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-4 group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white font-heading">
                Official Email
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                For commercial partnerships or bulk gaming inquiries.
              </p>
              <div className="text-xs sm:text-sm font-semibold text-sky-400 truncate mt-3">
                {STORE_INFO.email}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800">
              <a
                href={`mailto:${STORE_INFO.email}?subject=PUBG%20UC%20Store%20Inquiry`}
                className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-lg border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Send Email</span>
              </a>
            </div>
          </div>

        </div>

        {/* Support Inquiry Form & FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Inquiry Form */}
          <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-[#0B101E] border border-slate-800 shadow-xl">
            <h3 className="text-lg font-bold text-white font-heading mb-1">
              Send Support Message
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Fill out the form below. We will follow up on WhatsApp right away.
            </p>

            {submittedTicket ? (
              <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Ticket Created!</h4>
                <div className="text-xs text-slate-300">
                  Reference Ticket ID: <strong className="text-amber-400 font-mono-numbers">{submittedTicket}</strong>
                </div>
                <p className="text-xs text-slate-400">
                  Our agent will review your inquiry and reach out to {inquiryWhatsapp} on WhatsApp.
                </p>
                <a
                  href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Hi%2C%20Ticket%20${submittedTicket}%3A%20${encodeURIComponent(
                    inquiryMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors mt-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Directly on WhatsApp</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="e.g. Ali Raza"
                    className="w-full bg-[#070B14] border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={inquiryWhatsapp}
                    onChange={(e) => setInquiryWhatsapp(e.target.value)}
                    placeholder="0340-xxxxxxx"
                    className="w-full bg-[#070B14] border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    PUBG Player ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={inquiryPubgId}
                    onChange={(e) => setInquiryPubgId(e.target.value)}
                    placeholder="5124892019"
                    className="w-full bg-[#070B14] border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Message / Question
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    placeholder="How can we help with your PUBG top-up?"
                    className="w-full bg-[#070B14] border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* FAQ Accordion */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-lg font-bold text-white font-heading mb-4">
              Frequently Asked Questions (FAQ)
            </h3>

            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-xl bg-slate-900/60 border border-slate-800 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40"
                  >
                    <span className="text-sm font-semibold text-slate-200">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-amber-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center gap-3 mt-4">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="text-xs text-slate-300">
                Operating standard: <strong>Raasta simple, delivery tez.</strong> 24/7 assistance across Pakistan.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
