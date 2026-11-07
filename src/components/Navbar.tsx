import React from 'react';
import {
  LayoutDashboard,
  Globe,
  Palette,
  RotateCcw,
  Store,
  ChevronDown,
  Bell,
  ArrowRightLeft,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './BrandLogo';
import { UnitId } from '../types';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    selectedUnitFilter,
    setSelectedUnitFilter,
    units,
    alerts,
    transfers,
    setBrandModalOpen,
    resetToMockData,
    setActiveTab,
  } = useApp();

  const pendingTransfers = transfers.filter(
    (t) => t.status === 'pendente' || t.status === 'em_transito'
  ).length;

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & View Switcher */}
        <div className="flex items-center gap-6">
          <div
            onClick={() => setCurrentView('landing')}
            className="cursor-pointer transition-transform hover:scale-[1.02]"
            title="Ir para Página Comercial TwoNine"
          >
            <BrandLogo size="md" variant="full" subtitle="manager" />
          </div>

          {/* Mode Switcher Tabs */}
          <div className="hidden md:flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setCurrentView('landing')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition ${
                currentView === 'landing'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Apresentação Comercial</span>
            </button>
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition ${
                currentView === 'dashboard'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard Administrativo</span>
            </button>
          </div>
        </div>

        {/* Global Controls & Filters */}
        <div className="flex items-center gap-3">
          {/* Unit Filter Selector (Visible always or in dashboard) */}
          {currentView === 'dashboard' && (
            <div className="flex items-center gap-2">
              <span className="hidden lg:inline text-xs font-medium text-slate-400 flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-rose-500" />
                Unidade Ativa:
              </span>
              <div className="relative">
                <select
                  value={selectedUnitFilter}
                  onChange={(e) => setSelectedUnitFilter(e.target.value as UnitId | 'all')}
                  className="bg-slate-900 border border-slate-700/80 text-white text-xs font-semibold rounded-lg pl-3 pr-8 py-1.5 appearance-none focus:outline-none focus:border-rose-500 cursor-pointer shadow-sm"
                >
                  <option value="all">🏢 Todas as Unidades (Consolidado)</option>
                  {units.map((u) => (
                    <option key={u.id} value={u.id}>
                      📍 {u.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          )}

          {/* Quick Alerts shortcut */}
          {currentView === 'dashboard' && (
            <button
              onClick={() => setActiveTab('alerts')}
              className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition"
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
              className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition"
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-rose-500/40 text-rose-300 hover:bg-rose-950/40 hover:text-rose-200 text-xs font-semibold transition"
            title="Conheça a proposta de Redesign da Logo TwoNine"
          >
            <Palette className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Guia Visual & Redesign</span>
          </button>

          {/* Reset Demo Data */}
          <button
            onClick={() => {
              if (window.confirm('Deseja restaurar os dados demonstrativos de estoque, vendas e transferências para o estado original?')) {
                resetToMockData();
              }
            }}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition"
            title="Restaurar dados demonstrativos de fábrica"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
