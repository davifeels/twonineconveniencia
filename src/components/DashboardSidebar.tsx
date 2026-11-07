import React from 'react';
import {
  LayoutDashboard,
  Store,
  Boxes,
  Package,
  ArrowRightLeft,
  ShoppingCart,
  Truck,
  Users,
  History,
  AlertTriangle,
  BarChart3,
  Settings,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DashboardSidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    alerts,
    transfers,
    setBrandModalOpen,
    selectedUnitFilter,
    units,
  } = useApp();

  const pendingTransfers = transfers.filter(
    (t) => t.status === 'pendente' || t.status === 'em_transito'
  ).length;

  const menuItems = [
    { id: 'overview', label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'units', label: 'Unidades', icon: Store, badge: '2 Lojas' },
    { id: 'inventory', label: 'Estoque', icon: Boxes },
    { id: 'products', label: 'Produtos', icon: Package },
    {
      id: 'transfers',
      label: 'Transferências',
      icon: ArrowRightLeft,
      badge: pendingTransfers > 0 ? `${pendingTransfers}` : undefined,
      badgeColor: 'bg-rose-600 text-white',
    },
    { id: 'sales', label: 'Vendas (PDV)', icon: ShoppingCart },
    { id: 'purchases', label: 'Compras', icon: Truck },
    { id: 'suppliers', label: 'Fornecedores', icon: Users },
    { id: 'movements', label: 'Movimentações', icon: History },
    {
      id: 'alerts',
      label: 'Alertas de Reposição',
      icon: AlertTriangle,
      badge: alerts.length > 0 ? `${alerts.length}` : undefined,
      badgeColor: 'bg-amber-500 text-slate-950 font-bold',
    },
    { id: 'reports', label: 'Relatórios', icon: BarChart3 },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  const currentUnitObj = units.find((u) => u.id === selectedUnitFilter);

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col shrink-0 select-none">
      {/* Current Active Unit Indicator Banner */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-900/50">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
          Escopo do Sistema
        </span>
        <div className="flex items-center gap-2">
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              selectedUnitFilter === 'all'
                ? 'bg-rose-500 animate-pulse'
                : selectedUnitFilter === 'unit-01'
                ? 'bg-rose-500'
                : 'bg-amber-500'
            }`}
          />
          <span className="text-xs font-bold text-white truncate">
            {selectedUnitFilter === 'all'
              ? 'Todas as Unidades (Rede)'
              : currentUnitObj?.name || 'Unidade Selecionada'}
          </span>
        </div>
      </div>

      {/* Navigation Menu List */}
      <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-rose-600 text-white font-semibold shadow-md shadow-rose-900/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <Icon
                  className={`w-4 h-4 shrink-0 transition ${
                    isActive ? 'text-white' : 'text-slate-500 group-hover:text-rose-400'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`px-1.5 py-0.5 text-[10px] rounded-full font-mono ${
                    item.badgeColor || 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Brand Identity Guide Trigger in Sidebar */}
      <div className="p-3 border-t border-slate-800/80">
        <button
          onClick={() => setBrandModalOpen(true)}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-rose-500/30 text-rose-300 text-xs font-semibold transition"
        >
          <Sparkles className="w-4 h-4 text-rose-400 shrink-0" />
          <div className="text-left leading-tight truncate">
            <div className="text-white text-[11px] font-bold">Redesign TwoNine</div>
            <div className="text-[10px] text-slate-400">Ver identidade visual</div>
          </div>
        </button>
      </div>

      {/* Stores Mini Footer */}
      <div className="px-4 py-3 bg-slate-950/80 border-t border-slate-900 text-[10px] text-slate-400 flex items-center justify-between">
        <span>TwoNine Conveniência</span>
        <span className="font-mono text-slate-400">Desde 2017</span>
      </div>
    </aside>
  );
};
