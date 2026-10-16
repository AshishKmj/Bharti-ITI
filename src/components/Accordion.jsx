import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Accordion({ items = [], allowMultiple = false, defaultOpenIndex = 0 }) {
  const [openIndices, setOpenIndices] = useState(
    defaultOpenIndex !== null ? [defaultOpenIndex] : []
  );

  const toggleIndex = (index) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndices((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIndices.includes(idx);
        return (
          <div
            key={idx}
            className={`border rounded-xl transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'border-[#1B2A5C]/40 bg-white shadow-sm'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <button
              type="button"
              onClick={() => toggleIndex(idx)}
              aria-expanded={isOpen}
              className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1B2A5C] focus:ring-inset"
            >
              <div className="flex items-center gap-3">
                {item.badge && (
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#EEF2FA] text-[#1B2A5C] border border-[#1B2A5C]/10">
                    {item.badge}
                  </span>
                )}
                <span className="font-bold text-sm sm:text-base text-[#1B2A5C]">
                  {item.title}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                  isOpen ? 'transform rotate-180 text-[#F28C28]' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5C677D] border-t border-slate-100 leading-relaxed animate-in fade-in-50 duration-150">
                {typeof item.content === 'string' ? (
                  <p>{item.content}</p>
                ) : (
                  item.content
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
