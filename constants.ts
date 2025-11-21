
import { Restaurant, Chef, Order } from './types';

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: 1,
    name: 'Biryani Palace',
    cuisine: 'Indian',
    rating: 4.8,
    imageUrl: 'https://picsum.photos/seed/biryani/600/400',
    menu: [
      { name: 'Chicken Biryani', description: 'Aromatic rice dish with chicken.', price: 12.99 },
      { name: 'Mutton Biryani', description: 'Rich and flavorful mutton biryani.', price: 14.99 },
      { name: 'Raita', description: 'Yogurt with cucumber and spices.', price: 2.99 },
    ],
  },
  {
    id: 2,
    name: 'Tikka Town',
    cuisine: 'North Indian',
    rating: 4.6,
    imageUrl: 'https://picsum.photos/seed/tikka/600/400',
    menu: [
      { name: 'Chicken Tikka', description: 'Marinated chicken chunks grilled to perfection.', price: 9.99 },
      { name: 'Paneer Tikka', description: 'Spiced cottage cheese cubes.', price: 8.99 },
      { name: 'Garlic Naan', description: 'Soft flatbread with garlic.', price: 3.50 },
    ],
  },
  {
    id: 3,
    name: 'Noodle Nirvana',
    cuisine: 'Asian Fusion',
    rating: 4.7,
    imageUrl: 'https://picsum.photos/seed/noodles/600/400',
    menu: [
      { name: 'Pad Thai', description: 'Stir-fried rice noodles with shrimp.', price: 13.50 },
      { name: 'Spicy Ramen', description: 'Flavorful broth with noodles and pork.', price: 14.00 },
      { name: 'Spring Rolls', description: 'Crispy fried vegetable rolls.', price: 6.50 },
    ],
  },
];

export const MOCK_CHEFS: Chef[] = [
  {
    id: 1,
    name: 'Chef Arjun',
    specialty: 'Italian Cuisine',
    rating: 4.9,
    imageUrl: 'https://picsum.photos/seed/chef1/400/400',
    bio: 'With 15 years of experience in Michelin-starred restaurants, Chef Arjun brings the taste of Italy to your home.'
  },
  {
    id: 2,
    name: 'Chef Priya',
    specialty: 'Pastry & Desserts',
    rating: 4.8,
    imageUrl: 'https://picsum.photos/seed/chef2/400/400',
    bio: 'A passionate baker who creates edible art. Perfect for cakes, pastries, and all your sweet cravings.'
  },
  {
    id: 3,
    name: 'Chef David',
    specialty: 'Pan-Asian',
    rating: 4.7,
    imageUrl: 'https://picsum.photos/seed/chef3/400/400',
    bio: 'Master of the wok and spices. Chef David can create authentic dishes from across Asia for any occasion.'
  },
];

export const MOCK_ORDER: Omit<Order, 'items' | 'total' | 'deliveryMethod'> = {
    id: 'LC12345',
    chef: {
        name: 'Chef Anita',
        specialty: 'Live Cooking',
        imageUrl: 'https://picsum.photos/seed/chef4/200/200'
    },
    status: 'Cooking',
    liveStreamUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // Placeholder video
    date: new Date().toISOString(),
}
