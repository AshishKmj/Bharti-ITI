import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function PageBanner({ title, hindiSubtitle, breadcrumbs = [] }) {
  return (
    <div className="relative bg-gradient-to-r from-[#1B2A5C] via-[#1E3066] to-[#121D42] text-white py-12 sm:py-16 overflow-hidden">
      {/* Decorative background grid and glowing circles */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F28C28_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#F28C28]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#1B2A5C]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 mb-4 flex-wrap">
            <Link
              to="/"
              className="inline-flex items-center gap-1 hover:text-[#F28C28] transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <div key={idx} className="flex items-center gap-2">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  {isLast ? (
                    <span className="text-[#F28C28] font-medium" aria-current="page">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      to={crumb.href}
                      className="hover:text-[#F28C28] transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            {title}
          </h1>

          {hindiSubtitle && (
            <p className="mt-2 text-sm sm:text-base text-amber-200/90 font-medium">
              {hindiSubtitle}
            </p>
          )}

          {/* Orange Accent Bar */}
          <div className="w-16 h-1 bg-[#F28C28] rounded-full mt-4" />
        </div>
      </div>
    </div>
  );
}
