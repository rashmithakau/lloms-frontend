import React from 'react'
import { History } from 'lucide-react';
import FillButton from '../buttons/FillButton';
import BorderButton from '../buttons/BorderButton';
import IconNavButton from '../buttons/IconNavButton';

const DisplayTotal = () => {
  return (
    <div >     
            <div className='grid grid-cols-2 gap-2 px-4 py-1'>
                <p className='text-[17px]'>Total</p>
                <div className='box-border bg-pink-100 px-2 py-1 border rounded-lg border-gray-400 text-sm sm:text-base'>Rs.3200</div>
                <p className='text-[17px]'>Discount</p>
                <div className='box-border bg-pink-100 px-2 py-1 border rounded-lg border-gray-400 text-sm sm:text-base'>Rs.200</div>
                <p className='text-[17px]'>Sub Total</p>
                <div className='box-border bg-pink-100 px-2 py-1 border rounded-lg border-gray-400 text-sm sm:text-base'>Rs.3000</div>
            </div>
            <div className="flex justify-center items-center my-2 gap-8">
                <FillButton>
                    Proceed {'>'}
                </FillButton>
                <BorderButton>
                    Cancel
                </BorderButton>
            </div>
            <div>
                <IconNavButton icon={"src/assets/icons/historyIcon.svg"}>
                    Customer Order History
                </IconNavButton>
            </div>    
    </div>
  )
}

export default DisplayTotal