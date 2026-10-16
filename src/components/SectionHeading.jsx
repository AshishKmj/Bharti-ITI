export default function SectionHeading({
  badge,
  title,
  highlight,
  description,
  centered = true,
  className = "",
}) {
  return (
    <div className={`mb-10 sm:mb-12 ${centered ? "text-center max-w-3xl mx-auto" : "max-w-2xl"} ${className}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-[#FFF4E8] text-[#F28C28] border border-[#FCD8B0] mb-3 shadow-xs ${centered ? "mx-auto" : ""}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#F28C28]"></span>
          {badge}
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1B2A5C] tracking-tight">
        {title}{" "}
        {highlight && <span className="text-[#F28C28]">{highlight}</span>}
      </h2>
      {description && (
        <p className="mt-3 text-sm sm:text-base text-[#5C677D] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
