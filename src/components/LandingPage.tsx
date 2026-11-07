import React, { useState } from 'react';
import {
  ArrowRight,
  Store,
  Boxes,
  ArrowRightLeft,
  ShieldCheck,
  CheckCircle2,
  BarChart3,
  Sparkles,
  Truck,
  ShoppingCart,
  Users,
  AlertTriangle,
  History,
  ChevronRight,
  Flame,
  MapPin,
  Clock,
  Zap,
  Star,
  Activity,
  Package,
  Search,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './BrandLogo';
import { ProductArtwork } from './ProductArtwork';
import { Product } from '../types';

export const LandingPage: React.FC = () => {
  const {
    setCurrentView,
    setActiveTab,
    setBrandModalOpen,
    metrics,
    units,
    products,
    registerSale,
    executeTransfer,
  } = useApp();
  const [activePreviewTab, setActivePreviewTab] = useState<'kpis' | 'catalog' | 'transfers' | 'stores'>('kpis');

  // Landing Page Full Catalog Filter state
  const [catalogCategory, setCatalogCategory] = useState<string>('all');
  const [catalogSearch, setCatalogSearch] = useState<string>('');
  const [catalogToast, setCatalogToast] = useState<string | null>(null);

  const showCatalogToast = (msg: string) => {
    setCatalogToast(msg);
    setTimeout(() => setCatalogToast(null), 3500);
  };

  const handleLandingQuickSale = (product: Product) => {
    const unitId = (product.stock['unit-01'] || 0) > 0 ? 'unit-01' : 'unit-02';
    const res = registerSale({
      unitId,
      items: [{ productId: product.id, quantity: 1, unitPrice: product.sellingPrice }],
      paymentMethod: 'Pix',
      operatorName: 'Vitrine Interativa TwoNine',
    });
    if (res.success) {
      showCatalogToast(
        `🛒 Venda demonstrativa: 1x ${product.name} (R$ ${product.sellingPrice.toFixed(2)}) baixada do estoque da ${
          unitId === 'unit-01' ? 'Vila Buritis' : 'Setor Tradicional'
        }!`
      );
    } else {
      showCatalogToast(res.message);
    }
  };

  const handleLandingQuickTransfer = (product: Product) => {
    const q1 = product.stock['unit-01'] || 0;
    const q2 = product.stock['unit-02'] || 0;
    const fromUnitId = q1 >= q2 ? 'unit-01' : 'unit-02';
    const toUnitId = fromUnitId === 'unit-01' ? 'unit-02' : 'unit-01';
    const qty = Math.min(5, product.stock[fromUnitId] || 0);
    if (qty <= 0) return;

    const res = executeTransfer({
      fromUnitId,
      toUnitId,
      productId: product.id,
      quantity: qty,
      status: 'concluida',
      requester: 'Catálogo Interativo TwoNine',
      notes: 'Transferência rápida acionada pelo catálogo',
    });
    if (res.success) {
      showCatalogToast(
        `⇄ Transferência concluída: ${qty} ${product.unit} de ${product.name} enviados para ${
          toUnitId === 'unit-01' ? 'Vila Buritis' : 'Setor Tradicional'
        }!`
      );
    }
  };

  const filteredCatalogProducts = products.filter((p) => {
    const matchesCat = catalogCategory === 'all' || p.category === catalogCategory;
    const q = catalogSearch.toLowerCase();
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      (p.brand && p.brand.toLowerCase().includes(q)) ||
      (p.flavorOrSpec && p.flavorOrSpec.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  // Interactive Live Hero Mini-Transfer Simulator state
  const [simulatedBuritisStock, setSimulatedBuritisStock] = useState(48);
  const [simulatedTradicionalStock, setSimulatedTradicionalStock] = useState(16);
  const [transferFeedback, setTransferFeedback] = useState<string | null>(null);

  const handleSimulateTransfer = (amount: number) => {
    if (simulatedBuritisStock < amount) return;
    setSimulatedBuritisStock((prev) => prev - amount);
    setSimulatedTradicionalStock((prev) => prev + amount);
    setTransferFeedback(`✓ Sucesso: +${amount} caixas de Carvão Art Coco transferidas de Vila Buritis para Setor Tradicional!`);
    setTimeout(() => setTransferFeedback(null), 3500);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#04060B] text-slate-100 flex flex-col relative overflow-x-hidden bg-grid-cyber">
      {/* GLOWING AMBIENT LIGHT HALOS IN CRIMSON & NEON PINK */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[650px] bg-radial-luxe pointer-events-none animate-pulse-glow" />
      <div className="absolute top-[450px] -left-60 w-[700px] h-[700px] bg-gradient-to-tr from-rose-700/20 via-pink-600/10 to-transparent rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-[1100px] -right-60 w-[750px] h-[750px] bg-gradient-to-bl from-pink-600/20 via-rose-700/15 to-transparent rounded-full blur-[180px] pointer-events-none" />

      {/* TOP ANNOUNCEMENT TICKER - LUXURY STATUS BAR */}
      <div className="w-full bg-[#060813]/90 border-b border-rose-500/20 backdrop-blur-xl py-2.5 px-4 z-20">
        <div className="w-[94%] max-w-[1840px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-black text-[10px] border border-rose-500/40 shadow-sm">
              <span>🔞</span>
              <span>18+ EXCLUSIVO TABACARIA</span>
            </span>
            <span className="text-slate-300 font-semibold hidden sm:inline">
              TwoNine Tabacaria & Hookah Lounge • Desde 2017 em Planaltina-DF
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <strong className="text-white">Vila Buritis:</strong> 24h na rua da Escola Paraná
            </span>
            <span className="text-slate-700 hidden md:inline">|</span>
            <span className="flex items-center gap-1.5 text-slate-300 hidden md:flex">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <strong className="text-white">Setor Tradicional:</strong> 06h às 02h
            </span>
            <span className="text-slate-700 hidden lg:inline">|</span>
            <a
              href="https://www.instagram.com/twonineconveniencia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-pink-300 font-bold transition flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-pink-950/40 border border-pink-500/30"
            >
              <span>@twonineconveniencia</span>
              <span className="text-slate-400 text-[10px]">(339 seguidores)</span>
            </a>
          </div>
        </div>
      </div>

      {/* HERO SECTION - 100X ENTERPRISE LUXURY */}
      <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 border-b border-rose-950/40">
        <div className="w-[94%] max-w-[1840px] mx-auto relative z-10 space-y-12">
          
          {/* Main Hero Header */}
          <div className="text-center max-w-5xl mx-auto space-y-7">
            
            {/* Integrated Sleek Brand Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-slate-900/90 border border-rose-500/40 text-xs text-rose-200 shadow-[0_0_35px_rgba(244,63,94,0.3)] backdrop-blur-xl hover:border-rose-500/70 transition-all cursor-default group">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
              </span>
              <span className="font-extrabold tracking-widest uppercase text-[11px] bg-gradient-to-r from-rose-400 via-pink-300 to-amber-300 bg-clip-text text-transparent">
                SISTEMA OFICIAL MULTIUNIDADE • DESDE 2017
              </span>
              <span className="text-rose-500/50 hidden sm:inline">•</span>
              <span className="text-slate-300 font-semibold hidden md:inline">
                Vila Buritis (24h) & Setor Tradicional
              </span>
              <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-mono font-black border border-rose-500/35">
                🔞 18+ TABACARIA
              </span>
            </div>

            {/* REQUIRED TITLE - RAZOR SHARP TYPOGRAPHY */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white leading-[1.04]">
              Suas duas unidades.{' '}
              <span className="block sm:inline bg-gradient-to-r from-rose-500 via-pink-400 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(244,63,94,0.4)]">
                Uma gestão muito mais inteligente.
              </span>
            </h1>

            {/* REQUIRED SUBTITLE */}
            <p className="text-base sm:text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto font-normal leading-relaxed">
              Centralize o controle de estoque, acompanhe as operações e tenha uma visão completa das suas unidades em um único sistema.
            </p>

            {/* SPECIALIZED TABACARIA CONTEXT PILLS */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-slate-300 max-w-4xl mx-auto">
              <span className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-rose-500/25 flex items-center gap-1.5 shadow-sm">
                <Flame className="w-3.5 h-3.5 text-rose-500" />
                <span>Essências Nay, Zomo, Ziggy & On-Air</span>
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-pink-500/25 flex items-center gap-1.5 shadow-sm">
                <Boxes className="w-3.5 h-3.5 text-pink-400" />
                <span>Carvões de Coco Hexagonais (Art Coco 1kg)</span>
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-amber-500/25 flex items-center gap-1.5 shadow-sm">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Copão 700ml & Gelo Saborizado Maracujá</span>
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-emerald-500/25 flex items-center gap-1.5 shadow-sm">
                <Store className="w-3.5 h-3.5 text-emerald-400" />
                <span>Operação Noturna & Balcão 24h</span>
              </span>
            </div>

            {/* LUXURY ACTION BUTTONS */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              <button
                onClick={() => setCurrentView('dashboard')}
                className="btn-neon-luxe group flex items-center gap-3 px-9 py-4 rounded-2xl text-white font-black text-sm sm:text-base tracking-wide"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></div>
                <span>Explorar demonstração</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                onClick={() => scrollToSection('vitrine-tabacaria')}
                className="flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-950/80 via-rose-950/70 to-slate-900 hover:from-rose-900 hover:to-pink-900 text-white border border-pink-500/50 hover:border-pink-400 font-black text-sm sm:text-base transition shadow-[0_0_30px_rgba(236,72,153,0.3)] backdrop-blur-md"
              >
                <Package className="w-4 h-4 text-pink-400" />
                <span>Ver Catálogo Fictício 3D ({products.length} Itens)</span>
              </button>

              <button
                onClick={() => scrollToSection('gestao-centralizada')}
                className="flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-rose-500/30 hover:border-rose-500/60 font-bold text-xs sm:text-sm transition shadow-lg backdrop-blur-md hover:text-white"
              >
                <Flame className="w-4 h-4 text-rose-500" />
                <span>Conhecer a plataforma</span>
              </button>
            </div>

            {/* Live Units Quick Ticker Bar under buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300">Vila Buritis (24h) & Setor Tradicional sincronizados</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300">Transferência de essências & carvões com saldo real</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300">Auditoria completa de compras, vendas e reposição</span>
              </span>
            </div>
          </div>

          {/* THE 100X ENTERPRISE COMMAND DECK (LUXURY INTERACTIVE MOCKUP) */}
          <div className="w-full rounded-3xl glass-panel-ultra overflow-hidden transition-all shadow-[0_0_80px_rgba(244,63,94,0.25)] border border-rose-500/30">
            
            {/* Terminal Top Window Bar */}
            <div className="px-6 py-4 border-b border-rose-500/25 bg-[#060914] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500/80"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/80"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/80"></div>
                </div>

                <div className="h-5 w-[1px] bg-slate-800"></div>

                {/* Simulated URL bar */}
                <div className="flex items-center gap-2 px-3.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
                  <span className="text-emerald-400">🔒</span>
                  <span className="text-slate-400 font-bold">twonine.manager.cloud</span>
                  <span className="text-slate-600">/</span>
                  <span className="text-rose-400 font-bold">cockpit-multiunidade</span>
                  <span className="flex items-center gap-1.5 ml-2 px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    SYNC 12ms (DF)
                  </span>
                </div>
              </div>

              {/* Interactive Tabs inside Mockup */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActivePreviewTab('kpis')}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center gap-2 ${
                    activePreviewTab === 'kpis'
                      ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-950/60'
                      : 'text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Cockpit Consolidado</span>
                </button>
                <button
                  onClick={() => setActivePreviewTab('catalog')}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center gap-2 ${
                    activePreviewTab === 'catalog'
                      ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-950/60'
                      : 'text-pink-300 hover:text-white bg-rose-950/40 border border-rose-500/30 hover:bg-rose-900/50'
                  }`}
                >
                  <Package className="w-3.5 h-3.5 text-pink-400" />
                  <span>Catálogo Fictício 3D ({products.length} SKUs)</span>
                </button>
                <button
                  onClick={() => setActivePreviewTab('transfers')}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center gap-2 ${
                    activePreviewTab === 'transfers'
                      ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-950/60'
                      : 'text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800'
                  }`}
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  <span>Simulador de Transferência</span>
                </button>
                <button
                  onClick={() => setActivePreviewTab('stores')}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center gap-2 ${
                    activePreviewTab === 'stores'
                      ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-950/60'
                      : 'text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800'
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Lojas em Planaltina-DF</span>
                </button>
              </div>
            </div>

            {/* Window Content */}
            <div className="p-6 lg:p-8 bg-[#05070F]/95">
              
              {/* TAB 1: CONSOLIDATED HIGH-DENSITY COCKPIT */}
              {activePreviewTab === 'kpis' && (
                <div className="space-y-6">
                  {/* 4 Top KPI Cards - Redesigned with Extreme Polish & Progress Meters */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Card 1 */}
                    <div className="glass-card-cockpit p-5 rounded-2xl relative overflow-hidden group">
                      <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                        <span>Catálogo Especializado</span>
                        <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                          <Flame className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="text-3xl font-black text-white tracking-tight">{metrics.totalProducts} SKUs</div>
                      <div className="text-xs text-rose-400 font-semibold mt-1">
                        Nay • Zomo • Ziggy • Art Coco • Baly
                      </div>
                      <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">Cobertura:</span>
                        <span className="text-emerald-400 font-mono font-bold">100% Cadastrados</span>
                      </div>
                    </div>

                    {/* Card 2 */}
                    <div className="glass-card-cockpit p-5 rounded-2xl relative overflow-hidden group">
                      <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                        <span>Saldo Físico Consolidado</span>
                        <div className="w-8 h-8 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                          <Boxes className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="text-3xl font-black text-pink-400 tracking-tight">{metrics.totalStockUnits} un</div>
                      
                      {/* Dual-store visual bar */}
                      <div className="mt-2 space-y-1">
                        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden flex">
                          <div style={{ width: '62%' }} className="bg-rose-500 h-full" title="Vila Buritis (62%)"></div>
                          <div style={{ width: '38%' }} className="bg-pink-400 h-full" title="Setor Tradicional (38%)"></div>
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                          <span>Buritis: 62%</span>
                          <span>Tradicional: 38%</span>
                        </div>
                      </div>

                      <div className="pt-2 mt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">Auditoria:</span>
                        <span className="text-slate-200 font-mono">Sincronia Automática</span>
                      </div>
                    </div>

                    {/* Card 3 */}
                    <div className="glass-card-cockpit p-5 rounded-2xl relative overflow-hidden group">
                      <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                        <span>Capital em Mercadorias</span>
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                          <Activity className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="text-3xl font-black text-emerald-400 tracking-tight">
                        R$ {metrics.totalStockCostValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        Preço de custo dos lotes ativos
                      </div>
                      <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">Margem Estimada:</span>
                        <span className="text-emerald-400 font-mono font-bold">54.2% Média</span>
                      </div>
                    </div>

                    {/* Card 4 */}
                    <div className="glass-card-cockpit p-5 rounded-2xl relative overflow-hidden group">
                      <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                        <span>Saúde de Suprimentos</span>
                        <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                          <AlertTriangle className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="text-3xl font-black text-amber-400 tracking-tight">
                        {metrics.lowStockCount === 0 ? '98.2% OK' : `${metrics.lowStockCount} alertas`}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        Reposição preventiva de final de semana
                      </div>
                      <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">Status Geral:</span>
                        <span className="text-emerald-400 font-mono font-bold">Sem Rupturas Graves</span>
                      </div>
                    </div>
                  </div>

                  {/* COCKPIT DUAL SPLIT: STORES TELEMETRY (LEFT) & LIVE TRANSFER SIMULATOR (RIGHT) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    
                    {/* LEFT: LIVE PHYSICAL STORES MONITOR (7 COLS) */}
                    <div className="lg:col-span-7 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold uppercase text-slate-400 flex items-center gap-2">
                          <Store className="w-4 h-4 text-rose-500" />
                          Rede Operacional em Planaltina-DF
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          2 Unidades Conectadas
                        </span>
                      </div>

                      {/* Store 1: Vila Buritis */}
                      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-rose-500/40 transition space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                            <strong className="text-white text-base">Unidade 01 — Vila Buritis (Matriz & Lounge)</strong>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono text-[11px] font-black border border-rose-500/30">
                            ABERTO 24 HORAS
                          </span>
                        </div>

                        <p className="text-xs text-slate-400 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          <span>Rua da Escola Paraná, Vila Buritis • Atendimento de balcão e abastecimento</span>
                        </p>

                        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-center font-mono">
                          <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800/60">
                            <span className="text-[10px] text-slate-400 block">Saldo em Estoque</span>
                            <strong className="text-sm text-emerald-400 font-black">712 un</strong>
                          </div>
                          <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800/60">
                            <span className="text-[10px] text-slate-400 block">Vendas Hoje</span>
                            <strong className="text-sm text-white font-black">R$ 2.940,00</strong>
                          </div>
                          <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800/60">
                            <span className="text-[10px] text-slate-400 block">Transferências</span>
                            <strong className="text-sm text-rose-400 font-black">12 saídas</strong>
                          </div>
                        </div>

                        <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                          <span>Top SKUs: Nay Peach (54 un), Art Coco 1kg (48 cx), Baly 2L (36 un)</span>
                          <span className="text-emerald-400 font-bold">Estoque Pleno</span>
                        </div>
                      </div>

                      {/* Store 2: Setor Tradicional */}
                      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-pink-500/40 transition space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                            <strong className="text-white text-base">Unidade 02 — Setor Tradicional (Conveniência Express)</strong>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-300 font-mono text-[11px] font-black border border-amber-500/30">
                            06h ÀS 02h
                          </span>
                        </div>

                        <p className="text-xs text-slate-400 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                          <span>Setor Tradicional, Planaltina-DF • Atendimento ágil e fluxo de rua</span>
                        </p>

                        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-center font-mono">
                          <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800/60">
                            <span className="text-[10px] text-slate-400 block">Saldo em Estoque</span>
                            <strong className="text-sm text-pink-400 font-black">429 un</strong>
                          </div>
                          <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800/60">
                            <span className="text-[10px] text-slate-400 block">Vendas Hoje</span>
                            <strong className="text-sm text-white font-black">R$ 1.880,00</strong>
                          </div>
                          <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800/60">
                            <span className="text-[10px] text-slate-400 block">Transferências</span>
                            <strong className="text-sm text-pink-400 font-black">4 entradas</strong>
                          </div>
                        </div>

                        <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                          <span>Top SKUs: Zomo Strong Mint (8 un), Copão 700ml (140 un), Gelo Maracujá (32 un)</span>
                          <span className="text-amber-400 font-bold">Necessita Carvão</span>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT: INTERACTIVE TRANSFER SIMULATOR & AUDIT (5 COLS) */}
                    <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-900/90 border border-rose-500/35 flex flex-col justify-between space-y-5">
                      <div>
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <div className="flex items-center gap-2">
                            <ArrowRightLeft className="w-4 h-4 text-rose-500" />
                            <strong className="text-white text-xs uppercase tracking-wider font-mono">
                              Simulador Interativo em Tempo Real
                            </strong>
                          </div>
                          <span className="text-[10px] text-rose-400 font-mono font-bold bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                            TESTE AO VIVO
                          </span>
                        </div>

                        <div className="mt-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                          <div className="text-xs font-bold text-white flex items-center justify-between">
                            <span>Carvão de Coco Hexagonal 1kg</span>
                            <span className="text-rose-400 font-mono text-[11px]">TAB-CARV-001</span>
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            Transferência da Loja 01 (Vila Buritis) ➔ Loja 02 (Setor Tradicional)
                          </div>
                        </div>

                        {/* Visual Real-Time Comparison */}
                        <div className="grid grid-cols-2 gap-3 mt-4 text-center">
                          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                            <span className="text-[10px] text-slate-400 block font-semibold">Origem: Vila Buritis</span>
                            <strong className="text-xl font-black text-emerald-400 font-mono">{simulatedBuritisStock} cx</strong>
                            <span className="text-[9px] text-slate-500 block">Disponível p/ envio</span>
                          </div>
                          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                            <span className="text-[10px] text-slate-400 block font-semibold">Destino: Tradicional</span>
                            <strong className="text-xl font-black text-amber-400 font-mono">{simulatedTradicionalStock} cx</strong>
                            <span className="text-[9px] text-slate-500 block">Estoque de balcão</span>
                          </div>
                        </div>

                        {/* Feedback Toast */}
                        {transferFeedback && (
                          <div className="mt-3 p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs text-center font-bold animate-in fade-in">
                            {transferFeedback}
                          </div>
                        )}

                        {/* Interactive Transfer Buttons */}
                        <div className="mt-4 space-y-2">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSimulateTransfer(6)}
                              disabled={simulatedBuritisStock < 6}
                              className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-rose-300 hover:text-white border border-rose-500/30 hover:border-rose-500/60 text-xs font-bold transition disabled:opacity-40"
                            >
                              +6 caixas
                            </button>
                            <button
                              onClick={() => handleSimulateTransfer(12)}
                              disabled={simulatedBuritisStock < 12}
                              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-black transition disabled:opacity-40 shadow-lg shadow-rose-950/60"
                            >
                              +12 caixas
                            </button>
                          </div>
                          <button
                            onClick={() => {
                              setSimulatedBuritisStock(48);
                              setSimulatedTradicionalStock(16);
                            }}
                            className="w-full text-center text-[10px] text-slate-500 hover:text-slate-300 transition py-1"
                          >
                            ⟲ Resetar valores para o padrão inicial
                          </button>
                        </div>
                      </div>

                      {/* Mini Live Audit Ticker */}
                      <div className="pt-3 border-t border-slate-800 space-y-2 text-[11px] font-mono">
                        <div className="text-slate-400 font-bold uppercase text-[10px] flex items-center gap-1.5">
                          <History className="w-3 h-3 text-rose-400" />
                          <span>Auditoria em Tempo Real</span>
                        </div>
                        <div className="text-slate-400 truncate">
                          ⚡ <strong className="text-white">15:42:</strong> Transferência #TRF-1002 (5x Carvão p/ Tradicional)
                        </div>
                        <div className="text-slate-400 truncate">
                          🛒 <strong className="text-white">15:20:</strong> Venda Balcão: 2x Nay Peach + 1x Seda Raw
                        </div>
                        <div className="text-slate-400 truncate">
                          📦 <strong className="text-white">14:00:</strong> Entrada #COM-089: 30x Gelo Saborizado Maracujá
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* MINI 3D FICTITIOUS CATALOG PREVIEW STRIP INSIDE HERO COCKPIT */}
                  <div className="pt-2 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-mono font-bold uppercase text-pink-400 flex items-center gap-2">
                        <Package className="w-4 h-4 text-rose-500" />
                        Vitrine Rápida — Catálogo Fictício 3D (Destaques de Alto Giro)
                      </span>
                      <button
                        onClick={() => scrollToSection('vitrine-tabacaria')}
                        className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1"
                      >
                        <span>Ver todos os {products.length} produtos do catálogo abaixo</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {products.slice(0, 4).map((prod) => (
                        <div
                          key={prod.id}
                          className="group glass-card-cockpit rounded-2xl p-3.5 flex flex-col justify-between space-y-3"
                        >
                          <ProductArtwork product={prod} height="h-36" />
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[10px] font-mono">
                              <span className="text-rose-400 font-bold">{prod.brand || prod.category}</span>
                              <span className="text-emerald-400 font-black">R$ {prod.sellingPrice.toFixed(2)}</span>
                            </div>
                            <div className="text-xs font-black text-white line-clamp-1">{prod.name}</div>
                            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-800/80">
                              <span>Buritis: {prod.stock['unit-01'] || 0} {prod.unit}</span>
                              <span>Trad.: {prod.stock['unit-02'] || 0} {prod.unit}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* DIRECT LAUNCH CTA BANNER INSIDE MOCKUP */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-950/60 via-slate-900 to-pink-950/60 border border-rose-500/35 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0 shadow-sm">
                        <Flame className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">
                          Pronto para gerenciar as duas unidades da TwoNine com máxima precisão?
                        </div>
                        <div className="text-xs text-slate-400">
                          Acesse o sistema completo com Catálogo 3D, PDV de balcão, estoque multi-loja e auditoria.
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                      <button
                        onClick={() => {
                          setCurrentView('dashboard');
                          setActiveTab('products');
                        }}
                        className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-pink-300 border border-pink-500/40 font-black text-xs flex items-center gap-2 transition"
                      >
                        <Package className="w-4 h-4 text-pink-400" />
                        <span>Abrir Catálogo no ERP</span>
                      </button>
                      <button
                        onClick={() => {
                          setCurrentView('dashboard');
                          setActiveTab('overview');
                        }}
                        className="btn-neon-luxe px-7 py-3 rounded-xl text-white font-black text-xs flex items-center gap-2"
                      >
                        <span>Acessar Painel TWONINE MANAGER</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: CATÁLOGO FICTÍCIO 3D DIRETO NO HERO */}
              {activePreviewTab === 'catalog' && (
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                    <div>
                      <span className="text-xs font-mono uppercase text-rose-400 font-bold">
                        Catálogo Fictício Oficial TwoNine (18+)
                      </span>
                      <h3 className="text-lg font-black text-white">
                        {products.length} Produtos de Tabacaria, Hookah & Conveniência 24h
                      </h3>
                    </div>
                    <button
                      onClick={() => {
                        setCurrentView('dashboard');
                        setActiveTab('products');
                      }}
                      className="btn-neon-luxe px-5 py-2.5 rounded-xl text-white text-xs font-black flex items-center gap-2 self-start sm:self-auto"
                    >
                      <Package className="w-4 h-4" />
                      <span>Abrir Showroom Completo no ERP</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {products.slice(0, 8).map((prod) => (
                      <div
                        key={prod.id}
                        className="group glass-card-cockpit rounded-2xl p-3.5 flex flex-col justify-between space-y-3"
                      >
                        <ProductArtwork product={prod} height="h-40" />
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] font-mono">
                            <span className="text-rose-400 font-bold">{prod.brand || prod.category}</span>
                            <span className="text-white font-black text-sm">R$ {prod.sellingPrice.toFixed(2)}</span>
                          </div>
                          <div className="text-xs font-black text-white line-clamp-1">{prod.name}</div>
                          <div className="text-[11px] text-slate-400 line-clamp-1">{prod.flavorOrSpec}</div>
                          <div className="grid grid-cols-2 gap-1.5 pt-2 text-[10px] font-mono">
                            <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-center">
                              <span className="text-slate-400 block">Buritis</span>
                              <strong className="text-emerald-400">{prod.stock['unit-01'] || 0} {prod.unit}</strong>
                            </div>
                            <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-center">
                              <span className="text-slate-400 block">Tradicional</span>
                              <strong className="text-amber-400">{prod.stock['unit-02'] || 0} {prod.unit}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: INTERACTIVE LIVE SIMULATOR FULL STATION */}
              {activePreviewTab === 'transfers' && (
                <div className="space-y-6">
                  <div className="text-center max-w-xl mx-auto space-y-1">
                    <span className="text-xs font-mono uppercase text-rose-400 font-bold">
                      Simulação Funcional de Transferência
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      Clique para transferir caixas de Carvão Art Coco entre as lojas
                    </h3>
                  </div>

                  {transferFeedback && (
                    <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs text-center font-bold animate-in fade-in">
                      {transferFeedback}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
                    {/* Origin */}
                    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Origem (Saída)</span>
                      <div className="font-bold text-white text-base">Unidade 01 — Vila Buritis (24h)</div>
                      <div className="text-xs text-slate-400">Carvão de Coco Hexagonal 1kg</div>
                      <div className="p-4 rounded-xl bg-slate-950 font-mono text-center border border-slate-800">
                        <span className="text-xs text-slate-400 block">Saldo em Estoque:</span>
                        <strong className="text-3xl font-black text-emerald-400">{simulatedBuritisStock} caixas</strong>
                      </div>
                    </div>

                    {/* Transfer Button Hub */}
                    <div className="p-6 rounded-2xl bg-slate-950 border border-rose-500/35 flex flex-col items-center justify-center space-y-4 text-center">
                      <ArrowRightLeft className="w-10 h-10 text-rose-400 animate-pulse" />
                      <span className="text-xs font-bold text-white">Transferir Carga Rápida</span>
                      
                      <div className="flex gap-2 w-full">
                        <button
                          onClick={() => handleSimulateTransfer(6)}
                          disabled={simulatedBuritisStock < 6}
                          className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-rose-300 border border-rose-500/30 text-xs font-bold transition disabled:opacity-50"
                        >
                          +6 caixas
                        </button>
                        <button
                          onClick={() => handleSimulateTransfer(12)}
                          disabled={simulatedBuritisStock < 12}
                          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-black transition disabled:opacity-50 shadow-md"
                        >
                          +12 caixas
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          setSimulatedBuritisStock(48);
                          setSimulatedTradicionalStock(16);
                        }}
                        className="text-xs text-slate-500 hover:underline"
                      >
                        Resetar simulação
                      </button>
                    </div>

                    {/* Destination */}
                    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Destino (Entrada)</span>
                      <div className="font-bold text-white text-base">Unidade 02 — Setor Tradicional</div>
                      <div className="text-xs text-slate-400">Estoque de Atendimento</div>
                      <div className="p-4 rounded-xl bg-slate-950 font-mono text-center border border-slate-800">
                        <span className="text-xs text-slate-400 block">Saldo em Estoque:</span>
                        <strong className="text-3xl font-black text-amber-400">{simulatedTradicionalStock} caixas</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: STORES IN PLANALTINA */}
              {activePreviewTab === 'stores' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {units.map((u) => (
                    <div key={u.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-base font-bold text-white flex items-center gap-2">
                          <Store className="w-5 h-5 text-rose-500" />
                          {u.name}
                        </span>
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-800 text-rose-400 font-mono font-bold">
                          {u.tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">{u.address}</p>
                      <span className="text-xs text-pink-400 font-medium block">
                        📍 Referência Oficial: {u.reference}
                      </span>
                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                        <span className="text-slate-400">Horário: <strong className="text-white">{u.operatingHours}</strong></span>
                        <span className="text-slate-400">Gerência: <strong className="text-white">{u.manager.split(' ')[0]}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FLOATING TOAST FOR CATALOG INTERACTIONS */}
      {catalogToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md px-5 py-4 rounded-2xl bg-emerald-950/95 border border-emerald-500/50 text-emerald-200 shadow-2xl backdrop-blur-xl flex items-center gap-3 animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold leading-snug">{catalogToast}</span>
        </div>
      )}

      {/* MONUMENTAL INTERACTIVE 3D FICTITIOUS PRODUCT CATALOG (VITRINE COMERCIAL TABACARIA) */}
      <section id="vitrine-tabacaria" className="py-24 border-b border-rose-950/40 bg-[#05070F]/90 relative">
        <div className="w-[94%] max-w-[1840px] mx-auto space-y-12 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/35 text-rose-300 text-xs font-mono font-extrabold shadow-[0_0_25px_rgba(244,63,94,0.25)]">
              <span>🔞</span>
              <span>CATÁLOGO FICTÍCIO INTERATIVO • {products.length} PRODUTOS EM VITRINE 3D</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              Showroom & Catálogo de Produtos{' '}
              <span className="bg-gradient-to-r from-rose-500 via-pink-400 to-amber-300 bg-clip-text text-transparent">
                TwoNine 24 Horas
              </span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
              Explore o catálogo demonstrativo completo da <strong className="text-white">TwoNine Conveniência & Tabacaria</strong>. Cada produto possui embalagem ilustrada em 3D, custo de lote, preço de balcão, margem de lucro e saldo em tempo real nas unidades <strong className="text-rose-400">Vila Buritis (24h)</strong> e <strong className="text-amber-400">Setor Tradicional</strong>.
            </p>
          </div>

          {/* Interactive Filter & Search Bar */}
          <div className="p-5 rounded-3xl glass-panel-ultra space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {[
                  { id: 'all', label: `Todos os Produtos (${products.length})`, emoji: '✨' },
                  { id: 'Tabacaria & Hookah', label: 'Essências & Pods', emoji: '💨' },
                  { id: 'Carvões & Insumos', label: 'Carvões & Alumínio', emoji: '🥥' },
                  { id: 'Gelo & Copos', label: 'Gelos & Copão 700ml', emoji: '🧊' },
                  { id: 'Bebidas & Energéticos', label: 'Bebidas & Energéticos', emoji: '⚡' },
                  { id: 'Acessórios & Headshop', label: 'Headshop & Narguilés', emoji: '🔥' },
                  { id: 'Snacks & Bomboniere', label: 'Snacks & Bomboniere', emoji: '🍫' },
                ].map((cat) => {
                  const isActive = catalogCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setCatalogCategory(cat.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-950/60 scale-[1.02]'
                          : 'bg-slate-950/90 text-slate-400 hover:text-white border border-slate-800 hover:border-rose-500/40'
                      }`}
                    >
                      <span>{cat.emoji}</span>
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Search Input */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  placeholder="Buscar Nay, Zomo, Ignite, Art Coco, Baly..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>
          </div>

          {/* 3D PRODUCT CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCatalogProducts.map((product) => {
              const qBuritis = product.stock['unit-01'] || 0;
              const qTradicional = product.stock['unit-02'] || 0;
              const qTotal = qBuritis + qTradicional;
              const profit = product.sellingPrice - product.costPrice;

              return (
                <div
                  key={product.id}
                  className="group glass-card-cockpit rounded-3xl p-4 flex flex-col justify-between space-y-4 relative overflow-hidden"
                >
                  {/* Top: 3D Studio Render + Info */}
                  <div className="space-y-3">
                    <ProductArtwork product={product} height="h-48" />

                    <div className="space-y-1 px-1">
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-rose-400 font-extrabold uppercase tracking-wider">
                          {product.brand || product.category}
                        </span>
                        <span className="text-slate-400">{product.category}</span>
                      </div>

                      <h3 className="text-base font-black text-white group-hover:text-rose-300 transition line-clamp-1">
                        {product.name}
                      </h3>

                      <p className="text-xs text-slate-400 line-clamp-1">
                        {product.flavorOrSpec || product.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom: Pricing, Dual-Store Stocks & Live Interactive Buttons */}
                  <div className="space-y-3 pt-3 border-t border-white/[0.07]">
                    <div className="flex items-baseline justify-between px-1">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Preço de Venda</span>
                        <span className="text-2xl font-black text-white">
                          R$ {product.sellingPrice.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-right font-mono">
                        <span className="text-[10px] text-slate-400 block">
                          Custo: R$ {product.costPrice.toFixed(2)}
                        </span>
                        <span className="text-xs font-bold text-emerald-400">
                          +R$ {profit.toFixed(2)} lucro/{product.unit}
                        </span>
                      </div>
                    </div>

                    {/* Dual Store Stock Pills */}
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div
                        className={`p-2 rounded-xl border text-center ${
                          qBuritis <= product.minStock
                            ? 'bg-amber-950/30 border-amber-500/40 text-amber-300'
                            : 'bg-slate-950 border-slate-800 text-slate-200'
                        }`}
                      >
                        <span className="text-[9px] uppercase text-slate-400 block">📍 Vila Buritis 24h</span>
                        <strong className="text-xs font-black">
                          {qBuritis} {product.unit}
                        </strong>
                      </div>
                      <div
                        className={`p-2 rounded-xl border text-center ${
                          qTradicional === 0
                            ? 'bg-rose-950/40 border-rose-500/50 text-rose-300'
                            : qTradicional <= product.minStock
                            ? 'bg-amber-950/30 border-amber-500/40 text-amber-300'
                            : 'bg-slate-950 border-slate-800 text-slate-200'
                        }`}
                      >
                        <span className="text-[9px] uppercase text-slate-400 block">📍 Setor Tradicional</span>
                        <strong className="text-xs font-black">
                          {qTradicional} {product.unit}
                        </strong>
                      </div>
                    </div>

                    {/* Interactive Live Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => handleLandingQuickSale(product)}
                        disabled={qTotal === 0}
                        className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition disabled:opacity-40"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Vender 1 {product.unit}</span>
                      </button>

                      <button
                        onClick={() => handleLandingQuickTransfer(product)}
                        disabled={qTotal === 0}
                        className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-rose-300 hover:text-white border border-rose-500/35 font-bold text-xs flex items-center justify-center gap-1.5 transition disabled:opacity-40"
                      >
                        <ArrowRightLeft className="w-3.5 h-3.5" />
                        <span>Transferir 5 {product.unit}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SEÇÃO: GESTÃO CENTRALIZADA */}
      <section id="gestao-centralizada" className="py-20 border-b border-rose-950/40">
        <div className="w-[94%] max-w-[1800px] mx-auto space-y-12">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-500 font-mono flex items-center justify-center gap-1.5">
              <Flame className="w-4 h-4 text-rose-500" />
              Controle Unificado Tabacaria & Conveniência
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Gestão Centralizada para Duas Unidades
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Administrar duas lojas não precisa significar duplicar planilhas, desencontros de saldo ou telefonemas constantes para saber se determinado produto está disponível. O TwoNine Manager unifica a visão do proprietário em um único painel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-3xl space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Alternância Ágil de Unidades</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Filtre todo o sistema com um clique: consulte a visão consolidada de toda a rede ou isole as operações da Vila Buritis e do Setor Tradicional individualmente.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center">
                <ArrowRightLeft className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Sinergia entre Lojas</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Equilibre excessos e faltas. Se um produto tem alta procura no Setor Tradicional e sobra na Vila Buritis, a transferência interna é solicitada e validada em segundos.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Auditoria Completa & Segurança</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Cada entrada de compra, cada venda de balcão e cada movimentação entre lojas gera registro com operador, horário, saldo anterior e novo saldo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO: CONTROLE DE ESTOQUE */}
      <section className="py-20 border-b border-rose-950/40 bg-slate-950/40">
        <div className="w-[94%] max-w-[1800px] mx-auto space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-500 font-mono">
                Estoque em Tempo Real
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Controle de Estoque Preciso por Loja
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Elimine rupturas de balcão e compras desnecessárias. O sistema mantém o saldo individual de cada unidade com cálculo automático de estoque mínimo.
              </p>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <Boxes className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm">Estoque por Unidade</strong>
                    Visualize instantaneamente quanto cada unidade possui de cada SKU sem precisar ligar para a outra loja.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm">Produtos com Baixo Estoque</strong>
                    Identificação visual imediata (Normal, Estoque Baixo e Sem Estoque) com quantidade sugerida de reposição.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <History className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm">Histórico e Rastreabilidade</strong>
                    Linha do tempo auditável de todas as movimentações, entradas por notas de compras e saídas de vendas.
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={() => {
                    setCurrentView('dashboard');
                    setActiveTab('inventory');
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition"
                >
                  <span>Ver tabela de estoque no sistema</span>
                  <ArrowRight className="w-4 h-4 text-rose-400" />
                </button>
              </div>
            </div>

            {/* Visual Inventory Graphic Card */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-rose-500/20 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Flame className="w-4 h-4 text-rose-500" />
                  Saldo em Tempo Real Tabacaria & Bebidas
                </div>
                <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Sincronizado
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Carvão de Coco Hexagonal 1kg (60 peças)</div>
                    <div className="text-[11px] text-slate-400 font-mono">CRV-COC-005 • Carvões & Insumos</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-white">48 cx (Buritis) | 16 cx (Trad.)</div>
                    <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                      Estoque Baixo na Tradicional
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Essência Nay Fresh Peach 50g</div>
                    <div className="text-[11px] text-slate-400 font-mono">TAB-ESS-001 • Tabacaria & Hookah</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-white">54 un (Buritis) | 8 un (Trad.)</div>
                    <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                      Estoque Baixo na Tradicional
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Gelo Saborizado Coco c/ Maracujá 200ml</div>
                    <div className="text-[11px] text-slate-400 font-mono">GEL-SAB-008 • Gelo & Copos</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-white">110 un (Buritis) | 32 un (Trad.)</div>
                    <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      Normal
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-400 shrink-0" />
                <span>O sistema sugere a transferência de 15 un de essência da Vila Buritis para o Setor Tradicional.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO: CONTROLE OPERACIONAL */}
      <section className="py-20 border-b border-rose-950/40">
        <div className="w-[94%] max-w-[1800px] mx-auto space-y-12">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-500 font-mono">
              Fluxos de Negócio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Controle Operacional Completo
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Integração entre o que entra de mercadoria dos fornecedores e o que sai nos caixas das lojas, com conciliação automática.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Registro de Compras</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Entrada de notas fiscais com custo unitário e destinação para Unidade 01 ou Unidade 02, alimentando o saldo instantaneamente.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Gestão de Fornecedores</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Base centralizada de fornecedores de essências, carvões de coco, bebidas, energéticos e gelo com prazos de entrega e telefones.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Vendas Demonstrativas</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                PDV ágil para registro de vendas por unidade com baixa imediata de estoque, cálculo automático do total e formas de pagamento.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Comparação de Resultados</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Acompanhe o faturamento demonstrativo de cada unidade, ticket médio e produtos de maior giro para decisões precisas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO: DASHBOARD */}
      <section className="py-20 border-b border-rose-950/40 bg-slate-950/40">
        <div className="w-[94%] max-w-[1800px] mx-auto space-y-10">
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-500 font-mono">
              Interface SaaS Premium
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Uma Prévia do Dashboard Administrativo
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Design escuro sofisticado (Dark Mode), cards limpos, gráficos funcionais e tabelas organizadas para alta produtividade no dia a dia.
            </p>
          </div>

          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h4 className="font-bold text-white text-lg flex items-center gap-2">
                  <Flame className="w-5 h-5 text-rose-500" />
                  Painel TWONINE MANAGER • Tabacaria & Hookah
                </h4>
                <p className="text-xs text-slate-400">Navegue pelas 11 áreas gerenciais do sistema</p>
              </div>
              <button
                onClick={() => setCurrentView('dashboard')}
                className="btn-neon-luxe flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-black text-xs transition"
              >
                <span>Acessar Dashboard Completo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center text-xs">
              {[
                { name: 'Visão Geral', tab: 'overview', icon: BarChart3 },
                { name: 'Unidades', tab: 'units', icon: Store },
                { name: 'Estoque & Insumos', tab: 'inventory', icon: Boxes },
                { name: 'Transferências', tab: 'transfers', icon: ArrowRightLeft },
                { name: 'PDV Balcão', tab: 'sales', icon: ShoppingCart },
                { name: 'Alertas', tab: 'alerts', icon: AlertTriangle },
              ].map((item) => (
                <button
                  key={item.tab}
                  onClick={() => {
                    setCurrentView('dashboard');
                    setActiveTab(item.tab);
                  }}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-rose-500/50 hover:bg-slate-900 transition flex flex-col items-center gap-2 group"
                >
                  <item.icon className="w-5 h-5 text-slate-400 group-hover:text-rose-400 transition" />
                  <span className="font-semibold text-slate-300 group-hover:text-white transition">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO: BENEFÍCIOS */}
      <section className="py-20 border-b border-rose-950/40">
        <div className="w-[94%] max-w-[1800px] mx-auto space-y-12">
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-500 font-mono">
              Vantagens Reais
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Por que Modernizar com o TWONINE MANAGER?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Mais visibilidade das operações',
                desc: 'Acompanhe as duas lojas simultaneamente em tempo real, onde quer que você esteja.',
              },
              {
                title: 'Controle individual de cada unidade',
                desc: 'Identifique o padrão de consumo específico da Vila Buritis e do Setor Tradicional.',
              },
              {
                title: 'Menos dependência de planilhas dispersas',
                desc: 'Acabe com arquivos desatualizados no WhatsApp ou anotações em papel no balcão.',
              },
              {
                title: 'Melhor organização das movimentações',
                desc: 'Rastreie tudo o que entra por compra, tudo o que é vendido e cada produto transferido.',
              },
              {
                title: 'Reposição mais organizada',
                desc: 'Alertas preventivos evitam que produtos campeões de venda fiquem em falta no final de semana.',
              },
              {
                title: 'Decisões baseadas em dados',
                desc: 'Saiba exatamente quais itens trazem mais margem e onde focar o capital de compras.',
              },
            ].map((benefit, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition space-y-2.5"
              >
                <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-400 font-mono font-bold text-xs flex items-center justify-center">
                  0{i + 1}
                </div>
                <h3 className="font-bold text-white text-base">{benefit.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-950/20 to-transparent pointer-events-none"></div>
        <div className="w-[94%] max-w-[1800px] mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex p-3 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg mb-2">
            <BrandLogo size="lg" variant="badge" />
          </div>

          {/* EXACT REQUIRED CTA TITLE */}
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Tenha o controle das suas unidades em um só lugar.
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Experimente agora a demonstração interativa do TwoNine Manager com dados ilustrativos das unidades Vila Buritis e Setor Tradicional.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            {/* EXACT REQUIRED CTA BUTTON */}
            <button
              onClick={() => setCurrentView('dashboard')}
              className="btn-neon-luxe flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-black text-base"
            >
              <span>Explorar demonstração</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => setBrandModalOpen(true)}
              className="flex items-center gap-2 px-7 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-rose-500/30 font-semibold text-sm transition"
            >
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>Ver Redesign da Marca</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
