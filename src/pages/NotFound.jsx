import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Settings, Home, BookOpen, Bell, Phone } from 'lucide-react';
import { siteConfig } from '../config/site.js';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | {siteConfig.name}</title>
        <meta name="description" content="The page you are looking for does not exist on Bharti ITI's official website." />
      </Helmet>

      <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-lg w-full text-center bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl space-y-6">
          {/* Animated Gear 404 Visual */}
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            <Settings className="w-24 h-24 text-[#F28C28] animate-[spin_12s_linear_infinite] opacity-40 absolute" />
            <span className="text-4xl font-black text-[#1B2A5C] relative z-10">404</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-[#1B2A5C]">
              Page Not Found
            </h1>
            <p className="text-xs sm:text-sm text-[#5C677D] leading-relaxed">
              We couldn't find the page or technical trade you were looking for. It may have been moved, renamed, or temporarily unavailable.
            </p>
          </div>

          {/* Helpful Navigation Links */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1B2A5C] hover:bg-[#121D42] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <Link
              to="/courses"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#FFF4E8] text-[#F28C28] hover:bg-[#F28C28] hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-[#FCD8B0]"
            >
              <BookOpen className="w-4 h-4" />
              <span>Browse All Trades</span>
            </Link>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-center gap-6 text-xs text-slate-500">
            <Link to="/notices" className="hover:text-[#F28C28] flex items-center gap-1">
              <Bell className="w-3.5 h-3.5" /> Notice Board
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-[#F28C28] flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" /> Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
