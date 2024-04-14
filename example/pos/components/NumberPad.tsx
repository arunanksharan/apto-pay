// components/NumberPad.js

import { useState } from "react";

type NumderPadProps = {
  onChange: (value: number | string) => void;
  onNext: () => void;
};

const NumberPad = (props: NumderPadProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleNumberClick = (number: any) => {
    setInputValue((prevValue) => prevValue + number);
    props.onChange(inputValue);
  };

  const handleClearClick = () => {
    setInputValue("");
  };

  const handleNextClick = () => {
    props.onNext();
    // Handle next button click logic
  };

  return (
    <div className="h-screen flex flex-col  items-center justify-center bg-gradient-to-b from-emerald-900 to-black p-8">
      <input
        type="text"
        value={inputValue}
        className="text-white text-center w-48 mb-4 bg-transparent border-b border-white border-solid  h-12 text-3xl font-bold"
        readOnly
      />
      <div className="grid grid-cols-3 gap-4 ">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <button
            key={number}
            onClick={() => handleNumberClick(number)}
            className="bg-gray-300 text-black mr-4 ml-4 text-3xl font-bold rounded-full shadow-md hover:shadow-lg transition duration-300 h-36 w-36 flex items-center justify-center"
          >
            {number || "Clear"}
          </button>
        ))}
        <button
          onClick={handleClearClick}
          className="bg-gray-300 text-black mr-4 ml-4 text-3xl font-bold rounded-full shadow-md hover:shadow-lg transition duration-300 h-36 w-36 flex items-center justify-center"
        >
          Clear
        </button>

        <button
          key="0"
          onClick={() => handleNumberClick("0")}
          className="bg-gray-300 text-black mr-4 ml-4 text-3xl font-bold rounded-full shadow-md hover:shadow-lg transition duration-300 h-36 w-36 flex items-center justify-center"
        >
          {"0"}
        </button>
        <button
          onClick={handleNextClick}
          className="bg-gray-300 text-black mr-4 ml-4 text-3xl font-bold rounded-full shadow-md hover:shadow-lg transition duration-300 h-36 w-36 flex items-center justify-center"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NumberPad;
