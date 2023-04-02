import React, { useState } from "react";
import { Option } from "../../../types"


interface Props {
  options: Option[];
  selectedOptions: Option[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<Option[]>>;
}

const MultiSelect = ({ options, selectedOptions, setSelectedOptions }: Props) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = options.find((option) => option.value === event.target.value);

    if (selectedOption) {
      setSelectedOptions([...selectedOptions, selectedOption]);
    }
  };

  const handleRemove = (optionToRemove: Option) => {
    setSelectedOptions(selectedOptions.filter((option) => option !== optionToRemove));
  };

  return (
    <div>
      <select multiple onChange={handleSelect}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div>
        <p>Selected Options:</p>
        <ul>
          {selectedOptions.map((option) => (
            <li key={option.value}>
              {option.label}
              <button onClick={() => handleRemove(option)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MultiSelect;
