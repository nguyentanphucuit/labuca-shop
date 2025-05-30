import React from "react";

const InputComp = (props: {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{props.label}</label>
      <input
        type="text"
        name={props.name}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        value={props.value}
        onChange={props.onChange}
        required
        placeholder={`Nhập ${props.label.toLowerCase()}...`}
      />
    </div>
  );
};

export default InputComp;
