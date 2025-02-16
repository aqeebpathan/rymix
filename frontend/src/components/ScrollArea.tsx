import { ReactNode } from "react";

const ScrollArea = ({ children }: { children: ReactNode }) => {
  return (
    <div className="overflow-y-auto flex-1 rounded-lg h-full scrollbar">
      {children}
    </div>
  );
};

export default ScrollArea;
