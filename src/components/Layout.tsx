import React from 'react';
import { Outlet } from 'react-router-dom';
import { Search, ShoppingCart, User, Heart, Menu, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Banner */}
      <div className="bg-black text-white text-center py-2 text-sm">
        Free shipping on orders over $100 | Easy returns
      </div>

      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Menu className="h-6 w-6 lg:hidden" />
              <h1 className="text-2xl font-bold">STYLIQUE</h1>
            </div>
            
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/" className="hover:text-gray-600">Home</a>
              <a href="/products" className="hover:text-gray-600">Shop</a>
              <a href="#" className="hover:text-gray-600">Women</a>
              <a href="#" className="hover:text-gray-600">Men</a>
              <a href="#" className="hover:text-gray-600">Sale</a>
            </nav>

            <div className="flex items-center space-x-4">
              <Search className="h-5 w-5 cursor-pointer" />
              <Heart className="h-5 w-5 cursor-pointer" />
              <User className="h-5 w-5 cursor-pointer" />
              <ShoppingCart className="h-5 w-5 cursor-pointer" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <Outlet />

      {/* Footer */}
      <footer className="bg-black text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">STYLIQUE</h3>
              <p className="text-gray-400">Your destination for trendy and sustainable fashion.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">New Arrivals</a></li>
                <li><a href="#" className="hover:text-white">Women</a></li>
                <li><a href="#" className="hover:text-white">Men</a></li>
                <li><a href="#" className="hover:text-white">Accessories</a></li>
                <li><a href="#" className="hover:text-white">Sale</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Help</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white">Returns</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <Facebook className="h-5 w-5 cursor-pointer hover:text-gray-400" />
                <Instagram className="h-5 w-5 cursor-pointer hover:text-gray-400" />
                <Twitter className="h-5 w-5 cursor-pointer hover:text-gray-400" />
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 STYLIQUE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}