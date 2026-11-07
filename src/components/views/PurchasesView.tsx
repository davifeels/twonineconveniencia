import React, { useState } from 'react';
import {
  Truck,
  Plus,
  Trash2,
  Boxes,
  Store,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UnitId } from '../../types';

export const PurchasesView: React.FC = () => {
  const { purchases, suppliers, products, units, createPurchase, selectedUnitFilter } = useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>(suppliers[0]?.id || '');
  const [targetUnitId, setTargetUnitId] = useState<UnitId>('unit-01');
  const [invoiceNumber, setInvoiceNumber] = useState<string>('NF-e 099.124');
  const [items, setItems] = useState<Array<{ productId: string; quantity: number; unitCost: number }>>([
    {
      productId: products[0]?.id || '',
      quantity: 24,
      unitCost: products[0]?.costPrice || 6.5,
    },
  ]);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const filteredPurchases = purchases.filter((p) => {
    if (selectedUnitFilter === 'all') return true;
    return p.targetUnitId === selectedUnitFilter;
  });

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        productId: products[0]?.id || '',
        quantity: 12,
        unitCost: products[0]?.costPrice || 5.0,
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleItemChange = (
    index: number,
    field: 'productId' | 'quantity' | 'unitCost',
    value: any
  ) => {
    setItems((prev) =>
      prev.map((item, idx) => {
        if (idx !== index) return item;
        if (field === 'productId') {
          const prod = products.find((p) => p.id === value);
          return {
            ...item,
            productId: value,
            unitCost: prod?.costPrice || item.unitCost,
          };
        }
        return { ...item, [field]: value };
      })
    );
  };

  const calculateTotal = () => {
    return items.reduce((acc, curr) => acc + curr.quantity * curr.unitCost, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (items.length === 0) {
      setMessage({ type: 'error', text: 'Adicione pelo menos um item à ordem de compra.' });
      return;
    }

    const res = createPurchase({
      supplierId: selectedSupplierId,
      targetUnitId,
      items,
      invoiceNumber,
    });

    if (res.success) {
      setMessage({ type: 'success', text: res.message });
      setTimeout(() => {
        setModalOpen(false);
        setMessage(null);
      }, 1500);
    } else {
      setMessage({ type: 'error', text: res.message });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-white">Registro de Compras & Entradas</h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Atualização Automática de Saldo
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Recepção de mercadorias com vinculação direta à unidade Vila Buritis ou Setor Tradicional.
          </p>
        </div>

        <button
          onClick={() => {
            setMessage(null);
            setModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-950/40 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Registrar Entrada de Compra</span>
        </button>
      </div>

      {/* Purchases History Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-3.5">Código / Nota Fiscal</th>
                <th className="p-3.5">Fornecedor</th>
                <th className="p-3.5">Unidade Destino</th>
                <th className="p-3.5">Itens Adquiridos</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-right">Custo Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredPurchases.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 text-xs">
                    Nenhuma ordem de compra registrada para o filtro selecionado.
                  </td>
                </tr>
              ) : (
                filteredPurchases.map((purchase) => {
                  const unit = units.find((u) => u.id === purchase.targetUnitId);
                  return (
                    <tr key={purchase.id} className="hover:bg-slate-800/40 transition group">
                      <td className="p-3.5">
                        <div className="font-mono font-bold text-white group-hover:text-rose-400 transition">
                          {purchase.code}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {purchase.invoiceNumber} • {purchase.date}
                        </div>
                      </td>
                      <td className="p-3.5 font-medium text-slate-200">
                        {purchase.supplierName}
                      </td>
                      <td className="p-3.5">
                        <span className="font-semibold text-white">{unit?.shortName}</span>
                      </td>
                      <td className="p-3.5 max-w-sm">
                        <div className="text-slate-300">
                          {purchase.items
                            .map((it) => `${it.quantity} un de ${it.productName}`)
                            .join(', ')}
                        </div>
                      </td>
                      <td className="p-3.5 text-center">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Recebido & Integrado</span>
                        </span>
                      </td>
                      <td className="p-3.5 text-right font-mono font-bold text-emerald-400">
                        R$ {purchase.totalCost.toFixed(2)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* NEW PURCHASE MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Truck className="w-4 h-4 text-rose-500" />
                Registrar Entrada de Compra (Fornecedor)
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                ✕ Fechar
              </button>
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
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                )}
                <span>{message.text}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Fornecedor</label>
                <select
                  value={selectedSupplierId}
                  onChange={(e) => setSelectedSupplierId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                >
                  {suppliers.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Unidade de Destino</label>
                <select
                  value={targetUnitId}
                  onChange={(e) => setTargetUnitId(e.target.value as UnitId)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                >
                  {units.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Nota Fiscal (NF-e)</label>
                <input
                  type="text"
                  required
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                />
              </div>
            </div>

            {/* Items Dynamic List */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 uppercase">
                  Produtos da Nota Fiscal
                </span>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Adicionar Produto
                </button>
              </div>

              <div className="max-h-52 overflow-y-auto space-y-2 pr-1">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center text-xs"
                  >
                    <div className="sm:col-span-6">
                      <select
                        value={item.productId}
                        onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                      >
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-3">
                      <input
                        type="number"
                        min="1"
                        placeholder="Qtd"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono text-center"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Custo R$"
                        value={item.unitCost}
                        onChange={(e) =>
                          handleItemChange(index, 'unitCost', parseFloat(e.target.value) || 0)
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono text-right"
                      />
                    </div>

                    <div className="sm:col-span-1 text-right">
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(index)}
                          className="text-slate-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total and confirm */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-mono block">
                  Custo Total da Compra
                </span>
                <span className="text-lg font-black font-mono text-emerald-400">
                  R$ {calculateTotal().toFixed(2)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-950/40"
                >
                  Confirmar Entrada em Estoque
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
