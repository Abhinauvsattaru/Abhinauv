
import React from 'react';
import { Chef } from '../types';
import ChefCard from './ChefCard';

interface ChefListProps {
  chefs: Chef[];
  onBookChef: (chef: Chef) => void;
}

const ChefList: React.FC<ChefListProps> = ({ chefs, onBookChef }) => {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Book a Professional Chef</h2>
        <p className="mt-4 text-lg text-gray-600">
          Hire top-rated chefs to cook for you at your home, for daily needs or special occasions.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {chefs.map(chef => (
          <ChefCard key={chef.id} chef={chef} onBook={onBookChef} />
        ))}
      </div>
    </div>
  );
};

export default ChefList;
