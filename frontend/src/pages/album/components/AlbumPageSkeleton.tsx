const AlbumPageSkeleton = () => {
  return (
    <div className="rounded-md overflow-hidden h-full min-h-full relative">
      {/* Gradient Background Skeleton */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-800 to-neutral-900 animate-pulse" />

      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row p-6 gap-6 pb-6 sm:pb-8">
          {/* Album Image Skeleton */}
          <div className="w-60 h-60 bg-neutral-700 rounded shadow-xl animate-pulse" />

          <div className="flex flex-col justify-end flex-1">
            <div className="w-16 h-4 bg-neutral-700 rounded animate-pulse" />
            <div className="w-3/4 h-10 md:h-14 bg-neutral-700 rounded mt-2 animate-pulse" />
            <div className="flex items-center gap-2 mt-2">
              <div className="w-24 h-4 bg-neutral-700 rounded animate-pulse" />
              <div className="w-12 h-4 bg-neutral-700 rounded animate-pulse" />
              <div className="w-12 h-4 bg-neutral-700 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Play Button Skeleton */}
        <div className="px-6 pb-6 flex items-center gap-6">
          <div className="size-10 md:size-14 bg-neutral-700 rounded-lg animate-pulse" />
        </div>

        {/* Table Header Skeleton */}
        <div className="grid grid-cols-[16px_4fr_1fr] sm:grid-cols-[16px_4fr_2fr_1fr] gap-4 px-6 py-3 border-b border-white/5">
          <div className="w-4 h-4 bg-neutral-700 rounded animate-pulse" />
          <div className="w-20 h-4 bg-neutral-700 rounded animate-pulse" />
          <div className="hidden sm:block w-24 h-4 bg-neutral-700 rounded animate-pulse" />
          <div className="w-12 h-4 bg-neutral-700 rounded animate-pulse" />
        </div>

        {/* Song List Skeleton */}
        <div className="space-y-2 py-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-[16px_4fr_1fr] sm:grid-cols-[16px_4fr_2fr_1fr] gap-4 px-6 py-3  rounded-md animate-pulse"
            >
              <div className="w-4 h-4 mt-1 bg-neutral-700 rounded" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-neutral-700 rounded" />
                <div>
                  <div className="w-40 h-4 bg-neutral-700 rounded" />
                  <div className="w-24 h-4 bg-neutral-700 rounded mt-1" />
                </div>
              </div>
              <div className="hidden sm:flex items-center w-24 h-4 bg-neutral-700 rounded" />
              <div className="w-12 h-4 bg-neutral-700 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumPageSkeleton;
