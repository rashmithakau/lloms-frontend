const DropdownField = ({ options, selectedValue }) => {
  return (
    <select
      value={selectedValue}
      className="md:w-[250px] sm:w-[150px] w-[100px] h-[30px] border border-gray-300 rounded-md bg-gray-100 text-gray-600 focus:outline-none px-3"
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default DropdownField;