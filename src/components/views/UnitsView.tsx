import React from 'react';
import {
  Store,
  MapPin,
  Clock,
  Phone,
  UserCheck,
  Flame,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const UnitsView: React.FC = () => {
  const {
    units,
    products,
    sales,
    transfers,
    movements,
    selectedUnitFilter,
    setSelectedUnitFilter,
    setActiveTab,
  } = useApp();

  return (
    <div className="space-y-6">
      {/* Header & Filter Controller */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <Store className="w-6 h-6 text-rose-500" />
              Gestão das Unidades Físicas (Planaltina-DF)
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30 font-bold">
              2 Unidades Operacionais
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Acompanhe estoques de essências, carvões, caixas e vendas específicas de cada ponto de atendimento.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setSelectedUnitFilter('all')}
            className={`px-3.5 py-2 rounded-xl transition ${
              selectedUnitFilter === 'all'
                ? 'bg-rose-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Todas as Lojas
          </button>
          {units.map((u) => (
            <button
              key={u.id}
              onClick={() => setSelectedUnitFilter(u.id)}
              className={`px-3.5 py-2 rounded-xl transition ${
                selectedUnitFilter === u.id
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {u.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* 2 Detailed Store Cards Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {units.map((unit) => {
          const isSelected = selectedUnitFilter === unit.id || selectedUnitFilter === 'all';

          // Unit specific calculations
          const unitProducts = products.filter((p) => (p.stock[unit.id] || 0) > 0);
          const totalStockUnits = products.reduce((acc, p) => acc + (p.stock[unit.id] || 0), 0);
          const totalCostValue = products.reduce(
            (acc, p) => acc + (p.stock[unit.id] || 0) * p.costPrice,
            0
          );
          const unitSales = sales.filter((s) => s.unitId === unit.id);
          const unitRevenue = unitSales.reduce((acc, s) => acc + s.totalAmount, 0);

          return (
            <div
              key={unit.id}
              className={`rounded-2xl border transition-all duration-300 p-6 space-y-6 ${
                isSelected
                  ? 'bg-slate-900 border-slate-700 shadow-2xl'
                  : 'bg-slate-900/50 border-slate-800/80 opacity-60'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full"
                      style={{ backgroundColor: unit.color }}
                    />
                    <h3 className="text-xl font-black text-white">{unit.name}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span className="font-semibold">{unit.address}</span>
                  </div>
                  <span className="text-[11px] text-rose-400 font-mono block">
                    📍 Referência Oficial: {unit.reference}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedUnitFilter(unit.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition ${
                    selectedUnitFilter === unit.id
                      ? 'bg-rose-500 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {selectedUnitFilter === unit.id ? 'Foco Ativo' : 'Filtrar Loja'}
                </button>
              </div>

              {/* Operational Meta Info */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-0.5 font-mono">
                    Horário de Turno
                  </span>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-rose-400" />
                    {unit.operatingHours}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-0.5 font-mono">
                    Gerência Local
                  </span>
                  <div className="font-bold text-white truncate flex items-center gap-1.5">
                    <UserCheck className="w-3 h-3 text-emerald-400" />
                    {unit.manager}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-0.5 font-mono">
                    Telefone
                  </span>
                  <div className="font-bold text-white flex items-center gap-1.5 font-mono">
                    <Phone className="w-3 h-3 text-slate-400" />
                    {unit.phone}
                  </div>
                </div>
              </div>

              {/* KPIs for this store */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 uppercase block font-mono">Itens Físicos</span>
                  <span className="text-xl font-black text-rose-400">{totalStockUnits} un</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 uppercase block font-mono">SKUs em Linha</span>
                  <span className="text-xl font-black text-white">{unitProducts.length} itens</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 uppercase block font-mono">Capital em Custo</span>
                  <span className="text-xl font-black text-emerald-400">
                    R$ {totalCostValue.toFixed(0)}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 uppercase block font-mono">Vendas Demo</span>
                  <span className="text-xl font-black text-white">
                    R$ {unitRevenue.toFixed(0)}
                  </span>
                </div>
              </div>

              {/* Quick Actions for this store */}
              <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
                <button
                  onClick={() => {
                    setSelectedUnitFilter(unit.id);
                    setActiveTab('inventory');
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 transition text-center"
                >
                  Consultar Estoque Desta Loja
                </button>
                <button
                  onClick={() => {
                    setSelectedUnitFilter(unit.id);
                    setActiveTab('transfers');
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-bold transition text-center"
                >
                  Transferir Mercadoria
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
