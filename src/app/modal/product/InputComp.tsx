import React from "react";

const InputComp = (props: {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="px-4">
      <label className="uppercase">
        {props.label}:
        <input
          type="text"
          name={props.name}
          className="border p-2 m-2"
          value={props.value}
          onChange={props.onChange}
          required
        />
      </label>
    </div>
  );
};

export default InputComp;
