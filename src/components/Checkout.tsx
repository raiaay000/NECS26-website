import { useState } from 'react';
import { ArrowLeft, Check, Lock, CreditCard, User, Mail, Phone, Package, Ticket as TicketIcon, MapPin } from 'lucide-react';
import { useToast } from './ui/toast';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'ticket' | 'merch';
}

interface CheckoutProps {
  cart: CartItem[];
  onBack: () => void;
  onClearCart: () => void;
}

export function Checkout({ cart, onBack, onClearCart }: CheckoutProps) {
  const toast = useToast();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });

  const [agreeTerms, setAgreeTerms] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const serviceFee = subtotal * 0.05;
  const processingFee = 2.99;
  const total = subtotal + serviceFee + processingFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }
    toast.success('🎉 Order confirmed! Check your email for tickets and details.');
    setTimeout(() => {
      onClearCart();
      onBack();
    }, 2000);
  };

  const tickets = cart.filter(item => item.type === 'ticket');
  const merchandise = cart.filter(item => item.type === 'merch');

  return (
    <div className="min-h-screen bg-black pt-20 px-4 md:px-8 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Cart
          </button>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Checkout</h1>
          <p className="text-gray-400">Complete your order for NECS 2026</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#2f6bff]/20 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-[#2f6bff]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Contact Information</h2>
                    <p className="text-sm text-gray-400">We'll send your tickets here</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#2f6bff] focus:outline-none transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#2f6bff] focus:outline-none transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg pl-11 pr-4 py-3 text-white focus:border-[#2f6bff] focus:outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg pl-11 pr-4 py-3 text-white focus:border-[#2f6bff] focus:outline-none transition-colors"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing Address (Only show if merchandise) */}
              {merchandise.length > 0 && (
                <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#2f6bff]/20 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#2f6bff]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Shipping Address</h2>
                      <p className="text-sm text-gray-400">Where should we send your merch?</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Street Address</label>
                      <input
                        type="text"
                        name="address"
                        required={merchandise.length > 0}
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#2f6bff] focus:outline-none transition-colors"
                        placeholder="123 Main Street"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">City</label>
                        <input
                          type="text"
                          name="city"
                          required={merchandise.length > 0}
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#2f6bff] focus:outline-none transition-colors"
                          placeholder="Nashville"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">State</label>
                        <input
                          type="text"
                          name="state"
                          required={merchandise.length > 0}
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#2f6bff] focus:outline-none transition-colors"
                          placeholder="TN"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">ZIP Code</label>
                        <input
                          type="text"
                          name="zip"
                          required={merchandise.length > 0}
                          value={formData.zip}
                          onChange={handleInputChange}
                          className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#2f6bff] focus:outline-none transition-colors"
                          placeholder="37203"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Information */}
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#2f6bff]/20 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-[#2f6bff]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Payment Details</h2>
                    <p className="text-sm text-gray-400">Secure payment processing</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Cardholder Name</label>
                    <input
                      type="text"
                      name="cardName"
                      required
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#2f6bff] focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      required
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#2f6bff] focus:outline-none transition-colors"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Expiry Date</label>
                      <input
                        type="text"
                        name="expiry"
                        required
                        value={formData.expiry}
                        onChange={handleInputChange}
                        className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#2f6bff] focus:outline-none transition-colors"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        required
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#2f6bff] focus:outline-none transition-colors"
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-start gap-3 p-4 bg-[#1a1a1a] rounded-lg">
                  <Lock className="w-5 h-5 text-[#2f6bff] flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-400">
                    Your payment information is encrypted and secure. We never store your card details.
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-[#2a2a2a] bg-[#1a1a1a] text-[#2f6bff] focus:ring-[#2f6bff] focus:ring-offset-0"
                  />
                  <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    I agree to the terms and conditions, refund policy, and privacy policy. I understand that all ticket sales are final and merchandise orders will be shipped within 7-10 business days.
                  </span>
                </label>
              </div>
            </div>

            {/* Order Summary - Right Side */}
            <div className="lg:col-span-1">
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 sticky top-8">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                {/* Items */}
                <div className="space-y-4 mb-6 pb-6 border-b border-[#1a1a1a]">
                  {tickets.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                        <TicketIcon className="w-4 h-4" />
                        <span>Tickets</span>
                      </div>
                      {tickets.map((item) => (
                        <div key={item.id} className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="font-medium text-sm">{item.name}</div>
                            <div className="text-xs text-gray-400">Qty: {item.quantity}</div>
                          </div>
                          <div className="font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {merchandise.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                        <Package className="w-4 h-4" />
                        <span>Merchandise</span>
                      </div>
                      {merchandise.map((item) => (
                        <div key={item.id} className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="font-medium text-sm">{item.name}</div>
                            <div className="text-xs text-gray-400">Qty: {item.quantity}</div>
                          </div>
                          <div className="font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-3 mb-6 pb-6 border-b border-[#1a1a1a]">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Service Fee (5%)</span>
                    <span>${serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Processing Fee</span>
                    <span>${processingFee.toFixed(2)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-baseline mb-6">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-3xl font-bold text-[#2f6bff]">${total.toFixed(2)}</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#2f6bff] py-4 rounded-lg font-bold text-lg hover:bg-[#2557d6] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
                >
                  <Lock className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Complete Order
                </button>

                {/* Info */}
                <div className="mt-6 space-y-2 text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-[#2f6bff]" />
                    <span>Instant digital delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-[#2f6bff]" />
                    <span>Secure 256-bit encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-[#2f6bff]" />
                    <span>24/7 customer support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}