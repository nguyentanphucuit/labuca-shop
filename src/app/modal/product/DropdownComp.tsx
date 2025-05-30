import { ChevronDown } from "lucide-react";
import React from "react";

interface DropdownOption {
  name: string;
  value: string;
}

interface DropdownCompProps {
  label: string;
  name: string;
  options: DropdownOption[];
  selected: DropdownOption | null;
  onSelect: (option: DropdownOption) => void;
  showColorPreview?: boolean;
}

const DropdownComp = ({
  label,
  name,
  options,
  selected,
  onSelect,
  showColorPreview = false,
}: DropdownCompProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white text-left flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            {showColorPreview && selected && (
              <div
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: selected.value }}
              />
            )}
            <span>{selected ? selected.name : `Chọn ${label.toLowerCase()}...`}</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.name}
                type="button"
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
                className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg transition-colors"
              >
                {showColorPreview && (
                  <div
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: option.value }}
                  />
                )}
                <span>{option.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownComp;
