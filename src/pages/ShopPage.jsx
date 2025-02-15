import React, { useEffect, useState } from 'react'
import Navbar from '../websiteComponents/navbar/Navbar'
import Footer from '../websiteComponents/footer/Footer'
import Title from '../websiteComponents/Title/Title'
import SubTopic from '../websiteComponents/Title/Subtopic'
import { products } from '../assets/Images/assets'
import Product_Card from '../websiteComponents/ProductCard/Product_Card'

const ShopPage = () => {

  const [filterCategory,setFilterCategory] = useState([]);

  const handleCategoryChange = (e) => {
    const categoryName = e.target.value;
    if(filterCategory.includes(categoryName)){
        setFilterCategory(prev => prev.filter(item => item !== categoryName))
    } else {
        setFilterCategory(prev => [...prev, categoryName])
    }
};

  // Filter products based on selected categories
  const filteredProducts = products.filter(product => {
      if (filterCategory.length === 0) return true; // Show all if no category selected
      return filterCategory.includes(product.category);
  });

  useEffect(() => {
    console.log(filterCategory)
  },[filterCategory])

  // Calculate category counts dynamically from products
  const getCategoryCounts = () => {
    const counts = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {});

    return [
    { name: 'Cookie', count: counts['Cookie'] || 0 },
    { name: 'Bread', count: counts['Bread'] || 0 },
    { name: 'Cup Cake', count: counts['Cup Cake'] || 0 },
    { name: 'Muffin', count: counts['Muffin'] || 0 },
    { name: 'Cake', count: counts['Cake'] || 0 },
    { name: 'Donut', count: counts['Donut'] || 0 },
    ];
};

const categories = getCategoryCounts();



  return (
    <div>
      <Navbar />
      <Title text2={"Best Seller"}/>
      <SubTopic text1={"Best Seller This Week!"}/>

      <div className='grid grid-cols-4'>
        
        {/* Category Section*/}
        <div>
          <p className='font-quicksand font-bold text-[36px] pl-10 pt-10'>Category</p>

          {categories.map((category,index)=>(
            <div className='flex gap-11 px-5 py-2' key={index}>
              <input type="checkbox" value={category.name} checked={filterCategory.includes(category.name)} onChange={handleCategoryChange}/>
              <label className='flex justify-between w-1/2'>
                <span>{category.name}</span>
                <span>({category.count})</span>
              </label>
            </div>
          ))}

        </div>

        {/* Featured Products */}
        <div className='col-span-3'>
          <div className='flex justify-between pl-5'>
            <p className='font-quicksand font-bold text-[36px] '>Featured Products</p>
            <select className='border rounded-lg bg-[#F4952C] text-white px-4 py-2'>
              <option value="">Sort By: Default</option>
              <option value="">Price: Low to High</option>
              <option value="">Price: High to Low</option>
            </select>
            </div>  
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
              {filteredProducts.map((item, index)=>(
                <div key={index}>
                   <Product_Card image={item.image} name={item.name}/>
                </div>
              ))}
            </div>
        </div>
      </div>



      <Footer />
    </div>
  )
}

export default ShopPage
