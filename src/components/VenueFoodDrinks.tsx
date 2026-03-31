import { useState } from 'react';
import { Utensils, Pizza, Coffee, Beer, Wine, IceCream, ShoppingCart, MapPin, Clock, Star, Flame, Leaf, Plus, Minus, X, Check as CheckCircle, CreditCard, Lock } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'hot-food' | 'pizza' | 'snacks' | 'drinks' | 'beer-wine' | 'desserts' | 'vip';
  location: string;
  prepTime: string;
  icon: any;
  dietary?: string[];
  popular?: boolean;
  image: string;
}

interface OrderItem extends FoodItem {
  quantity: number;
}

const foodItems: FoodItem[] = [
  // Hot Food
  { id: 1, name: 'Nashville Hot Chicken Tenders', description: 'Crispy chicken with signature Nashville hot spice', price: 14.99, category: 'hot-food', location: 'All Concourses', prepTime: '12-15 min', icon: Flame, popular: true, image: 'https://images.unsplash.com/photo-1620785552619-908d204523ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXNodmlsbGUlMjBob3QlMjBjaGlja2VuJTIwdGVuZGVycyUyMGNyaXNweSUyMGZyaWVkfGVufDF8fHx8MTc3NDkzMzE5Nnww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 2, name: 'BBQ Pulled Pork Sandwich', description: 'Slow-cooked pork shoulder with coleslaw', price: 13.99, category: 'hot-food', location: 'South & West', prepTime: '10-12 min', icon: Utensils, image: 'https://images.unsplash.com/photo-1709457248718-91313ea7ed52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWxsZWQlMjBwb3JrJTIwc2FuZHdpY2glMjBiYnElMjBzYXVjZXxlbnwxfHx8fDE3NzQ5MzMyMTF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 3, name: 'Loaded Nachos Supreme', description: 'Tortilla chips with cheese, jalapeños, sour cream, guac', price: 11.99, category: 'hot-food', location: 'All Concourses', prepTime: '8-10 min', icon: Utensils, popular: true, image: 'https://images.unsplash.com/photo-1715601104221-bdf02645d6c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2FkZWQlMjBuYWNob3MlMjBzdXByZW1lJTIwY2hlZXNlfGVufDF8fHx8MTc3NDkzMzE5N3ww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 4, name: 'Gourmet Burger', description: 'Angus beef with lettuce, tomato, pickles, special sauce', price: 15.99, category: 'hot-food', location: 'North & East', prepTime: '15-18 min', icon: Utensils, image: 'https://images.unsplash.com/photo-1767065703793-7012f5fced19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyJTIwbGV0dHVjZSUyMHRvbWF0b3xlbnwxfHx8fDE3NzQ5MzMxOTh8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 5, name: 'Veggie Wrap', description: 'Grilled vegetables, hummus, mixed greens in tortilla', price: 10.99, category: 'hot-food', location: 'Club Level', prepTime: '8-10 min', icon: Leaf, dietary: ['vegetarian', 'vegan'], image: 'https://images.unsplash.com/photo-1730312382990-46849973ca37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdnaWUlMjB3cmFwJTIwdmVnZXRhYmxlcyUyMGh1bW11c3xlbnwxfHx8fDE3NzQ5MzMxOTh8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  
  // Pizza
  { id: 6, name: 'Cheese Pizza Slice', description: 'Classic New York style with mozzarella', price: 6.99, category: 'pizza', location: 'Pizza Station - All Levels', prepTime: '5-8 min', icon: Pizza, image: 'https://images.unsplash.com/photo-1772494047822-d0375853f7fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVlc2UlMjBwaXp6YSUyMHNsaWNlJTIwbW96emFyZWxsYXxlbnwxfHx8fDE3NzQ5MzMxOTh8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 7, name: 'Pepperoni Pizza Slice', description: 'Loaded with premium pepperoni', price: 7.99, category: 'pizza', location: 'Pizza Station - All Levels', prepTime: '5-8 min', icon: Pizza, popular: true, image: 'https://images.unsplash.com/photo-1631347155591-c162abe23014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXBwZXJvbmklMjBwaXp6YSUyMHNsaWNlfGVufDF8fHx8MTc3NDg4Mzc0MXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 8, name: 'Supreme Pizza Slice', description: 'Pepperoni, sausage, peppers, onions, mushrooms', price: 8.99, category: 'pizza', location: 'Pizza Station', prepTime: '5-8 min', icon: Pizza, image: 'https://images.unsplash.com/photo-1681567604770-0dc826c870ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXByZW1lJTIwcGl6emElMjB0b3BwaW5nc3xlbnwxfHx8fDE3NzQ5MzMxOTl8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  
  // Snacks
  { id: 9, name: 'Soft Pretzel with Cheese', description: 'Warm Bavarian pretzel with beer cheese dip', price: 7.99, category: 'snacks', location: 'All Concourses', prepTime: '3-5 min', icon: Utensils, image: 'https://images.unsplash.com/photo-1697446631489-3e4fbbcf6065?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwcHJldHplbCUyMGNoZWVzZSUyMGRpcHxlbnwxfHx8fDE3NzQ5MzMyMDB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 10, name: 'Popcorn Bucket', description: 'Freshly popped - butter or kettle corn', price: 6.99, category: 'snacks', location: 'All Concourses', prepTime: '2-3 min', icon: Utensils, image: 'https://images.unsplash.com/photo-1651457157710-6d9e9baab62b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Bjb3JuJTIwYnVja2V0JTIwYnV0dGVyZWR8ZW58MXx8fHwxNzc0OTMzMjAwfDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 11, name: 'Hot Dog', description: 'All-beef frank with choice of toppings', price: 8.99, category: 'snacks', location: 'All Concourses', prepTime: '5-7 min', icon: Utensils, image: 'https://images.unsplash.com/photo-1654851979266-dcd5655a747b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFkaXVtJTIwaG90JTIwZG9nJTIwa2V0Y2h1cCUyMG11c3RhcmR8ZW58MXx8fHwxNzc0OTMzMjExfDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 12, name: 'French Fries', description: 'Crispy golden fries with sea salt', price: 5.99, category: 'snacks', location: 'All Concourses', prepTime: '5-7 min', icon: Utensils, image: 'https://images.unsplash.com/photo-1734774797087-b6435057a15e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBmcmllcyUyMGNyaXNweSUyMGdvbGRlbnxlbnwxfHx8fDE3NzQ4NzAzNTR8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  
  // Drinks
  { id: 13, name: 'Fountain Soda', description: 'Coca-Cola products - 20oz', price: 5.99, category: 'drinks', location: 'All Locations', prepTime: '1-2 min', icon: Coffee, image: 'https://images.unsplash.com/photo-1759424346318-2b25019bfeb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3VudGFpbiUyMHNvZGElMjBjb2NhJTIwY29sYSUyMGRyaW5rfGVufDF8fHx8MTc3NDkzMzIwMnww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 14, name: 'Bottled Water', description: 'Pure spring water', price: 4.99, category: 'drinks', location: 'All Locations', prepTime: '1 min', icon: Coffee, image: 'https://images.unsplash.com/photo-1544509925-a45ab789916b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3R0bGVkJTIwd2F0ZXIlMjBzcHJpbmd8ZW58MXx8fHwxNzc0OTMzMjAyfDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 15, name: 'Red Bull Energy', description: 'Original or Sugar-free', price: 7.99, category: 'drinks', location: 'All Concourses', prepTime: '1 min', icon: Coffee, image: 'https://images.unsplash.com/photo-1613218222876-954978a4404e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBidWxsJTIwZW5lcmd5JTIwZHJpbmt8ZW58MXx8fHwxNzc0OTMzMjAzfDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 16, name: 'Frozen Lemonade', description: 'Fresh-squeezed lemon slush', price: 7.99, category: 'drinks', location: 'Specialty Stands', prepTime: '2-3 min', icon: Coffee, popular: true, image: 'https://images.unsplash.com/photo-1679934576534-72d79d027fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcm96ZW4lMjBsZW1vbmFkZSUyMHNsdXNofGVufDF8fHx8MTc3NDkzMzIwM3ww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 17, name: 'Coffee', description: 'Fresh brewed regular or decaf', price: 4.99, category: 'drinks', location: 'Club Level & Main', prepTime: '2-3 min', icon: Coffee, image: 'https://images.unsplash.com/photo-1629131530694-d1f2e3aa6926?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjdXAlMjBob3QlMjBmcmVzaHxlbnwxfHx8fDE3NzQ5MzMyMDR8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  
  // Beer & Wine
  { id: 18, name: 'Local Craft IPA', description: 'Nashville brewery selection', price: 12.99, category: 'beer-wine', location: 'Bar Locations', prepTime: '2 min', icon: Beer, popular: true, image: 'https://images.unsplash.com/photo-1627627045944-a6171e94783a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFmdCUyMGJlZXIlMjBpcGElMjBnbGFzc3xlbnwxfHx8fDE3NzQ5MzMyMDR8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 19, name: 'Domestic Beer', description: 'Bud Light, Miller Lite, Coors Light', price: 10.99, category: 'beer-wine', location: 'All Bars', prepTime: '2 min', icon: Beer, image: 'https://images.unsplash.com/photo-1605233401403-c9bfdae2082b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb21lc3RpYyUyMGJlZXIlMjBib3R0bGUlMjBsaWdodHxlbnwxfHx8fDE3NzQ5MzMyMDR8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 20, name: 'White Wine', description: 'Chardonnay or Pinot Grigio', price: 11.99, category: 'beer-wine', location: 'Club Level Bar', prepTime: '2 min', icon: Wine, image: 'https://images.unsplash.com/photo-1651665849313-91055ad02729?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHdpbmUlMjBnbGFzcyUyMGNoYXJkb25uYXl8ZW58MXx8fHwxNzc0OTMzMjA0fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 21, name: 'Red Wine', description: 'Cabernet or Merlot', price: 11.99, category: 'beer-wine', location: 'Club Level Bar', prepTime: '2 min', icon: Wine, image: 'https://images.unsplash.com/photo-1690642109150-d8e9ea40dbdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjB3aW5lJTIwZ2xhc3MlMjBjYWJlcm5ldHxlbnwxfHx8fDE3NzQ5MzMyMDV8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 22, name: 'Signature Cocktail', description: 'Nashville Mule or Whiskey Sour', price: 14.99, category: 'beer-wine', location: 'Premium Bars', prepTime: '3-5 min', icon: Wine, image: 'https://images.unsplash.com/photo-1582084954495-05dbef5a25be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWduYXR1cmUlMjBjb2NrdGFpbCUyMHdoaXNrZXklMjBtdWxlfGVufDF8fHx8MTc3NDkzMzIwNXww&ixlib=rb-4.1.0&q=80&w=1080' },
  
  // Desserts
  { id: 23, name: 'Ice Cream Sundae', description: 'Vanilla ice cream with choice of toppings', price: 8.99, category: 'desserts', location: 'Dessert Stations', prepTime: '3-5 min', icon: IceCream, image: 'https://images.unsplash.com/photo-1650419741906-1cdead9c9b4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBjcmVhbSUyMHN1bmRhZSUyMHZhbmlsbGElMjB0b3BwaW5nc3xlbnwxfHx8fDE3NzQ5MzMyMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 24, name: 'Chocolate Brownie', description: 'Warm fudge brownie with chocolate sauce', price: 6.99, category: 'desserts', location: 'All Concourses', prepTime: '5-7 min', icon: IceCream, popular: true, image: 'https://images.unsplash.com/photo-1675062521318-aa0797eae2b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBicm93bmllJTIwZnVkZ2V8ZW58MXx8fHwxNzc0OTMzMjA2fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 25, name: 'Cookies', description: 'Chocolate chip or oatmeal raisin', price: 4.99, category: 'desserts', location: 'All Concourses', prepTime: '1-2 min', icon: IceCream, image: 'https://images.unsplash.com/photo-1694588915262-30d22a36b379?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjaGlwJTIwY29va2llcyUyMGZyZXNofGVufDF8fHx8MTc3NDkzMzIwNnww&ixlib=rb-4.1.0&q=80&w=1080' },
  
  // VIP Exclusive
  { id: 26, name: 'Charcuterie Board', description: 'Premium meats, cheeses, crackers, olives', price: 24.99, category: 'vip', location: 'VIP Lounge Only', prepTime: '10 min', icon: Star, image: 'https://images.unsplash.com/photo-1619027717736-9736d008e9b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFyY3V0ZXJpZSUyMGJvYXJkJTIwbWVhdHMlMjBjaGVlc2V8ZW58MXx8fHwxNzc0OTMzMjA3fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 27, name: 'Sushi Platter', description: 'California rolls, salmon nigiri, tuna sashimi', price: 19.99, category: 'vip', location: 'VIP Lounge Only', prepTime: '15 min', icon: Star, dietary: ['pescatarian'], image: 'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHBsYXR0ZXIlMjBjYWxpZm9ybmlhJTIwcm9sbHN8ZW58MXx8fHwxNzc0OTMzMjA3fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 28, name: 'Lobster Roll', description: 'Fresh lobster on toasted bun with butter', price: 22.99, category: 'vip', location: 'VIP Lounge Only', prepTime: '12 min', icon: Star, image: 'https://images.unsplash.com/photo-1590759668628-05b0fc34bb70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2JzdGVyJTIwcm9sbCUyMHRvYXN0ZWQlMjBidW58ZW58MXx8fHwxNzc0OTMzMjA4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
];

const categories = [
  { id: 'all', name: 'All Items', icon: Utensils },
  { id: 'hot-food', name: 'Hot Food', icon: Flame },
  { id: 'pizza', name: 'Pizza', icon: Pizza },
  { id: 'snacks', name: 'Snacks', icon: Utensils },
  { id: 'drinks', name: 'Drinks', icon: Coffee },
  { id: 'beer-wine', name: 'Beer & Wine', icon: Beer },
  { id: 'desserts', name: 'Desserts', icon: IceCream },
  { id: 'vip', name: 'VIP Exclusive', icon: Star },
];

export function VenueFoodDrinks() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [seatNumber, setSeatNumber] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  // Payment form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const filteredItems = selectedCategory === 'all'
    ? foodItems
    : foodItems.filter(item => item.category === selectedCategory);

  const addToOrder = (item: FoodItem) => {
    const existing = orderItems.find(i => i.id === item.id);
    if (existing) {
      setOrderItems(orderItems.map(i => 
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setOrderItems([...orderItems, { ...item, quantity: 1 }]);
    }
    toast.success('Added to cart!');
  };

  const removeFromOrder = (id: number) => {
    setOrderItems(orderItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, change: number) => {
    setOrderItems(orderItems.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const totalPrice = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const serviceFee = totalPrice * 0.05;
  const tax = totalPrice * 0.0925;
  const totalWithFees = totalPrice + serviceFee + tax;
  const totalItems = orderItems.reduce((sum, item) => sum + item.quantity, 0);

  const proceedToPayment = () => {
    if (!seatNumber.trim()) {
      toast.error('Please enter your seat number');
      return;
    }
    if (orderItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setShowPayment(true);
  };

  const processPayment = () => {
    if (!cardNumber || cardNumber.length < 16) {
      toast.error('Please enter a valid card number');
      return;
    }
    if (!cardName.trim()) {
      toast.error('Please enter cardholder name');
      return;
    }
    if (!expiryDate || expiryDate.length < 5) {
      toast.error('Please enter expiry date');
      return;
    }
    if (!cvv || cvv.length < 3) {
      toast.error('Please enter CVV');
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      toast.success('Payment successful! Order placed! 🎉');
      
      setTimeout(() => {
        setOrderPlaced(false);
        setShowPayment(false);
        setOrderItems([]);
        setSeatNumber('');
        setCardNumber('');
        setCardName('');
        setExpiryDate('');
        setCvv('');
        setShowCart(false);
      }, 3000);
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <Utensils className="w-10 h-10 text-[#fb923c]" />
          Food & Drinks
        </h2>
        <p className="text-gray-400 mb-8 text-lg">Order from your seat or visit our concession stands</p>

        {/* Order to Seat Feature Banner */}
        <div className="mb-8 bg-[#fb923c] rounded-xl p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">🍕 Order to Your Seat!</h3>
              <p className="text-white/90">Skip the lines - Order now and we'll deliver right to you</p>
            </div>
            <button
              onClick={() => setShowCart(true)}
              className="bg-white text-[#fb923c] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Cart ({totalItems})
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'bg-[#fb923c] text-white'
                    : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.name}
              </button>
            );
          })}</div>

        {/* Food Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl overflow-hidden hover:border-[#fb923c] transition-all group"
              >
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {item.popular && (
                    <div className="absolute top-3 right-3 bg-[#fb923c] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                      <Star className="w-3 h-3 fill-current" />
                      Popular
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-400 mb-3">{item.description}</p>

                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <MapPin className="w-3 h-3" />
                    <span>{item.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                    <Clock className="w-3 h-3" />
                    <span>{item.prepTime}</span>
                  </div>

                  {item.dietary && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.dietary.map(diet => (
                        <span key={diet} className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-semibold">
                          {diet}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-[#1a1a1a]">
                    <span className="text-2xl font-bold text-[#fb923c]">${item.price.toFixed(2)}</span>
                    <button
                      onClick={() => addToOrder(item)}
                      className="px-4 py-2 bg-[#fb923c] hover:bg-[#ea580c] rounded-lg font-semibold transition-all flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cart & Payment Modal */}
        {showCart && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#0a0a0a] border-2 border-[#fb923c] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {!orderPlaced ? (
                <>
                  {!showPayment ? (
                    <>
                      {/* Cart View */}
                      <div className="sticky top-0 bg-[#0a0a0a] border-b border-[#1a1a1a] p-6 flex items-center justify-between">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                          <ShoppingCart className="w-6 h-6 text-[#fb923c]" />
                          Your Order
                        </h2>
                        <button
                          onClick={() => setShowCart(false)}
                          className="p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>

                      <div className="p-6">
                        <div className="mb-6">
                          <label className="block text-sm font-semibold mb-2 text-gray-400">
                            Delivery Seat Number
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Section 105, Row A, Seat 12"
                            value={seatNumber}
                            onChange={(e) => setSeatNumber(e.target.value)}
                            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#fb923c] focus:outline-none"
                          />
                        </div>

                        {orderItems.length === 0 ? (
                          <div className="text-center py-12 text-gray-400">
                            <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p>Your cart is empty</p>
                          </div>
                        ) : (
                          <div className="space-y-4 mb-6">
                            {orderItems.map(item => (
                              <div key={item.id} className="bg-[#1a1a1a] rounded-lg p-4">
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex-1">
                                    <h4 className="font-bold">{item.name}</h4>
                                    <p className="text-sm text-gray-400">${item.price.toFixed(2)} each</p>
                                  </div>
                                  <button
                                    onClick={() => removeFromOrder(item.id)}
                                    className="text-red-500 hover:text-red-400 transition-colors"
                                  >
                                    <X className="w-5 h-5" />
                                  </button>
                                </div>

                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3 bg-[#0a0a0a] rounded-lg p-2">
                                    <button
                                      onClick={() => updateQuantity(item.id, -1)}
                                      className="w-8 h-8 bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded flex items-center justify-center transition-colors"
                                    >
                                      <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                                    <button
                                      onClick={() => updateQuantity(item.id, 1)}
                                      className="w-8 h-8 bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded flex items-center justify-center transition-colors"
                                    >
                                      <Plus className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <span className="text-lg font-bold text-[#fb923c]">
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="border-t border-[#2a2a2a] pt-4 mb-6 space-y-2">
                          <div className="flex items-center justify-between text-gray-400">
                            <span>Subtotal</span>
                            <span>${totalPrice.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center justify-between text-gray-400">
                            <span>Service Fee (5%)</span>
                            <span>${serviceFee.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center justify-between text-gray-400">
                            <span>Tax (9.25%)</span>
                            <span>${tax.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center justify-between text-xl font-bold pt-2 border-t border-[#2a2a2a]">
                            <span>Total</span>
                            <span className="text-[#fb923c]">${totalWithFees.toFixed(2)}</span>
                          </div>
                        </div>

                        <button
                          onClick={proceedToPayment}
                          disabled={orderItems.length === 0}
                          className="w-full py-4 bg-[#fb923c] hover:bg-[#ea580c] rounded-lg font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Proceed to Payment
                        </button>

                        <p className="text-xs text-gray-500 text-center mt-4">
                          Estimated delivery: 20-30 minutes
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Payment View */}
                      <div className="sticky top-0 bg-[#0a0a0a] border-b border-[#1a1a1a] p-6 flex items-center justify-between">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                          <CreditCard className="w-6 h-6 text-[#fb923c]" />
                          Payment
                        </h2>
                        <button
                          onClick={() => setShowPayment(false)}
                          className="p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>

                      <div className="p-6">
                        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 mb-6">
                          <div className="flex items-center gap-2 text-green-400 mb-2">
                            <Lock className="w-4 h-4" />
                            <span className="text-sm font-semibold">Secure Payment</span>
                          </div>
                          <p className="text-xs text-gray-400">Your payment information is encrypted and secure</p>
                        </div>

                        <div className="space-y-4 mb-6">
                          <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-400">
                              Card Number
                            </label>
                            <input
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                              maxLength={19}
                              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#fb923c] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-400">
                              Cardholder Name
                            </label>
                            <input
                              type="text"
                              placeholder="John Doe"
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value)}
                              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#fb923c] focus:outline-none"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-semibold mb-2 text-gray-400">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                placeholder="MM/YY"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(formatExpiry(e.target.value))}
                                maxLength={5}
                                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#fb923c] focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-semibold mb-2 text-gray-400">
                                CVV
                              </label>
                              <input
                                type="text"
                                placeholder="123"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                maxLength={4}
                                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#fb923c] focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="bg-[#1a1a1a] rounded-lg p-4 mb-6">
                          <div className="flex items-center justify-between text-lg font-bold">
                            <span>Total Amount</span>
                            <span className="text-[#fb923c]">${totalWithFees.toFixed(2)}</span>
                          </div>
                        </div>

                        <button
                          onClick={processPayment}
                          disabled={isProcessing}
                          className="w-full py-4 bg-[#fb923c] hover:bg-[#ea580c] rounded-lg font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {isProcessing ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Lock className="w-5 h-5" />
                              Pay ${totalWithFees.toFixed(2)}
                            </>
                          )}
                        </button>

                        <p className="text-xs text-gray-500 text-center mt-4">
                          By completing this purchase, you agree to our terms and conditions
                        </p>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="p-12 text-center">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Order Confirmed!</h3>
                  <p className="text-gray-400 mb-2">Your food will be delivered to:</p>
                  <p className="text-lg font-bold text-[#fb923c] mb-6">{seatNumber}</p>
                  <p className="text-sm text-gray-500">Estimated delivery: 20-30 minutes</p>
                  <p className="text-sm text-gray-500 mt-2">Order total: ${totalWithFees.toFixed(2)}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
