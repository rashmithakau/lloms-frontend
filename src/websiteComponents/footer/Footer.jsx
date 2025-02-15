import React from 'react'
import logo from '../../assets/websitenavbar/logo.png'
import banner from '../../assets/footerimg.jpeg'



const sections = [
    {    
        
        title : 'Product',
        items : ['Cakes', 'Candy', 'Confectionery', 'Gifts']
    },
    {
        title : 'About',
        items : ['Our Mission', 'Our story', 'Our culture', 'Team']
    },
    {
        title : 'Outlets',
        items : ['#outlet', '#outlet', '#outlet', '#outlet']
    },
    {
        title : 'Support',
        items : ['Telno', 'Email']
    }
]



const Footer = () => {
  return (
    <>
    
        <div className='mt-24'>
            <img src={banner} className='w-full h-150' alt="banner for Footer" />
        </div>

        <div className=" w-full px-2 text-gray-300 bg-slate-900">

 
                <div className="max-w-[1240px mx-auto grid grid-cols-2 md:grid-cols-5 border-b-2 border-gray-600 py-8 px-4">
                    
                <div className="flex items-center gap-3">
                        <img
                                src={logo}
                                alt="Little Lanka Logo"
                                className="w-8 h-8 transition-transform duration-300 hover:scale-110"
                            />
                            <div className="flex items-center gap-2">
                                <span className="text-lg text-white font-pacifico md:text-xl">
                                    Little Lanka
                                </span>
                            </div>
                </div> 
                    
                    {
                        sections.map((section,index) => (
                            <div key={index}>
                                <h6 className='pt-2 font-bold uppercase'>
                                    {section.title} 
                                </h6>
                                <ul>
                                    {section.items.map((item,i)=>(
                                        <li key = {i} className="py-1 text-gray-500 cursor-pointer hover:text-white">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    }
                    
                    
                </div>       
        
            <div className='flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-center sm:flex-row text-center text-gray-500'>
                <p className='py-4'>
                    Copyright 2024 Aventra. All Rights Received
                </p>
            </div>
        
        </div>
    </>
  )
}

export default Footer
