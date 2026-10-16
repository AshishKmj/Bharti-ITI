import { Link } from 'react-router-dom';
import { Clock, Users, ArrowRight, Award, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function CourseCard({ course, onEnquire, className = "" }) {
  const { t, language } = useLanguage();

  if (!course) return null;

  return (
    <div className={`bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1 ${className}`}>
      {/* Course Image & Badge */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
        <img
          src={course.image}
          alt={course.name}
          width={400}
          height={208}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://picsum.photos/seed/${encodeURIComponent(course.slug)}/800/600`;
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Sector Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider shadow-sm ${
            course.sector === 'Engineering'
              ? 'bg-[#1B2A5C] text-white'
              : 'bg-emerald-700 text-white'
          }`}>
            {language === 'hi' ? (course.sector === 'Engineering' ? 'इंजीनियरिंग' : 'गैर-इंजीनियरिंग') : course.sector}
          </span>
        </div>

        {/* Duration badge top right */}
        <div className="absolute top-3 right-3 bg-[#F28C28] text-white px-2.5 py-1 rounded-md text-xs font-bold shadow-sm flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{course.duration.split(' ')[0]} {course.duration.split(' ')[1]}</span>
        </div>

        {/* Title overlay at bottom */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="text-lg sm:text-xl font-bold leading-tight drop-shadow-xs group-hover:text-[#FCD8B0] transition-colors">
            {course.name}
          </h3>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata pill row */}
          <div className="flex items-center justify-between text-xs text-[#5C677D] pb-3 border-b border-slate-100">
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#F28C28]" />
              <span>{course.seats} {t('seats')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-[#1B2A5C]" />
              <span>NCVT Affiliated</span>
            </div>
          </div>

          {/* Short description */}
          <p className="mt-3 text-xs sm:text-sm text-[#5C677D] line-clamp-3 leading-relaxed">
            {course.overview}
          </p>

          {/* Quick eligibility check */}
          <div className="mt-3.5 p-2 bg-slate-50 rounded-lg text-[11px] text-[#222B3A] flex items-start gap-1.5 border border-slate-100">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong className="font-semibold text-slate-800">{t('eligibility')}</strong> {course.eligibility}</span>
          </div>
        </div>

        {/* Action Buttons (>= 44px min-height for touch targets) */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
          <Link
            to={`/courses/${course.slug}`}
            className="flex-1 min-h-[44px] px-3 text-center bg-[#EEF2FA] text-[#1B2A5C] hover:bg-[#1B2A5C] hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 group/btn touch-manipulation active:scale-95"
          >
            <span>{t('viewSyllabus')}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
          <button
            type="button"
            onClick={() => onEnquire && onEnquire(course.slug)}
            className="min-h-[44px] px-4 text-center bg-[#F28C28] hover:bg-[#D67417] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer touch-manipulation active:scale-95 flex items-center justify-center shrink-0"
          >
            {t('applyNow')}
          </button>
        </div>
      </div>
    </div>
  );
}
