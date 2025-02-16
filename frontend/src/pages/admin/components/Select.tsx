import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";

import { Album } from "../../../types";

type SelectProps = {
  options: Album[];
  value: string;
  onChange: (id: string) => void;
  placeholder?: string;
};

const Select = ({ options, value, onChange, placeholder }: SelectProps) => {
  const selectedAlbum = options.find((album) => album._id === value);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (id: string) => {
    onChange(id);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        className="w-full flex justify-between items-center p-2 rounded border-2 border-neutral-400 focus:outline-none text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedAlbum ? selectedAlbum.title : placeholder}</span>
        <ChevronsUpDown size={16} className="text-neutral-800" />
      </button>
      {isOpen && (
        <ul className="absolute bottom-11 w-full mt-1 bg-neutral-800 text-neutral-100  rounded shadow-lg z-10 text-sm max-h-36 overflow-y-scroll scrollbar-hidden">
          {options.map((option) => (
            <li
              key={option._id}
              className="p-2 hover:bg-neutral-200/50 cursor-pointer"
              onClick={() => handleSelect(option._id)}
            >
              {option.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
