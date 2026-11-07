import React, { useState, useMemo } from 'react';
import {
  Search,
  Sparkles,
  Flame,
  Boxes,
  ShoppingCart,
  ArrowRightLeft,
  Plus,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Store,
  TrendingUp,
  Barcode,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Product, ProductCategory } from '../../types';
import { ProductArtwork } from '../ProductArtwork';

export const CatalogView: React.FC = () => {
  const {
    products,
    suppliers,
    selectedUnitFilter,
    registerSale,
    executeTransfer,
    createProduct,
    setActiveTab,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'margin' | 'stock' | 'price_asc' | 'price_desc'>('featured');
  const [feedbackToast, setFeedbackToast] = useState<{ text: string; type: 'success' | 'warn' } | null>(null);
  const [inspectedProduct, setInspectedProduct] = useState<Product | null>(null);
  const [newProductModalOpen, setNewProductModalOpen] = useState(false);

  const [newProdForm, setNewProdForm] = useState({
    name: '',
    brand: 'TWONINE SELECT',
    flavorOrSpec: 'Edição Especial Lounge',
    sku: `TAB-NEW-${Math.floor(100 + Math.random() * 899)}`,
    category: 'Tabacaria & Hookah' as ProductCategory,
    unit: 'un',
    costPrice: 10.0,
    sellingPrice: 20.0,
    minStock: 15,
    stockBuritis: 40,
    stockTradicional: 20,
    description: 'Produto demonstrativo adicionado ao catálogo TwoNine.',
  });

  const categories: Array<{ id: string; label: string; emoji: string }> = [
    { id: 'all', label: 'Todos do Catálogo', emoji: '✨' },
    { id: 'Tabacaria & Hookah', label: 'Tabacaria & Hookah', emoji: '💨' },
    { id: 'Carvões & Insumos', label: 'Carvões & Alumínio', emoji: '🥥' },
    { id: 'Gelo & Copos', label: 'Gelos & Copão 700ml', emoji: '🧊' },
    { id: 'Bebidas & Energéticos', label: 'Bebidas & Energéticos', emoji: '⚡' },
    { id: 'Acessórios & Headshop', label: 'Headshop & Narguilés', emoji: '🔥' },
    { id: 'Snacks & Bomboniere', label: 'Snacks & Bomboniere', emoji: '🍫' },
  ];

  const triggerToast = (text: string, type: 'success' | 'warn' = 'success') => {
    setFeedbackToast({ text, type });
    setTimeout(() => setFeedbackToast(null), 3800);
  };

  const filteredProducts = useMemo(() => {
    const list = products.filter((p) => {
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        (p.flavorOrSpec && p.flavorOrSpec.toLowerCase().includes(q));

      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return [...list].sort((a, b) => {
      if (sortBy === 'margin') {
        const mA = (a.sellingPrice - a.costPrice) / (a.costPrice || 1);
        const mB = (b.sellingPrice - b.costPrice) / (b.costPrice || 1);
        return mB - mA;
      }
      if (sortBy === 'stock') {
        const sA = (a.stock['unit-01'] || 0) + (a.stock['unit-02'] || 0);
        const sB = (b.stock['unit-01'] || 0) + (b.stock['unit-02'] || 0);
        return sB - sA;
      }
      if (sortBy === 'price_asc') return a.sellingPrice - b.sellingPrice;
      if (sortBy === 'price_desc') return b.sellingPrice - a.sellingPrice;
      return 0;
    });
  }, [products, searchTerm, selectedCategory, sortBy]);

  // Quick 1-click demonstrative sale from Catalog
  const handleQuickSale = (product: Product) => {
    const targetUnit =
      selectedUnitFilter === 'unit-02'
        ? 'unit-02'
        : (product.stock['unit-01'] || 0) > 0
        ? 'unit-01'
        : 'unit-02';

    const res = registerSale({
      unitId: targetUnit,
      items: [{ productId: product.id, quantity: 1, unitPrice: product.sellingPrice }],
      paymentMethod: 'Pix',
      operatorName: 'Venda Rápida Catálogo',
    });

    if (res.success) {
      triggerToast(
        `🛒 Venda expressa registrada: 1x ${product.name} (R$ ${product.sellingPrice.toFixed(2)}) na ${
          targetUnit === 'unit-01' ? 'Vila Buritis' : 'Setor Tradicional'
        }!`,
        'success'
      );
    } else {
      triggerToast(res.message, 'warn');
    }
  };

  // Quick 1-click smart transfer between stores
  const handleQuickTransfer = (product: Product) => {
    const q1 = product.stock['unit-01'] || 0;
    const q2 = product.stock['unit-02'] || 0;

    const fromUnitId = q1 >= q2 ? 'unit-01' : 'unit-02';
    const toUnitId = fromUnitId === 'unit-01' ? 'unit-02' : 'unit-01';
    const available = product.stock[fromUnitId] || 0;
    const qty = Math.min(5, available);

    if (qty <= 0) {
      triggerToast(`Sem saldo disponível para transferir ${product.name}.`, 'warn');
      return;
    }

    const res = executeTransfer({
      fromUnitId,
      toUnitId,
      productId: product.id,
      quantity: qty,
      status: 'concluida',
      requester: 'Catálogo Inteligente TwoNine',
      notes: 'Balanceamento rápido via Vitrine de Produtos',
    });

    if (res.success) {
      triggerToast(
        `⇄ Transferência instantânea: ${qty} ${product.unit} de "${product.name}" enviados para ${
          toUnitId === 'unit-01' ? 'Vila Buritis' : 'Setor Tradicional'
        }!`,
        'success'
      );
    } else {
      triggerToast(res.message, 'warn');
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdForm.name.trim()) return;

    createProduct({
      name: newProdForm.name,
      brand: newProdForm.brand,
      flavorOrSpec: newProdForm.flavorOrSpec,
      badge: '✨ Novo no Catálogo',
      sku: newProdForm.sku,
      barcode: `789${Math.floor(1000000000 + Math.random() * 8999999999)}`,
      category: newProdForm.category,
      unit: newProdForm.unit,
      costPrice: Number(newProdForm.costPrice),
      sellingPrice: Number(newProdForm.sellingPrice),
      minStock: Number(newProdForm.minStock),
      ageRestricted: true,
      description: newProdForm.description,
      stock: {
        'unit-01': Number(newProdForm.stockBuritis),
        'unit-02': Number(newProdForm.stockTradicional),
      },
    });

    setNewProductModalOpen(false);
    triggerToast(`✨ Produto "${newProdForm.name}" adicionado ao Catálogo Fictício!`, 'success');
  };

  // Catalog Stats
  const avgMargin = useMemo(() => {
    if (!products.length) return 0;
    const sum = products.reduce(
      (acc, p) => acc + ((p.sellingPrice - p.costPrice) / (p.costPrice || 1)) * 100,
      0
    );
    return Math.round(sum / products.length);
  }, [products]);

  const totalRetailValuation = useMemo(() => {
    return products.reduce((acc, p) => {
      const qty = (p.stock['unit-01'] || 0) + (p.stock['unit-02'] || 0);
      return acc + qty * p.sellingPrice;
    }, 0);
  }, [products]);

  return (
    <div className="space-y-6">
      {/* Floating Feedback Toast */}
      {feedbackToast && (
        <div
          className={`fixed bottom-6 right-6 z-50 max-w-md px-5 py-4 rounded-2xl border shadow-2xl backdrop-blur-xl flex items-center gap-3 animate-in fade-in duration-200 ${
            feedbackToast.type === 'success'
              ? 'bg-emerald-950/95 border-emerald-500/50 text-emerald-200 shadow-emerald-950/60'
              : 'bg-amber-950/95 border-amber-500/50 text-amber-200'
          }`}
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold leading-snug">{feedbackToast.text}</span>
        </div>
      )}

      {/* LUXURY SHOWROOM HEADER */}
      <div className="p-6 rounded-3xl glass-panel-ultra relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-[11px] font-mono font-bold">
              <Flame className="w-3.5 h-3.5 text-rose-500" />
              <span>SHOWROOM & CATÁLOGO FICTÍCIO INTERATIVO • 18+</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Catálogo Oficial de Produtos — TwoNine Tabacaria & Conveniência
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
              Vitrine demonstrativa com embalagens ilustradas em 3D, precificação de custo/venda, cálculo de margem bruta e saldo físico sincronizado entre <strong className="text-white">Vila Buritis (24h)</strong> e <strong className="text-white">Setor Tradicional</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setActiveTab('inventory')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold transition"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-rose-400" />
              <span>Ver em Planilha Técnica</span>
            </button>
            <button
              onClick={() => setNewProductModalOpen(true)}
              className="btn-neon-luxe flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs font-black"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar ao Catálogo</span>
            </button>
          </div>
        </div>

        {/* 4 Quick Showroom KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10">
          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/[0.06]">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">Mix Cadastrado</span>
            <strong className="text-xl font-black text-white">{products.length} Produtos Premium</strong>
            <span className="text-[11px] text-rose-400 block mt-0.5">6 categorias de tabacaria & lounge</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/[0.06]">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">Markup / Lucro Médio</span>
            <strong className="text-xl font-black text-emerald-400">+{avgMargin}% Margem</strong>
            <span className="text-[11px] text-slate-400 block mt-0.5">Rentabilidade bruta sobre custo</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/[0.06]">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">Valor de Venda em Vitrine</span>
            <strong className="text-xl font-black text-pink-400">
              R$ {totalRetailValuation.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </strong>
            <span className="text-[11px] text-slate-400 block mt-0.5">Potencial de receita do estoque atual</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/[0.06]">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">Ações em Tempo Real</span>
            <strong className="text-xl font-black text-amber-400">1-Click PDV & Rota</strong>
            <span className="text-[11px] text-slate-400 block mt-0.5">Simule vendas e transferências abaixo</span>
          </div>
        </div>
      </div>

      {/* CATEGORY PILLS & SEARCH BAR */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-lg">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => {
            const active = selectedCategory === cat.id;
            const count =
              cat.id === 'all'
                ? products.length
                : products.filter((p) => p.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  active
                    ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-950/50 scale-[1.02]'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800 hover:border-rose-500/30'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    active ? 'bg-black/30 text-white' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar marca (Nay, Zomo, Ignite, Art Coco, Baly, Red Bull)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs text-slate-400 font-medium">Ordenar vitrine:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-slate-950 border border-slate-800 text-xs text-white font-semibold rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-rose-500 cursor-pointer"
            >
              <option value="featured">🔥 Destaques da Tabacaria</option>
              <option value="margin">💰 Maior Margem de Lucro</option>
              <option value="stock">📦 Maior Volume em Estoque</option>
              <option value="price_asc">💲 Menor Preço de Venda</option>
              <option value="price_desc">💎 Maior Preço de Venda</option>
            </select>
          </div>
        </div>
      </div>

      {/* MAIN 3D VISUAL PRODUCT CATALOG GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredProducts.map((product) => {
          const qBuritis = product.stock['unit-01'] || 0;
          const qTradicional = product.stock['unit-02'] || 0;
          const qTotal = qBuritis + qTradicional;
          const profitPerUnit = product.sellingPrice - product.costPrice;

          return (
            <div
              key={product.id}
              className="group glass-card-cockpit rounded-3xl p-4 flex flex-col justify-between space-y-4 relative overflow-hidden"
            >
              {/* Top: 3D Product Studio Render + Title */}
              <div className="space-y-3">
                <div
                  onClick={() => setInspectedProduct(product)}
                  className="cursor-pointer"
                >
                  <ProductArtwork product={product} height="h-48" />
                </div>

                <div className="space-y-1 px-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-rose-400">
                      {product.brand || product.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {product.category.split(' ')[0]}
                    </span>
                  </div>

                  <h3
                    onClick={() => setInspectedProduct(product)}
                    className="text-sm font-black text-white group-hover:text-rose-300 transition cursor-pointer line-clamp-1"
                    title={product.name}
                  >
                    {product.name}
                  </h3>

                  <p className="text-[11px] text-slate-400 line-clamp-1">
                    {product.flavorOrSpec || product.description}
                  </p>
                </div>
              </div>

              {/* Middle: Price & Dual Store Stock Comparison */}
              <div className="space-y-3 pt-2 border-t border-white/[0.06]">
                {/* Price Row */}
                <div className="flex items-baseline justify-between px-1">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Preço Balcão</span>
                    <span className="text-2xl font-black text-white tracking-tight">
                      R$ {product.sellingPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-[10px] text-slate-400 block">
                      Custo: R$ {product.costPrice.toFixed(2)}
                    </span>
                    <span className="text-xs font-bold text-emerald-400">
                      +R$ {profitPerUnit.toFixed(2)} / {product.unit}
                    </span>
                  </div>
                </div>

                {/* Dual Store Live Balances */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div
                    className={`p-2 rounded-xl border text-center ${
                      qBuritis <= product.minStock
                        ? 'bg-amber-950/30 border-amber-500/30 text-amber-300'
                        : 'bg-slate-950/90 border-slate-800 text-slate-200'
                    }`}
                  >
                    <span className="text-[9px] uppercase text-slate-400 block">📍 Buritis 24h</span>
                    <strong className="text-xs font-black">
                      {qBuritis} {product.unit}
                    </strong>
                  </div>

                  <div
                    className={`p-2 rounded-xl border text-center ${
                      qTradicional === 0
                        ? 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                        : qTradicional <= product.minStock
                        ? 'bg-amber-950/30 border-amber-500/30 text-amber-300'
                        : 'bg-slate-950/90 border-slate-800 text-slate-200'
                    }`}
                  >
                    <span className="text-[9px] uppercase text-slate-400 block">📍 Tradicional</span>
                    <strong className="text-xs font-black">
                      {qTradicional} {product.unit}
                    </strong>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-5 gap-1.5 pt-1">
                  <button
                    onClick={() => handleQuickSale(product)}
                    disabled={qTotal === 0}
                    className="col-span-2 py-2 px-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-[11px] flex items-center justify-center gap-1 shadow-md transition disabled:opacity-40"
                    title="Simular venda imediata de 1 unidade no PDV"
                  >
                    <ShoppingCart className="w-3 h-3" />
                    <span>Vender</span>
                  </button>

                  <button
                    onClick={() => handleQuickTransfer(product)}
                    disabled={qTotal === 0}
                    className="col-span-2 py-2 px-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-rose-300 hover:text-white border border-rose-500/30 font-bold text-[11px] flex items-center justify-center gap-1 transition disabled:opacity-40"
                    title="Transferir 5 unidades entre as lojas"
                  >
                    <ArrowRightLeft className="w-3 h-3" />
                    <span>Transferir</span>
                  </button>

                  <button
                    onClick={() => setInspectedProduct(product)}
                    className="col-span-1 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 flex items-center justify-center transition"
                    title="Ver Ficha Técnica Completa"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* PRODUCT FICHA TÉCNICA MODAL */}
      {inspectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-2xl glass-panel-ultra rounded-3xl overflow-hidden p-6 sm:p-8 space-y-6 border border-rose-500/40">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 font-mono text-xs font-bold border border-rose-500/30">
                  {inspectedProduct.sku}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  EAN: {inspectedProduct.barcode}
                </span>
              </div>
              <button
                onClick={() => setInspectedProduct(null)}
                className="p-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <ProductArtwork product={inspectedProduct} height="h-64" />

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-mono uppercase text-rose-400 font-bold">
                    {inspectedProduct.brand || inspectedProduct.category}
                  </span>
                  <h3 className="text-xl font-black text-white mt-0.5">{inspectedProduct.name}</h3>
                  <p className="text-xs text-pink-300 font-medium mt-1">
                    {inspectedProduct.flavorOrSpec}
                  </p>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {inspectedProduct.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Preço de Venda</span>
                    <strong className="text-lg font-black text-white">
                      R$ {inspectedProduct.sellingPrice.toFixed(2)}
                    </strong>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Custo de Aquisição</span>
                    <strong className="text-lg font-black text-emerald-400">
                      R$ {inspectedProduct.costPrice.toFixed(2)}
                    </strong>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">📍 Loja 01 — Vila Buritis (24h):</span>
                    <strong className="text-white font-mono">
                      {inspectedProduct.stock['unit-01'] || 0} {inspectedProduct.unit}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">📍 Loja 02 — Setor Tradicional:</span>
                    <strong className="text-white font-mono">
                      {inspectedProduct.stock['unit-02'] || 0} {inspectedProduct.unit}
                    </strong>
                  </div>
                  <div className="flex justify-between pt-1.5 border-t border-slate-800">
                    <span className="text-slate-400">Fornecedor Homologado:</span>
                    <strong className="text-rose-300">
                      {suppliers.find((s) => s.id === inspectedProduct.supplierId)?.name ||
                        'Atacado Homologado DF'}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  handleQuickSale(inspectedProduct);
                  setInspectedProduct(null);
                }}
                className="btn-neon-luxe px-5 py-2.5 rounded-xl text-white text-xs font-black flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Registrar Venda Demonstrativa</span>
              </button>
              <button
                onClick={() => {
                  handleQuickTransfer(inspectedProduct);
                  setInspectedProduct(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-rose-300 border border-rose-500/40 text-xs font-bold flex items-center gap-2"
              >
                <ArrowRightLeft className="w-4 h-4" />
                <span>Transferir 5 un entre Lojas</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD NEW FICTITIOUS PRODUCT MODAL */}
      {newProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <form
            onSubmit={handleCreateProduct}
            className="w-full max-w-lg glass-panel-ultra rounded-3xl p-6 space-y-4 border border-rose-500/40"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-500" />
                <span>Novo Item no Catálogo Fictício</span>
              </h3>
              <button
                type="button"
                onClick={() => setNewProductModalOpen(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                ✕ Fechar
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Marca</label>
                  <input
                    type="text"
                    required
                    value={newProdForm.brand}
                    onChange={(e) => setNewProdForm({ ...newProdForm, brand: e.target.value })}
                    placeholder="Ex: ZOMO, NAY, IGNITE"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Categoria</label>
                  <select
                    value={newProdForm.category}
                    onChange={(e) =>
                      setNewProdForm({ ...newProdForm, category: e.target.value as ProductCategory })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  >
                    <option value="Tabacaria & Hookah">Tabacaria & Hookah</option>
                    <option value="Carvões & Insumos">Carvões & Insumos</option>
                    <option value="Gelo & Copos">Gelo & Copos</option>
                    <option value="Bebidas & Energéticos">Bebidas & Energéticos</option>
                    <option value="Acessórios & Headshop">Acessórios & Headshop</option>
                    <option value="Snacks & Bomboniere">Snacks & Bomboniere</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Nome do Produto</label>
                <input
                  type="text"
                  required
                  value={newProdForm.name}
                  onChange={(e) => setNewProdForm({ ...newProdForm, name: e.target.value })}
                  placeholder="Ex: Essência Zomo Miami Nights 50g"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Sabor / Especificação</label>
                <input
                  type="text"
                  value={newProdForm.flavorOrSpec}
                  onChange={(e) => setNewProdForm({ ...newProdForm, flavorOrSpec: e.target.value })}
                  placeholder="Ex: Manga, Maracujá & Menta Ice • 50g"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Preço Custo (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProdForm.costPrice}
                    onChange={(e) =>
                      setNewProdForm({ ...newProdForm, costPrice: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Preço Venda (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProdForm.sellingPrice}
                    onChange={(e) =>
                      setNewProdForm({ ...newProdForm, sellingPrice: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Estoque Vila Buritis</label>
                  <input
                    type="number"
                    value={newProdForm.stockBuritis}
                    onChange={(e) =>
                      setNewProdForm({ ...newProdForm, stockBuritis: parseInt(e.target.value) || 0 })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Estoque Setor Tradicional</label>
                  <input
                    type="number"
                    value={newProdForm.stockTradicional}
                    onChange={(e) =>
                      setNewProdForm({
                        ...newProdForm,
                        stockTradicional: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setNewProductModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-neon-luxe px-5 py-2 rounded-xl text-white text-xs font-black"
              >
                Criar Produto no Catálogo
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
