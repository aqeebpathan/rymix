const SongPlayingAnimation = () => {
  return (
    <div className="flex items-end justify-center h-4 ">
      <div className="w-[2px] bg-neutral-50 mx-px rounded animate-song-bar1"></div>
      <div className="w-[2px] bg-neutral-50 mx-px rounded animate-song-bar2"></div>
      <div className="w-[2px] bg-neutral-50 mx-px rounded animate-song-bar3"></div>
      <div className="w-[2px] bg-neutral-50 mx-px rounded animate-song-bar4"></div>
      <div className="w-[2px] bg-neutral-50 mx-px rounded animate-song-bar5"></div>
    </div>
  );
};

export default SongPlayingAnimation;
