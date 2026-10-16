import { Calendar, Download, Pin, Flame, Tag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function NoticeCard({ notice, onDownload }) {
  const { t } = useLanguage();

  if (!notice) return null;

  // Format readable date
  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const getCategoryColor = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'admission':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'examination':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'scholarship':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'holiday':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-amber-50 text-amber-800 border-amber-200';
    }
  };

  return (
    <div
      className={`rounded-xl p-4 sm:p-5 border transition-all duration-200 relative flex flex-col justify-between ${
        notice.isPinned
          ? 'bg-gradient-to-r from-[#FFF8F0] to-white border-[#F28C28] shadow-md ring-1 ring-[#F28C28]/30'
          : 'bg-white border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300'
      }`}
    >
      <div>
        {/* Top bar: Category + Badges */}
        <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border flex items-center gap-1 ${getCategoryColor(notice.category)}`}>
              <Tag className="w-3 h-3" />
              {notice.category}
            </span>

            {notice.isNew && (
              <span className="bg-[#F28C28] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                <Flame className="w-3 h-3" /> NEW
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            {notice.isPinned && (
              <span className="inline-flex items-center gap-1 text-[#F28C28] font-bold text-xs bg-[#FFF4E8] px-2 py-0.5 rounded-md">
                <Pin className="w-3 h-3 rotate-45" /> {t('pinnedNotice')}
              </span>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{formatDate(notice.date)}</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className={`text-base sm:text-lg font-bold tracking-tight mb-2 leading-snug ${
          notice.isPinned ? 'text-[#1B2A5C]' : 'text-slate-800'
        }`}>
          {notice.title}
        </h3>

        {/* Description snippet */}
        <p className="text-xs sm:text-sm text-[#5C677D] line-clamp-2 leading-relaxed mb-4">
          {notice.description}
        </p>
      </div>

      {/* Bottom Actions with >= 44px touch targets */}
      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="text-[11px] text-slate-400 font-medium">
          Ref: NCVT/CTS-2025/{notice.id}
        </span>

        <button
          type="button"
          onClick={() => {
            if (onDownload) {
              onDownload(notice);
            } else {
              alert(`Downloading official notice: ${notice.title}`);
            }
          }}
          className="inline-flex items-center justify-center gap-1.5 px-4 min-h-[44px] rounded-xl bg-[#EEF2FA] hover:bg-[#F28C28] text-[#1B2A5C] hover:text-white font-bold transition-all shadow-2xs cursor-pointer touch-manipulation active:scale-95"
          aria-label={`Download PDF notice for ${notice.title}`}
        >
          <Download className="w-3.5 h-3.5" />
          <span>{t('downloadPdf')}</span>
        </button>
      </div>
    </div>
  );
}
