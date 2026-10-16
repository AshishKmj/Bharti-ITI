import { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './context/LanguageContext.jsx';

// Core layout components (non-lazy for immediate render)
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import FloatingActions from './components/FloatingActions.jsx';
import EnquiryModal from './components/EnquiryModal.jsx';

// Route components lazy-loaded for performance
const Home = lazy(() => import('./pages/Home.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Courses = lazy(() => import('./pages/Courses.jsx'));
const CourseDetail = lazy(() => import('./pages/CourseDetail.jsx'));
const Gallery = lazy(() => import('./pages/Gallery.jsx'));
const Notices = lazy(() => import('./pages/Notices.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

// Page loading skeleton fallback
function PageLoadingFallback() {
  return (
    <div className="min-h-[60vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse space-y-8">
      <div className="h-44 bg-slate-200/80 rounded-2xl w-full" />
      <div className="space-y-4 max-w-2xl">
        <div className="h-8 bg-slate-200 rounded-lg w-3/4" />
        <div className="h-4 bg-slate-200 rounded w-full" />
        <div className="h-4 bg-slate-200 rounded w-5/6" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 bg-slate-200/80 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedTradeForEnquiry, setSelectedTradeForEnquiry] = useState("");

  const handleOpenEnquiry = (tradeSlug = "") => {
    setSelectedTradeForEnquiry(tradeSlug || "");
    setEnquiryModalOpen(true);
  };

  const handleCloseEnquiry = () => {
    setEnquiryModalOpen(false);
    setSelectedTradeForEnquiry("");
  };

  return (
    <HelmetProvider>
      <LanguageProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-[#F5F7FA] text-[#222B3A] selection:bg-[#F28C28] selection:text-white">
            {/* Sticky Header with Ticker and Language Toggle */}
            <Header onOpenEnquiry={() => handleOpenEnquiry("")} />

            {/* Main Page Content with React.lazy Suspense */}
            <main className="flex-1 pb-16 md:pb-0">
              <Suspense fallback={<PageLoadingFallback />}>
                <Routes>
                  <Route path="/" element={<Home onOpenEnquiry={handleOpenEnquiry} />} />
                  <Route path="/about" element={<About onOpenEnquiry={handleOpenEnquiry} />} />
                  <Route path="/courses" element={<Courses onOpenEnquiry={handleOpenEnquiry} />} />
                  <Route path="/courses/:slug" element={<CourseDetail onOpenEnquiry={handleOpenEnquiry} />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/notices" element={<Notices />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>

            {/* Global Footer */}
            <Footer />

            {/* Floating WhatsApp, Back-To-Top and Mobile Bottom Action Bar */}
            <FloatingActions />

            {/* Global Admission Enquiry Modal */}
            <EnquiryModal
              isOpen={enquiryModalOpen}
              onClose={handleCloseEnquiry}
              initialTrade={selectedTradeForEnquiry}
            />
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </HelmetProvider>
  );
}
