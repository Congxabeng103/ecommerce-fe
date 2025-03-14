import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Sliders, Grid, List } from 'lucide-react';

export default function Products() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 6;
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalElements,setTotalElements] = useState(0)
  //const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleQuickView = (productId : any) => {
    navigate(`/products/${productId}`);
  };
//   const fetchFilteredProducts = () => {
//   const params = new URLSearchParams();
//   if (selectedCategory) params.append("category", selectedCategory);
//   if (selectedColor) params.append("color", selectedColor);
//   if (selectedSize) params.append("size", selectedSize);
//   if (priceRange[0] > 0) params.append("minPrice", priceRange[0].toString());
//   if (priceRange[1] < 500) params.append("maxPrice", priceRange[1].toString());

//   axios.get(`http://localhost:8080/api/products/filter?page=${currentPage}&size=${pageSize}&${params.toString()}`)
//   .then(response => {
//     setProducts(response.data.content);  
//     setTotalPages(response.data.totalPages); 
//   })
//     .catch(error => console.error("Lỗi khi fetch sản phẩm:", error));
// };


// Gọi fetchFilteredProducts mỗi khi bộ lọc thay đổi
  // useEffect(fetchFilteredProducts, [selectedCategory, selectedColor, selectedSize, priceRange]);

  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };
  
  // useEffect(() => {
  //   axios.get(`http://localhost:8080/api/products?page=${currentPage}&size=${pageSize}`)
  //     .then(response => {
  //       setProducts(response.data.content);  
  //       setTotalPages(response.data.totalPages); 
  //     })
  //     .catch(error => console.error("Lỗi khi fetch sản phẩm:", error));
  // }, [currentPage]);
  useEffect(() => {
    let url = `http://localhost:8080/api/products?currentPage=${currentPage}&pageSize=${pageSize}`;
    if(sortBy === "price-low"){
      url = `http://localhost:8080/api/products/sort-price-asc?currentPage=${currentPage}&pageSize=${pageSize}`;
    }else if(sortBy === "price-high"){
      url = `http://localhost:8080/api/products/sort-price-desc?currentPage=${currentPage}&pageSize=${pageSize}`;

    }
    if (selectedCategories.length > 0 || priceRange[1] != 500) {
        const params = new URLSearchParams();
        if (selectedCategories.length >  0) params.append("categories", selectedCategories.toString());
        if (priceRange[0] > 0) params.append("minPrice", priceRange[0].toString());
        if (priceRange[1] < 500) params.append("maxPrice", priceRange[1].toString());
        url = `http://localhost:8080/api/products/filter?currentPage=${currentPage}&pageSize=${pageSize}&${params.toString()}`;
        if(sortBy === "price-low"){
          url = `http://localhost:8080/api/products/sort-price-asc/filter?currentPage=${currentPage}&pageSize=${pageSize}&${params.toString()}`;
        }else if(sortBy === "price-high"){
          url = `http://localhost:8080/api/products/sort-price-desc/filter?currentPage=${currentPage}&pageSize=${pageSize}&${params.toString()}`;
    
        }
    }
  
    axios.get(url)
      .then(response => {
        setProducts(response.data.content);
        setTotalPages(response.data.totalPages);
        setTotalElements(response.data.totalElements);
      })
      .catch(error => console.error("Lỗi khi fetch sản phẩm:", error));
  }, [currentPage, selectedCategories, priceRange,sortBy]);
  
  useEffect(() => {
    axios.get('http://localhost:8080/api/categories')
      .then(response => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Lỗi khi fetch sản phẩm:", error);
        setError(error);
        setLoading(false);
      });
  }, []);



  

  const toggleCategory = (category: number) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
        
    );
  };

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-8">
        <a href="/" className="hover:text-black">Home</a>
        <span className="mx-2">/</span>
        <span className="text-black">Women's Collection</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Sliders className="h-5 w-5" />
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Categories</h3>
              {categories.map((category:any) => (
                <label key={category.id} className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => toggleCategory(category.id)}
                    className="rounded border-gray-300 text-black focus:ring-black"
                  />
                  <span>{category.name}</span>
                </label>
              ))}
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

           

         
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:w-3/4">
          {/* Toolbar */}
          <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-500">Showing 1-{pageSize} of {totalElements} products</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          {/* Products */}
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
            {products.map((product:any) => (
              <div
                key={product.id}
                className={`bg-white group ${
                  viewMode === 'grid'
                    ? 'rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'
                    : 'flex gap-6 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow'
                }`}
              >
                <div className={`relative ${viewMode === 'list' ? 'w-1/3' : ''}`}>
                  <img

                    src={`http://localhost:8080/api/images/${product.images[0].imageUrl}`}
                    alt={product.name}
                    className="w-full aspect-[3/4] object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity" />
                  
                  <button
                   onClick={() => handleQuickView(product.id)}

                   className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Quick View
                  </button>
                </div>
                <div className={viewMode === 'list' ? 'w-2/3 py-4' : 'p-4'}>
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2">${product.price}</p>
                  {viewMode === 'list' && (
                    <>
                      <p className="text-gray-500 mb-4">
                        {product.description}                      </p>
                      <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors">
                        Add to Cart
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center space-x-2">
  <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}
    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">Prev</button>

  {[...Array(totalPages)].map((_, index) => (
    <button key={index} onClick={() => handlePageChange(index)}
      className={`px-4 py-2 rounded ${currentPage === index ? 'bg-black text-white' : 'bg-gray-200'}`}>
      {index +1}
    </button>
  ))}

  <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}
    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">Next</button>
</div>
        </div>
      </div>

    </main>
  );
}

