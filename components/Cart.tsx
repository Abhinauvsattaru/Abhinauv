
import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (itemName:string) => void;
  onPlaceOrder: () => void;
  deliveryMethod: 'drone' | 'human';
  onDeliveryMethodChange: (method: 'drone' | 'human') => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemoveItem, onPlaceOrder, deliveryMethod, onDeliveryMethodChange }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={`fixed inset-0 z-50 transition-all duration-300 ${isOpen ? 'bg-black bg-opacity-50' : 'pointer-events-none'}`}>
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold">Your Order</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <div className="flex-grow p-6 overflow-y-auto">
            {items.length === 0 ? (
              <p className="text-gray-500 text-center mt-8">Your cart is empty.</p>
            ) : (
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item.name} className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{item.name} <span className="text-sm font-normal text-gray-500">x {item.quantity}</span></p>
                      <p className="text-xs text-gray-500">from {item.restaurantName}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                      <button onClick={() => onRemoveItem(item.name)} className="text-red-500 hover:text-red-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between items-center font-bold text-xl mb-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-500 mb-4">Choose delivery option:</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <label className={`flex items-center justify-center space-x-2 border p-3 rounded-md cursor-pointer ${deliveryMethod === 'drone' ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}>
                  <input 
                    type="radio" 
                    name="delivery" 
                    value="drone" 
                    checked={deliveryMethod === 'drone'}
                    onChange={() => onDeliveryMethodChange('drone')}
                    className="form-radio text-red-600 focus:ring-red-500 h-4 w-4"
                  />
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                    <span>Drone</span>
                  </div>
                </label>
                <label className={`flex items-center justify-center space-x-2 border p-3 rounded-md cursor-pointer ${deliveryMethod === 'human' ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}>
                  <input 
                    type="radio" 
                    name="delivery" 
                    value="human"
                    checked={deliveryMethod === 'human'}
                    onChange={() => onDeliveryMethodChange('human')}
                    className="form-radio text-red-600 focus:ring-red-500 h-4 w-4"
                  />
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    <span>Agent</span>
                  </div>
                </label>
              </div>
              <button 
                onClick={onPlaceOrder}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition duration-300"
              >
                Place Order & Watch Live
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
