export function CourseCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-xs animate-pulse">
      <div className="h-48 bg-slate-200" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-slate-200 rounded w-1/3" />
        <div className="h-6 bg-slate-200 rounded w-3/4" />
        <div className="space-y-2 pt-2">
          <div className="h-3 bg-slate-200 rounded" />
          <div className="h-3 bg-slate-200 rounded w-5/6" />
        </div>
        <div className="h-10 bg-slate-200 rounded-lg mt-4" />
      </div>
    </div>
  );
}

export function NoticeCardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs animate-pulse space-y-3">
      <div className="flex items-center justify-between">
        <div className="h-5 bg-slate-200 rounded w-20" />
        <div className="h-4 bg-slate-200 rounded w-24" />
      </div>
      <div className="h-6 bg-slate-200 rounded w-4/5" />
      <div className="h-3 bg-slate-200 rounded w-full" />
      <div className="h-3 bg-slate-200 rounded w-2/3" />
      <div className="h-8 bg-slate-200 rounded w-28 mt-2" />
    </div>
  );
}

export function GallerySkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-slate-200 aspect-4/3 animate-pulse" />
  );
}
