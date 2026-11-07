import React, { useState, useMemo } from 'react';
import {
  Boxes,
  Search,
  Filter,
  Plus,
  SlidersHorizontal,
  Edit2,
  Trash2,
  ArrowRightLeft,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Sparkles,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Product, ProductCategory, StockStatus, UnitId } from '../../types';

export const InventoryView: React.FC = () => {
  const {
    products,
    units,
    selectedUnitFilter,
    adjustStock,
    createProduct,
    updateProduct,
    deleteProduct,
    setActiveTab,
  } = useApp();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Modal states
  const [adjustModalProduct, setAdjustModalProduct] = useState<Product | null>(null);
  const [adjustTargetUnit, setAdjustTargetUnit] = useState<UnitId>('unit-01');
  const [adjustQuantity, setAdjustQuantity] = useState<number>(0);
  const [adjustReason, setAdjustReason] = useState<string>('Contagem física de inventário');

  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states for Product Modal
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    barcode: '',
    category: 'Bebidas Não Alcoólicas' as ProductCategory,
    unit: 'un',
    costPrice: 5.0,
    sellingPrice: 10.0,
    minStock: 15,
    stockBuritis: 20,
    stockTradicional: 15,
    description: '',
  });

  const categories: ProductCategory[] = [
    'Bebidas Não Alcoólicas',
    'Snacks & Salgadinhos',
    'Chocolates & Doces',
    'Mercearia & Bomboniere',
    'Higiene & Conveniência',
  ];

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search term
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.barcode.includes(searchTerm);

      // Category
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;

      // Status
      const relevantStock =
        selectedUnitFilter === 'unit-01'
          ? p.stock['unit-01'] || 0
          : selectedUnitFilter === 'unit-02'
          ? p.stock['unit-02'] || 0
          : (p.stock['unit-01'] || 0) + (p.stock['unit-02'] || 0);

      let status: StockStatus = 'normal';
      if (relevantStock === 0) status = 'out_of_stock';
      else if (relevantStock <= p.minStock) status = 'low';

      const matchesStatus = selectedStatus === 'all' || status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, searchTerm, selectedCategory, selectedStatus, selectedUnitFilter]);

  // Handle open adjust modal
  const openAdjustModal = (product: Product, defaultUnit: UnitId = 'unit-01') => {
    setAdjustModalProduct(product);
    setAdjustTargetUnit(defaultUnit);
    setAdjustQuantity(product.stock[defaultUnit] || 0);
    setAdjustReason('Conferência de balanço de rotina');
  };

  const handleSaveAdjustment = () => {
    if (!adjustModalProduct) return;
    const res = adjustStock(
      adjustModalProduct.id,
      adjustTargetUnit,
      Number(adjustQuantity),
      adjustReason
    );
    if (res.success) {
      alert(res.message);
      setAdjustModalProduct(null);
    } else {
      alert(res.message);
    }
  };

  // Handle open product modal (create or edit)
  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      barcode: `789${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      category: 'Bebidas Não Alcoólicas',
      unit: 'un',
      costPrice: 5.5,
      sellingPrice: 11.0,
      minStock: 12,
      stockBuritis: 15,
      stockTradicional: 10,
      description: '',
    });
    setProductModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      sku: product.sku,
      barcode: product.barcode,
      category: product.category,
      unit: product.unit,
      costPrice: product.costPrice,
      sellingPrice: product.sellingPrice,
      minStock: product.minStock,
      stockBuritis: product.stock['unit-01'] || 0,
      stockTradicional: product.stock['unit-02'] || 0,
      description: product.description || '',
    });
    setProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Informe o nome do produto.');
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formData.name,
        sku: formData.sku,
        barcode: formData.barcode,
        category: formData.category,
        unit: formData.unit,
        costPrice: Number(formData.costPrice),
        sellingPrice: Number(formData.sellingPrice),
        minStock: Number(formData.minStock),
        description: formData.description,
      });
      alert('Produto atualizado com sucesso.');
    } else {
      createProduct({
        name: formData.name,
        sku: formData.sku,
        barcode: formData.barcode,
        category: formData.category,
        unit: formData.unit,
        costPrice: Number(formData.costPrice),
        sellingPrice: Number(formData.sellingPrice),
        minStock: Number(formData.minStock),
        description: formData.description,
        stock: {
          'unit-01': Number(formData.stockBuritis),
          'unit-02': Number(formData.stockTradicional),
        },
      });
      alert('Novo produto cadastrado com sucesso.');
    }

    setProductModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-white">Controle Central de Estoque</h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {filteredProducts.length} itens listados
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Gestão integrada de saldos físicos por loja, valores de custo, preços de venda e alertas de ruptura.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('transfers')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-rose-400" />
            <span>Transferir Saldo</span>
          </button>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-semibold text-white shadow-md shadow-rose-950/40 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Produto</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nome, SKU ou código..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-rose-500 cursor-pointer"
          >
            <option value="all">Todas as Categorias</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-rose-500 cursor-pointer"
          >
            <option value="all">Todos os Status</option>
            <option value="normal">🟢 Normal</option>
            <option value="low">🟡 Estoque Baixo</option>
            <option value="out_of_stock">🔴 Sem Estoque</option>
          </select>

          {/* Scope Indicator */}
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-950 text-slate-400 border border-slate-800">
            Escopo: {selectedUnitFilter === 'all' ? 'Consolidado' : selectedUnitFilter === 'unit-01' ? 'Buritis' : 'Tradicional'}
          </span>
        </div>
      </div>

      {/* Main Inventory Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-3.5">Produto & SKU</th>
                <th className="p-3.5">Categoria</th>
                <th className="p-3.5 text-center">Buritis (Loja 01)</th>
                <th className="p-3.5 text-center">Tradicional (Loja 02)</th>
                <th className="p-3.5 text-center">Estoque Total</th>
                <th className="p-3.5 text-right">Custo / Venda</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500 text-xs">
                    Nenhum produto localizado para os filtros informados.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const qBuritis = p.stock['unit-01'] || 0;
                  const qTradicional = p.stock['unit-02'] || 0;
                  const qTotal = qBuritis + qTradicional;

                  // Evaluate status based on active filter or total
                  const relevantQty =
                    selectedUnitFilter === 'unit-01'
                      ? qBuritis
                      : selectedUnitFilter === 'unit-02'
                      ? qTradicional
                      : qTotal;

                  let statusText = 'Normal';
                  let statusBadge = 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
                  let StatusIcon = CheckCircle2;

                  if (relevantQty === 0) {
                    statusText = 'Sem Estoque';
                    statusBadge = 'bg-rose-500/15 text-rose-400 border-rose-500/30';
                    StatusIcon = XCircle;
                  } else if (relevantQty <= p.minStock) {
                    statusText = 'Estoque Baixo';
                    statusBadge = 'bg-amber-500/15 text-amber-400 border-amber-500/30';
                    StatusIcon = AlertTriangle;
                  }

                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-slate-800/40 transition group"
                    >
                      {/* Name & SKU */}
                      <td className="p-3.5">
                        <div className="font-bold text-white group-hover:text-rose-400 transition">
                          {p.name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono flex items-center gap-2 mt-0.5">
                          <span>{p.sku}</span>
                          <span>•</span>
                          <span>Cod: {p.barcode}</span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-3.5 text-slate-300">
                        <span className="inline-block px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800 text-[10px]">
                          {p.category}
                        </span>
                      </td>

                      {/* Buritis Stock */}
                      <td className="p-3.5 text-center">
                        <span
                          onClick={() => openAdjustModal(p, 'unit-01')}
                          className={`cursor-pointer font-mono font-bold px-2 py-1 rounded transition hover:bg-slate-800 ${
                            qBuritis === 0
                              ? 'text-rose-400'
                              : qBuritis <= p.minStock
                              ? 'text-amber-400'
                              : 'text-slate-200'
                          }`}
                          title="Clique para ajustar estoque de Buritis"
                        >
                          {qBuritis} {p.unit}
                        </span>
                      </td>

                      {/* Tradicional Stock */}
                      <td className="p-3.5 text-center">
                        <span
                          onClick={() => openAdjustModal(p, 'unit-02')}
                          className={`cursor-pointer font-mono font-bold px-2 py-1 rounded transition hover:bg-slate-800 ${
                            qTradicional === 0
                              ? 'text-rose-400'
                              : qTradicional <= p.minStock
                              ? 'text-amber-400'
                              : 'text-slate-200'
                          }`}
                          title="Clique para ajustar estoque de Tradicional"
                        >
                          {qTradicional} {p.unit}
                        </span>
                      </td>

                      {/* Total Stock */}
                      <td className="p-3.5 text-center font-mono font-bold text-white">
                        {qTotal} {p.unit}
                      </td>

                      {/* Cost / Selling */}
                      <td className="p-3.5 text-right font-mono">
                        <div className="text-emerald-400 font-bold">R$ {p.sellingPrice.toFixed(2)}</div>
                        <div className="text-[10px] text-slate-400">Custo: R$ {p.costPrice.toFixed(2)}</div>
                      </td>

                      {/* Status */}
                      <td className="p-3.5 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-semibold ${statusBadge}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          <span>{statusText}</span>
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openAdjustModal(p, 'unit-01')}
                            className="p-1.5 rounded-lg bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 transition"
                            title="Ajustar Estoque Físico"
                          >
                            <SlidersHorizontal className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => openEditModal(p)}
                            className="p-1.5 rounded-lg bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 transition"
                            title="Editar Dados do Produto"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Remover o produto "${p.name}" da base demonstrativa?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-slate-950 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition"
                            title="Excluir Produto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADJUST STOCK MODAL */}
      {adjustModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-rose-500" />
                Ajuste Rápido de Inventário
              </h3>
              <button
                onClick={() => setAdjustModalProduct(null)}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                ✕ Fechar
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-xs font-bold text-white">{adjustModalProduct.name}</div>
              <div className="text-[11px] text-slate-400 font-mono">
                {adjustModalProduct.sku} • Mínimo recomendado: {adjustModalProduct.minStock} un
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  Unidade para Ajuste:
                </label>
                <select
                  value={adjustTargetUnit}
                  onChange={(e) => {
                    const u = e.target.value as UnitId;
                    setAdjustTargetUnit(u);
                    setAdjustQuantity(adjustModalProduct.stock[u] || 0);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-500"
                >
                  <option value="unit-01">Unidade 01 — Vila Buritis (Saldo Atual: {adjustModalProduct.stock['unit-01'] || 0})</option>
                  <option value="unit-02">Unidade 02 — Setor Tradicional (Saldo Atual: {adjustModalProduct.stock['unit-02'] || 0})</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  Nova Quantidade Físico Contada:
                </label>
                <input
                  type="number"
                  min="0"
                  value={adjustQuantity}
                  onChange={(e) => setAdjustQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono text-sm focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  Motivo da Movimentação (Auditoria):
                </label>
                <input
                  type="text"
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  placeholder="Ex: Contagem de balanço, produto avariado, conferência"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setAdjustModalProduct(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveAdjustment}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-950/40"
              >
                Confirmar Ajuste
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT PRODUCT MODAL */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <form
            onSubmit={handleSaveProduct}
            className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">
                {editingProduct ? 'Editar Produto Demonstrativo' : 'Novo Produto para Catálogo'}
              </h3>
              <button
                type="button"
                onClick={() => setProductModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                ✕ Fechar
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Nome do Produto</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Água Mineral 500ml sem gás"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Código / SKU</label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Categoria</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as ProductCategory })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Custo (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={formData.costPrice}
                    onChange={(e) => setFormData({ ...formData, costPrice: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Venda (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={formData.sellingPrice}
                    onChange={(e) => setFormData({ ...formData, sellingPrice: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Estoque Mín.</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.minStock}
                    onChange={(e) => setFormData({ ...formData, minStock: parseInt(e.target.value) || 1 })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
              </div>

              {!editingProduct && (
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Saldo Vila Buritis</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.stockBuritis}
                      onChange={(e) => setFormData({ ...formData, stockBuritis: parseInt(e.target.value) || 0 })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Saldo Setor Tradicional</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.stockTradicional}
                      onChange={(e) => setFormData({ ...formData, stockTradicional: parseInt(e.target.value) || 0 })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setProductModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-950/40"
              >
                Salvar Produto
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
