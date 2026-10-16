import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  GraduationCap, 
  Settings, 
  Phone, 
  Mail, 
  ChevronRight, 
  Bell, 
  Flame, 
  FileText,
  Languages
} from 'lucide-react';
import { siteConfig } from '../config/site.js';
import { getNotices } from '../services/api.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Header({ onOpenEnquiry }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tickerNotices, setTickerNotices] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle scroll state for sticky shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch latest notices for ticker
  useEffect(() => {
    let isMounted = true;
    async function loadTicker() {
      try {
        const res = await getNotices({ page: 1, limit: 5 });
        if (isMounted && res.items) {
          setTickerNotices(res.items);
        }
      } catch (err) {
        console.error("Error loading ticker notices:", err);
      }
    }
    loadTicker();
    return () => { isMounted = false; };
  }, []);

  // Close mobile menu on Esc key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  const navItems = [
    { name: t('navHome'), href: "/" },
    { name: t('navAbout'), href: "/about" },
    { name: t('navCourses'), href: "/courses" },
    { name: t('navGallery'), href: "/gallery" },
    { name: t('navNotices'), href: "/notices" },
    { name: t('navContact'), href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white transition-shadow duration-300 select-none">
      {/* 1. TOP NOTICE TICKER BAR */}
      <div className="bg-[#121D42] text-slate-200 border-b border-[#283C7D] text-xs py-1.5 px-3 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
          {/* Ticker label */}
          <div className="flex items-center gap-1.5 font-semibold text-[#F28C28] shrink-0 z-10 bg-[#121D42] pr-2">
            <Bell className="w-3.5 h-3.5 animate-bounce" />
            <span className="uppercase tracking-wider text-[11px] font-bold">
              {t('latestUpdates')}:
            </span>
          </div>

          {/* Scrolling ticker track */}
          <div className="relative flex-1 overflow-hidden h-5">
            <div className="animate-ticker flex items-center gap-8 cursor-pointer">
              {(tickerNotices.length > 0 ? tickerNotices : [
                { id: 1, title: "Admission Open for CTS Session 2025-26 - Apply Online or Visit Campus", isNew: true },
                { id: 2, title: "AITT Supplementary Practical & CBT Examination Schedule Announced", isNew: true },
                { id: 3, title: "Maruti Suzuki & Tata Power On-Campus Recruitment Drive", isNew: false }
              ]).concat(tickerNotices).map((notice, idx) => (
                <Link
                  key={`${notice.id}-${idx}`}
                  to="/notices"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors group"
                >
                  {notice.isNew && (
                    <span className="bg-[#F28C28] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-xs flex items-center gap-0.5">
                      <Flame className="w-2.5 h-2.5" /> NEW
                    </span>
                  )}
                  <span className="group-hover:underline text-[12px] whitespace-nowrap">
                    {notice.title}
                  </span>
                  <span className="text-slate-500">•</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick contact header info + Language selector (desktop only) */}
          <div className="hidden lg:flex items-center gap-4 text-[12px] text-slate-300 shrink-0 z-10 bg-[#121D42] pl-3">
            <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`} className="flex items-center gap-1 hover:text-[#F28C28] transition-colors">
              <Phone className="w-3 h-3 text-[#F28C28]" />
              <span>{siteConfig.contact.phone}</span>
            </a>
            <span className="text-slate-600">|</span>
            <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-1 hover:text-[#F28C28] transition-colors">
              <Mail className="w-3 h-3 text-[#F28C28]" />
              <span>{siteConfig.contact.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <div className={`transition-all duration-200 border-b border-slate-200/80 bg-white ${isScrolled ? 'shadow-md py-2' : 'py-2.5 sm:py-3'}`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
          {/* Logo & Branding */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-[#1B2A5C] rounded-lg p-1 min-h-[44px]">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-tr from-[#1B2A5C] to-[#283C7D] rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform shrink-0">
              <Settings className="w-7 h-7 text-[#F28C28] opacity-30 absolute animate-[spin_18s_linear_infinite]" />
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white relative z-10 drop-shadow" />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#F28C28] rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-[7px] font-black text-white">✓</span>
              </div>
            </div>
            
            <div className="flex flex-col text-left">
              <span className="text-lg sm:text-xl md:text-2xl font-black text-[#1B2A5C] tracking-tight group-hover:text-[#F28C28] transition-colors leading-tight">
                {siteConfig.name}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-[#5C677D] tracking-wide uppercase line-clamp-1">
                {language === 'hi' ? 'NCVT एवं SCVT मान्यता प्राप्त' : siteConfig.affiliation}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm transition-all duration-200 min-h-[44px] flex items-center ${
                    isActive
                      ? "text-[#F28C28] bg-[#FFF4E8] font-bold shadow-xs border-b-2 border-[#F28C28]"
                      : "text-[#222B3A] hover:text-[#1B2A5C] hover:bg-slate-100/80 font-medium"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Language Toggle + Action CTAs */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Language Switcher Pill */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                aria-label="Switch to English"
                className={`px-2 py-1.5 rounded-md text-xs font-bold transition-all min-h-[38px] sm:min-h-[40px] flex items-center justify-center cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#1B2A5C] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('hi')}
                aria-label="हिन्दी में बदलें"
                className={`px-2 py-1.5 rounded-md text-xs font-bold transition-all min-h-[38px] sm:min-h-[40px] flex items-center justify-center cursor-pointer ${
                  language === 'hi'
                    ? 'bg-[#F28C28] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                हिन्दी
              </button>
            </div>

            {/* Desktop Enquire Now */}
            <div className="hidden sm:flex items-center">
              <button
                type="button"
                onClick={onOpenEnquiry}
                className="inline-flex items-center justify-center px-4 py-2.5 min-h-[44px] text-sm font-bold rounded-xl text-white bg-[#F28C28] hover:bg-[#D67417] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#F28C28] focus:ring-offset-2"
              >
                <FileText className="w-4 h-4 mr-1.5" />
                {t('enquireNow')}
              </button>
            </div>

            {/* Mobile Enquire Button */}
            <button
              type="button"
              onClick={onOpenEnquiry}
              className="sm:hidden px-3 py-2 min-h-[44px] text-xs font-bold rounded-xl text-white bg-[#F28C28] hover:bg-[#D67417] shadow-xs cursor-pointer flex items-center justify-center active:scale-95"
            >
              {t('enquireNow')}
            </button>

            {/* Mobile Hamburger menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 min-w-[44px] min-h-[44px] rounded-xl text-[#1B2A5C] hover:bg-slate-100 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#1B2A5C] cursor-pointer touch-manipulation"
              aria-label={mobileMenuOpen ? t('closeMenu') : t('openMenu')}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. MOBILE SLIDE-IN DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-[280px] w-full bg-white shadow-2xl flex flex-col justify-between z-50 animate-in slide-in-from-right duration-250">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-[#1B2A5C] text-white">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-[#F28C28]" />
                  <span className="font-bold text-base">{siteConfig.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer touch-manipulation"
                  aria-label={t('closeMenu')}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Language Switcher Inside Drawer */}
              <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                  <Languages className="w-3.5 h-3.5 text-[#F28C28]" />
                  <span>Language / भाषा:</span>
                </span>
                <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md min-h-[32px] cursor-pointer ${
                      language === 'en' ? 'bg-[#1B2A5C] text-white' : 'text-slate-600'
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('hi')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md min-h-[32px] cursor-pointer ${
                      language === 'hi' ? 'bg-[#F28C28] text-white' : 'text-slate-600'
                    }`}
                  >
                    हिन्दी
                  </button>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="p-3 space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3.5 py-3 min-h-[44px] rounded-xl text-sm font-medium transition-colors touch-manipulation ${
                        isActive
                          ? "bg-[#FFF4E8] text-[#F28C28] font-bold"
                          : "text-[#222B3A] hover:bg-slate-50"
                      }`
                    }
                  >
                    <span>{item.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Drawer Footer Details */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full py-3 min-h-[44px] px-4 bg-[#F28C28] hover:bg-[#D67417] text-white font-bold text-xs rounded-xl shadow-md text-center block cursor-pointer active:scale-95 touch-manipulation"
              >
                {t('admissionHelp')}
              </button>

              <div className="text-xs text-slate-600 space-y-1.5 pt-2">
                <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`} className="flex items-center gap-2 py-1 min-h-[36px]">
                  <Phone className="w-3.5 h-3.5 text-[#F28C28]" />
                  <span>{siteConfig.contact.phone}</span>
                </a>
                <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2 py-1 min-h-[36px]">
                  <Mail className="w-3.5 h-3.5 text-[#F28C28]" />
                  <span>{siteConfig.contact.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
