import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Settings, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ChevronRight, 
  ExternalLink,
  ShieldCheck,
  Facebook,
  Youtube,
  Instagram,
  Linkedin,
  Twitter
} from 'lucide-react';
import { siteConfig } from '../config/site.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Footer() {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#121D42] text-slate-300 pt-14 pb-8 border-t-4 border-[#F28C28]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 pb-10 border-b border-slate-700/60">
          
          {/* Column 1: Institute Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 min-h-[44px]">
              <div className="w-10 h-10 bg-[#1B2A5C] border border-[#F28C28]/40 rounded-xl flex items-center justify-center text-white shadow-sm shrink-0">
                <Settings className="w-6 h-6 text-[#F28C28] animate-[spin_24s_linear_infinite] absolute opacity-30" />
                <GraduationCap className="w-5 h-5 text-white relative z-10" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white tracking-tight">
                  {siteConfig.name}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#F28C28] font-bold">
                  {language === 'hi' ? 'NCVT एवं SCVT संबद्ध' : 'NCVT & SCVT Affiliated'}
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t('footerDesc')}
            </p>

            <div className="inline-flex items-center gap-2 p-2 bg-[#1B2A5C]/60 rounded-lg border border-slate-700 text-xs text-amber-200">
              <ShieldCheck className="w-4 h-4 text-[#F28C28] shrink-0" />
              <span>{siteConfig.affiliationCode}</span>
            </div>

            {/* Social Icons (all >= 44px min touch size) */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook page"
                className="w-11 h-11 rounded-full bg-[#1B2A5C] flex items-center justify-center hover:bg-[#F28C28] hover:text-white transition-colors text-slate-300 touch-manipulation"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube channel"
                className="w-11 h-11 rounded-full bg-[#1B2A5C] flex items-center justify-center hover:bg-[#F28C28] hover:text-white transition-colors text-slate-300 touch-manipulation"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram handle"
                className="w-11 h-11 rounded-full bg-[#1B2A5C] flex items-center justify-center hover:bg-[#F28C28] hover:text-white transition-colors text-slate-300 touch-manipulation"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                className="w-11 h-11 rounded-full bg-[#1B2A5C] flex items-center justify-center hover:bg-[#F28C28] hover:text-white transition-colors text-slate-300 touch-manipulation"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="X / Twitter account"
                className="w-11 h-11 rounded-full bg-[#1B2A5C] flex items-center justify-center hover:bg-[#F28C28] hover:text-white transition-colors text-slate-300 touch-manipulation"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F28C28]"></span>
              {t('quickLinks')}
            </h3>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-[#F28C28] transition-colors flex items-center gap-1.5 min-h-[36px] touch-manipulation">
                  <ChevronRight className="w-3.5 h-3.5 text-[#F28C28]" /> {t('navAbout')}
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-[#F28C28] transition-colors flex items-center gap-1.5 min-h-[36px] touch-manipulation">
                  <ChevronRight className="w-3.5 h-3.5 text-[#F28C28]" /> {t('navCourses')}
                </Link>
              </li>
              <li>
                <a href="/#placements" className="hover:text-[#F28C28] transition-colors flex items-center gap-1.5 min-h-[36px] touch-manipulation">
                  <ChevronRight className="w-3.5 h-3.5 text-[#F28C28]" /> {language === 'hi' ? 'प्लेसमेंट रिकॉर्ड (2022-25)' : 'Placement Statistics'}
                </a>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#F28C28] transition-colors flex items-center gap-1.5 min-h-[36px] touch-manipulation">
                  <ChevronRight className="w-3.5 h-3.5 text-[#F28C28]" /> {t('navGallery')}
                </Link>
              </li>
              <li>
                <Link to="/notices" className="hover:text-[#F28C28] transition-colors flex items-center gap-1.5 min-h-[36px] touch-manipulation">
                  <ChevronRight className="w-3.5 h-3.5 text-[#F28C28]" /> {t('navNotices')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F28C28] transition-colors flex items-center gap-1.5 min-h-[36px] touch-manipulation">
                  <ChevronRight className="w-3.5 h-3.5 text-[#F28C28]" /> {t('navContact')}
                </Link>
              </li>
            </ul>

            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mt-5 mb-2">
              {t('popularTrades')}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              <Link to="/courses/electrician" className="px-2.5 py-1 min-h-[32px] flex items-center bg-[#1B2A5C] text-xs text-slate-300 hover:text-white hover:bg-[#F28C28] rounded-md transition-colors">Electrician</Link>
              <Link to="/courses/fitter" className="px-2.5 py-1 min-h-[32px] flex items-center bg-[#1B2A5C] text-xs text-slate-300 hover:text-white hover:bg-[#F28C28] rounded-md transition-colors">Fitter</Link>
              <Link to="/courses/welder" className="px-2.5 py-1 min-h-[32px] flex items-center bg-[#1B2A5C] text-xs text-slate-300 hover:text-white hover:bg-[#F28C28] rounded-md transition-colors">Welder</Link>
              <Link to="/courses/copa" className="px-2.5 py-1 min-h-[32px] flex items-center bg-[#1B2A5C] text-xs text-slate-300 hover:text-white hover:bg-[#F28C28] rounded-md transition-colors">COPA</Link>
            </div>
          </div>

          {/* Column 3: Govt Portals & Recognition */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F28C28]"></span>
              {t('govtPortals')}
            </h3>
            <ul className="space-y-1.5 text-sm text-slate-400">
              <li>
                <a
                  href="https://www.ncvtmis.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center justify-between group min-h-[36px] touch-manipulation"
                >
                  <span className="group-hover:text-[#F28C28]">NCVT MIS Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#F28C28]" />
                </a>
              </li>
              <li>
                <a
                  href="https://bharatskills.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center justify-between group min-h-[36px] touch-manipulation"
                >
                  <span className="group-hover:text-[#F28C28]">Bharat Skills (NIMI Books)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#F28C28]" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.apprenticeshipindia.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center justify-between group min-h-[36px] touch-manipulation"
                >
                  <span className="group-hover:text-[#F28C28]">Apprenticeship India (NAPS)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#F28C28]" />
                </a>
              </li>
              <li>
                <a
                  href="https://dgt.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center justify-between group min-h-[36px] touch-manipulation"
                >
                  <span className="group-hover:text-[#F28C28]">DGT Govt of India</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#F28C28]" />
                </a>
              </li>
              <li>
                <a
                  href="https://scholarships.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center justify-between group min-h-[36px] touch-manipulation"
                >
                  <span className="group-hover:text-[#F28C28]">National Scholarship Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#F28C28]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Timings */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F28C28]"></span>
              {t('contactInfo')}
            </h3>

            <div className="flex items-start gap-3 text-xs sm:text-sm">
              <MapPin className="w-4 h-4 text-[#F28C28] shrink-0 mt-1" />
              <span>{siteConfig.contact.fullAddress}</span>
            </div>

            <div className="flex items-center gap-3 text-xs sm:text-sm">
              <Phone className="w-4 h-4 text-[#F28C28] shrink-0" />
              <div className="flex flex-col">
                <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors min-h-[24px]">
                  {siteConfig.contact.phone}
                </a>
                <a href={`tel:${siteConfig.contact.altPhone.replace(/\s+/g, '')}`} className="text-xs text-slate-400 hover:text-white min-h-[24px]">
                  {siteConfig.contact.altPhone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs sm:text-sm">
              <Mail className="w-4 h-4 text-[#F28C28] shrink-0" />
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors min-h-[24px]">
                {siteConfig.contact.email}
              </a>
            </div>

            <div className="pt-2 border-t border-slate-700/60 mt-3">
              <div className="flex items-start gap-2.5 text-xs text-slate-400">
                <Clock className="w-4 h-4 text-[#F28C28] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-200">{t('officeHours')}</p>
                  <p>{siteConfig.timings.weekdays}</p>
                  <p className="text-rose-400">{siteConfig.timings.sunday}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 text-center sm:text-left">
          <p>© {currentYear} {siteConfig.name}. {t('copyrightText')}</p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link to="/about" className="hover:text-slate-300 min-h-[36px] flex items-center">{t('navAbout')}</Link>
            <span>•</span>
            <Link to="/courses" className="hover:text-slate-300 min-h-[36px] flex items-center">{t('navCourses')}</Link>
            <span>•</span>
            <Link to="/notices" className="hover:text-slate-300 min-h-[36px] flex items-center">{t('navNotices')}</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-slate-300 min-h-[36px] flex items-center">{t('navContact')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
