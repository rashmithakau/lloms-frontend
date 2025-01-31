import React from 'react';

const Card = ({children}) => {  
  return (
    <div className='bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 
      w-auto sm:w-[380px] md:w-[400px] lg:w-[428px]
      h-auto sm:h-[320px] md:h-[300px] lg:h-[330px]
      p-1 sm:p-2 md:p-3 lg:p-4'>
      {children}
    </div>
  );
};

const TextBox = ({
    children,
    className=''
}) => {
    return(
        <div className={`box-border bg-pink-100 px-3 sm:px-6 py-1 sm:py-2 border rounded-lg border-gray-400 text-sm sm:text-base ${className}`}>
            {children}
        </div>
    )
}

export {TextBox, Card};
export default Card;