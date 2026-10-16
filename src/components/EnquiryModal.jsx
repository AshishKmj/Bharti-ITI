import { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { getCourses, submitEnquiry } from '../services/api.js';
import { validateEnquiryForm } from '../utils/pure_logic.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function EnquiryModal({ isOpen, onClose, initialTrade = "" }) {
  const { t, language } = useLanguage();
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    trade: initialTrade || "",
    message: "I am interested in admission for the upcoming session. Please guide me.",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResult, setSuccessResult] = useState(null);

  // Update selected trade if initialTrade prop changes
  useEffect(() => {
    if (initialTrade) {
      setFormData((prev) => ({ ...prev, trade: initialTrade }));
    }
  }, [initialTrade]);

  // Load courses for dropdown
  useEffect(() => {
    let isMounted = true;
    getCourses().then((list) => {
      if (isMounted) setCourses(list);
    });
    return () => { isMounted = false; };
  }, []);

  // Keyboard Escape listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateEnquiryForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const res = await submitEnquiry(formData);
      setSuccessResult(res);
    } catch (err) {
      console.error(err);
      setErrors({ form: "Failed to submit enquiry. Please call us directly." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSuccessResult(null);
    setFormData({
      name: "",
      phone: "",
      email: "",
      trade: "",
      message: "I am interested in admission for the upcoming session. Please guide me.",
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
      onClick={handleResetAndClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-8 shadow-2xl relative my-6 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button with >= 44px touch target */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-3 right-3 p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer touch-manipulation"
          aria-label={t('closeMenu')}
        >
          <X className="w-5 h-5" />
        </button>

        {successResult ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#1B2A5C] mb-2">
              {language === 'hi' ? 'पूछताछ सफलतापूर्वक प्राप्त हुई!' : 'Enquiry Submitted Successfully!'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
              {successResult.message}
            </p>
            <div className="p-3 bg-[#EEF2FA] rounded-xl text-xs font-semibold text-[#1B2A5C] mb-6">
              Reference ID: <span className="font-mono text-sm text-[#F28C28]">{successResult.referenceId}</span>
            </div>
            <button
              type="button"
              onClick={handleResetAndClose}
              className="w-full py-3 min-h-[44px] px-4 bg-[#1B2A5C] hover:bg-[#121D42] text-white font-bold rounded-xl transition-colors cursor-pointer touch-manipulation active:scale-95"
            >
              {language === 'hi' ? 'बंद करें' : 'Close'}
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-5 pr-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFF4E8] text-[#F28C28] mb-2">
                <Sparkles className="w-3.5 h-3.5" /> {t('heroAdmissionOpen')}
              </div>
              <h2 id="enquiry-modal-title" className="text-xl sm:text-2xl font-black text-[#1B2A5C]">
                {language === 'hi' ? 'ऑनलाइन प्रवेश पूछताछ' : 'Apply / Quick Enquiry'}
              </h2>
              <p className="text-xs sm:text-sm text-[#5C677D] mt-1">
                {language === 'hi' ? 'विवरण भरें, हमारे परामर्शदाता शीघ्र आपसे संपर्क करेंगे।' : 'Fill the form below to receive syllabus, fee concessions, and admission confirmation.'}
              </p>
            </div>

            {errors.form && (
              <div className="mb-4 p-3 rounded-lg bg-rose-50 text-rose-700 text-xs flex items-center gap-2 border border-rose-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errors.form}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {language === 'hi' ? 'पूरा नाम' : 'Full Name'} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={language === 'hi' ? 'उदा. राहुल कुमार' : 'e.g. Ramesh Kumar'}
                  className={`w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border text-sm text-[#222B3A] focus:outline-none focus:ring-2 transition-all ${
                    errors.name
                      ? 'border-rose-400 focus:ring-rose-200'
                      : 'border-slate-300 focus:border-[#1B2A5C] focus:ring-[#1B2A5C]/20'
                  }`}
                />
                {errors.name && (
                  <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>
                )}
              </div>

              {/* Phone & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {language === 'hi' ? 'मोबाइल नंबर' : 'Mobile Number'} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    maxLength={10}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit number"
                    className={`w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border text-sm text-[#222B3A] focus:outline-none focus:ring-2 transition-all ${
                      errors.phone
                        ? 'border-rose-400 focus:ring-rose-200'
                        : 'border-slate-300 focus:border-[#1B2A5C] focus:ring-[#1B2A5C]/20'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {language === 'hi' ? 'ईमेल पता' : 'Email Address'} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@gmail.com"
                    className={`w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border text-sm text-[#222B3A] focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? 'border-rose-400 focus:ring-rose-200'
                        : 'border-slate-300 focus:border-[#1B2A5C] focus:ring-[#1B2A5C]/20'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Trade Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {language === 'hi' ? 'पसंदीदा ट्रेड' : 'Trade of Interest'} <span className="text-rose-500">*</span>
                </label>
                <select
                  name="trade"
                  value={formData.trade}
                  onChange={handleChange}
                  className={`w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border text-sm text-[#222B3A] bg-white focus:outline-none focus:ring-2 transition-all ${
                    errors.trade
                      ? 'border-rose-400 focus:ring-rose-200'
                      : 'border-slate-300 focus:border-[#1B2A5C] focus:ring-[#1B2A5C]/20'
                  }`}
                >
                  <option value="">{language === 'hi' ? '-- ट्रेड चुनें --' : '-- Choose Technical Trade --'}</option>
                  {courses.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name} ({c.duration.split(' ')[0]} {c.duration.split(' ')[1]})
                    </option>
                  ))}
                </select>
                {errors.trade && (
                  <p className="text-[11px] text-rose-500 mt-1">{errors.trade}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {language === 'hi' ? 'आपका संदेश या प्रश्न' : 'Your Message or Question'}
                </label>
                <textarea
                  name="message"
                  rows={2}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={language === 'hi' ? 'फीस, हॉस्टल अथवा योग्यता संबंधी प्रश्न लिखें...' : 'Ask about fees, hostel, eligibility, or entrance dates...'}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#222B3A] focus:outline-none focus:ring-2 transition-all ${
                    errors.message
                      ? 'border-rose-400 focus:ring-rose-200'
                      : 'border-slate-300 focus:border-[#1B2A5C] focus:ring-[#1B2A5C]/20'
                  }`}
                />
                {errors.message && (
                  <p className="text-[11px] text-rose-500 mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit CTA (>= 44px height) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 min-h-[44px] px-4 rounded-xl bg-[#F28C28] hover:bg-[#D67417] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed touch-manipulation active:scale-95"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{language === 'hi' ? 'भेजा जा रहा है...' : 'Submitting Enquiry...'}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{language === 'hi' ? 'प्रवेश पूछताछ जमा करें' : 'Submit Admission Enquiry'}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
