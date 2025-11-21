
import React from 'react';
import { Order } from '../types';
import ChatBox from './ChatBox';

interface LiveOrderViewProps {
  order: Order;
  onBack: () => void;
}

const DroneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;
const HumanIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;


const LiveOrderView: React.FC<LiveOrderViewProps> = ({ order, onBack }) => {
  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-2xl">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Your Order is Live!</h2>
          <p className="text-gray-600">Order ID: {order.id}</p>
        </div>
        <button onClick={onBack} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
          &larr; Back to Restaurants
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Live Video */}
        <div className="lg:col-span-2 bg-black rounded-lg overflow-hidden shadow-lg relative">
          <video controls autoPlay muted loop className="w-full h-full object-cover">
            <source src={order.liveStreamUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-sm font-bold rounded-full flex items-center animate-pulse">
            <span className="w-3 h-3 bg-white rounded-full mr-2"></span>LIVE
          </div>
        </div>
        
        {/* Chat and Order Details */}
        <div className="space-y-6">
          <div className="p-4 bg-gray-100 rounded-lg">
             <div className="flex items-center mb-4">
               <img src={order.chef.imageUrl} alt={order.chef.name} className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-red-500" />
               <div>
                  <h3 className="text-lg font-bold">Your Chef: {order.chef.name}</h3>
                  <p className="text-sm text-gray-600">{order.chef.specialty}</p>
               </div>
             </div>
             <ChatBox />
          </div>

          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-bold mb-3 border-b pb-2">Order Summary</h3>
            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-3 rounded-md mb-4 text-sm">
                {order.deliveryMethod === 'drone' ? 
                    <div className="flex items-center"><DroneIcon /> <div><strong>Drone Delivery:</strong> Your order will arrive at your rooftop or front yard.</div></div> :
                    <div className="flex items-center"><HumanIcon /> <div><strong>Agent Delivery:</strong> Your order will be brought to your door.</div></div>
                }
            </div>
            <ul className="space-y-2 text-sm">
                {order.items.map(item => (
                    <li key={item.name} className="flex justify-between">
                        <span>{item.name} x {item.quantity}</span>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                ))}
            </ul>
            <div className="flex justify-between font-bold text-lg mt-4 pt-3 border-t">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveOrderView;
