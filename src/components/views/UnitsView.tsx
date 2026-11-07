import React from 'react';
import {
  Store,
  MapPin,
  Clock,
  Phone,
  UserCheck,
  Calendar,
  Boxes,
  DollarSign,
  ShoppingCart,
  ArrowRightLeft,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UnitId } from '../../types';

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-white">Gestão Multiunidade</h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              2 Unidades Operacionais
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Acompanhe o desempenho, estoque físico e movimentações de cada loja em Planaltina-DF.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setSelectedUnitFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition ${
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
              className={`px-3 py-1.5 rounded-lg transition ${
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
          const totalRetailValue = products.reduce(
            (acc, p) => acc + (p.stock[unit.id] || 0) * p.sellingPrice,
            0
          );
          const unitSales = sales.filter((s) => s.unitId === unit.id);
          const unitRevenue = unitSales.reduce((acc, s) => acc + s.totalAmount, 0);

          const unitTransfersOut = transfers.filter((t) => t.fromUnitId === unit.id).length;
          const unitTransfersIn = transfers.filter((t) => t.toUnitId === unit.id).length;

          const unitMovements = movements.filter((m) => m.unitId === unit.id);

          return (
            <div
              key={unit.id}
              className={`rounded-2xl border transition-all duration-300 p-6 space-y-6 ${
                isSelected
                  ? 'bg-slate-900 border-slate-700 shadow-xl'
                  : 'bg-slate-900/50 border-slate-800/80 opacity-60'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: unit.color }}
                    />
                    <h3 className="text-lg font-black text-white">{unit.name}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>{unit.address}, {unit.city}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedUnitFilter(unit.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition ${
                    selectedUnitFilter === unit.id
                      ? 'bg-rose-500 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {selectedUnitFilter === unit.id ? 'Ativa' : 'Focar'}
                </button>
              </div>

              {/* Operational Meta Info */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-0.5">
                    Horário
                  </span>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-rose-400" />
                    {unit.operatingHours}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-0.5">
                    Gerência Local
                  </span>
                  <div className="font-bold text-white truncate flex items-center gap-1.5">
                    <UserCheck className="w-3 h-3 text-emerald-400" />
                    {unit.manager.split(' ')[0]} {unit.manager.split(' ')[1] || ''}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-0.5">
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
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 uppercase block">Estoque Físico</span>
                  <span className="text-lg font-black text-rose-400">{totalStockUnits} un</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 uppercase block">SKUs com Saldo</span>
                  <span className="text-lg font-black text-white">{unitProducts.length} itens</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 uppercase block">Valor em Estoque</span>
                  <span className="text-lg font-black text-emerald-400">
                    R$ {totalCostValue.toFixed(0)}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 uppercase block">Vendas Demo</span>
                  <span className="text-lg font-black text-white">
                    R$ {unitRevenue.toFixed(0)}
                  </span>
                </div>
              </div>

              {/* Quick Actions for this store */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => {
                    setSelectedUnitFilter(unit.id);
                    setActiveTab('inventory');
                  }}
                  className="flex-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition text-center"
                >
                  Ver Estoque Desta Loja
                </button>
                <button
                  onClick={() => {
                    setSelectedUnitFilter(unit.id);
                    setActiveTab('transfers');
                  }}
                  className="flex-1 py-2 rounded-lg bg-rose-600/15 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-semibold transition text-center"
                >
                  Transferir Mercadoria
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparative Cross-Store Table */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white">Comparativo Direto entre Lojas</h3>
            <p className="text-xs text-slate-400">Equilíbrio de estoque e distribuição de volume</p>
          </div>
          <span className="text-xs text-slate-400 font-mono">2 Lojas Sincronizadas</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px]">
              <tr>
                <th className="p-3 rounded-l-lg">Métrica de Operação</th>
                <th className="p-3 text-rose-400">Unidade 01 — Vila Buritis</th>
                <th className="p-3 text-amber-400">Unidade 02 — Setor Tradicional</th>
                <th className="p-3 rounded-r-lg text-right">Total Consolidado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              <tr>
                <td className="p-3 font-semibold text-white">Volume de Itens Físicos</td>
                <td className="p-3 font-mono font-bold text-slate-300">
                  {products.reduce((acc, p) => acc + (p.stock['unit-01'] || 0), 0)} un
                </td>
                <td className="p-3 font-mono font-bold text-slate-300">
                  {products.reduce((acc, p) => acc + (p.stock['unit-02'] || 0), 0)} un
                </td>
                <td className="p-3 font-mono font-bold text-emerald-400 text-right">
                  {products.reduce(
                    (acc, p) => acc + (p.stock['unit-01'] || 0) + (p.stock['unit-02'] || 0),
                    0
                  )} un
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Patrimônio em Custo (R$)</td>
                <td className="p-3 font-mono text-slate-300">
                  R${' '}
                  {products
                    .reduce((acc, p) => acc + (p.stock['unit-01'] || 0) * p.costPrice, 0)
                    .toFixed(2)}
                </td>
                <td className="p-3 font-mono text-slate-300">
                  R${' '}
                  {products
                    .reduce((acc, p) => acc + (p.stock['unit-02'] || 0) * p.costPrice, 0)
                    .toFixed(2)}
                </td>
                <td className="p-3 font-mono font-bold text-emerald-400 text-right">
                  R${' '}
                  {products
                    .reduce(
                      (acc, p) =>
                        acc +
                        ((p.stock['unit-01'] || 0) + (p.stock['unit-02'] || 0)) * p.costPrice,
                      0
                    )
                    .toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Vendas Demonstrativas (R$)</td>
                <td className="p-3 font-mono text-slate-300">
                  R${' '}
                  {sales
                    .filter((s) => s.unitId === 'unit-01')
                    .reduce((a, b) => a + b.totalAmount, 0)
                    .toFixed(2)}
                </td>
                <td className="p-3 font-mono text-slate-300">
                  R${' '}
                  {sales
                    .filter((s) => s.unitId === 'unit-02')
                    .reduce((a, b) => a + b.totalAmount, 0)
                    .toFixed(2)}
                </td>
                <td className="p-3 font-mono font-bold text-emerald-400 text-right">
                  R$ {sales.reduce((a, b) => a + b.totalAmount, 0).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Produtos em Ruptura ou Baixo Saldo</td>
                <td className="p-3 font-mono text-amber-400">
                  {products.filter((p) => (p.stock['unit-01'] || 0) <= p.minStock).length} itens
                </td>
                <td className="p-3 font-mono text-amber-400">
                  {products.filter((p) => (p.stock['unit-02'] || 0) <= p.minStock).length} itens
                </td>
                <td className="p-3 font-mono text-amber-400 text-right">
                  {products.filter(
                    (p) =>
                      (p.stock['unit-01'] || 0) <= p.minStock ||
                      (p.stock['unit-02'] || 0) <= p.minStock
                  ).length} alertas
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
