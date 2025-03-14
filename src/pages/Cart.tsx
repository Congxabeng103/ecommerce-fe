import React from 'react';
import { Minus, Plus, X, ArrowRight, Truck, Shield, RefreshCw } from 'lucide-react';

export default function Cart() {
  const cartItems = [
    {
      id: 1,
      name: "Classic White Shirt",
      price: 59.99,
      size: "M",
      color: "White",
      quantity: 1,
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      name: "Denim Jacket",
      price: 89.99,
      size: "L",
      color: "Blue",
      quantity: 1,
      image: "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&fit=crop&q=80"
    }
  ];

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <main className="flex-grow">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-6 p-6 border-b last:border-b-0">
                  <div className="w-24 h-32">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <button className="text-gray-400 hover:text-black">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="text-gray-500 mt-1">
                      Size: {item.size} | Color: {item.color}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="p-1 border rounded-md hover:border-black">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button className="p-1 border rounded-md hover:border-black">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="font-semibold">${item.price.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Shopping Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                <Truck className="h-6 w-6" />
                <div>
                  <h4 className="font-semibold">Free Shipping</h4>
                  <p className="text-sm text-gray-500">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                <Shield className="h-6 w-6" />
                <div>
                  <h4 className="font-semibold">Secure Payment</h4>
                  <p className="text-sm text-gray-500">100% protected</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                <RefreshCw className="h-6 w-6" />
                <div>
                  <h4 className="font-semibold">Easy Returns</h4>
                  <p className="text-sm text-gray-500">30 days return policy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-black text-white py-3 rounded-md mt-6 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                Proceed to Checkout
                <ArrowRight className="h-5 w-5" />
              </button>

              {/* Promo Code */}
              <div className="mt-6">
                <h3 className="font-medium mb-3">Promo Code</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <button className="px-4 py-2 border rounded-md hover:border-black">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}