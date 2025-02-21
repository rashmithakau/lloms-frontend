import React, { useEffect, useState } from 'react';
import Navbar from '../websiteComponents/navbar/Navbar';
import Footer from '../websiteComponents/footer/Footer';
import { products } from '../assets/Images/assets';
import Product_Card from '../websiteComponents/ProductCard/Product_Card';
import "../websiteComponents/scrollbar.css";


const ShopPage = () => {
  const [filterCategory, setFilterCategory] = useState([]);

  const handleCategoryChange = (e) => {
    const categoryName = e.target.value;
    if (filterCategory.includes(categoryName)) {
      setFilterCategory(prev => prev.filter(item => item !== categoryName));
    } else {
      setFilterCategory(prev => [...prev, categoryName]);
    }
  };

  // Filter products based on selected categories
  const filteredProducts = products.filter(product => {
    if (filterCategory.length === 0) return true; // Show all if no category selected
    return filterCategory.includes(product.category);
  });

  useEffect(() => {
    console.log(filterCategory);
  }, [filterCategory]);

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

  const [scrollPosition, setScrollPosition] = useState(0);


  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
      <div className='bg-[#e9e3e3]'>
        <Navbar />

        <br />
        <div className="text-center mb-8">
          <h2 className="text-[#F4952C] font-pacifico text-3xl">Best Sellings</h2>
          <h3 className="text-black font-quicksand text-2xl font-semibold mt-2">
            We Care About Our Customers <br /> Experience Too
          </h3>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 px-10'>
          {/* Category Section */}
          <div className='bg-[#e9e3e3] rounded-lg shadow-lg p-5'>
            <p className='font-quicksand font-bold text-[36px] '>Category</p>
            {categories.map((category, index) => (
                <div className='flex gap-3 items-center py-2' key={index}>
                  <input
                      type="checkbox"
                      value={category.name}
                      checked={filterCategory.includes(category.name)}
                      onChange={handleCategoryChange}
                  />
                  <label className='flex justify-between w-full'>
                    <span>{category.name}</span>
                    <span>({category.count})</span>
                  </label>
                </div>
            ))}
          </div>

          {/* Featured Products */}
          <div className='col-span-3'>
            <div className='flex justify-between items-center mb-5'>
              <p className='font-quicksand font-bold text-[36px]'>Featured Products</p>
              <select className='border-[#F4952C] rounded-lg bg-[#F4952C] text-white px-4 py-2 hover:bg-[#F4952C]'>
                <option value="">Sort By: Default</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {filteredProducts.map((item, index) => (
                  <Product_Card key={index} image={item.image} name={item.name} />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
  );
};

export default ShopPage;