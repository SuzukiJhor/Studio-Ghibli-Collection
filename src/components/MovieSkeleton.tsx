export const MovieSkeleton = () => {
  return (
    <div
      role="status"
      aria-label="Carregando filme"
      className="flex flex-col h-112.5 bg-white/5 rounded-2xl overflow-hidden border border-white/5"
    >
      <div className="w-full h-75 bg-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="p-6 flex flex-col gap-3">
        <div className="relative h-6 w-[80%] bg-slate-800 rounded-md overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/5 to-transparent" />
        </div>

        <div className="relative h-4 w-[40%] bg-slate-800 rounded-md overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/5 to-transparent" />
        </div>

        <div className="relative h-15 w-full bg-slate-800 rounded-md overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/5 to-transparent" />
        </div>
      </div>
    </div>
  );
};