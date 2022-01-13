import React from "react";

function Input({
  type,
  value,
  placeholder,
  color,
  focusColor,
  onchangeFunction,
  id,
}) {
  return (
    <input
      className={`w-full text-base px-4 py-2 text-black focus:text-base border-2 ${color} rounded-lg focus:outline-none focus:${focusColor} caret-custom-indigo`}
      placeholder={placeholder}
      type={type}
      value={value}
      id={id}
      onChange={(e) => onchangeFunction(e)}
    />
  );
}

export default Input;
