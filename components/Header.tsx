
import React from 'react';

interface HeaderProps {
  onNavigate: (view: 'restaurants' | 'chefs' | 'planner' | 'donate' | 'orderHistory') => void;
  cartItemCount: number;
  onCartClick: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, cartItemCount, onCartClick, searchTerm, onSearchChange }) => {

  const searchInput = (
    <div className="relative w-full">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </span>
      <input
        type="search"
        placeholder="Search restaurants, cuisines, dishes..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
      />
    </div>
  );

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer flex-shrink-0" onClick={() => onNavigate('restaurants')}>
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            <h1 className="text-2xl font-bold text-gray-800">Live<span className="text-red-600">Cook</span></h1>
          </div>
          
          <div className="hidden md:block flex-grow max-w-xl mx-4">
            {searchInput}
          </div>

          <div className="flex items-center">
            <nav className="hidden md:flex items-center space-x-6 mr-6">
              <button onClick={() => onNavigate('restaurants')} className="text-gray-600 hover:text-red-600 transition duration-300">Restaurants</button>
              <button onClick={() => onNavigate('chefs')} className="text-gray-600 hover:text-red-600 transition duration-300">Book a Chef</button>
              <button onClick={() => onNavigate('planner')} className="text-gray-600 hover:text-red-600 transition duration-300">AI Planner</button>
              <button onClick={() => onNavigate('orderHistory')} className="text-gray-600 hover:text-red-600 transition duration-300">Order History</button>
              <button onClick={() => onNavigate('donate')} className="text-gray-600 hover:text-red-600 transition duration-300">Donate Food</button>
            </nav>
            <button onClick={onCartClick} className="relative text-gray-600 hover:text-red-600 transition duration-300">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
        <div className="md:hidden mt-3">
          {searchInput}
        </div>
      </div>
    </header>
  );
};

export default Header;
