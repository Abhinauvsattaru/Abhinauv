import React, { useState, useEffect } from 'react';
import { Chef, Booking } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  chef: Chef | null;
  onConfirm: (bookingDetails: Omit<Booking, 'chef'>) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, chef, onConfirm }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [occasion, setOccasion] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Reset form when modal opens for a new chef
    if (isOpen) {
        const today = new Date().toISOString().split('T')[0];
        setDate(today);
        setTime('18:00');
        setOccasion('');
        setName('');
        setAddress('');
        setPhone('');
        setIsSubmitted(false);
    }
  }, [isOpen, chef]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && time && occasion && name && address && phone) {
      onConfirm({ date, time, occasion, name, address, phone });
      setIsSubmitted(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity">
      <div className="bg-white rounded-lg shadow-xl p-8 m-4 max-w-lg w-full transform transition-all scale-100">
        {isSubmitted ? (
            <div className="text-center">
                <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h2 className="text-2xl font-bold text-gray-900 mt-4">Booking Confirmed!</h2>
                <p className="mt-2 text-gray-600">You have successfully booked {chef?.name}. You will receive a confirmation call shortly.</p>
                <button onClick={onClose} className="mt-6 bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition duration-300">
                    Close
                </button>
            </div>
        ) : (
            <>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Book {chef?.name}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                            {/* FIX: Replaced custom 'input-style' class and unsupported `<style jsx>` with standard Tailwind CSS classes. */}
                            <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                            {/* FIX: Replaced custom 'input-style' class and unsupported `<style jsx>` with standard Tailwind CSS classes. */}
                            <input type="time" id="time" value={time} onChange={e => setTime(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="occasion" className="block text-sm font-medium text-gray-700">Occasion</label>
                        {/* FIX: Replaced custom 'input-style' class and unsupported `<style jsx>` with standard Tailwind CSS classes. */}
                        <input type="text" id="occasion" value={occasion} onChange={e => setOccasion(e.target.value)} required placeholder="e.g., Dinner Party, Weekly Meals" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                    </div>
                     <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        {/* FIX: Replaced custom 'input-style' class and unsupported `<style jsx>` with standard Tailwind CSS classes. */}
                        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                        {/* FIX: Replaced custom 'input-style' class and unsupported `<style jsx>` with standard Tailwind CSS classes. */}
                        <input type="text" id="address" value={address} onChange={e => setAddress(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                        {/* FIX: Replaced custom 'input-style' class and unsupported `<style jsx>` with standard Tailwind CSS classes. */}
                        <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                    </div>
                    <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition duration-300">
                        Confirm Booking
                    </button>
                </form>
            </>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
