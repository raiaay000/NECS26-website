import { Receipt, Download, Eye, Calendar, CreditCard, Package, Ticket, RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import { useToast } from './ui/toast';

interface ReceiptItem {
  id: string;
  orderNumber: string;
  date: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: 'completed' | 'pending' | 'refunded';
  type: 'ticket' | 'merch';
  paymentMethod: string;
}

const mockReceipts: ReceiptItem[] = [
  {
    id: '1',
    orderNumber: 'NECS-2026-001234',
    date: 'March 28, 2026',
    items: [
      { name: 'VIP Weekend Pass', quantity: 2, price: 249.99 },
      { name: 'Meet & Greet Package', quantity: 1, price: 149.99 }
    ],
    total: 649.97,
    status: 'completed',
    type: 'ticket',
    paymentMethod: 'Visa ****4242'
  },
  {
    id: '2',
    orderNumber: 'NECS-2026-001235',
    date: 'March 25, 2026',
    items: [
      { name: 'NECS 2026 Jersey', quantity: 1, price: 79.99 },
      { name: 'Championship Hoodie', quantity: 1, price: 89.99 }
    ],
    total: 169.98,
    status: 'completed',
    type: 'merch',
    paymentMethod: 'Mastercard ****5555'
  },
  {
    id: '3',
    orderNumber: 'NECS-2026-001236',
    date: 'March 20, 2026',
    items: [
      { name: 'Standard Day Pass', quantity: 1, price: 49.99 }
    ],
    total: 49.99,
    status: 'pending',
    type: 'ticket',
    paymentMethod: 'PayPal'
  }
];

export function Receipts() {
  const toast = useToast();
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'ticket' | 'merch'>('all');
  const [refundReceipt, setRefundReceipt] = useState<ReceiptItem | null>(null);

  const filteredReceipts = filter === 'all' 
    ? mockReceipts 
    : mockReceipts.filter(r => r.type === filter);

  const handleDownload = (receipt: ReceiptItem) => {
    console.log('Downloading receipt:', receipt.orderNumber);
    toast.success(`Receipt ${receipt.orderNumber} downloaded!`);
  };

  const handleRefund = (receipt: ReceiptItem) => {
    setRefundReceipt(null);
    toast.success(`Refund requested for ${receipt.orderNumber}! You'll receive an email confirmation shortly. 💰`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'refunded':
        return 'bg-red-500/20 text-red-500 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen pt-20 px-8 pb-8 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 flex items-center gap-3">
            <Receipt className="w-12 h-12 text-[#2f6bff]" />
            My Receipts
          </h1>
          <p className="text-gray-400 text-xl">View and download your purchase history</p>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              filter === 'all' 
                ? 'bg-[#2f6bff] text-white' 
                : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a]'
            }`}
          >
            All Orders
          </button>
          <button
            onClick={() => setFilter('ticket')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              filter === 'ticket' 
                ? 'bg-[#2f6bff] text-white' 
                : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a]'
            }`}
          >
            <Ticket className="w-4 h-4" />
            Tickets
          </button>
          <button
            onClick={() => setFilter('merch')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              filter === 'merch' 
                ? 'bg-[#2f6bff] text-white' 
                : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a]'
            }`}
          >
            <Package className="w-4 h-4" />
            Merchandise
          </button>
        </div>

        {/* Receipts List */}
        <div className="space-y-4">
          {filteredReceipts.map((receipt) => (
            <div
              key={receipt.id}
              className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 hover:border-[#2f6bff] transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">{receipt.orderNumber}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(receipt.status)}`}>
                      {receipt.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {receipt.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <CreditCard className="w-4 h-4" />
                      {receipt.paymentMethod}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#fb923c]">${receipt.total.toFixed(2)}</div>
                  <div className="text-xs text-gray-400">{receipt.items.length} item(s)</div>
                </div>
              </div>

              {/* Items */}
              <div className="border-t border-[#1a1a1a] pt-4 mb-4">
                {receipt.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2">
                    <div>
                      <span className="text-white">{item.name}</span>
                      <span className="text-gray-400 ml-2">x{item.quantity}</span>
                    </div>
                    <span className="text-gray-400">${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedReceipt(receipt)}
                  className="flex-1 px-4 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                <button
                  onClick={() => handleDownload(receipt)}
                  className="flex-1 px-4 py-2 bg-[#2f6bff] hover:bg-[#2557d6] rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                {receipt.status === 'completed' && (
                  <button
                    onClick={() => setRefundReceipt(receipt)}
                    className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCcw className="w-4 h-4" />
                    Request Refund
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredReceipts.length === 0 && (
          <div className="text-center py-16">
            <Receipt className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No receipts found</h3>
            <p className="text-gray-400">You haven't made any purchases yet.</p>
          </div>
        )}

        {/* Receipt Detail Modal */}
        {selectedReceipt && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#0a0a0a] border-2 border-[#2f6bff] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Receipt Details</h2>
                  <button
                    onClick={() => setSelectedReceipt(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Order Number</span>
                    <span className="font-bold">{selectedReceipt.orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date</span>
                    <span className="font-bold">{selectedReceipt.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Payment Method</span>
                    <span className="font-bold">{selectedReceipt.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(selectedReceipt.status)}`}>
                      {selectedReceipt.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="border-t border-[#1a1a1a] pt-4 mb-4">
                  <h3 className="font-bold mb-3">Items</h3>
                  {selectedReceipt.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between py-2">
                      <div>
                        <span className="text-white">{item.name}</span>
                        <span className="text-gray-400 ml-2">x{item.quantity}</span>
                      </div>
                      <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#1a1a1a] pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-[#fb923c]">${selectedReceipt.total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(selectedReceipt)}
                  className="w-full mt-6 px-4 py-3 bg-[#2f6bff] hover:bg-[#2557d6] rounded-lg font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Receipt
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Refund Modal */}
        {refundReceipt && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#0a0a0a] border-2 border-[#2f6bff] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Refund Request</h2>
                  <button
                    onClick={() => setRefundReceipt(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Order Number</span>
                    <span className="font-bold">{refundReceipt.orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date</span>
                    <span className="font-bold">{refundReceipt.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Payment Method</span>
                    <span className="font-bold">{refundReceipt.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(refundReceipt.status)}`}>
                      {refundReceipt.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="border-t border-[#1a1a1a] pt-4 mb-4">
                  <h3 className="font-bold mb-3">Items</h3>
                  {refundReceipt.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between py-2">
                      <div>
                        <span className="text-white">{item.name}</span>
                        <span className="text-gray-400 ml-2">x{item.quantity}</span>
                      </div>
                      <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#1a1a1a] pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-[#fb923c]">${refundReceipt.total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleRefund(refundReceipt)}
                  className="w-full mt-6 px-4 py-3 bg-red-500 hover:bg-red-600 rounded-lg font-bold transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCcw className="w-5 h-5" />
                  Request Refund
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}