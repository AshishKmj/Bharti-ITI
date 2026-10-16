import { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles, User, Phone, BookOpen, MessageSquare, Mail } from 'lucide-react';
import { getCourses, submitEnquiry } from '../services/api.js';
import { validateContactForm } from '../utils/pure_logic.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function ContactForm({
  initialTrade = "",
  onSuccess = null,
  showCard = true,
  title = "",
  subtitle = "",
  badge = "",
  className = "",
}) {
  const { t, language } = useLanguage();
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    trade: initialTrade || "",
    message: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResponse, setSuccessResponse] = useState(null);

  // Update selected trade if initialTrade prop changes
  useEffect(() => {
    if (initialTrade) {
      setFormData((prev) => ({ ...prev, trade: initialTrade }));
    }
  }, [initialTrade]);

  // Load courses list for the trade dropdown
  useEffect(() => {
    let isMounted = true;
    getCourses().then((list) => {
      if (isMounted) setCourses(list);
    }).catch(() => {
      // Fallback trade names if API is delayed
      if (isMounted) {
        setCourses([
          { slug: 'electrician', name: 'Electrician', duration: '2 Years', seats: 40 },
          { slug: 'fitter', name: 'Fitter', duration: '2 Years', seats: 40 },
          { slug: 'welder', name: 'Welder', duration: '1 Year', seats: 20 },
          { slug: 'copa', name: 'COPA', duration: '1 Year', seats: 48 },
          { slug: 'diesel-mechanic', name: 'Mechanic Diesel', duration: '1 Year', seats: 24 },
          { slug: 'draughtsman-civil', name: 'Draughtsman (Civil)', duration: '2 Years', seats: 24 },
        ]);
      }
    });
    return () => { isMounted = false; };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const res = await submitEnquiry({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        trade: formData.trade,
        message: formData.message.trim(),
        email: formData.email ? formData.email.trim() : "",
      });
      setSuccessResponse(res);
      if (typeof onSuccess === 'function') {
        onSuccess(res);
      }
    } catch {
      setErrors({ form: language === 'hi' 
        ? "संदेश भेजने में त्रुटि हुई। कृपया सीधे फोन अथवा व्हाट्सएप द्वारा संपर्क करें।" 
        : "Failed to send message. Please reach us via phone or WhatsApp." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSuccessResponse(null);
    setFormData({
      name: "",
      phone: "",
      trade: initialTrade || "",
      message: "",
      email: "",
    });
    setErrors({});
  };

  const cardWrapper = showCard 
    ? "bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-sm" 
    : "w-full";

  return (
    <div className={`${cardWrapper} ${className}`}>
      {/* Form Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFF4E8] text-[#F28C28] mb-2">
          <Sparkles className="w-3.5 h-3.5" /> {badge || t('contactFormBadge')}
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B2A5C]">
          {title || t('contactFormTitle')}
        </h2>
        <p className="text-xs sm:text-sm text-[#5C677D] mt-1.5 leading-relaxed">
          {subtitle || t('contactFormSubtitle')}
        </p>
      </div>

      {/* Success Confirmation State */}
      {successResponse ? (
        <div 
          className="bg-[#FFF8F0] border-2 border-[#F28C28] rounded-2xl p-6 sm:p-8 text-center space-y-5 animate-in fade-in-50"
          role="status"
          aria-live="polite"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-[#1B2A5C]">
              {t('formSuccessTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-[#5C677D] leading-relaxed max-w-md mx-auto mt-2">
              {successResponse.message || t('formSuccessDesc')}
            </p>
          </div>

          {/* Reference and Submission summary */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 text-left max-w-md mx-auto space-y-2 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">{t('formRefNo')}:</span>
              <span className="font-mono font-bold text-[#F28C28] text-sm">{successResponse.referenceId}</span>
            </div>
            {successResponse.data && (
              <div className="space-y-1 text-slate-700 pt-1">
                <p><strong>{t('formName')}:</strong> {successResponse.data.name}</p>
                <p><strong>{t('formPhone')}:</strong> {successResponse.data.phone}</p>
                <p><strong>{t('formTrade')}:</strong> {successResponse.data.trade}</p>
              </div>
            )}
          </div>

          <p className="text-xs text-emerald-700 font-medium">
            {language === 'hi'
              ? "हमारे प्रवेश परामर्शदाता कार्यदिवस में आपसे संपर्क करेंगे।"
              : "Our admissions counselor will get in touch with you shortly on your provided contact number."}
          </p>

          <div>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 min-h-[44px] rounded-xl bg-[#1B2A5C] hover:bg-[#121D42] text-white font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-sm hover:shadow active:scale-98 touch-manipulation inline-flex items-center justify-center"
            >
              {t('formSubmitAnother')}
            </button>
          </div>
        </div>
      ) : (
        /* Contact Form */
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {errors.form && (
            <div 
              role="alert" 
              className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm rounded-xl flex items-center gap-2.5"
            >
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
              <span>{errors.form}</span>
            </div>
          )}

          {/* Student Full Name */}
          <div>
            <label htmlFor="contact-form-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              <span className="inline-flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                {t('formName')}
              </span>
              <span className="text-rose-500 ml-1">*</span>
            </label>
            <input
              id="contact-form-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t('formNamePlaceholder')}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`w-full px-4 py-3 min-h-[44px] rounded-xl border text-sm text-[#222B3A] focus:outline-none focus:ring-2 transition-all ${
                errors.name 
                  ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20' 
                  : 'border-slate-200 focus:ring-[#1B2A5C]/20 focus:border-[#1B2A5C]'
              }`}
            />
            {errors.name && (
              <p id="name-error" role="alert" className="text-xs text-rose-500 mt-1 font-medium flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Phone & Email (Responsive Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone */}
            <div>
              <label htmlFor="contact-form-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {t('formPhone')}
                </span>
                <span className="text-rose-500 ml-1">*</span>
              </label>
              <input
                id="contact-form-phone"
                type="tel"
                name="phone"
                maxLength={10}
                value={formData.phone}
                onChange={handleChange}
                placeholder={t('formPhonePlaceholder')}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className={`w-full px-4 py-3 min-h-[44px] rounded-xl border text-sm text-[#222B3A] focus:outline-none focus:ring-2 transition-all ${
                  errors.phone 
                    ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20' 
                    : 'border-slate-200 focus:ring-[#1B2A5C]/20 focus:border-[#1B2A5C]'
                }`}
              />
              {errors.phone && (
                <p id="phone-error" role="alert" className="text-xs text-rose-500 mt-1 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Email (Optional) */}
            <div>
              <label htmlFor="contact-form-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {language === 'hi' ? 'ईमेल पता (वैकल्पिक)' : 'Email Address (Optional)'}
                </span>
              </label>
              <input
                id="contact-form-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. rahul@gmail.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`w-full px-4 py-3 min-h-[44px] rounded-xl border text-sm text-[#222B3A] focus:outline-none focus:ring-2 transition-all ${
                  errors.email 
                    ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20' 
                    : 'border-slate-200 focus:ring-[#1B2A5C]/20 focus:border-[#1B2A5C]'
                }`}
              />
              {errors.email && (
                <p id="email-error" role="alert" className="text-xs text-rose-500 mt-1 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Trade of Interest Dropdown */}
          <div>
            <label htmlFor="contact-form-trade" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              <span className="inline-flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                {t('formTrade')}
              </span>
              <span className="text-rose-500 ml-1">*</span>
            </label>
            <select
              id="contact-form-trade"
              name="trade"
              value={formData.trade}
              onChange={handleChange}
              aria-invalid={!!errors.trade}
              aria-describedby={errors.trade ? "trade-error" : undefined}
              className={`w-full px-4 py-3 min-h-[44px] rounded-xl border text-sm text-[#222B3A] bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.trade 
                  ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20' 
                  : 'border-slate-200 focus:ring-[#1B2A5C]/20 focus:border-[#1B2A5C]'
              }`}
            >
              <option value="">{t('formTradePlaceholder')}</option>
              {courses.map((c) => (
                <option key={c.slug} value={c.name}>
                  {c.name} ({c.duration ? c.duration.split(' ')[0] + ' ' + (c.duration.split(' ')[1] || 'Yr') : 'CTS'}{c.seats ? ` - ${c.seats} seats` : ''})
                </option>
              ))}
            </select>
            {errors.trade && (
              <p id="trade-error" role="alert" className="text-xs text-rose-500 mt-1 font-medium flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                {errors.trade}
              </p>
            )}
          </div>

          {/* Message / Query */}
          <div>
            <label htmlFor="contact-form-message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              <span className="inline-flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                {t('formMessage')}
              </span>
              <span className="text-rose-500 ml-1">*</span>
            </label>
            <textarea
              id="contact-form-message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder={t('formMessagePlaceholder')}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`w-full px-4 py-3 rounded-xl border text-sm text-[#222B3A] focus:outline-none focus:ring-2 transition-all ${
                errors.message 
                  ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20' 
                  : 'border-slate-200 focus:ring-[#1B2A5C]/20 focus:border-[#1B2A5C]'
              }`}
            />
            {errors.message && (
              <p id="message-error" role="alert" className="text-xs text-rose-500 mt-1 font-medium flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                {errors.message}
              </p>
            )}
          </div>

          {/* Submit button (min-h-[44px]) */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 min-h-[44px] rounded-xl bg-[#F28C28] hover:bg-[#D67417] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed touch-manipulation active:scale-98"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{t('formSubmitting')}</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>{t('formSubmit')}</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
