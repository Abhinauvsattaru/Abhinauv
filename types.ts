
export interface MenuItem {
  name: string;
  description: string;
  price: number;
}

export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  imageUrl: string;
  menu: MenuItem[];
}

export interface Chef {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  imageUrl: string;
  bio: string;
}

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
  restaurantName: string;
}

export interface Message {
  id: number;
  sender: 'user' | 'chef';
  text: string;
  timestamp: string;
}

export interface Order {
    id: string;
    items: CartItem[];
    chef: Omit<Chef, 'id' | 'bio' | 'rating'>;
    status: 'Preparing' | 'Cooking' | 'Out for Delivery' | 'Delivered';
    total: number;
    liveStreamUrl: string;
    deliveryMethod: 'drone' | 'human';
    date: string;
}

export interface Booking {
  chef: Chef;
  date: string;
  time: string;
  occasion: string;
  name: string;
  address: string;
  phone: string;
}
