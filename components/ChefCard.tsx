
import React from 'react';
import { Chef } from '../types';

interface ChefCardProps {
  chef: Chef;
  onBook: (chef: Chef) => void;
}

const ChefCard: React.FC<ChefCardProps> = ({ chef, onBook }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden text-center transform hover:-translate-y-2 transition-transform duration-300">
      <img className="w-32 h-32 rounded-full mx-auto mt-6 border-4 border-red-500 object-cover" src={chef.imageUrl} alt={chef.name} />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900">{chef.name}</h3>
        <p className="text-md text-red-600 font-semibold">{chef.specialty}</p>
        <div className="flex items-center justify-center mt-2 text-yellow-500">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          <span className="text-gray-700 font-bold ml-1">{chef.rating}</span>
        </div>
        <p className="text-sm text-gray-600 mt-4">{chef.bio}</p>
        <button 
          onClick={() => onBook(chef)}
          className="mt-6 bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition duration-300 w-full"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ChefCard;
