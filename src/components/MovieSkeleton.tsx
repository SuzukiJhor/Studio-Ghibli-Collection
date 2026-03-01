export const MovieSkeleton = () => {
  return (
    <div
      role="status"
      aria-label="Carregando filme"
      className="flex flex-col h-112 rounded-2xl overflow-hidden border"
      style={{
        backgroundColor: 'color-mix(in oklab, var(--bg) 92%, transparent)',
        borderColor: 'color-mix(in oklab, var(--text) 10%, transparent)',
      }}
    >
      <div
        className="w-full h-75 relative overflow-hidden"
        style={{
          backgroundColor:
            'color-mix(in oklab, var(--text) 12%, transparent)',
        }}
      >
        <div
          className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite]"
          style={{
            background:
              'linear-gradient(to right, transparent, color-mix(in oklab, var(--text) 15%, transparent), transparent)',
          }}
        />
      </div>

      <div className="p-6 flex flex-col gap-3">
        <div
          className="relative h-6 w-[80%] rounded-md overflow-hidden"
          style={{
            backgroundColor:
              'color-mix(in oklab, var(--text) 14%, transparent)',
          }}
        >
          <div
            className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite]"
            style={{
              background:
                'linear-gradient(to right, transparent, color-mix(in oklab, var(--text) 18%, transparent), transparent)',
            }}
          />
        </div>

        <div
          className="relative h-4 w-[40%] rounded-md overflow-hidden"
          style={{
            backgroundColor:
              'color-mix(in oklab, var(--text) 12%, transparent)',
          }}
        >
          <div
            className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite]"
            style={{
              background:
                'linear-gradient(to right, transparent, color-mix(in oklab, var(--text) 16%, transparent), transparent)',
            }}
          />
        </div>

        <div
          className="relative h-15 w-full rounded-md overflow-hidden"
          style={{
            backgroundColor:
              'color-mix(in oklab, var(--text) 10%, transparent)',
          }}
        >
          <div
            className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite]"
            style={{
              background:
                'linear-gradient(to right, transparent, color-mix(in oklab, var(--text) 14%, transparent), transparent)',
            }}
          />
        </div>
      </div>
    </div>
  );
};