
import React from 'react';
import { Order } from '../types';

interface OrderHistoryProps {
  orders: Order[];
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Your Order History</h2>
        <p className="mt-4 text-lg text-gray-600">
          Review your past orders with LiveCook.
        </p>
      </div>

      {orders.length > 0 ? (
        <div className="max-w-4xl mx-auto space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Order ID: {order.id}</h3>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">${order.total.toFixed(2)}</p>
                  <span className="px-3 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                    Delivered
                  </span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Items:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {order.items.map(item => (
                    <li key={item.name}>
                      {item.name} (x{item.quantity}) - <span className="text-sm text-gray-500">{item.restaurantName}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-16 bg-gray-100 rounded-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <h3 className="mt-2 text-xl font-medium text-gray-900">No Past Orders</h3>
          <p className="mt-1 text-sm text-gray-500">You haven't placed any orders yet. Start exploring our restaurants!</p>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
