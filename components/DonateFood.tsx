
import React, { useState } from 'react';

const DonateFood: React.FC = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [foodDescription, setFoodDescription] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the data to a backend.
        // For this demo, we'll just simulate a successful submission.
        if (name && address && phone && foodDescription) {
            setIsSubmitted(true);
        }
    };

    if (isSubmitted) {
        return (
            <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg text-center">
                <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h2 className="text-3xl font-bold text-gray-900 mt-4">Thank You!</h2>
                <p className="mt-2 text-gray-600">Your donation pickup has been scheduled. Our team will contact you shortly to confirm the details. You're making a real difference!</p>
                <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition duration-300"
                >
                    Schedule Another Donation
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Donate Leftover Food</h2>
                <p className="mt-2 text-gray-600">Have leftover food from a party or event? Don't let it go to waste. Schedule a pickup, and we'll ensure it reaches those in need.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        placeholder="John Doe"
                    />
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Pickup Address</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        placeholder="123 Main St, Anytown, USA"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        placeholder="(555) 123-4567"
                    />
                </div>
                <div>
                    <label htmlFor="foodDescription" className="block text-sm font-medium text-gray-700">Food Description & Quantity</label>
                    <textarea
                        id="foodDescription"
                        rows={4}
                        value={foodDescription}
                        onChange={(e) => setFoodDescription(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        placeholder="e.g., 1 large tray of chicken biryani, 20 sandwiches. All cooked today."
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Schedule Pickup
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DonateFood;
