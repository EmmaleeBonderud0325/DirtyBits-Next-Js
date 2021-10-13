import React from "react";

const onchangeFunction = () => {};

function Input({
  type,
  value,
  placeholder,
  color,
  focusColor,
  onchangeFunction,
}) {
  return (
    <input
      class={`w-full text-base px-4 py-2 text-black focus:text-base border ${color} rounded-lg focus:outline-none focus:${focusColor} focus:border-custom-yellow`}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={(e) => onchangeFunction(e)}
    />
  );
}

export default Input;
