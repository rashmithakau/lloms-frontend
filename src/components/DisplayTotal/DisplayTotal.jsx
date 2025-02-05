import React from 'react'
import { History } from 'lucide-react';

const DisplayTotal = () => {
  return (
    <div className=' bottom-4 right-4 px-8'>
        <div className='bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 w-auto sm:w-[380px] md:w-[400px] lg:w-[360px] h-auto sm:h-[320px] md:h-[300px] lg:h-[230px] p-1 sm:p-2 md:p-3 lg:p-4'>
            <div className='grid grid-cols-2 gap-2 sm:gap-4 px-3 sm:px-6 py-2 sm:py-3'>
                <p className='text-lg sm:text-xl'>Total</p>
                <div className='box-border bg-pink-100 px-3 sm:px-6 py-1 sm:py-2 border rounded-lg border-gray-400 text-sm sm:text-base'>Rs.3200</div>
                <p className='text-lg sm:text-xl'>Discount</p>
                <div className='box-border bg-pink-100 px-3 sm:px-6 py-1 sm:py-2 border rounded-lg border-gray-400 text-sm sm:text-base'>Rs.200</div>
                <p className='text-lg sm:text-xl'>Sub Total</p>
                <div className='box-border bg-pink-100 px-3 sm:px-6 py-1 sm:py-2 border rounded-lg border-gray-400 text-sm sm:text-base'>Rs.3000</div>
            </div>
            <div className='grid grid-cols-2 gap-4 sm:gap-20 px-2 sm:px-3 py-3 sm:py-4'>
                <button className='transition-transform transform hover:scale-108 hover:shadow-lg cursor-pointer bg-[#FF0077] text-white text-base sm:text-xl px-2 sm:px-3 py-2 sm:py-3 rounded-lg'>
                    Proceed {'>'}
                </button>
                <button className='transition-transform transform hover:scale-108 hover:shadow-lg cursor-pointer text-base sm:text-xl bg-transparent text-[#FF0077] font-semibold border border-[#FF0077] rounded-lg'>
                    Cancel
                </button>
            </div>
            <div className='flex justify-center gap-2 sm:gap-3 box-border bg-pink-100 px-3 sm:px-6  border rounded-lg border-gray-400 py-1 sm:py-2'>
                <History  />
                <span className='text-sm sm:text-base text-gray-500'>Customer Order History</span>
            </div>
        </div>
    </div>
  )
}

export default DisplayTotal