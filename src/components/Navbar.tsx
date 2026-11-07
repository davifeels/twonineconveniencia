import React from 'react';
import {
  LayoutDashboard,
  Palette,
  RotateCcw,
  Store,
  ChevronDown,
  Bell,
  ArrowRightLeft,
  Flame,
  ArrowRight,
  Package,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './BrandLogo';
import { UnitId } from '../types';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    activeTab,
    selectedUnitFilter,
    setSelectedUnitFilter,
    alerts,
    transfers,
    products,
    setBrandModalOpen,
    resetToMockData,
    setActiveTab,
  } = useApp();

  const pendingTransfers = transfers.filter(
    (t) => t.status === 'pendente' || t.status === 'em_transito'
  ).length;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#04060D]/90 backdrop-blur-xl border-b border-rose-500/20 shadow-[0_10px_40px_rgba(0,0,0,0.85)]">
      {/* 94% WIDESCREEN CONTAINER */}
      <div className="w-[94%] max-w-[1840px] mx-auto h-18 flex items-center justify-between gap-4 py-2">
        {/* Brand Logo */}
        <div className="flex items-center gap-5">
          <div
            onClick={() => setCurrentView('landing')}
            className="cursor-pointer transition-transform hover:scale-[1.02]"
            title="TwoNine Tabacaria & Hookah Lounge"
          >
            <BrandLogo size="md" variant="full" subtitle="manager" />
          </div>

          {/* TRIPLE MODE TOGGLER: LANDING | CATÁLOGO FICTÍCIO 3D | PAINEL ERP */}
          <div className="hidden md:flex items-center p-1 rounded-2xl bg-slate-950/95 border border-rose-500/30 text-xs font-bold shadow-inner">
            <button
              onClick={() => setCurrentView('landing')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all ${
                currentView === 'landing'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-950/50'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-pink-300" />
              <span>Apresentação & Vitrine</span>
            </button>

            <button
              onClick={() => {
                setCurrentView('dashboard');
                setActiveTab('products');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all ${
                currentView === 'dashboard' && activeTab === 'products'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-950/50'
                  : 'text-pink-300 hover:text-white'
              }`}
            >
              <Package className="w-3.5 h-3.5 text-rose-400" />
              <span>Catálogo Fictício 3D</span>
              <span className="px-1.5 py-0.2 rounded-full bg-rose-500/25 border border-rose-500/40 text-[10px] font-mono text-rose-200">
                {products.length}
              </span>
            </button>

            <button
              onClick={() => {
                setCurrentView('dashboard');
                if (activeTab === 'products') setActiveTab('overview');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all ${
                currentView === 'dashboard' && activeTab !== 'products'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-950/50'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Painel ERP Multiunidade</span>
            </button>
          </div>
        </div>

        {/* Global Controls & PROMINENT CALL TO ACTION BUTTON */}
        <div className="flex items-center gap-3">
          {/* PROMINENT DIRECT SWITCH BUTTON */}
          {currentView === 'landing' ? (
            <button
              onClick={() => setCurrentView('dashboard')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 hover:from-rose-500 hover:to-pink-500 text-white font-black text-xs shadow-[0_0_25px_rgba(244,63,94,0.4)] hover:shadow-[0_0_35px_rgba(244,63,94,0.6)] transition-all hover:scale-105"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Abrir Sistema TWONINE MANAGER</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentView('landing')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-rose-500/30 hover:border-rose-500/60 text-rose-300 hover:text-white font-bold text-xs transition shadow-sm"
            >
              <Flame className="w-3.5 h-3.5 text-rose-500" />
              <span>Ver Vitrine Comercial</span>
            </button>
          )}

          {/* Unit Filter Selector (Visible in dashboard) */}
          {currentView === 'dashboard' && (
            <div className="hidden lg:flex items-center gap-2">
              <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-rose-500" />
                Unidade:
              </span>
              <div className="relative">
                <select
                  value={selectedUnitFilter}
                  onChange={(e) => setSelectedUnitFilter(e.target.value as UnitId | 'all')}
                  className="bg-slate-900 border border-rose-500/30 text-white text-xs font-semibold rounded-xl pl-3 pr-8 py-2 appearance-none focus:outline-none focus:border-rose-500 cursor-pointer shadow-sm"
                >
                  <option value="all">🏢 Todas as Lojas (Consolidado)</option>
                  <option value="unit-01">📍 Vila Buritis (24h - Rua da Escola Paraná)</option>
                  <option value="unit-02">📍 Setor Tradicional (06h às 02h)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          )}

          {/* Quick Alerts shortcut */}
          {currentView === 'dashboard' && (
            <button
              onClick={() => setActiveTab('alerts')}
              className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-rose-500/40 transition"
              title={`${alerts.length} alertas de reposição de estoque`}
            >
              <Bell className="w-4 h-4" />
              {alerts.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-slate-950 font-black text-[10px] rounded-full flex items-center justify-center animate-pulse">
                  {alerts.length}
                </span>
              )}
            </button>
          )}

          {/* Quick Transfers shortcut */}
          {currentView === 'dashboard' && (
            <button
              onClick={() => setActiveTab('transfers')}
              className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-rose-500/40 transition"
              title={`${pendingTransfers} transferências ativas`}
            >
              <ArrowRightLeft className="w-4 h-4" />
              {pendingTransfers > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white font-bold text-[10px] rounded-full flex items-center justify-center">
                  {pendingTransfers}
                </span>
              )}
            </button>
          )}

          {/* Redesign / Brand Identity Guide Button */}
          <button
            onClick={() => setBrandModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-rose-500/40 text-rose-300 hover:bg-rose-950/40 hover:text-rose-200 text-xs font-semibold transition"
            title="Conheça a proposta de Redesign da Marca TwoNine"
          >
            <Palette className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden xl:inline">Guia Visual & Redesign</span>
          </button>

          {/* Reset Demo Data */}
          <button
            onClick={() => {
              if (
                window.confirm(
                  'Deseja restaurar os dados demonstrativos de tabacaria, conveniência, vendas e transferências para o estado original?'
                )
              ) {
                resetToMockData();
              }
            }}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition"
            title="Restaurar dados padrão de demonstração"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
