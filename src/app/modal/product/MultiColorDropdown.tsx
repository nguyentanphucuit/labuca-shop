import { ChevronDown, X } from "lucide-react";
import React from "react";

interface ColorOption {
  name: string;
  value: string;
}

interface MultiColorDropdownProps {
  label: string;
  options: ColorOption[];
  selectedColors: ColorOption[];
  onColorsChange: (colors: ColorOption[]) => void;
}

const MultiColorDropdown = ({
  label,
  options,
  selectedColors,
  onColorsChange,
}: MultiColorDropdownProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleColorToggle = (color: ColorOption) => {
    const isSelected = selectedColors.some((c) => c.name === color.name);

    if (isSelected) {
      // Remove color
      onColorsChange(selectedColors.filter((c) => c.name !== color.name));
    } else {
      // Add color
      onColorsChange([...selectedColors, color]);
    }
  };

  const removeColor = (colorToRemove: ColorOption) => {
    onColorsChange(selectedColors.filter((c) => c.name !== colorToRemove.name));
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {/* Selected Colors Display */}
      {selectedColors.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedColors.map((color) => (
            <span
              key={color.name}
              className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md"
            >
              <div
                className="w-3 h-3 rounded-full border border-gray-300"
                style={{ backgroundColor: color.value }}
              />
              {color.name}
              <button
                type="button"
                onClick={() => removeColor(color)}
                className="ml-1 text-blue-600 hover:text-blue-800"
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
            {selectedColors.length === 0
              ? "Chọn màu sắc..."
              : `Đã chọn ${selectedColors.length} màu`}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {options.map((option) => {
              const isSelected = selectedColors.some((c) => c.name === option.name);
              return (
                <button
                  key={option.name}
                  type="button"
                  onClick={() => handleColorToggle(option)}
                  className={`w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                    isSelected ? "bg-blue-50 text-blue-700" : ""
                  }`}
                >
                  <div
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: option.value }}
                  />
                  <span>{option.name}</span>
                  {isSelected && <span className="ml-auto text-blue-600 text-xs">✓</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiColorDropdown;
