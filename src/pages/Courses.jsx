import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Filter, HelpCircle, Phone, RefreshCw } from 'lucide-react';
import { siteConfig } from '../config/site.js';
import { getCourses } from '../services/api.js';
import { filterCourses } from '../utils/pure_logic.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import PageBanner from '../components/PageBanner.jsx';
import CourseCard from '../components/CourseCard.jsx';
import { CourseCardSkeleton } from '../components/Skeleton.jsx';

export default function Courses({ onOpenEnquiry }) {
  const { t, language } = useLanguage();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    let isMounted = true;
    getCourses().then((list) => {
      if (isMounted) {
        setCourses(list);
        setLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, []);

  const filterOptions = [
    { id: "All", label: language === 'hi' ? 'सभी ट्रेड (10)' : 'All Trades (10)' },
    { id: "1 Year", label: language === 'hi' ? '1 वर्ष अवधि' : '1 Year Duration' },
    { id: "2 Years", label: language === 'hi' ? '2 वर्ष अवधि' : '2 Years Duration' },
    { id: "Engineering", label: language === 'hi' ? 'इंजीनियरिंग ट्रेड' : 'Engineering Trades' },
    { id: "Non-Engineering", label: language === 'hi' ? 'नॉन-इंजीनियरिंग (COPA)' : 'Non-Engineering (COPA)' },
  ];

  const durationArg = activeFilter === "1 Year" ? "1 Year" : activeFilter === "2 Years" ? "2 Years" : "All";
  const sectorArg = activeFilter === "Engineering" ? "Engineering" : activeFilter === "Non-Engineering" ? "Non-Engineering" : "All";

  const filteredCourses = filterCourses(courses, {
    search,
    duration: durationArg,
    sector: sectorArg,
  });

  return (
    <>
      <Helmet>
        <title>Technical Trades &amp; Courses | {siteConfig.name} - NCVT CTS Programs</title>
        <meta
          name="description"
          content="Explore all 10 CTS technical trades offered at Bharti ITI: Electrician, Fitter, Welder, COPA, MMV, Plumber, Wireman, Civil Draughtsman, RAC, and Electronics Mechanic."
        />
      </Helmet>

      {/* Banner */}
      <PageBanner
        title={language === 'hi' ? 'तकनीकी ट्रेड एवं पाठ्यक्रम' : 'Technical Trades & Courses'}
        hindiSubtitle="भारत सरकार (DGT/NCVT) द्वारा मान्यता प्राप्त औद्योगिक पाठ्यक्रम"
        breadcrumbs={[{ label: t('navCourses'), href: "/courses" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        
        {/* 1. FILTER & SEARCH CONTROLS */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/90 shadow-sm mb-8 sm:mb-10 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Live Search Input (min-h-[44px]) */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-11 pr-14 py-2.5 min-h-[44px] rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A5C]/20 focus:border-[#1B2A5C] transition-all"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer touch-manipulation"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Total Results Count */}
            <div className="text-xs font-semibold text-slate-500 shrink-0 self-center">
              {language === 'hi' ? 'दिखाए जा रहे हैं:' : 'Showing'} <span className="font-bold text-[#1B2A5C]">{filteredCourses.length}</span> {language === 'hi' ? 'ट्रेड' : `of ${courses.length} trades`}
            </div>
          </div>

          {/* Filter Chips (>= 44px min touch target on mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> {t('filterBy')}
            </span>
            {filterOptions.map((opt) => {
              const isSelected = activeFilter === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setActiveFilter(opt.id)}
                  className={`px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer touch-manipulation active:scale-95 flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'bg-[#1B2A5C] text-white shadow-sm ring-2 ring-[#1B2A5C]/20'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. COURSES GRID */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <CourseCardSkeleton key={n} />
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 sm:p-12 text-center border border-slate-200 max-w-xl mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#1B2A5C] mb-2">
              {language === 'hi' ? 'कोई ट्रेड नहीं मिला' : 'No Trades Found'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              {language === 'hi' ? `"${search}" से संबंधित कोई ट्रेड उपलब्ध नहीं है।` : `We couldn't find any trades matching "${search}". Try searching for another keyword or reset the filter.`}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveFilter("All");
              }}
              className="inline-flex items-center justify-center gap-1.5 px-5 min-h-[44px] bg-[#1B2A5C] text-white text-xs font-bold rounded-xl hover:bg-[#121D42] transition-colors cursor-pointer touch-manipulation active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'फ़िल्टर रीसेट करें' : 'Reset All Filters'}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.slug}
                course={course}
                onEnquire={(slug) => onOpenEnquiry && onOpenEnquiry(slug)}
              />
            ))}
          </div>
        )}

        {/* 3. "NOT SURE WHICH TRADE?" HELP STRIP */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-[#1B2A5C] to-[#283C7D] rounded-2xl p-5 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FFF4E8] text-[#F28C28] flex items-center justify-center shrink-0 shadow-xs">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold">
                {language === 'hi' ? 'समझ नहीं आ रहा कि कौन सा ट्रेड चुनें?' : 'Not Sure Which Trade Suits Your Background?'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                {language === 'hi'
                  ? 'हमारे वरिष्ठ तकनीकी परामर्शदाता से सीधे बात करें और अपनी योग्यता के अनुसार उपयुक्त ट्रेड जानें।'
                  : 'Speak directly with our senior career counselors. We will evaluate your 10th or 12th subjects, interests, and guide you towards the most in-demand trade with the highest placement rate.'}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={() => onOpenEnquiry && onOpenEnquiry()}
              className="w-full sm:w-auto px-5 min-h-[44px] rounded-xl bg-[#F28C28] hover:bg-[#D67417] text-white font-bold text-xs shadow-md transition-all cursor-pointer touch-manipulation active:scale-95 flex items-center justify-center"
            >
              {language === 'hi' ? 'निःशुल्क परामर्श लें' : 'Request Free Counseling'}
            </button>
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
              className="w-full sm:w-auto px-5 min-h-[44px] rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center justify-center gap-2 touch-manipulation"
            >
              <Phone className="w-3.5 h-3.5 text-[#F28C28]" />
              <span>{siteConfig.contact.phone}</span>
            </a>
          </div>
        </div>

      </div>
    </>
  );
}
