import React from 'react';
import {
  Boxes,
  DollarSign,
  AlertTriangle,
  ArrowRightLeft,
  ShoppingCart,
  TrendingUp,
  Activity,
  Store,
  Sparkles,
  Flame,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OverviewView: React.FC = () => {
  const { metrics, selectedUnitFilter, units, products, transfers, sales, movements, setActiveTab } =
    useApp();

  const activeUnitObj = units.find((u) => u.id === selectedUnitFilter);

  // Unit distribution calculations
  const buritisTotalUnits = products.reduce((acc, p) => acc + (p.stock['unit-01'] || 0), 0);
  const tradicionalTotalUnits = products.reduce((acc, p) => acc + (p.stock['unit-02'] || 0), 0);
  const grandTotalUnits = buritisTotalUnits + tradicionalTotalUnits || 1;

  const buritisPercentage = Math.round((buritisTotalUnits / grandTotalUnits) * 100);
  const tradicionalPercentage = 100 - buritisPercentage;

  // Sales per store
  const salesBuritis = sales
    .filter((s) => s.unitId === 'unit-01')
    .reduce((a, b) => a + b.totalAmount, 0);

  const salesTradicional = sales
    .filter((s) => s.unitId === 'unit-02')
    .reduce((a, b) => a + b.totalAmount, 0);

  const totalSalesAll = salesBuritis + salesTradicional || 1;
  const buritisSalesPct = Math.round((salesBuritis / totalSalesAll) * 100);
  const tradicionalSalesPct = 100 - buritisSalesPct;

  return (
    <div className="space-y-6">
      {/* Enterprise Widescreen Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <Flame className="w-6 h-6 text-rose-500" />
              Painel Operacional — TwoNine Tabacaria & Conveniência
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30 font-bold">
              🔞 18+ Lounge & Varejo
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Desde 2017
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {selectedUnitFilter === 'all'
              ? 'Visão consolidada da rede TwoNine: Vila Buritis (na rua da Escola Paraná • 24h) + Setor Tradicional.'
              : `Operação focada exclusivamente na unidade: ${activeUnitObj?.name} (${activeUnitObj?.operatingHours}).`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setActiveTab('transfers')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 transition"
          >
            <ArrowRightLeft className="w-4 h-4 text-rose-400" />
            <span>Transferir Carvões / Essências</span>
          </button>
          <button
            onClick={() => setActiveTab('sales')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white shadow-lg shadow-rose-950/40 transition"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>PDV Balcão (Caixa Rápido)</span>
          </button>
        </div>
      </div>

      {/* 4 HIGH-IMPACT ENTERPRISE METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: SKUs e Volume */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Catálogo & Itens Ativos
            </span>
            <div className="p-2 rounded-xl bg-slate-800 text-slate-300">
              <Boxes className="w-4 h-4 text-rose-400" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-white">{metrics.totalProducts} SKUs</div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
              <span className="text-rose-400 font-bold">{metrics.totalStockUnits} un</span>
              <span>em estoque físico geral</span>
            </div>
          </div>
        </div>

        {/* Card 2: Valor do Estoque */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Patrimônio em Estoque (Custo)
            </span>
            <div className="p-2 rounded-xl bg-slate-800 text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-emerald-400">
              R$ {metrics.totalStockCostValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
              <span>Projeção de Venda:</span>
              <span className="text-white font-bold">
                R$ {metrics.totalStockRetailValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Alertas de Reposição */}
        <div
          onClick={() => setActiveTab('alerts')}
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 cursor-pointer space-y-3 transition group shadow-lg"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider group-hover:text-amber-400 transition">
              Reposição Preventiva
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-amber-400">{metrics.lowStockCount}</div>
            <div className="text-xs text-slate-400 mt-1 flex items-center justify-between">
              <span>{metrics.outOfStockCount} itens esgotados</span>
              <span className="text-amber-400 font-bold group-hover:underline">Equilibrar Lojas →</span>
            </div>
          </div>
        </div>

        {/* Card 4: Transferências Pendentes */}
        <div
          onClick={() => setActiveTab('transfers')}
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-rose-500/40 cursor-pointer space-y-3 transition group shadow-lg"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider group-hover:text-rose-400 transition">
              Transferências de Rota
            </span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-white">{metrics.pendingTransfersCount} ativas</div>
            <div className="text-xs text-slate-400 mt-1 flex items-center justify-between">
              <span>{transfers.length} registradas total</span>
              <span className="text-rose-400 font-bold group-hover:underline">Ver remessas →</span>
            </div>
          </div>
        </div>
      </div>

      {/* ENTERPRISE COMPARISON SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Comparativo de Faturamento entre Lojas */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 lg:col-span-2 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Store className="w-4 h-4 text-rose-500" />
                Comparativo de Faturamento por Unidade
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Vendas de tabacaria, bebidas, energéticos e gelos por turno
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
              Total Balcão: R$ {totalSalesAll.toFixed(2)}
            </span>
          </div>

          <div className="space-y-4">
            {/* Vila Buritis bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  <strong>Unidade 01 — Vila Buritis (24h • Rua da Escola Paraná)</strong>
                </span>
                <span className="font-mono text-white font-bold">
                  R$ {salesBuritis.toFixed(2)} ({buritisSalesPct}%)
                </span>
              </div>
              <div className="h-3.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-rose-600 to-rose-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(buritisSalesPct, 6)}%` }}
                />
              </div>
            </div>

            {/* Setor Tradicional bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <strong>Unidade 02 — Setor Tradicional (06h às 02h)</strong>
                </span>
                <span className="font-mono text-white font-bold">
                  R$ {salesTradicional.toFixed(2)} ({tradicionalSalesPct}%)
                </span>
              </div>
              <div className="h-3.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(tradicionalSalesPct, 6)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Sinergia Insight Banner */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-rose-400 shrink-0" />
              <span>A Unidade Vila Buritis lidera com {buritisSalesPct}% do movimento graças ao pico de fluxo de tabacaria na madrugada.</span>
            </span>
            <button
              onClick={() => setActiveTab('sales')}
              className="text-rose-400 hover:text-rose-300 font-bold shrink-0 ml-2"
            >
              Consultar Vendas →
            </button>
          </div>
        </div>

        {/* Distribuição do Estoque Físico por Unidade */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Boxes className="w-4 h-4 text-rose-500" />
              Distribuição de Estoque
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Saldo físico nas duas lojas</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center space-y-4">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-rose-500"
                  strokeDasharray={`${buritisPercentage}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-white">{buritisTotalUnits + tradicionalTotalUnits}</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400">Total Un.</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-2 text-center text-xs pt-2 border-t border-slate-800/80">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[11px] text-slate-400 font-semibold">Vila Buritis</div>
                <div className="font-bold text-rose-400 text-sm">{buritisTotalUnits} un ({buritisPercentage}%)</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[11px] text-slate-400 font-semibold">Setor Tradicional</div>
                <div className="font-bold text-amber-400 text-sm">{tradicionalTotalUnits} un ({tradicionalPercentage}%)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LOWER SECTION: TOP ITENS DE TABACARIA & AUDITORIA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Produtos em Destaque */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Itens com Maior Giro em Tabacaria & Bebidas
            </h3>
            <button
              onClick={() => setActiveTab('inventory')}
              className="text-xs text-rose-400 hover:text-rose-300 font-bold"
            >
              Ver todos →
            </button>
          </div>

          <div className="space-y-2.5">
            {products
              .sort((a, b) => {
                const totalA = (a.stock['unit-01'] || 0) + (a.stock['unit-02'] || 0);
                const totalB = (b.stock['unit-01'] || 0) + (b.stock['unit-02'] || 0);
                return totalB - totalA;
              })
              .slice(0, 5)
              .map((prod) => {
                const totalStock = (prod.stock['unit-01'] || 0) + (prod.stock['unit-02'] || 0);
                return (
                  <div
                    key={prod.id}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <span>{prod.name}</span>
                        {prod.ageRestricted && (
                          <span className="text-[9px] bg-rose-500/20 text-rose-300 px-1 rounded font-bold">18+</span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {prod.sku} • {prod.category}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-emerald-400 text-sm">{totalStock} {prod.unit}</div>
                      <div className="text-[10px] text-slate-400">
                        R$ {prod.sellingPrice.toFixed(2)} balcão
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Trilha de Auditoria Recente */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-rose-500" />
              Últimas Movimentações Auditadas
            </h3>
            <button
              onClick={() => setActiveTab('movements')}
              className="text-xs text-rose-400 hover:text-rose-300 font-bold"
            >
              Auditoria completa →
            </button>
          </div>

          <div className="space-y-2.5">
            {movements.slice(0, 5).map((mov) => {
              const unit = units.find((u) => u.id === mov.unitId);
              const isPositive = mov.quantity > 0;

              return (
                <div
                  key={mov.id}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${
                        isPositive
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {isPositive ? '+' : '-'}
                    </div>
                    <div>
                      <div className="font-bold text-white line-clamp-1">{mov.productName}</div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="font-mono text-slate-300">{mov.referenceCode}</span>
                        <span>•</span>
                        <span>{unit?.shortName}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`font-mono font-bold text-sm ${
                        isPositive ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {isPositive ? `+${mov.quantity}` : mov.quantity} un
                    </span>
                    <div className="text-[10px] text-slate-500">{mov.date.split(' ')[1] || mov.date}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
