import React from "react";

const Dropdown = ({ title, options, func, selectedValue }) => {
  return (
    <div className="select">
      {/* Hidden label for accessibility */}
      <label htmlFor="format" className="sr-only">{title}</label>

      <select
        name="format"
        id="format"
        aria-label={title}
        className="p-2 bg-zinc-900 text-white border border-gray-600 rounded"
        onChange={(e) => func(e.target.value)}
        value={selectedValue} // ✅ Control the dropdown with state
      >
        {options.map((option, index) => (
          <option key={index} value={option.toLowerCase()}>
            {option.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
