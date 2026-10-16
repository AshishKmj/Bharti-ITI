import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Clock, 
  Users, 
  CheckCircle2, 
  Download, 
  Briefcase, 
  BookOpen, 
  Wrench, 
  HelpCircle, 
  Phone, 
  Send, 
  Loader2, 
  ArrowRight,
  ShieldCheck,
  Languages
} from 'lucide-react';
import { siteConfig } from '../config/site.js';
import { getCourseBySlug, getCourses, submitEnquiry } from '../services/api.js';
import { validateEnquiryForm } from '../utils/pure_logic.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import PageBanner from '../components/PageBanner.jsx';
import Accordion from '../components/Accordion.jsx';
import NotFound from './NotFound.jsx';

export default function CourseDetail({ onOpenEnquiry }) {
  const { slug } = useParams();
  const { t, language } = useLanguage();
  const [course, setCourse] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Sidebar Enquiry Form State
  const [sidebarForm, setSidebarForm] = useState({
    name: "",
    phone: "",
    email: "",
    trade: slug || "",
    message: `I want admission details for ${slug} trade.`,
  });
  const [sidebarErrors, setSidebarErrors] = useState({});
  const [sidebarSubmitting, setSidebarSubmitting] = useState(false);
  const [sidebarSuccess, setSidebarSuccess] = useState(false);
  const [downloadingSyllabus, setDownloadingSyllabus] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setNotFound(false);
    setSidebarSuccess(false);

    async function loadData() {
      try {
        const found = await getCourseBySlug(slug);
        if (!found) {
          if (isMounted) {
            setNotFound(true);
            setLoading(false);
          }
          return;
        }

        const all = await getCourses();
        if (isMounted) {
          setCourse(found);
          setSidebarForm((prev) => ({
            ...prev,
            trade: found.slug,
            message: `I am interested in admission for ${found.name} trade. Please send fee structure and brochure.`,
          }));
          const related = all.filter((c) => c.slug !== found.slug).slice(0, 3);
          setRelatedCourses(related);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setNotFound(true);
          setLoading(false);
        }
      }
    }

    loadData();
    return () => { isMounted = false; };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-[#F28C28] animate-spin" />
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {language === 'hi' ? 'विवरण लोड हो रहा है...' : 'Loading Trade Details...'}
          </p>
        </div>
      </div>
    );
  }

  if (notFound || !course) {
    return <NotFound />;
  }

  const handleSidebarSubmit = async (e) => {
    e.preventDefault();
    const validation = validateEnquiryForm(sidebarForm);
    if (!validation.isValid) {
      setSidebarErrors(validation.errors);
      return;
    }

    setSidebarSubmitting(true);
    setSidebarErrors({});

    try {
      await submitEnquiry(sidebarForm);
      setSidebarSuccess(true);
    } catch {
      setSidebarErrors({ form: "Error sending enquiry. Please call us directly." });
    } finally {
      setSidebarSubmitting(false);
    }
  };

  const syllabusAccordionItems = course.syllabus.map((s) => ({
    badge: s.semester,
    title: s.title,
    content: (
      <ul className="space-y-2 pt-1">
        {s.topics.map((tItem, i) => (
          <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F28C28] shrink-0 mt-1.5" />
            <span>{tItem}</span>
          </li>
        ))}
      </ul>
    ),
  }));

  const faqAccordionItems = (course.faqs || []).map((f) => ({
    title: f.question,
    content: f.answer,
  }));

  return (
    <>
      <Helmet>
        <title>{course.name} Course | {siteConfig.name} - Syllabus, Fees &amp; Career Scope</title>
        <meta
          name="description"
          content={`${course.name} trade at Bharti ITI (${course.duration}). ${course.overview.slice(0, 150)}...`}
        />
      </Helmet>

      {/* Banner */}
      <PageBanner
        title={course.name}
        hindiSubtitle={`व्यावसायिक प्रशिक्षण पाठ्यक्रम (${course.duration}) - NCVT Craftsmen Training Scheme`}
        breadcrumbs={[
          { label: t('navCourses'), href: "/courses" },
          { label: course.name, href: `/courses/${course.slug}` },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT 8 COLUMNS: MAIN COURSE DETAILS */}
          <div className="lg:col-span-8 space-y-8 sm:space-y-12">
            
            {/* 1. Header Image & Overview */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm p-4 sm:p-8 space-y-5 sm:space-y-6">
              <div className="relative rounded-xl overflow-hidden aspect-16/9 bg-slate-100 shadow-inner">
                <img
                  src={course.image}
                  alt={course.name}
                  width={800}
                  height={450}
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://picsum.photos/seed/${encodeURIComponent(course.slug)}/800/600`;
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex gap-2">
                  <span className="px-2.5 py-1 bg-[#1B2A5C] text-white text-[11px] font-bold rounded-md uppercase tracking-wider shadow-sm">
                    {course.sector}
                  </span>
                  <span className="px-2.5 py-1 bg-[#F28C28] text-white text-[11px] font-bold rounded-md shadow-sm flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {course.duration}
                  </span>
                </div>
              </div>

              <div>
                <h2 className="text-xl sm:text-3xl font-black text-[#1B2A5C] mb-2 sm:mb-3">
                  About {course.name} Trade
                </h2>
                <p className="text-xs sm:text-base text-[#5C677D] leading-relaxed">
                  {course.overview}
                </p>
              </div>

              {/* Quick High-Level Tags */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-3 border-t border-slate-100 text-center">
                <div className="p-2.5 sm:p-3 bg-slate-50 rounded-xl">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">{t('duration')}</p>
                  <p className="text-xs sm:text-sm font-bold text-[#1B2A5C]">{course.duration.split('(')[0]}</p>
                </div>
                <div className="p-2.5 sm:p-3 bg-slate-50 rounded-xl">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">{t('seats')}</p>
                  <p className="text-xs sm:text-sm font-bold text-[#1B2A5C]">{course.seats} Seats</p>
                </div>
                <div className="p-2.5 sm:p-3 bg-slate-50 rounded-xl">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">{t('affiliation')}</p>
                  <p className="text-xs sm:text-sm font-bold text-[#1B2A5C]">NCVT / DGT</p>
                </div>
                <div className="p-2.5 sm:p-3 bg-slate-50 rounded-xl">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">{t('courseFee')}</p>
                  <p className="text-xs sm:text-sm font-bold text-[#F28C28]">{course.fee}</p>
                </div>
              </div>
            </div>

            {/* 2. Syllabus Accordion (By Semester) */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-8 space-y-4 sm:space-y-5">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-[#F28C28]" />
                <h3 className="text-lg sm:text-2xl font-bold text-[#1B2A5C]">
                  {language === 'hi' ? 'पाठ्यक्रम एवं सेमेस्टर सिलेबस' : 'Curriculum & Semester Syllabus'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#5C677D]">
                Structured strictly as per National Instructional Media Institute (NIMI) and DGT CTS guidelines. Click any semester to view module topics.
              </p>

              <Accordion items={syllabusAccordionItems} allowMultiple={true} defaultOpenIndex={0} />
            </div>

            {/* 3. Practical Training */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-8 space-y-4 sm:space-y-5">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-[#1B2A5C]" />
                <h3 className="text-lg sm:text-2xl font-bold text-[#1B2A5C]">
                  {language === 'hi' ? 'शॉप-फ्लोर प्रायोगिक दक्षताएँ' : 'Shop-Floor Practical Competencies'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#5C677D]">
                Trainees undergo hands-on practical shifts with real machinery under master instructors:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {course.practicalTraining.map((item, idx) => (
                  <div key={idx} className="p-3 sm:p-3.5 bg-[#EEF2FA]/70 rounded-xl border border-slate-200/70 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium text-slate-800 leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Career Scope */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-8 space-y-4 sm:space-y-5">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-[#F28C28]" />
                <h3 className="text-lg sm:text-2xl font-bold text-[#1B2A5C]">
                  {language === 'hi' ? 'करियर अवसर एवं जॉब प्रोफाइल' : 'Career Scope & Job Profiles'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#5C677D]">
                Graduates holding the National Trade Certificate (NTC) in {course.name} are eligible for both government exams and leading corporate placements:
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {course.careerScope.map((scope, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-2 bg-white rounded-lg border border-slate-200 text-xs sm:text-sm font-semibold text-[#1B2A5C] shadow-2xs hover:border-[#F28C28] hover:bg-[#FFF4E8] transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F28C28]" />
                    <span>{scope}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. FAQs Accordion */}
            {course.faqs && course.faqs.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-8 space-y-4 sm:space-y-5">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#1B2A5C]" />
                  <h3 className="text-lg sm:text-2xl font-bold text-[#1B2A5C]">
                    Frequently Asked Questions ({course.name})
                  </h3>
                </div>

                <Accordion items={faqAccordionItems} allowMultiple={false} defaultOpenIndex={0} />
              </div>
            )}

            {/* 6. Related Courses */}
            {relatedCourses.length > 0 && (
              <div className="pt-2 space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-[#1B2A5C]">
                  Explore Other Technical Trades
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedCourses.map((rel) => (
                    <Link
                      key={rel.slug}
                      to={`/courses/${rel.slug}`}
                      className="bg-white rounded-xl p-3.5 border border-slate-200 hover:border-[#F28C28] shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative h-28 rounded-lg overflow-hidden mb-3">
                          <img
                            src={rel.image}
                            alt={rel.name}
                            width={300}
                            height={160}
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = `https://picsum.photos/seed/${encodeURIComponent(rel.slug)}/800/600`;
                            }}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <h4 className="font-bold text-sm text-[#1B2A5C] group-hover:text-[#F28C28] transition-colors">
                          {rel.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{rel.overview}</p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-[#F28C28]">
                        <span>{t('viewSyllabus')}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT 4 COLUMNS: STICKY QUICK FACTS SIDEBAR & FORM */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 w-full">
            
            {/* Quick Facts Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-4 sm:space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F28C28]">
                  Trade Summary
                </span>
                <h3 className="text-lg font-bold text-[#1B2A5C]">
                  Quick Facts
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#F28C28]" /> {t('duration')}
                  </span>
                  <span className="font-bold text-[#1B2A5C] text-right">{course.duration}</span>
                </div>

                <div className="flex items-start justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-500 flex items-center gap-1.5 shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {t('eligibility')}
                  </span>
                  <span className="font-bold text-[#1B2A5C] text-right text-xs max-w-[150px] sm:max-w-[170px]">{course.eligibility}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#1B2A5C]" /> {t('seats')}
                  </span>
                  <span className="font-bold text-[#1B2A5C]">{course.seats} Seats</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-600" /> {t('affiliation')}
                  </span>
                  <span className="font-bold text-[#1B2A5C]">NCVT / DGT</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Languages className="w-4 h-4 text-purple-600" /> {t('medium')}
                  </span>
                  <span className="font-bold text-[#1B2A5C]">{course.medium}</span>
                </div>

                <div className="flex items-center justify-between py-2 bg-[#FFF4E8] px-3.5 rounded-xl border border-[#FCD8B0]">
                  <span className="text-slate-800 font-bold flex items-center gap-1.5">
                    <span className="font-black text-[#F28C28] text-base leading-none">₹</span> {t('courseFee')}
                  </span>
                  <span className="font-black text-sm text-[#F28C28]">{course.fee}</span>
                </div>
              </div>

              {/* Download Syllabus Button (min-h-[44px]) */}
              <button
                type="button"
                onClick={() => {
                  setDownloadingSyllabus(true);
                  setTimeout(() => setDownloadingSyllabus(false), 3500);
                }}
                className="w-full py-3 min-h-[44px] px-4 rounded-xl bg-[#EEF2FA] hover:bg-[#1B2A5C] text-[#1B2A5C] hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs touch-manipulation active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>{downloadingSyllabus ? "Downloading Syllabus PDF..." : "Download Official Syllabus PDF"}</span>
              </button>
              {downloadingSyllabus && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-[11px] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Syllabus PDF for {course.name} downloaded successfully!</span>
                </div>
              )}
            </div>

            {/* Quick Enquiry Form Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
              <div className="mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F28C28]">
                  Admissions 2025-26
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#1B2A5C]">
                  Enquire for {course.name}
                </h3>
              </div>

              {sidebarSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <h4 className="font-bold text-xs text-emerald-800">Enquiry Sent!</h4>
                  <p className="text-[11px] text-emerald-700 mt-1">Our counselor will call you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSidebarSubmit} className="space-y-3">
                  {sidebarErrors.form && (
                    <div className="p-2 rounded bg-rose-50 text-rose-600 text-xs">
                      {sidebarErrors.form}
                    </div>
                  )}

                  <div>
                    <input
                      type="text"
                      placeholder="Your Full Name *"
                      value={sidebarForm.name}
                      onChange={(e) => {
                        setSidebarForm({ ...sidebarForm, name: e.target.value });
                        setSidebarErrors({ ...sidebarErrors, name: null });
                      }}
                      className="w-full px-3 py-2.5 min-h-[44px] text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1B2A5C]"
                    />
                    {sidebarErrors.name && (
                      <p className="text-[10px] text-rose-500 mt-0.5">{sidebarErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="10-digit Mobile Number *"
                      value={sidebarForm.phone}
                      onChange={(e) => {
                        setSidebarForm({ ...sidebarForm, phone: e.target.value });
                        setSidebarErrors({ ...sidebarErrors, phone: null });
                      }}
                      className="w-full px-3 py-2.5 min-h-[44px] text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1B2A5C]"
                    />
                    {sidebarErrors.phone && (
                      <p className="text-[10px] text-rose-500 mt-0.5">{sidebarErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={sidebarForm.email}
                      onChange={(e) => {
                        setSidebarForm({ ...sidebarForm, email: e.target.value });
                        setSidebarErrors({ ...sidebarErrors, email: null });
                      }}
                      className="w-full px-3 py-2.5 min-h-[44px] text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1B2A5C]"
                    />
                    {sidebarErrors.email && (
                      <p className="text-[10px] text-rose-500 mt-0.5">{sidebarErrors.email}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={sidebarSubmitting}
                    className="w-full py-3 min-h-[44px] px-3 rounded-xl bg-[#F28C28] hover:bg-[#D67417] text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60 touch-manipulation active:scale-95"
                  >
                    {sidebarSubmitting ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                    <span>Apply for {course.name}</span>
                  </button>
                </form>
              )}

              <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                  className="text-xs font-semibold text-slate-600 hover:text-[#F28C28] flex items-center justify-center gap-1 min-h-[36px]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#F28C28]" />
                  <span>Call: {siteConfig.contact.phone}</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
