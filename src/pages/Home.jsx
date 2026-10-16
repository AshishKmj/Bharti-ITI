import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowRight, 
  Award, 
  CheckCircle2, 
  Users, 
  Briefcase, 
  ShieldCheck, 
  Flame, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Quote, 
  Wrench,
  Sparkles,
  MoveRight
} from 'lucide-react';
import { siteConfig } from '../config/site.js';
import { getCourses, getNotices, getGallery, getTestimonials } from '../services/api.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import CourseCard from '../components/CourseCard.jsx';
import NoticeCard from '../components/NoticeCard.jsx';
import StatCounter from '../components/StatCounter.jsx';
import Lightbox from '../components/Lightbox.jsx';
import { CourseCardSkeleton, NoticeCardSkeleton } from '../components/Skeleton.jsx';
import PlacementDashboard from '../components/PlacementDashboard.jsx';

export default function Home({ onOpenEnquiry }) {
  const { t, language } = useLanguage();
  const [courses, setCourses] = useState([]);
  const [notices, setNotices] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Testimonials slider state
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Lightbox state for home gallery preview
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Ref for horizontal courses scroll on mobile
  const coursesScrollRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const [coursesRes, noticesRes, galleryRes, testRes] = await Promise.all([
          getCourses(),
          getNotices({ page: 1, limit: 4 }),
          getGallery('All'),
          getTestimonials(),
        ]);
        if (isMounted) {
          setCourses(coursesRes);
          setNotices(noticesRes.items || []);
          setGalleryItems(galleryRes.slice(0, 6)); // First 6 for preview
          setTestimonials(testRes);
          setLoading(false);
        }
      } catch (err) {
        console.error("Home data load error:", err);
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, []);

  // Testimonials auto-play slider
  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials]);

  const handlePrevTestimonial = () => {
    setCurrentTestimonialIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonialIndex((prev) =>
      (prev + 1) % testimonials.length
    );
  };

  const scrollCourses = (direction) => {
    if (coursesScrollRef.current) {
      const scrollAmount = 300;
      coursesScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Schema.org JSON-LD structured data for EducationalOrganization
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Bharti ITI",
    "alternateName": "Bharti Industrial Training Institute",
    "description": "Premier NCVT & SCVT Affiliated Industrial Training Institute offering technical CTS courses in Electrician, Fitter, Welder, COPA, MMV, RAC, and Civil Draughtsman.",
    "url": "https://bhartiiti.in",
    "logo": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80",
    "telephone": "+91 00000 00000",
    "email": "info@bhartiiti.in",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Main Road, Industrial Area",
      "addressLocality": "[City]",
      "addressRegion": "[State]",
      "postalCode": "000000",
      "addressCountry": "IN"
    },
    "sameAs": [
      siteConfig.social.facebook,
      siteConfig.social.youtube,
      siteConfig.social.instagram,
      siteConfig.social.linkedin,
      siteConfig.social.twitter
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Craftsmen Training Scheme (CTS) Trades",
      "itemListElement": [
        { "@type": "Course", "name": "Electrician", "courseCode": "CTS-ELE", "timeRequired": "P2Y" },
        { "@type": "Course", "name": "Fitter", "courseCode": "CTS-FIT", "timeRequired": "P2Y" },
        { "@type": "Course", "name": "Welder", "courseCode": "CTS-WEL", "timeRequired": "P1Y" },
        { "@type": "Course", "name": "COPA", "courseCode": "CTS-COP", "timeRequired": "P1Y" },
        { "@type": "Course", "name": "Mechanic Motor Vehicle", "courseCode": "CTS-MMV", "timeRequired": "P2Y" }
      ]
    }
  };

  return (
    <>
      <Helmet>
        <title>{siteConfig.name} | Industrial Training Institute (NCVT &amp; SCVT Affiliated)</title>
        <meta
          name="description"
          content="Bharti ITI is a premier NCVT & SCVT affiliated Industrial Training Institute offering certified courses in Electrician, Fitter, Welder, COPA, MMV, and RAC with 100% placement support."
        />
        {/* JSON-LD EducationalOrganization Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLdSchema)}
        </script>
      </Helmet>

      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-[#121D42] via-[#1B2A5C] to-[#283C7D] text-white pt-12 pb-20 sm:pt-16 sm:pb-24 md:pt-24 md:pb-32 overflow-hidden">
        {/* Decorative Grid and Background elements */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F28C28_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-80 sm:w-96 h-80 sm:h-96 bg-[#F28C28]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-32 w-80 sm:w-96 h-80 sm:h-96 bg-[#283C7D]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headline & CTAs */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
              {/* NCVT Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-[#F28C28]/40 text-xs sm:text-sm font-semibold text-amber-200 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-[#F28C28] shrink-0" />
                <span className="leading-tight">{t('heroBadge')}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                {t('heroTitle1')} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F28C28] to-[#FFB766]">
                  {t('heroTitle2')}
                </span>
              </h1>

              {/* Hindi Subline */}
              <p className="text-lg sm:text-2xl font-bold text-amber-300 tracking-wide font-sans">
                {t('heroHindiTagline')}
              </p>

              {/* Subtitle */}
              <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {t('heroDesc')}
              </p>

              {/* Highlights bullets */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs sm:text-sm text-slate-200 pt-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F28C28] shrink-0" />
                  <span>{t('heroCheck1')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F28C28] shrink-0" />
                  <span>{t('heroCheck2')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F28C28] shrink-0" />
                  <span>{t('heroCheck3')}</span>
                </div>
              </div>

              {/* Hero CTA buttons (all >= 44px min height for touch) */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-3">
                <button
                  type="button"
                  onClick={() => onOpenEnquiry && onOpenEnquiry()}
                  className="w-full sm:w-auto px-7 min-h-[48px] rounded-xl bg-[#F28C28] hover:bg-[#D67417] text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-orange-500/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer touch-manipulation active:scale-95"
                >
                  <Sparkles className="w-5 h-5 shrink-0" />
                  <span>{t('heroBtnApply')}</span>
                </button>
                <Link
                  to="/courses"
                  className="w-full sm:w-auto px-7 min-h-[48px] rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 backdrop-blur-xs transition-all duration-200 flex items-center justify-center gap-2 group touch-manipulation active:scale-95"
                >
                  <span>{t('heroBtnTrades')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
                <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-[#1B2A5C]/40 group">
                  <img
                    src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
                    alt="Bharti ITI Technical Workshop Training"
                    width={800}
                    height={533}
                    loading="eager"
                    className="w-full h-72 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121D42] via-transparent to-transparent" />
                  
                  {/* Floating Notification Badge */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-4 rounded-xl bg-white/95 backdrop-blur-md text-[#222B3A] shadow-lg border border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#FFF4E8] text-[#F28C28] flex items-center justify-center shrink-0">
                      <Flame className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#F28C28] block">
                        {t('heroAdmissionOpen')}
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-[#1B2A5C] leading-snug">
                        {t('heroSeatsAlert')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative floating stats chip */}
                <div className="hidden sm:flex absolute -top-4 -left-6 bg-white text-[#1B2A5C] p-3 rounded-xl shadow-xl border border-slate-100 items-center gap-2.5">
                  <Award className="w-5 h-5 text-[#F28C28]" />
                  <div className="text-left">
                    <p className="text-xs font-bold leading-tight">15+ Years</p>
                    <p className="text-[10px] text-slate-500">Excellence in ITI</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ANIMATED STATS SECTION */}
      <section className="relative -mt-10 sm:-mt-14 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {siteConfig.stats.map((stat, idx) => (
            <StatCounter
              key={idx}
              value={stat.value}
              suffix={stat.suffix}
              label={
                idx === 0 ? t('statStudents') :
                idx === 1 ? t('statTrades') :
                idx === 2 ? t('statYears') : t('statPlacement')
              }
              iconName={stat.icon}
            />
          ))}
        </div>
      </section>

      {/* 3. POPULAR TRADES SECTION (HORIZONTAL SCROLL ON MOBILE) */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <SectionHeading
              badge={t('tradesBadge')}
              title={t('tradesTitle')}
              highlight={t('tradesHighlight')}
              description={t('tradesDesc')}
              centered={false}
              className="mb-0!"
            />
          </div>

          {/* Mobile Horizontal Scroll Controls */}
          <div className="flex sm:hidden items-center justify-between pt-2">
            <span className="text-[11px] font-semibold text-[#F28C28] flex items-center gap-1">
              <span>Swipe trades</span>
              <MoveRight className="w-3.5 h-3.5 animate-pulse" />
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollCourses('left')}
                aria-label="Scroll trades left"
                className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 active:bg-slate-100 shadow-xs cursor-pointer touch-manipulation"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollCourses('right')}
                aria-label="Scroll trades right"
                className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 active:bg-slate-100 shadow-xs cursor-pointer touch-manipulation"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Trade cards container: Horizontal snap-scroll on mobile, responsive grid on sm+ */}
        {loading ? (
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="min-w-[280px] sm:min-w-0">
                <CourseCardSkeleton />
              </div>
            ))}
          </div>
        ) : (
          <div
            ref={coursesScrollRef}
            className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 snap-x snap-mandatory scrollbar-none scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {courses.slice(0, 6).map((course) => (
              <div
                key={course.slug}
                className="min-w-[285px] max-w-[310px] sm:max-w-none sm:min-w-0 w-[84vw] sm:w-auto shrink-0 sm:shrink snap-center"
              >
                <CourseCard
                  course={course}
                  onEnquire={(slug) => onOpenEnquiry && onOpenEnquiry(slug)}
                />
              </div>
            ))}
          </div>
        )}

        {/* View All Trades CTA */}
        <div className="mt-8 sm:mt-12 text-center">
          <Link
            to="/courses"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 min-h-[48px] rounded-xl bg-[#1B2A5C] hover:bg-[#121D42] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all group touch-manipulation active:scale-95 w-full sm:w-auto"
          >
            <span>{t('viewAllTrades')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#F28C28]" />
          </Link>
        </div>
      </section>

      {/* 4. WHY CHOOSE US (4 ICON CARDS) */}
      <section className="py-14 sm:py-16 bg-[#EEF2FA]/70 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge={t('whyBadge')}
            title={t('whyTitle')}
            highlight={t('whyHighlight')}
            description={t('whyDesc')}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Card 1 */}
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FFF4E8] text-[#F28C28] flex items-center justify-center font-bold">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#1B2A5C]">
                {t('whyCard1Title')}
              </h3>
              <p className="text-xs sm:text-sm text-[#5C677D] leading-relaxed">
                {t('whyCard1Desc')}
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FFF4E8] text-[#F28C28] flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#1B2A5C]">
                {t('whyCard2Title')}
              </h3>
              <p className="text-xs sm:text-sm text-[#5C677D] leading-relaxed">
                {t('whyCard2Desc')}
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FFF4E8] text-[#F28C28] flex items-center justify-center font-bold">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#1B2A5C]">
                {t('whyCard3Title')}
              </h3>
              <p className="text-xs sm:text-sm text-[#5C677D] leading-relaxed">
                {t('whyCard3Desc')}
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FFF4E8] text-[#F28C28] flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#1B2A5C]">
                {t('whyCard4Title')}
              </h3>
              <p className="text-xs sm:text-sm text-[#5C677D] leading-relaxed">
                {t('whyCard4Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. STUDENT PLACEMENT STATISTICS DASHBOARD (RECHARTS) */}
      <PlacementDashboard onOpenEnquiry={onOpenEnquiry} />

      {/* 6. LATEST 4 NOTICES */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-[#FFF4E8] text-[#F28C28] border border-[#FCD8B0] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F28C28]"></span>
              {t('noticesBadge')}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1B2A5C]">
              {t('noticesTitle')} <span className="text-[#F28C28]">{t('noticesHighlight')}</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#5C677D] mt-1">
              {t('noticesDesc')}
            </p>
          </div>

          <Link
            to="/notices"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1B2A5C] hover:text-[#F28C28] transition-colors shrink-0 min-h-[44px] touch-manipulation"
          >
            <span>{t('viewAllNotices')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {[1, 2, 3, 4].map((n) => (
              <NoticeCardSkeleton key={n} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {notices.map((notice) => (
              <NoticeCard
                key={notice.id}
                notice={notice}
                onDownload={(item) => {
                  alert(`Downloading notice: ${item.title}`);
                }}
              />
            ))}
          </div>
        )}
      </section>

      {/* 6. GALLERY PREVIEW (6 IMAGES) */}
      <section className="py-14 sm:py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge={t('galleryBadge')}
            title={t('galleryTitle')}
            highlight={t('galleryHighlight')}
            description={t('galleryDesc')}
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => {
                  setLightboxIndex(index);
                  setLightboxOpen(true);
                }}
                className="group relative rounded-xl overflow-hidden aspect-4/3 cursor-pointer bg-slate-100 shadow-xs hover:shadow-lg transition-all touch-manipulation"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  width={400}
                  height={300}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://picsum.photos/seed/iti-prev-${item.id}/800/600`;
                  }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5 sm:p-4 text-white">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#F28C28]">
                    {item.category}
                  </span>
                  <p className="text-[11px] sm:text-sm font-semibold line-clamp-1">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-10 text-center">
            <Link
              to="/gallery"
              className="inline-flex items-center justify-center gap-2 px-6 min-h-[44px] rounded-xl bg-[#EEF2FA] text-[#1B2A5C] hover:bg-[#1B2A5C] hover:text-white font-bold text-xs sm:text-sm transition-all touch-manipulation active:scale-95 w-full sm:w-auto"
            >
              <span>{t('viewAllGallery')} (24 Photos)</span>
              <ArrowRight className="w-4 h-4 text-[#F28C28]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS SLIDER */}
      <section className="py-14 sm:py-20 bg-[#121D42] text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-white/10 text-[#F28C28] border border-white/15 mb-3">
              <Quote className="w-3.5 h-3.5" />
              {t('testBadge')}
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              {t('testTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              {t('testDesc')}
            </p>
          </div>

          {testimonials.length > 0 && (
            <div className="relative bg-[#1B2A5C] rounded-2xl p-5 sm:p-10 border border-slate-700/80 shadow-2xl">
              {/* Star Rating */}
              <div className="flex items-center justify-center gap-1 mb-4 text-[#F28C28]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 sm:w-5 h-4 sm:h-5 fill-current" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-xs sm:text-lg text-slate-200 text-center italic leading-relaxed mb-6 font-medium">
                "{testimonials[currentTestimonialIndex].quote}"
              </p>

              {/* Author Info */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 pt-4 border-t border-slate-700">
                <img
                  src={testimonials[currentTestimonialIndex].photo}
                  alt={testimonials[currentTestimonialIndex].name}
                  width={52}
                  height={52}
                  loading="lazy"
                  className="w-11 sm:w-13 h-11 sm:h-13 rounded-full object-cover border-2 border-[#F28C28]"
                />
                <div className="text-left">
                  <h4 className="font-bold text-white text-sm sm:text-base">
                    {testimonials[currentTestimonialIndex].name}
                  </h4>
                  <p className="text-xs text-[#F28C28] font-semibold">
                    {testimonials[currentTestimonialIndex].trade} ({testimonials[currentTestimonialIndex].batch})
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-400">
                    Placed at: <strong className="text-slate-200">{testimonials[currentTestimonialIndex].placedCompany}</strong>
                  </p>
                </div>
              </div>

              {/* Slider Navigation Arrows with >= 44px touch targets */}
              <button
                type="button"
                onClick={handlePrevTestimonial}
                aria-label="Previous testimonial"
                className="absolute left-1 sm:-left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#F28C28] hover:bg-[#D67417] text-white flex items-center justify-center shadow-md cursor-pointer transition-transform hover:scale-110 touch-manipulation active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNextTestimonial}
                aria-label="Next testimonial"
                className="absolute right-1 sm:-right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#F28C28] hover:bg-[#D67417] text-white flex items-center justify-center shadow-md cursor-pointer transition-transform hover:scale-110 touch-manipulation active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Dots indicator */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentTestimonialIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-2.5 rounded-full transition-all cursor-pointer touch-manipulation ${
                      i === currentTestimonialIndex
                        ? 'w-6 bg-[#F28C28]'
                        : 'w-2.5 bg-slate-600 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 8. ORANGE CTA BAND */}
      <section className="bg-gradient-to-r from-[#F28C28] via-[#E07B18] to-[#D67417] text-white py-10 sm:py-14 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-widest font-extrabold text-amber-100 bg-black/10 px-3 py-1 rounded-full inline-block">
                {t('ctaBadge')}
              </span>
              <h2 className="text-xl sm:text-3xl font-black">
                {t('ctaTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-amber-100 max-w-xl">
                {t('ctaDesc')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => onOpenEnquiry && onOpenEnquiry()}
                className="w-full sm:w-auto px-6 min-h-[48px] rounded-xl bg-[#1B2A5C] hover:bg-[#121D42] text-white font-bold text-xs sm:text-sm shadow-xl transition-all cursor-pointer active:scale-95 touch-manipulation flex items-center justify-center"
              >
                {t('ctaEnquireBtn')}
              </button>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                className="w-full sm:w-auto px-6 min-h-[48px] rounded-xl bg-white hover:bg-slate-100 text-[#1B2A5C] font-bold text-xs sm:text-sm shadow-xl transition-all flex items-center justify-center"
              >
                {t('callDesk')}: {siteConfig.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox component for gallery preview */}
      <Lightbox
        images={galleryItems}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setLightboxIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1))}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % galleryItems.length)}
      />
    </>
  );
}
