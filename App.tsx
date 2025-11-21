
import React, { useState, useCallback } from 'react';
import { Chef, Restaurant, CartItem, Order, Booking } from './types';
import { MOCK_RESTAURANTS, MOCK_CHEFS, MOCK_ORDER } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import RestaurantList from './components/RestaurantList';
import ChefList from './components/ChefList';
import Cart from './components/Cart';
import LiveOrderView from './components/LiveOrderView';
import GeminiMealPlanner from './components/GeminiMealPlanner';
import DonateFood from './components/DonateFood';
import BookingModal from './components/BookingModal';
import OrderHistory from './components/OrderHistory';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeView, setActiveView] = useState<'restaurants' | 'chefs' | 'liveOrder' | 'planner' | 'donate' | 'orderHistory'>('restaurants');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<'drone' | 'human'>('drone');
  const [searchTerm, setSearchTerm] = useState('');

  // New state for booking and order history
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedChefForBooking, setSelectedChefForBooking] = useState<Chef | null>(null);


  const addToCart = useCallback((item: { name: string; price: number }, restaurant: Restaurant) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.name === item.name && cartItem.restaurantName === restaurant.name);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.name === item.name && cartItem.restaurantName === restaurant.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1, restaurantName: restaurant.name }];
      }
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((itemName: string) => {
    setCart(prevCart => prevCart.filter(item => item.name !== itemName));
  }, []);

  const placeOrder = useCallback(() => {
    if (cart.length === 0) return;
    const order: Order = {
      ...MOCK_ORDER,
      id: `LC${Date.now().toString().slice(-6)}`,
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      deliveryMethod: deliveryMethod,
      date: new Date().toISOString(),
    };
    setCurrentOrder(order);
    setOrderHistory(prev => [order, ...prev]);
    setCart([]);
    setIsCartOpen(false);
    setActiveView('liveOrder');
  }, [cart, deliveryMethod]);

  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
    if (term && activeView !== 'restaurants') {
      setActiveView('restaurants');
    }
  }, [activeView]);
  
  const handleBookChef = useCallback((chef: Chef) => {
    setSelectedChefForBooking(chef);
    setIsBookingModalOpen(true);
  }, []);

  const handleConfirmBooking = useCallback((bookingDetails: Omit<Booking, 'chef'>) => {
    if(selectedChefForBooking) {
      const newBooking: Booking = { ...bookingDetails, chef: selectedChefForBooking };
      setBookings(prev => [...prev, newBooking]);
      console.log('New Booking:', newBooking); // For debugging
    }
    setIsBookingModalOpen(false);
    setSelectedChefForBooking(null);
  }, [selectedChefForBooking]);

  const filteredRestaurants = MOCK_RESTAURANTS.filter(restaurant => {
    const term = searchTerm.toLowerCase();
    return (
      restaurant.name.toLowerCase().includes(term) ||
      restaurant.cuisine.toLowerCase().includes(term) ||
      restaurant.menu.some(item => item.name.toLowerCase().includes(term))
    );
  });
  
  const renderContent = () => {
    switch (activeView) {
      case 'liveOrder':
        return currentOrder ? <LiveOrderView order={currentOrder} onBack={() => setActiveView('restaurants')} /> : <div className="text-center p-8">No active order.</div>;
      case 'chefs':
        return <ChefList chefs={MOCK_CHEFS} onBookChef={handleBookChef} />;
      case 'planner':
        return <GeminiMealPlanner />;
      case 'donate':
        return <DonateFood />;
      case 'orderHistory':
        return <OrderHistory orders={orderHistory} />;
      case 'restaurants':
      default:
        return <RestaurantList restaurants={filteredRestaurants} onAddToCart={addToCart} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans text-gray-800">
      <Header 
        onNavigate={setActiveView} 
        cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(!isCartOpen)} 
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      <Footer />
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onRemoveItem={removeFromCart} 
        onPlaceOrder={placeOrder} 
        deliveryMethod={deliveryMethod}
        onDeliveryMethodChange={setDeliveryMethod}
      />
      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        chef={selectedChefForBooking}
        onConfirm={handleConfirmBooking}
      />
    </div>
  );
};

export default App;
