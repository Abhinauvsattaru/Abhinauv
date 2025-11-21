
import React from 'react';
import { Restaurant, MenuItem } from '../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onAddToCart: (item: MenuItem, restaurant: Restaurant) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-2xl">
      <img className="w-full h-48 object-cover" src={restaurant.imageUrl} alt={restaurant.name} />
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{restaurant.name}</h3>
            <p className="text-md text-gray-600">{restaurant.cuisine}</p>
          </div>
          <div className="flex items-center bg-yellow-400 text-white px-3 py-1 rounded-full text-sm font-bold">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            <span>{restaurant.rating}</span>
          </div>
        </div>
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Menu</h4>
          <ul className="space-y-4">
            {restaurant.menu.map(item => (
              <li key={item.name} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="font-bold text-gray-800">${item.price.toFixed(2)}</p>
                  <button
                    onClick={() => onAddToCart(item, restaurant)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 transform hover:scale-105"
                  >
                    Add
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
