import React, { useState } from 'react';
import {
  ShoppingCart,
  Plus,
  Trash2,
  DollarSign,
  Store,
  CreditCard,
  QrCode,
  Banknote,
  CheckCircle2,
  AlertCircle,
  Receipt,
  User,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UnitId } from '../../types';

interface CartItem {
  productId: string;
  quantity: number;
}

export const SalesView: React.FC = () => {
  const { sales, products, units, registerSale, selectedUnitFilter } = useApp();

  // POS State
  const [selectedUnit, setSelectedUnit] = useState<UnitId>(
    selectedUnitFilter === 'unit-02' ? 'unit-02' : 'unit-01'
  );
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProductToAdd, setSelectedProductToAdd] = useState<string>(products[0]?.id || '');
  const [quantityToAdd, setQuantityToAdd] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<'Pix' | 'Cartão de Débito' | 'Cartão de Crédito' | 'Dinheiro'>('Pix');
  const [operatorName, setOperatorName] = useState<string>('Operador Caixa Balcão');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Filter sales
  const filteredSales = sales.filter((s) => {
    if (selectedUnitFilter === 'all') return true;
    return s.unitId === selectedUnitFilter;
  });

  // Calculate Cart Items with details
  const cartDetailed = cart.map((item) => {
    const prod = products.find((p) => p.id === item.productId);
    const unitPrice = prod?.sellingPrice || 0;
    const subtotal = unitPrice * item.quantity;
    const stockAvailable = prod?.stock[selectedUnit] || 0;
    return {
      ...item,
      product: prod,
      unitPrice,
      subtotal,
      stockAvailable,
    };
  });

  const cartTotal = cartDetailed.reduce((acc, curr) => acc + curr.subtotal, 0);

  // Add item to cart
  const handleAddToCart = () => {
    setMessage(null);
    if (!selectedProductToAdd) return;
    const prod = products.find((p) => p.id === selectedProductToAdd);
    if (!prod) return;

    const available = prod.stock[selectedUnit] || 0;
    const existingIndex = cart.findIndex((c) => c.productId === selectedProductToAdd);
    const currentInCart = existingIndex >= 0 ? cart[existingIndex].quantity : 0;
    const targetQty = currentInCart + quantityToAdd;

    if (targetQty > available) {
      setMessage({
        type: 'error',
        text: `Saldo insuficiente de "${prod.name}" na unidade selecionada! Disponível: ${available} un.`,
      });
      return;
    }

    if (existingIndex >= 0) {
      setCart((prev) =>
        prev.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: targetQty } : item
        )
      );
    } else {
      setCart((prev) => [...prev, { productId: selectedProductToAdd, quantity: quantityToAdd }]);
    }

    setQuantityToAdd(1);
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  // Complete Sale
  const handleFinishSale = () => {
    setMessage(null);
    if (cart.length === 0) {
      setMessage({ type: 'error', text: 'Adicione pelo menos um item à venda.' });
      return;
    }

    const res = registerSale({
      unitId: selectedUnit,
      items: cartDetailed.map((it) => ({
        productId: it.productId,
        quantity: it.quantity,
        unitPrice: it.unitPrice,
      })),
      paymentMethod,
      operatorName,
    });

    if (res.success) {
      setMessage({ type: 'success', text: res.message });
      setCart([]);
    } else {
      setMessage({ type: 'error', text: res.message });
    }
  };

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-white">Registro de Vendas (PDV Demonstrativo)</h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Baixa em Estoque Integrada
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulação de atendimento de balcão e saídas de caixa com atualização física imediata.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          <span>Total Vendas Demo:</span>
          <strong className="text-emerald-400">
            R$ {sales.reduce((a, b) => a + b.totalAmount, 0).toFixed(2)}
          </strong>
        </div>
      </div>

      {/* POS Interaction Layout: Terminal Left + History Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Terminal PDV (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-rose-500" />
              Terminal de Venda Rápida
            </h3>
            <span className="text-[11px] font-mono text-slate-400">Caixa Ativo</span>
          </div>

          {message && (
            <div
              className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                message.type === 'success'
                  ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/40 border border-rose-500/40 text-rose-300'
              }`}
            >
              {message.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              )}
              <span>{message.text}</span>
            </div>
          )}

          {/* Unit Selector */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Unidade de Atendimento:
            </label>
            <select
              value={selectedUnit}
              onChange={(e) => {
                setSelectedUnit(e.target.value as UnitId);
                setCart([]); // Clear cart to avoid cross-unit stock issues
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-rose-500 cursor-pointer"
            >
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.operatingHours})
                </option>
              ))}
            </select>
          </div>

          {/* Product and Quantity picker */}
          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            <label className="block text-[11px] font-semibold text-slate-400">
              Adicionar Produto ao Cupom:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <select
                  value={selectedProductToAdd}
                  onChange={(e) => setSelectedProductToAdd(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-rose-500"
                >
                  {products.map((p) => {
                    const stock = p.stock[selectedUnit] || 0;
                    return (
                      <option key={p.id} value={p.id}>
                        {p.name} (R$ {p.sellingPrice.toFixed(2)} | Saldo: {stock})
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="1"
                  value={quantityToAdd}
                  onChange={(e) => setQuantityToAdd(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-white font-mono text-center focus:outline-none focus:border-rose-500"
                />
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="p-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition flex-1 flex items-center justify-center"
                  title="Adicionar"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span>Itens Selecionados ({cart.length})</span>
              {cart.length > 0 && (
                <button
                  onClick={() => setCart([])}
                  className="text-[10px] text-rose-400 hover:underline"
                >
                  Limpar lista
                </button>
              )}
            </div>

            <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
              {cartDetailed.length === 0 ? (
                <div className="p-4 rounded-xl bg-slate-950/40 border border-dashed border-slate-800 text-center text-slate-500 text-xs">
                  Nenhum item adicionado ao cupom.
                </div>
              ) : (
                cartDetailed.map((item) => (
                  <div
                    key={item.productId}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs"
                  >
                    <div className="truncate mr-2">
                      <div className="font-semibold text-white truncate">
                        {item.product?.name}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {item.quantity} x R$ {item.unitPrice.toFixed(2)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono font-bold text-white">
                        R$ {item.subtotal.toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleRemoveFromCart(item.productId)}
                        className="text-slate-500 hover:text-rose-400 p-1 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Payment Method & Total */}
          <div className="pt-3 border-t border-slate-800 space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Forma de Pagamento:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {(['Pix', 'Cartão de Débito', 'Cartão de Crédito', 'Dinheiro'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setPaymentMethod(m)}
                    className={`p-2 rounded-xl border text-center transition font-medium ${
                      paymentMethod === m
                        ? 'bg-rose-600/20 text-rose-300 border-rose-500/40 font-bold'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-slate-400">Total a Pagar</span>
              <span className="text-xl font-black font-mono text-emerald-400">
                R$ {cartTotal.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleFinishSale}
              disabled={cart.length === 0}
              className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs shadow-lg shadow-rose-950/50 transition flex items-center justify-center gap-2"
            >
              <Receipt className="w-4 h-4" />
              <span>Concluir Venda & Baixar Estoque</span>
            </button>
          </div>
        </div>

        {/* Sales History (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-white text-sm">Histórico de Vendas Demonstrativas</h3>
              <p className="text-[11px] text-slate-400">Últimos cupons processados no sistema</p>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {filteredSales.length} transações
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-3">Código / Horário</th>
                  <th className="p-3">Unidade</th>
                  <th className="p-3">Itens Vendidos</th>
                  <th className="p-3">Pagamento</th>
                  <th className="p-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredSales.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-slate-500">
                      Nenhuma venda registrada até o momento.
                    </td>
                  </tr>
                ) : (
                  filteredSales.map((sale) => {
                    const unit = units.find((u) => u.id === sale.unitId);
                    return (
                      <tr key={sale.id} className="hover:bg-slate-800/40 transition">
                        <td className="p-3">
                          <div className="font-mono font-bold text-white">{sale.code}</div>
                          <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                            {sale.date}
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="font-medium text-slate-200">{unit?.shortName}</span>
                          <div className="text-[10px] text-slate-500">{sale.operatorName}</div>
                        </td>
                        <td className="p-3 max-w-xs">
                          <div className="text-slate-300">
                            {sale.items.map((it) => `${it.quantity}x ${it.productName}`).join(', ')}
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="inline-block px-2 py-0.5 rounded-full bg-slate-950 text-slate-300 border border-slate-800 text-[10px] font-mono">
                            {sale.paymentMethod}
                          </span>
                        </td>
                        <td className="p-3 text-right font-mono font-bold text-emerald-400">
                          R$ {sale.totalAmount.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
