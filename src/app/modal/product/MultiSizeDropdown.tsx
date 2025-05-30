import { ChevronDown, X } from "lucide-react";
import React from "react";

interface SizeOption {
  name: string;
  value: string;
}

interface MultiSizeDropdownProps {
  label: string;
  options: SizeOption[];
  selectedSizes: SizeOption[];
  onSizesChange: (sizes: SizeOption[]) => void;
}

const MultiSizeDropdown = ({
  label,
  options,
  selectedSizes,
  onSizesChange,
}: MultiSizeDropdownProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSizeToggle = (size: SizeOption) => {
    const isSelected = selectedSizes.some((s) => s.name === size.name);

    if (isSelected) {
      // Remove size
      onSizesChange(selectedSizes.filter((s) => s.name !== size.name));
    } else {
      // Add size
      onSizesChange([...selectedSizes, size]);
    }
  };

  const removeSize = (sizeToRemove: SizeOption) => {
    onSizesChange(selectedSizes.filter((s) => s.name !== sizeToRemove.name));
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {/* Selected Sizes Display */}
      {selectedSizes.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedSizes.map((size) => (
            <span
              key={size.name}
              className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-md"
            >
              <span className="font-medium">{size.name}</span>
              <button
                type="button"
                onClick={() => removeSize(size)}
                className="ml-1 text-green-600 hover:text-green-800"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white text-left flex items-center justify-between"
        >
          <span className="text-gray-700">
            {selectedSizes.length === 0
              ? "Chọn kích cỡ..."
              : `Đã chọn ${selectedSizes.length} kích cỡ`}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {options.map((option) => {
              const isSelected = selectedSizes.some((s) => s.name === option.name);
              return (
                <button
                  key={option.name}
                  type="button"
                  onClick={() => handleSizeToggle(option)}
                  className={`w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                    isSelected ? "bg-green-50 text-green-700" : ""
                  }`}
                >
                  <div className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-xs font-medium bg-gray-50">
                    {option.name}
                  </div>
                  <span>Size {option.name}</span>
                  {isSelected && <span className="ml-auto text-green-600 text-xs">✓</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSizeDropdown;
