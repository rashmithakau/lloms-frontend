import React from 'react'

function ActionContainer({children}) { 
  return (
    <div className='w-[360px] h-[250px] rounded-2xl border-2 border-gray-200 flex justify-center p-2'>
      {children}
        
    </div>
  )
}

export default ActionContainer