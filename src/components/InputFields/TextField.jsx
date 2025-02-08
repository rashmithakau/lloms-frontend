const TextField = ({ type ,value}) => {
    return (
      <div>
        <input
          type={type}
          value={value}
          //readOnly={readOnly}
          className="w-[400px] h-[30px] px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 focus:outline-none"
        />
      </div>
    );
  };
  
  export default TextField;
  