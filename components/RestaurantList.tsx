
import React from 'react';
import { Restaurant } from '../types';
import RestaurantCard from './RestaurantCard';

interface RestaurantListProps {
  restaurants: Restaurant[];
  onAddToCart: (item: { name: string; price: number }, restaurant: Restaurant) => void;
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants, onAddToCart }) => {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Order From Top Restaurants</h2>
        <p className="mt-4 text-lg text-gray-600">
          Combine items from different restaurants into a single order. One cart, one payment, one delivery.
        </p>
      </div>
      {restaurants.length > 0 ? (
        <div className="space-y-8">
          {restaurants.map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} onAddToCart={onAddToCart} />
          ))}
        </div>
      ) : (
        <div className="text-center p-16 bg-gray-100 rounded-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          <h3 className="mt-2 text-xl font-medium text-gray-900">No Restaurants Found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or browse our other categories.</p>
        </div>
      )}
    </div>
  );
};

export default RestaurantList;