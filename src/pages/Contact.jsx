import { Helmet } from 'react-helmet-async';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle,
  Facebook,
  Youtube,
  Instagram,
  Linkedin,
  Twitter
} from 'lucide-react';
import { siteConfig } from '../config/site.js';
import PageBanner from '../components/PageBanner.jsx';
import ContactForm from '../components/ContactForm.jsx';

export default function Contact() {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
    "Hello Bharti ITI Admissions Desk! I would like to enquire about admission and fees for technical trades."
  )}`;

  return (
    <>
      <Helmet>
        <title>Contact Us &amp; Admission Desk | {siteConfig.name}</title>
        <meta
          name="description"
          content={`Get in touch with Bharti ITI. Call ${siteConfig.contact.phone}, visit our campus at ${siteConfig.contact.address}, or submit your online admission inquiry.`}
        />
      </Helmet>

      {/* Banner */}
      <PageBanner
        title="Contact Us &amp; Admissions Desk"
        hindiSubtitle="संपर्क सूत्र, प्रवेश पूछताछ केंद्र एवं संस्थान का पता"
        breadcrumbs={[{ label: "Contact", href: "/contact" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* 1. TOP 4 CONTACT INFO CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Address */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#FFF4E8] text-[#F28C28] flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#1B2A5C] mb-1">Campus Location</h3>
              <p className="text-xs sm:text-sm text-[#5C677D] leading-relaxed">
                {siteConfig.contact.fullAddress}
              </p>
            </div>
            <p className="text-[11px] text-[#F28C28] font-bold mt-3">Near Industrial Area Substation</p>
          </div>

          {/* Phone */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#EEF2FA] text-[#1B2A5C] flex items-center justify-center mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#1B2A5C] mb-1">Phone Enquiries</h3>
              <div className="space-y-1 text-xs sm:text-sm text-[#5C677D]">
                <p>
                  <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`} className="hover:text-[#F28C28] font-bold text-slate-800">
                    {siteConfig.contact.phone}
                  </a>
                </p>
                <p>
                  <a href={`tel:${siteConfig.contact.altPhone.replace(/\s+/g, '')}`} className="hover:text-[#F28C28]">
                    {siteConfig.contact.altPhone}
                  </a>
                </p>
              </div>
            </div>
            <p className="text-[11px] text-emerald-600 font-bold mt-3">Lines Open 9 AM - 6 PM</p>
          </div>

          {/* Email */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#FFF4E8] text-[#F28C28] flex items-center justify-center mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#1B2A5C] mb-1">Official Emails</h3>
              <div className="space-y-1 text-xs sm:text-sm text-[#5C677D]">
                <p>
                  <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[#F28C28] font-medium text-slate-800">
                    {siteConfig.contact.email}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${siteConfig.contact.admissionsEmail}`} className="hover:text-[#F28C28]">
                    {siteConfig.contact.admissionsEmail}
                  </a>
                </p>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-3">24-hour response time</p>
          </div>

          {/* Timings */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#EEF2FA] text-[#1B2A5C] flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#1B2A5C] mb-1">Office Timings</h3>
              <div className="space-y-1 text-xs text-[#5C677D]">
                <p><strong className="text-slate-800">Workdays:</strong> {siteConfig.timings.weekdays}</p>
                <p><strong className="text-slate-800">Admission:</strong> {siteConfig.timings.admissionCell}</p>
                <p className="text-rose-500 font-bold">{siteConfig.timings.sunday}</p>
              </div>
            </div>
            <p className="text-[11px] text-blue-600 font-bold mt-3">Campus visits welcome</p>
          </div>
        </div>

        {/* 2. FORM & MAP GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT 7 COLS: ADMISSIONS CONTACT FORM COMPONENT */}
          <ContactForm className="lg:col-span-7" />

          {/* RIGHT 5 COLS: MAP & INSTANT CONNECT */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Embedded Google Map */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F28C28]" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#1B2A5C]">
                  Interactive Campus Location Map
                </h3>
              </div>
              <div className="relative h-72 sm:h-80 w-full bg-slate-100">
                <iframe
                  title="Bharti ITI Campus Map"
                  src={siteConfig.contact.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Quick WhatsApp Connect Strip */}
            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 shadow-xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-emerald-950">Chat Directly on WhatsApp</h4>
                  <p className="text-xs text-emerald-700">Immediate reply during office hours</p>
                </div>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-bold rounded-lg shrink-0 shadow-xs transition-colors"
              >
                Chat Now
              </a>
            </div>

            {/* Social Media Links */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#1B2A5C] mb-4">
                Connect on Official Social Handles
              </h4>
              <div className="flex items-center gap-3">
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-[#1877F2] hover:text-white flex items-center justify-center text-slate-600 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-[#FF0000] hover:text-white flex items-center justify-center text-slate-600 transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-[#E4405F] hover:text-white flex items-center justify-center text-slate-600 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-[#0A66C2] hover:text-white flex items-center justify-center text-slate-600 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter / X"
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-black hover:text-white flex items-center justify-center text-slate-600 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </>
  );
}
