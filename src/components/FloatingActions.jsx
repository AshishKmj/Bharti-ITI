import { useState, useEffect } from 'react';
import { ArrowUp, Phone, MessageCircle } from 'lucide-react';
import { siteConfig } from '../config/site.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Bharti ITI Admissions Desk! I am interested in technical trade courses for the 2025-26 session. Please share course details and fee structure.`
  );
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${whatsappMessage}`;
  const phoneCallUrl = `tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`;

  return (
    <>
      {/* 1. Desktop & Tablet Floating WhatsApp and Back-To-Top (Bottom Right) */}
      <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3">
        {/* Back to top button */}
        {showBackToTop && (
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="w-12 h-12 min-w-[44px] min-h-[44px] rounded-full bg-[#1B2A5C] text-white shadow-lg hover:bg-[#121D42] hover:scale-110 transition-all flex items-center justify-center cursor-pointer border-2 border-white focus:outline-none focus:ring-2 focus:ring-[#1B2A5C] touch-manipulation active:scale-95"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* WhatsApp Floating Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with admission counselor on WhatsApp"
          className="group flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 min-h-[44px] rounded-full shadow-xl hover:bg-[#20BD5A] hover:scale-105 transition-all duration-300 border-2 border-white focus:outline-none focus:ring-2 focus:ring-[#25D366] touch-manipulation"
        >
          <MessageCircle className="w-6 h-6 fill-white text-[#25D366] shrink-0" />
          <span className="hidden sm:inline font-bold text-xs tracking-wide">
            {t('chatWhatsApp')}
          </span>
        </a>
      </div>

      {/* 2. Mobile Sticky Bottom Bar (Quick Call & WhatsApp) - strictly >= 44px buttons */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center gap-2.5 shadow-2xl">
        <a
          href={phoneCallUrl}
          className="flex-1 min-h-[44px] py-2.5 px-3 bg-[#1B2A5C] hover:bg-[#121D42] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-all touch-manipulation"
        >
          <Phone className="w-4 h-4 text-[#F28C28] shrink-0" />
          <span>{t('callDesk')}</span>
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 min-h-[44px] py-2.5 px-3 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-all touch-manipulation"
        >
          <MessageCircle className="w-4 h-4 fill-white text-[#25D366] shrink-0" />
          <span>WhatsApp</span>
        </a>
      </div>
    </>
  );
}
