import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Tag, Calendar, Eye, ZoomIn, ArrowDown } from 'lucide-react';
import { siteConfig } from '../config/site.js';
import { getGallery } from '../services/api.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import PageBanner from '../components/PageBanner.jsx';
import Lightbox from '../components/Lightbox.jsx';
import { GallerySkeleton } from '../components/Skeleton.jsx';

export default function Gallery() {
  const { t, language } = useLanguage();
  const [allItems, setAllItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const categories = [
    { id: "All", label: language === 'hi' ? 'सभी तस्वीरें' : 'All' },
    { id: "Workshops", label: language === 'hi' ? 'वर्कशॉप्स' : 'Workshops' },
    { id: "Events", label: language === 'hi' ? 'कार्यक्रम' : 'Events' },
    { id: "Annual Day", label: language === 'hi' ? 'वार्षिकोत्सव' : 'Annual Day' },
    { id: "Sports", label: language === 'hi' ? 'खेलकूद' : 'Sports' },
    { id: "Campus", label: language === 'hi' ? 'परिसर' : 'Campus' },
    { id: "Achievements", label: language === 'hi' ? 'उपलब्धियां' : 'Achievements' },
  ];

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getGallery(selectedCategory).then((list) => {
      if (isMounted) {
        setAllItems(list);
        setVisibleCount(12); // reset page count
        setLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, [selectedCategory]);

  const visibleItems = allItems.slice(0, visibleCount);
  const hasMore = visibleCount < allItems.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 8, allItems.length));
  };

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Campus Life &amp; Workshop Gallery | {siteConfig.name}</title>
        <meta
          name="description"
          content="Explore high-resolution photographs of Bharti ITI's engineering workshops, annual day celebrations, sports tournaments, campus amenities, and trainee achievements."
        />
      </Helmet>

      {/* Banner */}
      <PageBanner
        title={language === 'hi' ? 'फोटो गैलरी एवं परिसर जीवन' : 'Photo Gallery & Campus Life'}
        hindiSubtitle="संस्थान के वर्कशॉप, सांस्कृतिक कार्यक्रम, खेलकूद एवं उपलब्धियों की झलकियाँ"
        breadcrumbs={[{ label: t('navGallery'), href: "/gallery" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        
        {/* Category Tabs (min-h-[44px] touch target) */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 mb-8 sm:mb-10 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer touch-manipulation active:scale-95 flex items-center justify-center shrink-0 ${
                  isActive
                    ? 'bg-[#1B2A5C] text-white shadow-md ring-2 ring-[#1B2A5C]/20'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <GallerySkeleton key={i} />
            ))}
          </div>
        ) : visibleItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 max-w-md mx-auto shadow-xs">
            <p className="text-sm font-semibold text-slate-500">
              {language === 'hi' ? 'इस श्रेणी में कोई तस्वीर उपलब्ध नहीं है।' : 'No photos in this category yet.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {visibleItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => handleOpenLightbox(idx)}
                className="group relative rounded-xl overflow-hidden aspect-4/3 bg-slate-100 shadow-xs hover:shadow-xl cursor-pointer border border-slate-200/80 transition-all duration-300"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  width={600}
                  height={450}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://picsum.photos/seed/iti-gal-${item.id}/800/600`;
                  }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Hover / Tap overlay with title & zoom icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-4 text-white">
                  <div className="flex justify-between items-start">
                    <span className="bg-[#F28C28] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      {item.category}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center">
                      <ZoomIn className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                    {item.date && (
                      <p className="text-[11px] text-amber-200 mt-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {item.date}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button (min-h-[44px]) */}
        {hasMore && !loading && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-xl bg-[#1B2A5C] hover:bg-[#121D42] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95 touch-manipulation"
            >
              <ArrowDown className="w-4 h-4 text-[#F28C28]" />
              <span>
                {language === 'hi' 
                  ? `और तस्वीरें देखें (${allItems.length - visibleCount} शेष)` 
                  : `Load More Photos (${allItems.length - visibleCount} remaining)`}
              </span>
            </button>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      <Lightbox
        images={visibleItems}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setLightboxIndex((prev) => (prev === 0 ? visibleItems.length - 1 : prev - 1))}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % visibleItems.length)}
      />
    </>
  );
}
