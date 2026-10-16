import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  ShieldCheck, 
  Target, 
  Eye, 
  Compass, 
  Award, 
  CheckCircle2, 
  Wrench, 
  Building2, 
  BookOpen, 
  Laptop, 
  Home as HomeIcon, 
  UtensilsCrossed, 
  Briefcase, 
  FileCheck2,
  Users
} from 'lucide-react';
import { siteConfig } from '../config/site.js';
import { getFaculty } from '../services/api.js';
import PageBanner from '../components/PageBanner.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import PlacementDashboard from '../components/PlacementDashboard.jsx';

export default function About({ onOpenEnquiry }) {
  const [faculty, setFaculty] = useState([]);
  const [activeTab, setActiveTab] = useState('workshops');

  useEffect(() => {
    let isMounted = true;
    getFaculty().then((list) => {
      if (isMounted) setFaculty(list);
    });
    return () => { isMounted = false; };
  }, []);

  const infrastructureData = {
    workshops: {
      title: "Advanced Heavy Engineering Workshops",
      icon: Wrench,
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80",
      description: "Our workshops span over 15,000 square feet of dedicated industrial space equipped with modern machine tools. Every trade features standard DGT-prescribed setups including all-geared center lathes, shaping machines, 6G pipe welding booths, and electrical test benches.",
      features: [
        "Individual student tooling stations with zero queue times",
        "3-Phase industrial power connections with emergency stop safety grids",
        "Exhaust fume extractors for welding and heat treatment bays",
        "Calibrated precision metrology tools (micrometers, Vernier calipers, dial gauges)"
      ]
    },
    computerLab: {
      title: "Centrally Air-Conditioned Computer & CAD Lab",
      icon: Laptop,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80",
      description: "Equipped with 60 high-performance workstations connected via 1 Gbps high-speed optical fiber LAN. The lab powers COPA programming, AutoCAD 2D/3D civil drafting, Tally Prime GST computerized accounting, and DGT CBT online examination practice.",
      features: [
        "1:1 Student to PC ratio during all practical sessions",
        "Licensed AutoCAD, Tally Prime, and Python programming environments",
        "Dedicated UPS power backup ensuring zero interruption during exams",
        "Smart interactive projection systems for visual demonstrations"
      ]
    },
    library: {
      title: "Technical Reference Library & Bharat Skills Hub",
      icon: BookOpen,
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=80",
      description: "A peaceful sanctuary housing more than 5,000 technical textbooks, National Instructional Media Institute (NIMI) study modules, previous 10-year AITT question banks, and subscriptions to engineering journals.",
      features: [
        "Complete NIMI book sets in English and Hindi for all CTS trades",
        "Digital library section with e-books, Bharat Skills video lectures",
        "Spacious 100-seater quiet study hall open till late evening",
        "Competitive exam preparation section for RRB, BHEL, and State Discoms"
      ]
    },
    hostel: {
      title: "Comfortable On-Campus Trainee Hostel",
      icon: HomeIcon,
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80",
      description: "Safe, secure, and disciplined residential facilities for outstation students. Located inside the guarded campus perimeter with separate warden supervision and 24x7 security surveillance.",
      features: [
        "Furnished rooms with individual study tables, wardrobes, and beds",
        "24-hour clean RO purified drinking water and uninterrupted power supply",
        "Recreation room with indoor games (chess, carrom, table tennis)",
        "Biometric entry system and resident doctor on call"
      ]
    },
    canteen: {
      title: "Hygienic Campus Cafeteria & Dining Hall",
      icon: UtensilsCrossed,
      image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=1000&q=80",
      description: "Clean cafeteria serving fresh, nutritious, and balanced vegetarian meals, refreshments, and snacks at subsidized student-friendly prices.",
      features: [
        "Strict food hygiene standards inspected weekly by food safety committee",
        "Spacious ventilated dining hall seating 150 trainees simultaneously",
        "Nutritious breakfast, lunch, and evening snacks menu",
        "Dedicated mess committee managed with student trainee representatives"
      ]
    }
  };

  const currentInfra = infrastructureData[activeTab];

  return (
    <>
      <Helmet>
        <title>About Us | {siteConfig.name} - Affiliation, Infrastructure &amp; Faculty</title>
        <meta
          name="description"
          content="Learn about Bharti ITI, an NCVT & SCVT affiliated technical training institution. Discover our mission, principal's message, certified instructors, and workshop infrastructure."
        />
      </Helmet>

      {/* Banner */}
      <PageBanner
        title="About Bharti ITI"
        hindiSubtitle="संस्थान का परिचय, दृष्टिकोण एवं परंपरा"
        breadcrumbs={[{ label: "About Us", href: "/about" }]}
      />

      {/* 1. INSTITUTE INTRODUCTION WITH BADGES */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFF4E8] text-[#F28C28] border border-[#FCD8B0]">
              <Award className="w-4 h-4" /> Established {siteConfig.establishedYear}
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-[#1B2A5C] tracking-tight leading-tight">
              Shaping India’s Technical Workforce for Over 15 Years
            </h2>

            <p className="text-sm sm:text-base text-[#5C677D] leading-relaxed">
              <strong>Bharti Industrial Training Institute (Bharti ITI)</strong> was founded with a singular purpose: to deliver high-quality, practical, industry-aligned craftsmanship training that turns youth into self-reliant, certified professionals.
            </p>

            <p className="text-sm sm:text-base text-[#5C677D] leading-relaxed">
              Operating under the Directorate General of Training (DGT), Ministry of Skill Development &amp; Entrepreneurship, Govt. of India, Bharti ITI offers 10 specialized engineering and non-engineering trades under the National Council for Vocational Training (NCVT) and State Council for Vocational Training (SCVT).
            </p>

            {/* Badges strip */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-[#1B2A5C] shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-[#1B2A5C]">NCVT Affiliated</h4>
                  <p className="text-[11px] text-slate-500">DGT Code: PR10009823</p>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
                <FileCheck2 className="w-8 h-8 text-[#F28C28] shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-[#1B2A5C]">SCVT Recognized</h4>
                  <p className="text-[11px] text-slate-500">State Code: 842/BHT</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white group">
              <img
                src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80"
                alt="Bharti ITI Campus Building"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121D42]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg font-bold">Bharti ITI Main Instructional Campus</h3>
                <p className="text-xs text-amber-200">5-Acre Sprawling Technical Training Facility</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MISSION, VISION & CORE VALUES */}
      <section className="py-16 bg-[#EEF2FA]/60 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Guiding Philosophy"
            title="Our Mission &amp;"
            highlight="Vision"
            description="Guiding every lesson, blueprint, and weld to build skilled craftsmen who engineer the future of the nation."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Mission */}
            <div className="bg-white rounded-2xl p-7 sm:p-9 border border-slate-200 shadow-sm relative overflow-hidden group">
              <div className="w-14 h-14 rounded-2xl bg-[#FFF4E8] text-[#F28C28] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#1B2A5C] mb-3">Our Mission</h3>
              <p className="text-sm text-[#5C677D] leading-relaxed">
                To impart rigorous, standardized vocational training in modern engineering disciplines with zero compromise on workshop hours. We strive to provide accessible, affordable, and job-ready technical education to students from all socio-economic backgrounds, creating disciplined craftsmen equipped for immediate employment or entrepreneurship.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl p-7 sm:p-9 border border-slate-200 shadow-sm relative overflow-hidden group">
              <div className="w-14 h-14 rounded-2xl bg-[#EEF2FA] text-[#1B2A5C] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#1B2A5C] mb-3">Our Vision</h3>
              <p className="text-sm text-[#5C677D] leading-relaxed">
                To be acknowledged as the premier benchmark for Industrial Training in the region, recognized by industries and government enterprises for graduating craftsmen who embody technical mastery, safety discipline, innovation, and an unwavering work ethic.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h4 className="text-base sm:text-lg font-bold text-[#1B2A5C] mb-6 text-center uppercase tracking-wider text-xs">
              Our 4 Pillars of Excellence
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-[#1B2A5C] font-black flex items-center justify-center mx-auto text-sm">
                  1
                </div>
                <h5 className="font-bold text-[#1B2A5C] text-sm">Shop-Floor Rigor</h5>
                <p className="text-xs text-[#5C677D]">Over 70% of curriculum time spent handling live tools and machinery.</p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-[#F28C28] font-black flex items-center justify-center mx-auto text-sm">
                  2
                </div>
                <h5 className="font-bold text-[#1B2A5C] text-sm">Safety First Culture</h5>
                <p className="text-xs text-[#5C677D]">Zero tolerance for safety shortcuts; strict PPE and Indian Electricity Rules compliance.</p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-black flex items-center justify-center mx-auto text-sm">
                  3
                </div>
                <h5 className="font-bold text-[#1B2A5C] text-sm">Integrity &amp; Ethics</h5>
                <p className="text-xs text-[#5C677D]">Instilling dignity of labor, punctuality, and professional craftsmanship pride.</p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 font-black flex items-center justify-center mx-auto text-sm">
                  4
                </div>
                <h5 className="font-bold text-[#1B2A5C] text-sm">Industry Relevance</h5>
                <p className="text-xs text-[#5C677D]">Continual curriculum alignment with contemporary manufacturing needs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. AFFILIATION & RECOGNITION SECTION */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Statutory Accreditations"
          title="Affiliation &amp;"
          highlight="Govt. Recognition"
          description="Bharti ITI is fully approved by Directorate General of Training (DGT), Ministry of Skill Development and Entrepreneurship, Government of India."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: NCVT */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-[#EEF2FA] text-[#1B2A5C] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6 text-[#1B2A5C]" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#F28C28]">
              Central Government
            </span>
            <h3 className="text-lg font-bold text-[#1B2A5C] mt-1 mb-2">
              NCVT Affiliated (DGT, New Delhi)
            </h3>
            <p className="text-xs sm:text-sm text-[#5C677D] leading-relaxed mb-4">
              All 10 trades conform to Craftsmen Training Scheme (CTS) norms. Students are enrolled on the national NCVT MIS portal and receive global National Trade Certificates (NTC).
            </p>
            <div className="p-2.5 bg-slate-50 rounded-lg text-xs font-mono font-bold text-[#1B2A5C] border border-slate-200/80">
              DGT MIS Code: PR10009823
            </div>
          </div>

          {/* Card 2: SCVT */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-[#FFF4E8] text-[#F28C28] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileCheck2 className="w-6 h-6 text-[#F28C28]" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#F28C28]">
              State Directorate
            </span>
            <h3 className="text-lg font-bold text-[#1B2A5C] mt-1 mb-2">
              SCVT Recognized &amp; Approved
            </h3>
            <p className="text-xs sm:text-sm text-[#5C677D] leading-relaxed mb-4">
              Recognized by State Directorate of Technical Training &amp; Employment, ensuring eligibility for state electricity boards, municipal corporations, and state civil departments.
            </p>
            <div className="p-2.5 bg-slate-50 rounded-lg text-xs font-mono font-bold text-[#1B2A5C] border border-slate-200/80">
              State Affiliation: 842/BHT
            </div>
          </div>

          {/* Card 3: NAPS Apprenticeship */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Briefcase className="w-6 h-6 text-emerald-700" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
              Apprenticeship Scheme
            </span>
            <h3 className="text-lg font-bold text-[#1B2A5C] mt-1 mb-2">
              NAPS Apprenticeship Partner
            </h3>
            <p className="text-xs sm:text-sm text-[#5C677D] leading-relaxed mb-4">
              Direct integration with the National Apprenticeship Promotion Scheme (NAPS), enabling students to secure mandatory paid industrial apprenticeships post course completion.
            </p>
            <div className="p-2.5 bg-slate-50 rounded-lg text-xs font-mono font-bold text-[#1B2A5C] border border-slate-200/80">
              Portal: apprenticeshipindia.gov.in
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRINCIPAL'S MESSAGE */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#1B2A5C] to-[#121D42] rounded-3xl text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Principal Photo */}
            <div className="md:col-span-4 flex flex-col items-center text-center">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80"
                  alt="Principal Er. Arvind K. Sharma"
                  className="w-44 h-44 sm:w-52 sm:h-52 rounded-2xl object-cover border-4 border-[#F28C28] shadow-xl"
                />
                <div className="absolute -bottom-3 inset-x-0 mx-auto w-max px-3 py-1 rounded-md bg-[#F28C28] text-white text-xs font-bold shadow-md">
                  22+ Yrs Experience
                </div>
              </div>
              <h4 className="text-lg font-bold mt-6 text-white">Er. Arvind K. Sharma</h4>
              <p className="text-xs text-amber-300 font-medium">Principal &amp; Technical Director</p>
              <p className="text-[11px] text-slate-400 mt-0.5">B.Tech, M.Tech (Prod), CITS Certified</p>
            </div>

            {/* Principal Message Content */}
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#F28C28]">
                Desk of the Principal
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                "Technical Skill is the Greatest Equalizer in Modern India."
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                <p>
                  Dear Trainees and Parents,
                </p>
                <p>
                  In a rapidly developing industrial economy, degrees without hands-on proficiency hold limited value. What Indian railways, energy grids, automotive giants, and infrastructure projects desperately require today are skilled, disciplined technicians who know how to work with their hands, read engineering blueprints, and diagnose machinery with precision.
                </p>
                <p>
                  At Bharti ITI, we treat vocational training not merely as an educational course, but as a life-transforming craft. We have invested tirelessly in heavy machinery, CITS certified instructors, and industry apprenticeships so that no student ever leaves unprepared for the job market.
                </p>
                <p className="italic text-amber-200">
                  "I invite every ambitious youth to join Bharti ITI, learn a timeless craft, and walk out with your head held high as a proud National Trade Certificate holder."
                </p>
              </div>

              <div className="pt-4 border-t border-slate-700 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white tracking-widest uppercase">Jai Hind • Kaushal Bharat, Kushal Bharat</p>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenEnquiry && onOpenEnquiry()}
                  className="px-5 py-2 rounded-lg bg-[#F28C28] hover:bg-[#D67417] text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Meet Principal / Enquire
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FACULTY GRID (8 CARDS) */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Instructional Staff"
            title="Our Master Instructors &amp;"
            highlight="Faculty"
            description="Learn directly from industry veterans and CITS-certified vocational masters with decades of shop-floor experience."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {faculty.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-3 right-3 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#F28C28]">
                        {member.experience}
                      </span>
                      <h4 className="text-base font-bold leading-tight">{member.name}</h4>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <p className="text-xs font-bold text-[#1B2A5C]">{member.designation}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-2">{member.qualification}</p>
                    <div className="pt-2 border-t border-slate-100">
                      <p className="text-[11px] text-[#5C677D]">
                        <strong className="text-slate-700">Specialization:</strong> {member.specialization}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                  <span className="text-[10px] font-bold text-[#F28C28] uppercase tracking-wider">
                    CITS / DGT Certified Trainer
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INFRASTRUCTURE TABS */}
      <section className="py-16 sm:py-20 bg-[#EEF2FA]/70 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Campus Facilities"
            title="World-Class Vocational"
            highlight="Infrastructure"
            description="Take a tour of our specialized workshops, computer lab, library, hostel, and dining amenities."
          />

          {/* Tab Navigation Buttons */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10">
            {[
              { id: 'workshops', label: 'Workshops', icon: Wrench },
              { id: 'computerLab', label: 'Computer & CAD Lab', icon: Laptop },
              { id: 'library', label: 'Technical Library', icon: BookOpen },
              { id: 'hostel', label: 'Trainee Hostel', icon: HomeIcon },
              { id: 'canteen', label: 'Canteen & Mess', icon: UtensilsCrossed },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1B2A5C] text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#F28C28]' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Panel */}
          {currentInfra && (
            <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-md">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFF4E8] text-[#F28C28]">
                    <currentInfra.icon className="w-4 h-4" /> Bharti ITI Infrastructure
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1B2A5C]">
                    {currentInfra.title}
                  </h3>
                  <p className="text-sm text-[#5C677D] leading-relaxed">
                    {currentInfra.description}
                  </p>

                  <div className="space-y-2.5 pt-2">
                    {currentInfra.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200">
                    <img
                      src={currentInfra.image}
                      alt={currentInfra.title}
                      className="w-full h-72 sm:h-80 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3-YEAR PLACEMENT STATISTICS DASHBOARD */}
      <PlacementDashboard onOpenEnquiry={onOpenEnquiry} />
    </>
  );
}
