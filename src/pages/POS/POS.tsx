import { useState } from 'react';
import { ShoppingCart, Package, TrendingUp, AlertCircle, Plus, Minus, Trash2, CheckCircle2, Sparkles } from 'lucide-react';
import AIBadge from '../../components/common/AIBadge';

interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  qty: number;
}

const products = [
  { id: 'P001', name: 'Whey Protein (1kg)', category: 'Supplements', price: 2499, stock: 25, lowStock: false },
  { id: 'P002', name: 'BCAA Powder (300g)', category: 'Supplements', price: 1499, stock: 8, lowStock: true },
  { id: 'P003', name: 'Pre-Workout (250g)', category: 'Supplements', price: 1899, stock: 15, lowStock: false },
  { id: 'P004', name: 'IronForge T-Shirt', category: 'Merchandise', price: 799, stock: 45, lowStock: false },
  { id: 'P005', name: 'Gym Tank Top', category: 'Merchandise', price: 699, stock: 3, lowStock: true },
  { id: 'P006', name: 'Shaker Bottle', category: 'Accessories', price: 399, stock: 60, lowStock: false },
  { id: 'P007', name: 'Resistance Band Set', category: 'Accessories', price: 899, stock: 20, lowStock: false },
  { id: 'P008', name: 'Coconut Water', category: 'Beverages', price: 60, stock: 100, lowStock: false },
  { id: 'P009', name: 'Energy Bar (Box/12)', category: 'Snacks', price: 499, stock: 30, lowStock: false },
  { id: 'P010', name: 'Lifting Straps', category: 'Accessories', price: 599, stock: 5, lowStock: true },
];

export default function POS() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [memberSearch, setMemberSearch] = useState('');

  const categories = ['All', 'Supplements', 'Merchandise', 'Accessories', 'Beverages', 'Snacks'];
  const filtered = selectedCategory === 'All' ? products : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: typeof products[0]) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? {...i, qty: i.qty + 1} : i);
      return [...prev, { id: product.id, name: product.name, category: product.category, price: product.price, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id !== id) return i;
      const newQty = i.qty + delta;
      return newQty <= 0 ? i : {...i, qty: newQty};
    }).filter(i => i.qty > 0));
  };

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutComplete(true);
    setTimeout(() => { setCheckoutComplete(false); setCart([]); }, 3000);
  };

  const todaySales = [
    { item: 'Whey Protein', qty: 3, total: 7497 },
    { item: 'Gym Tank Top', qty: 2, total: 1398 },
    { item: 'Coconut Water', qty: 15, total: 900 },
  ];
  const todayTotal = todaySales.reduce((s, t) => s + t.total, 0);

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-[#231815]">Point of Sale</h2>
          <p className="text-sm text-[#6E625D] mt-1">Retail inventory, quick checkout, and sales tracking</p>
        </div>
        <AIBadge text="Live Inventory" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Catalog */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
            {categories.map(c => (
              <button key={c} onClick={() => setSelectedCategory(c)}
                className={`px-4 py-1.5 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === c ? 'bg-[#E00026] text-white' : 'bg-[#F5F0EA] text-[#6E625D] hover:bg-[#F7E9D8]'
                }`}>{c}</button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {filtered.map(p => (
              <div key={p.id} onClick={() => addToCart(p)}
                className="p-3 bg-[#F5F0EA] rounded-xl cursor-pointer hover:bg-[#F7E9D8] hover:shadow-sm transition-all relative">
                {p.lowStock && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C62828] rounded-full" title="Low stock" />}
                <p className="text-[10px] text-[#6E625D] uppercase tracking-wider">{p.category}</p>
                <p className="text-xs font-bold text-[#231815] mt-0.5">{p.name}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-extrabold text-[#E00026]">₹{p.price}</span>
                  <Plus className="w-4 h-4 text-[#E00026]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart */}
        <div className="card p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="w-4 h-4 text-[#E00026]" />
            <h3 className="text-sm font-bold text-[#231815]">Cart ({itemCount})</h3>
          </div>
          {checkoutComplete ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center animate-fadeIn">
              <CheckCircle2 className="w-16 h-16 text-[#2E7D32] mb-3" />
              <p className="text-lg font-bold text-[#2E7D32]">Sale Complete!</p>
              <p className="text-sm text-[#6E625D] mt-1">Total: ₹{total.toLocaleString()}</p>
              <p className="text-[11px] text-[#6E625D] mt-2">Receipt sent to member</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-2">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-10 h-10 text-[#DDD3CB] mx-auto mb-2" />
                    <p className="text-xs text-[#6E625D]">Cart is empty</p>
                  </div>
                ) : cart.map(item => (
                  <div key={item.id} className="flex items-center gap-2 p-2 bg-[#F5F0EA] rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-[#231815] truncate">{item.name}</p>
                      <p className="text-[10px] text-[#6E625D]">₹{item.price} x {item.qty}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateQty(item.id, -1)} className="p-1 rounded hover:bg-[#DDD3CB]"><Minus className="w-3 h-3" /></button>
                      <span className="text-xs font-bold w-5 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="p-1 rounded hover:bg-[#DDD3CB]"><Plus className="w-3 h-3" /></button>
                      <button onClick={() => removeFromCart(item.id)} className="p-1 rounded hover:bg-[#DDD3CB] ml-1"><Trash2 className="w-3 h-3 text-[#C62828]" /></button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#DDD3CB] pt-3 mt-3">
                <div className="flex justify-between mb-3">
                  <span className="text-xs text-[#6E625D]">Total</span>
                  <span className="text-lg font-extrabold text-[#231815]">₹{total.toLocaleString()}</span>
                </div>
                <button onClick={handleCheckout} disabled={cart.length === 0}
                  className="btn-primary w-full text-sm disabled:opacity-50">Checkout</button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Today's Sales + Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-sm font-bold text-[#231815] mb-3">Today's Sales</h3>
          <div className="space-y-2">
            {todaySales.map((s, i) => (
              <div key={i} className="flex justify-between py-2 border-b border-[#DDD3CB] last:border-0">
                <span className="text-xs text-[#6E625D]">{s.item} x{s.qty}</span>
                <span className="text-xs font-semibold text-[#231815]">₹{s.total.toLocaleString()}</span>
              </div>
            ))}
            <div className="flex justify-between pt-2 border-t border-[#231815]/10">
              <span className="text-xs font-bold text-[#231815]">Today's Total</span>
              <span className="text-sm font-extrabold text-[#E00026]">₹{todayTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-[#C62828]" />
            <h3 className="text-sm font-bold text-[#231815]">Low Stock Alerts</h3>
          </div>
          <div className="space-y-2">
            {products.filter(p => p.lowStock).map(p => (
              <div key={p.id} className="flex justify-between p-2 bg-[#F5F0EA] rounded-lg">
                <span className="text-xs text-[#231815]">{p.name}</span>
                <span className="text-xs font-bold text-[#C62828]">{p.stock} left</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
