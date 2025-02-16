type DailogProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Dialog = ({ isOpen, onClose, children }: DailogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center  backdrop-blur-xs ">
      <div className="bg-neutral-200 p-4 rounded-lg shadow-lg w-96">
        <div className="mb-4">{children}</div>
        <div className="flex justify-end">
          <button
            className="text-sm bg-red-500 text-neutral-50 rounded-lg px-2 py-1.5 cursor-pointer tracking-tight font-medium hover:opacity-85 transition-all"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
