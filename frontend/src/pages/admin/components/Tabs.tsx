import { ReactNode, useState } from "react";

import Dialog from "./Dailog";
import AddSong from "./AddSongDailog";
import AddAlbum from "./AddAlbumDialog";

type TabsProps = {
  tabs: { id: string; label: string; content: ReactNode }[];
};

const Tabs = ({ tabs }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto py-4 bg-neutral-800/30 text-neutral-100 rounded-xl">
      {/* Tabs Navigation */}
      <div className="flex gap-4 justify-between border-b border-neutral-800/50 px-4 pb-4">
        <div className="flex gap-4 items-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`  w-fit  transition-all cursor-pointer text-sm font-medium ${
                activeTab === tab.id
                  ? "   text-neutral-50"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setOpen(true)}
          className="text-sm bg-neutral-50 text-neutral-950 rounded-lg px-2 py-1.5 cursor-pointer tracking-tight font-medium hover:opacity-85 transition-all"
        >
          {activeTab === "songs" && "Add Song"}
          {activeTab === "albums" && "Add Album"}
        </button>

        <Dialog isOpen={open} onClose={() => setOpen(false)}>
          {activeTab === "songs" && <AddSong onClose={() => setOpen(false)} />}
          {activeTab === "albums" && (
            <AddAlbum onClose={() => setOpen(false)} />
          )}
        </Dialog>
      </div>

      {/* Tab Content */}
      <div className="mt-2">
        {tabs.map(
          (tab) => activeTab === tab.id && <div key={tab.id}>{tab.content}</div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
