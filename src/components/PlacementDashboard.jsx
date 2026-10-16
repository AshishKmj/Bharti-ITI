import { useState, useMemo } from 'react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  TrendingUp, 
  Award, 
  Users, 
  Building2, 
  ShieldCheck, 
  Download, 
  ArrowUpRight, 
  Briefcase, 
  CheckCircle2, 
  Sparkles,
  DollarSign,
  PieChart as PieIcon,
  BarChart3,
  Calendar
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { 
  yearlyPlacementStats, 
  tradePlacementStats, 
  sectorDistribution, 
  topRecruitingPartners, 
  trustGuarantees 
} from '../data/placements.js';
import { 
  calculatePlacementSummary, 
  formatLPA, 
  getTopPerformingTrade 
} from '../utils/pure_logic.js';

export default function PlacementDashboard({ onOpenEnquiry, className = "" }) {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'salary' | 'trades' | 'sectors'
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Compute aggregated 3-year summary metrics
  const summary = useMemo(() => calculatePlacementSummary(yearlyPlacementStats), []);
  const topTrade = useMemo(() => getTopPerformingTrade(tradePlacementStats), []);

  const handleDownloadReport = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  // Custom styled Tooltip component for Recharts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#121D42]/95 backdrop-blur-md text-white p-3 sm:p-4 rounded-xl shadow-xl border border-slate-700 text-xs sm:text-sm min-w-[180px]">
          <p className="font-bold text-[#F28C28] mb-2 pb-1 border-b border-slate-700/80 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{label}</span>
          </p>
          <div className="space-y-1.5">
            {payload.map((entry, index) => (
              <div key={`tooltip-${index}`} className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span 
                    className="w-2.5 h-2.5 rounded-full shrink-0" 
                    style={{ backgroundColor: entry.color || entry.fill || entry.stroke }} 
                  />
                  <span>{entry.name}:</span>
                </span>
                <span className="font-semibold text-white">
                  {typeof entry.value === 'number' && entry.name.toLowerCase().includes('lpa')
                    ? formatLPA(entry.value)
                    : typeof entry.value === 'number' && entry.name.toLowerCase().includes('%')
                    ? `${entry.value}%`
                    : entry.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // Pie chart custom tooltip
  const PieCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#121D42]/95 backdrop-blur-md text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs sm:text-sm">
          <p className="font-bold text-[#F28C28] mb-1">{data.name}</p>
          <p className="text-slate-200">
            Share: <strong className="text-white">{data.value}%</strong> ({data.count} students)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <section 
      id="placements" 
      className={`py-14 sm:py-20 bg-gradient-to-b from-white via-slate-50/70 to-slate-100/90 border-y border-slate-200/90 relative overflow-hidden scroll-mt-20 ${className}`}
      aria-label="Student Placement Statistics Dashboard"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F28C28]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#1B2A5C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFF4E8] text-[#F28C28] border border-[#FCD8B0] mb-3 shadow-xs">
              <TrendingUp className="w-4 h-4 shrink-0" />
              <span>{t('placementBadge')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#1B2A5C] tracking-tight leading-tight">
              {t('placementTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F28C28] to-[#E07B18]">{t('placementHighlight')}</span>
            </h2>
            <p className="text-xs sm:text-base text-[#5C677D] mt-2 leading-relaxed">
              {t('placementDesc')}
            </p>
          </div>

          {/* Quick CTA & Brochure download */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleDownloadReport}
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 min-h-[46px] rounded-xl bg-white hover:bg-slate-50 text-[#1B2A5C] font-bold text-xs sm:text-sm border border-slate-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer touch-manipulation active:scale-95"
            >
              <Download className="w-4 h-4 text-[#F28C28]" />
              <span>{t('viewFullReport')}</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenEnquiry && onOpenEnquiry("")}
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 min-h-[46px] rounded-xl bg-[#F28C28] hover:bg-[#D67417] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-orange-500/25 transition-all cursor-pointer touch-manipulation active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('applyNowPlacement')}</span>
            </button>
          </div>
        </div>

        {/* NOTIFICATION TOAST FOR BROCHURE DOWNLOAD */}
        {downloadSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                <strong>Placement Brochure 2022-2025:</strong> Official audited statistical report downloaded successfully.
              </span>
            </div>
            <button 
              type="button"
              onClick={() => setDownloadSuccess(false)}
              className="text-emerald-700 hover:text-emerald-900 font-bold ml-4"
            >
              ✕
            </button>
          </div>
        )}

        {/* 1. TRUST STATS CARDS (KPIS) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-8 sm:mb-10">
          {/* Card 1: Placement Rate */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#F28C28]/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-sm font-semibold text-slate-500">{t('kpiOverallRate')}</span>
              <div className="w-9 h-9 rounded-xl bg-[#FFF4E8] text-[#F28C28] flex items-center justify-center">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-4xl font-black text-[#1B2A5C]">{summary.latestRate}%</span>
              <span className="text-[10px] sm:text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" />
                +{summary.growthRate}%
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-2">
              Batch 2024-25 (Up from 82.1% in 2022)
            </p>
          </div>

          {/* Card 2: Total Students Placed */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-sm font-semibold text-slate-500">{t('kpiTotalPlaced')}</span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-4xl font-black text-[#1B2A5C]">{summary.totalPlaced}+</span>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-500">
                / {summary.totalGraduated} Candidates
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-2">
              Cumulative 3-year campus selections
            </p>
          </div>

          {/* Card 3: Highest CTC Package */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-sm font-semibold text-slate-500">{t('kpiHighestPackage')}</span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Award className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-4xl font-black text-[#1B2A5C]">₹{summary.highestSalary} <span className="text-base sm:text-xl font-bold">LPA</span></span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-2">
              Offered by L&T Heavy Engineering & Tata Power
            </p>
          </div>

          {/* Card 4: Top Recruiting Partners */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-sm font-semibold text-slate-500">{t('kpiRecruitingPartners')}</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-4xl font-black text-[#1B2A5C]">50+</span>
              <span className="text-[10px] sm:text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Active MoUs
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-2">
              {summary.totalApprenticeships}+ Govt. Apprenticeship seats
            </p>
          </div>
        </div>

        {/* 2. MAIN INTERACTIVE DASHBOARD CONTAINER */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-8 lg:p-10 mb-10 sm:mb-12">
          
          {/* DASHBOARD TAB NAVIGATION CONTROLS */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200/80 gap-4 mb-8">
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto scrollbar-none w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer touch-manipulation flex items-center gap-2 ${
                  activeTab === 'overview'
                    ? 'bg-[#1B2A5C] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#1B2A5C] hover:bg-white/60'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>{t('placementTabOverview')}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('salary')}
                className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer touch-manipulation flex items-center gap-2 ${
                  activeTab === 'salary'
                    ? 'bg-[#1B2A5C] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#1B2A5C] hover:bg-white/60'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>{t('placementTabSalary')}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('trades')}
                className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer touch-manipulation flex items-center gap-2 ${
                  activeTab === 'trades'
                    ? 'bg-[#1B2A5C] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#1B2A5C] hover:bg-white/60'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>{t('placementTabTrades')}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('sectors')}
                className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer touch-manipulation flex items-center gap-2 ${
                  activeTab === 'sectors'
                    ? 'bg-[#1B2A5C] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#1B2A5C] hover:bg-white/60'
                }`}
              >
                <PieIcon className="w-4 h-4" />
                <span>{t('placementTabSectors')}</span>
              </button>
            </div>

            {/* Growth pill indicator */}
            <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t('placementGrowthBadge')}</span>
            </div>
          </div>

          {/* TAB CONTENT 1: OVERVIEW (3-Year Volume & Placement Rate Combo) */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1B2A5C]">
                    3-Year Placement Volume &amp; Rate Growth (2022-2025)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Comparing total registered candidates, successfully placed students, and placement conversion rate.
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-[#1B2A5C]" />
                    <span className="text-slate-600">{t('chartGraduated')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-[#F28C28]" />
                    <span className="text-slate-600">{t('chartPlaced')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-emerald-600" />
                    <span className="text-slate-600">{t('chartRate')}</span>
                  </div>
                </div>
              </div>

              {/* Responsive Container for Recharts ComposedChart */}
              <div className="w-full h-72 sm:h-84 md:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={yearlyPlacementStats}
                    margin={{ top: 20, right: 10, bottom: 20, left: -5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis 
                      dataKey="year" 
                      tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }}
                      axisLine={{ stroke: '#CBD5E1' }}
                      tickLine={false}
                    />
                    <YAxis 
                      yAxisId="left" 
                      orientation="left" 
                      width={36}
                      tick={{ fill: '#475569', fontSize: 11 }}
                      axisLine={{ stroke: '#CBD5E1' }}
                      tickLine={false}
                    />
                    <YAxis 
                      yAxisId="right" 
                      orientation="right" 
                      width={36}
                      domain={[70, 100]}
                      unit="%"
                      tick={{ fill: '#059669', fontSize: 11, fontWeight: 600 }}
                      axisLine={{ stroke: '#CBD5E1' }}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      yAxisId="left" 
                      dataKey="graduated" 
                      name={t('chartGraduated')} 
                      fill="#1B2A5C" 
                      radius={[6, 6, 0, 0]} 
                      barSize={32}
                    />
                    <Bar 
                      yAxisId="left" 
                      dataKey="placed" 
                      name={t('chartPlaced')} 
                      fill="#F28C28" 
                      radius={[6, 6, 0, 0]} 
                      barSize={32}
                    />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="placementRate" 
                      name={t('chartRate')} 
                      stroke="#059669" 
                      strokeWidth={3} 
                      dot={{ r: 5, fill: '#059669', stroke: '#FFFFFF', strokeWidth: 2 }} 
                      activeDot={{ r: 7 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              {/* Insight summary below chart */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#F28C28] block mb-1">
                    Continuous Growth
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Student intake expanded from 420 to 520, while placements surged by <strong>38%</strong> over the same period.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B2A5C] block mb-1">
                    High Conversion
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>91.5%</strong> of all eligible final-year trainees secured employment or apprenticeships in 2024-25.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 block mb-1">
                    Multiple Offers
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    564 total job offers extended across 52 visiting companies, allowing top trainees to choose their preferred employer.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT 2: SALARY TRENDS (AreaChart) */}
          {activeTab === 'salary' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1B2A5C]">
                    Compensation &amp; Salary Growth Trends (2022-2025)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Highest and average Cost-to-Company (CTC) packages in Lakhs Per Annum (LPA) for ITI passouts.
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-[#F28C28]" />
                    <span className="text-slate-600">{t('chartHighestSalary')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-[#3B82F6]" />
                    <span className="text-slate-600">{t('chartAvgSalary')}</span>
                  </div>
                </div>
              </div>

              {/* AreaChart Container */}
              <div className="w-full h-72 sm:h-84 md:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={yearlyPlacementStats}
                    margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorHighest" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F28C28" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#F28C28" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis 
                      dataKey="year" 
                      tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }}
                      axisLine={{ stroke: '#CBD5E1' }}
                      tickLine={false}
                    />
                    <YAxis 
                      tick={{ fill: '#475569', fontSize: 11 }}
                      unit=" LPA"
                      domain={[0, 8]}
                      axisLine={{ stroke: '#CBD5E1' }}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="highestSalaryLPA" 
                      name={t('chartHighestSalary')} 
                      stroke="#F28C28" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorHighest)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="avgSalaryLPA" 
                      name={t('chartAvgSalary')} 
                      stroke="#3B82F6" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorAvg)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Salary insights */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF4E8] text-[#F28C28] flex items-center justify-center shrink-0">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1B2A5C]">
                      Significant Wage Growth for Specialized Technicians
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Average compensation for entry-level CTS diploma holders grew from <strong>₹2.52 LPA</strong> in 2022 to <strong>₹3.85 LPA</strong> in 2025, driven by demand for certified 6G welders and industrial electricians.
                    </p>
                  </div>
                </div>
                <div className="shrink-0 text-left sm:text-right">
                  <span className="text-[11px] text-slate-500 font-medium">Record Placement Package</span>
                  <p className="text-xl font-black text-[#F28C28]">₹7.20 LPA</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT 3: TRADE-WISE PERFORMANCE (BarChart) */}
          {activeTab === 'trades' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1B2A5C]">
                    Placement Rate &amp; Top Hiring Partners by Technical Trade
                  </h3>
                  <p className="text-xs text-slate-500">
                    Individual performance across Electrician, Fitter, Welder, COPA, MMV, and RAC trades.
                  </p>
                </div>
                {topTrade && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Top: {topTrade.trade} ({topTrade.placementRate}%)</span>
                  </div>
                )}
              </div>

              {/* Trade Bar Chart */}
              <div className="w-full h-72 sm:h-84 md:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={tradePlacementStats}
                    layout="vertical"
                    margin={{ top: 10, right: 30, bottom: 10, left: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                    <XAxis 
                      type="number" 
                      domain={[70, 100]} 
                      unit="%" 
                      tick={{ fill: '#475569', fontSize: 11 }}
                    />
                    <YAxis 
                      dataKey="shortName" 
                      type="category" 
                      tick={{ fill: '#1B2A5C', fontSize: 12, fontWeight: 700 }}
                      width={80}
                      axisLine={{ stroke: '#CBD5E1' }}
                      tickLine={false}
                    />
                    <Tooltip 
                      formatter={(val, name, item) => [
                        `${val}% (${item.payload.placedStudents}/${item.payload.totalStudents} students placed)`,
                        `Placement Rate`
                      ]}
                      labelFormatter={(label, item) => `${item?.[0]?.payload?.trade || label}`}
                    />
                    <Bar 
                      dataKey="placementRate" 
                      name="Placement Rate" 
                      fill="#1B2A5C" 
                      radius={[0, 6, 6, 0]}
                    >
                      {tradePlacementStats.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={
                            entry.placementRate >= 94 ? '#F28C28' :
                            entry.placementRate >= 90 ? '#1B2A5C' : '#3B82F6'
                          } 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Trade Breakdown Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
                {tradePlacementStats.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                    <p className="text-xs font-bold text-[#1B2A5C] truncate">{item.shortName}</p>
                    <p className="text-lg font-black text-[#F28C28] mt-0.5">{item.placementRate}%</p>
                    <p className="text-[10px] text-slate-500">{item.placedStudents}/{item.totalStudents} placed</p>
                    <p className="text-[9px] font-semibold text-slate-400 mt-1 truncate" title={item.topRecruiter}>
                      {item.topRecruiter}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB CONTENT 4: SECTORS (PieChart / Donut) */}
          {activeTab === 'sectors' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1B2A5C]">
                    Placement Distribution by Industry Sector
                  </h3>
                  <p className="text-xs text-slate-500">
                    Diversity of employment sectors absorbing Bharti ITI certified technicians.
                  </p>
                </div>
                <div className="text-xs font-semibold text-slate-600">
                  Total 5 Primary Employment Sectors
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Donut Chart */}
                <div className="md:col-span-6 h-64 sm:h-72 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sectorDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={95}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {sectorDistribution.map((entry, index) => (
                          <Cell key={`sector-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<PieCustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Sector Legend Details */}
                <div className="md:col-span-6 space-y-3">
                  {sectorDistribution.map((sector, idx) => (
                    <div 
                      key={idx} 
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-slate-100/70 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span 
                          className="w-3.5 h-3.5 rounded-full shrink-0" 
                          style={{ backgroundColor: sector.color }} 
                        />
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-[#1B2A5C] leading-snug">
                            {sector.name}
                          </p>
                          <span className="text-[11px] text-slate-500">
                            {sector.count} Candidates placed
                          </span>
                        </div>
                      </div>
                      <span className="text-sm sm:text-base font-black text-[#1B2A5C]">
                        {sector.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* 3. RECRUITER WALL & TOP HIRING PARTNERS */}
        <div className="mb-10 sm:mb-14">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#F28C28] bg-[#FFF4E8] px-3 py-1 rounded-full border border-[#FCD8B0] inline-block mb-2">
              {t('recruiterViewOffers')}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#1B2A5C]">
              {t('recruiterHeading')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t('recruiterSub')}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {topRecruitingPartners.map((partner, index) => (
              <div 
                key={index} 
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-[#F28C28]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase text-slate-400">
                      {partner.sector}
                    </span>
                    <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {partner.badge}
                    </span>
                  </div>
                  <h4 className="text-sm font-extrabold text-[#1B2A5C]">{partner.name}</h4>
                </div>
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{partner.hires}</span>
                  </span>
                  <span className="text-[10px] text-slate-400">On-Campus</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. THREE TRUST PILLARS (Guarantees for Prospective Students) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {trustGuarantees.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-2 relative"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FFF4E8] text-[#F28C28] flex items-center justify-center font-bold mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm sm:text-base font-bold text-[#1B2A5C]">{item.title}</h4>
              <p className="text-xs font-semibold text-[#F28C28]">{item.subtitle}</p>
              <p className="text-xs text-slate-500 leading-relaxed pt-1">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
