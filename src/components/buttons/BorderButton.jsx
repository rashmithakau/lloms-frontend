import React from 'react'

function BorderButton({children,onClick}) {
  return (
    <button onClick={onClick} className='transition-transform transform hover:scale-108 hover:shadow-lg cursor-pointer text-base  bg-transparent text-pink-500  border border-pink-500 p-3 w-36 rounded-lg'>
    {children}
  </button>
  )
}

export default BorderButton