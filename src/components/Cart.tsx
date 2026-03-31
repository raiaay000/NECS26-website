import { Trash2, Plus, Minus, ShoppingCart, X } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'ticket' | 'merch';
}

interface CartProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  onClose: () => void;
}

export function Cart({ cart, onUpdateQuantity, onRemoveItem, onCheckout, onClose }: CartProps) {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const serviceFee = subtotal * 0.05;
  const total = subtotal + serviceFee;

  if (cart.length === 0) {
    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#1a1a1a] flex items-center justify-between">
          <h2 className="text-2xl font-bold">Shopping Cart</h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center hover:bg-[#1a1a1a] rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <ShoppingCart className="w-20 h-20 mb-4 text-gray-600" />
          <h3 className="text-xl font-bold mb-2">Your cart is empty</h3>
          <p className="text-gray-400 mb-6">Add tickets or merchandise to get started!</p>
          <button 
            onClick={onClose}
            className="px-6 py-3 bg-[#2f6bff] rounded-lg hover:bg-[#2557d6] transition-colors font-bold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-[#1a1a1a] flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Shopping Cart</h2>
          <p className="text-sm text-gray-400">{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
        </div>
        <button 
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center hover:bg-[#1a1a1a] rounded-lg transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {cart.map((item) => (
          <div 
            key={item.id}
            className="bg-[#121212] border border-[#1a1a1a] rounded-lg p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-bold mb-1">{item.name}</h3>
                <p className="text-sm text-gray-400 capitalize">{item.type}</p>
              </div>
              <div className="text-lg font-bold">${item.price}</div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-lg">
                <button
                  onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  className="p-2 hover:bg-[#2a2a2a] rounded-l-lg transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-semibold min-w-[40px] text-center">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="p-2 hover:bg-[#2a2a2a] rounded-r-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => onRemoveItem(item.id)}
                className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary Footer */}
      <div className="border-t border-[#1a1a1a] p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Service Fee</span>
            <span>${serviceFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-baseline pt-2 border-t border-[#1a1a1a]">
            <span className="text-lg font-bold">Total</span>
            <span className="text-2xl font-bold text-[#2f6bff]">${total.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={onCheckout}
          className="w-full bg-[#2f6bff] py-4 rounded-lg font-bold text-lg hover:bg-[#2557d6] transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}