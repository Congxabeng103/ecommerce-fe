import React, { useState, useEffect } from 'react';
import { Heart, Share2, Minus, Plus, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [products, setProducts] = useState<products | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Lấy id từ URL
  type Category = {
    id: number;
    name: string;
  };
  
  type Color = {
    id: number;
    name: string;
  };
  
  type Size = {
    id: number;
    name: string;
  };
  
  type products = {
    id: number;
    name: string;
    price: number;
    image: string;
    size: Size;
    color: Color;
    category: Category;
  };
  
  
  
  useEffect(() => {
    axios.get(`http://localhost:8080/api/products/${id}`)
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Lỗi khi fetch sản phẩm:", error);
        setError(error);
        setLoading(false);
      });
      
  },[]);

  const product = {
    name: "Classic White Shirt",
    price: "59.99",
    description: "A timeless classic white shirt crafted from premium cotton. Features a regular fit, classic collar, and button-up front. Perfect for both casual and formal occasions.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Light Blue', 'Black'],
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1563630423918-b58f07336ac9?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1604695573706-53170668f6a6?auto=format&fit=crop&q=80"
    ],
    details: [
      "100% Premium Cotton",
      "Regular Fit",
      "Button-Up Front",
      "Classic Collar",
      "Machine Washable"
    ]
  };

  const relatedProducts = [
    {
      name: "Striped Oxford Shirt",
      price: "64.99",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80"
    },
    {
      name: "Blue Business Shirt",
      price: "54.99",
      image: "https://images.unsplash.com/photo-1608744882201-52a7f7f3dd60?auto=format&fit=crop&q=80"
    },
    {
      name: "Casual Linen Shirt",
      price: "49.99",
      image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80"
    },
    {
      name: "Formal White Shirt",
      price: "69.99",
      image: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?auto=format&fit=crop&q=80"
    }
  ];
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!products) return <p>Không tìm thấy sản phẩm.</p>;

  return (
    <main className="flex-grow">
      {/* Breadcrumb */}
     
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center text-sm text-gray-500">
          <a href="/" className="hover:text-black">Home</a>
          <ChevronRight className="h-4 w-4 mx-2" />
          <a href="/products" className="hover:text-black">Men's Shirts</a>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-black">{products.name}</span>
        </div>
      </div>

      {/* Product Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-black' : 'border-transparent'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-2xl">${product.price}</p>
            </div>

            <p className="text-gray-600">{product.description}</p>

            {/* Color Selection */}
            <div>
              <h3 className="font-medium mb-3">Color</h3>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className="px-4 py-2 border rounded-md hover:border-black"
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex justify-between mb-3">
                <h3 className="font-medium">Size</h3>
                <button className="text-sm text-gray-600 underline">Size Guide</button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 border rounded-md hover:border-black ${
                      selectedSize === size ? 'border-black bg-black text-white' : ''
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-medium mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border rounded-md hover:border-black"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border rounded-md hover:border-black"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button className="flex-grow bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors">
                Add to Cart
              </button>
              <button className="p-3 border rounded-md hover:border-black">
                <Heart className="h-6 w-6" />
              </button>
              <button className="p-3 border rounded-md hover:border-black">
                <Share2 className="h-6 w-6" />
              </button>
            </div>

            {/* Product Details */}
            <div className="border-t pt-6">
              <h3 className="font-medium mb-3">Product Details</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {product.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((product) => (
              <div key={product.name} className="bg-white rounded-lg overflow-hidden shadow-sm group">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-[3/4] object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity" />
                  <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Quick View
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}