import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Search, 
  Filter, 
  Bell, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2,
  Calendar,
  X
} from 'lucide-react';
import { siteConfig } from '../config/site.js';
import { getNotices } from '../services/api.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import PageBanner from '../components/PageBanner.jsx';
import NoticeCard from '../components/NoticeCard.jsx';
import { NoticeCardSkeleton } from '../components/Skeleton.jsx';

export default function Notices() {
  const { t, language } = useLanguage();
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [downloadSuccessNotice, setDownloadSuccessNotice] = useState(null);
  const [noticesResult, setNoticesResult] = useState({
    items: [],
    totalPages: 1,
    totalItems: 0,
    currentPage: 1,
  });
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: "All", label: language === 'hi' ? 'सभी सूचनाएँ' : 'All' },
    { id: "Admission", label: language === 'hi' ? 'प्रवेश (Admission)' : 'Admission' },
    { id: "Examination", label: language === 'hi' ? 'परीक्षा (Exam)' : 'Examination' },
    { id: "Holiday", label: language === 'hi' ? 'अवकाश (Holiday)' : 'Holiday' },
    { id: "Scholarship", label: language === 'hi' ? 'छात्रवृत्ति (Scholarship)' : 'Scholarship' },
    { id: "General", label: language === 'hi' ? 'सामान्य (General)' : 'General' },
  ];

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getNotices({ category, search, page, limit: 8 })
      .then((res) => {
        if (isMounted) {
          setNoticesResult(res);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Notice error:", err);
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [category, search, page]);

  // Reset to page 1 on search or category filter change
  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleDownload = (item) => {
    setDownloadSuccessNotice(item.title);
    setTimeout(() => {
      setDownloadSuccessNotice(null);
    }, 4500);
  };

  return (
    <>
      <Helmet>
        <title>Notice Board &amp; Circulars | {siteConfig.name} - DGT NCVT Announcements</title>
        <meta
          name="description"
          content="Latest announcements, AITT examination dates, admission circulars, scholarship updates, and holiday schedules from Bharti ITI."
        />
      </Helmet>

      {/* Banner */}
      <PageBanner
        title={language === 'hi' ? 'आधिकारिक सूचना पट्ट' : 'Official Notice Board'}
        hindiSubtitle="महत्वपूर्ण सूचनाएँ, परीक्षा समय सारिणी एवं प्रवेश घोषणाएँ"
        breadcrumbs={[{ label: t('navNotices'), href: "/notices" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        
        {/* Download notification banner */}
        {downloadSuccessNotice && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs sm:text-sm flex items-center justify-between shadow-sm animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                <strong>Circular Downloaded:</strong> {downloadSuccessNotice}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setDownloadSuccessNotice(null)}
              className="text-emerald-700 hover:text-emerald-900 min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Search & Category Filter Box */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/90 shadow-sm mb-8 sm:mb-10 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Box */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder={language === 'hi' ? 'सूचना, परीक्षा या छात्रवृत्ति खोजें...' : 'Search circulars by keyword, exam name, scholarship...'}
                className="w-full pl-11 pr-14 py-2.5 min-h-[44px] rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A5C]/20 focus:border-[#1B2A5C] transition-all"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setPage(1);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Total Results */}
            <div className="text-xs font-semibold text-slate-500 shrink-0 self-center">
              {language === 'hi' ? 'कुल सूचनाएँ:' : 'Total Notices:'} <span className="font-bold text-[#1B2A5C]">{noticesResult.totalItems}</span>
            </div>
          </div>

          {/* Category Chips (min-h-[44px] touch target friendly) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> {t('filterBy')}
            </span>
            {categories.map((cat) => {
              const isSelected = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer touch-manipulation active:scale-95 flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'bg-[#1B2A5C] text-white shadow-sm ring-2 ring-[#1B2A5C]/20'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notices Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <NoticeCardSkeleton key={n} />
            ))}
          </div>
        ) : noticesResult.items.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 sm:p-12 text-center border border-slate-200 max-w-md mx-auto shadow-xs">
            <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#1B2A5C]">
              {language === 'hi' ? 'कोई सूचना नहीं मिली' : 'No Notices Found'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              {language === 'hi' ? `"${search}" से संबंधित कोई सर्कुलर उपलब्ध नहीं है।` : `There are no notices matching your query "${search}".`}
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory("All");
                setSearch("");
                setPage(1);
              }}
              className="px-5 py-2.5 min-h-[44px] rounded-xl bg-[#1B2A5C] text-white text-xs font-bold cursor-pointer hover:bg-[#121D42] inline-flex items-center justify-center active:scale-95"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {noticesResult.items.map((notice) => (
              <NoticeCard
                key={notice.id}
                notice={notice}
                onDownload={handleDownload}
              />
            ))}
          </div>
        )}

        {/* Pagination Controls (44px min touch target) */}
        {noticesResult.totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center cursor-pointer touch-manipulation active:scale-95"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {[...Array(noticesResult.totalPages)].map((_, i) => {
              const pageNum = i + 1;
              const isActive = pageNum === page;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setPage(pageNum)}
                  className={`min-h-[44px] min-w-[44px] rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center justify-center touch-manipulation active:scale-95 ${
                    isActive
                      ? 'bg-[#1B2A5C] text-white shadow-md'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              type="button"
              disabled={page >= noticesResult.totalPages}
              onClick={() => setPage((p) => Math.min(noticesResult.totalPages, p + 1))}
              className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center cursor-pointer touch-manipulation active:scale-95"
              aria-label="Next Page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

      </div>
    </>
  );
}
