import React from 'react'

const Product_Card = ({image, name}) => {
  return (
    <div className="w-[250px] h-[250px] rounded-[10px] overflow-hidden shadow-lg m-5">
      <img src={image} alt="" className="w-full h-[200px] object-cover"  />
      <p className="bg-orange-500 text-white text-center py-3 text-lg font-semibold">{name}</p>
    </div>
  )
}

export default Product_Card
