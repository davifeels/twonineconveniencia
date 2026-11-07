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
  ArrowUpRight,
  ArrowDownRight,
  PackageCheck,
  Truck,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OverviewView: React.FC = () => {
  const { metrics, selectedUnitFilter, units, products, transfers, sales, movements, setActiveTab } =
    useApp();

  const activeUnitObj = units.find((u) => u.id === selectedUnitFilter);

  // Calculate unit distribution for chart
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

  // Category distribution
  const categories = Array.from(new Set(products.map((p) => p.category)));
  const categoryCounts = categories.map((cat) => {
    const prods = products.filter((p) => p.category === cat);
    const count = prods.reduce((acc, p) => {
      if (selectedUnitFilter === 'unit-01') return acc + (p.stock['unit-01'] || 0);
      if (selectedUnitFilter === 'unit-02') return acc + (p.stock['unit-02'] || 0);
      return acc + (p.stock['unit-01'] || 0) + (p.stock['unit-02'] || 0);
    }, 0);
    return { name: cat, count };
  });

  return (
    <div className="space-y-6">
      {/* Scope / Header notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-white">Visão Geral das Operações</h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Dados Demonstrativos Fictícios
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {selectedUnitFilter === 'all'
              ? 'Exibindo indicadores consolidados da rede TwoNine (Vila Buritis + Setor Tradicional).'
              : `Exibindo indicadores filtrados exclusivamente para: ${activeUnitObj?.name}.`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('transfers')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-rose-400" />
            <span>Nova Transferência</span>
          </button>
          <button
            onClick={() => setActiveTab('sales')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-semibold text-white shadow-md shadow-rose-950/40 transition"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Registrar Venda (PDV)</span>
          </button>
        </div>
      </div>

      {/* KPI METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Produtos */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Produtos Cadastrados
            </span>
            <div className="p-2 rounded-lg bg-slate-800 text-slate-300">
              <Boxes className="w-4 h-4 text-rose-400" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-white">{metrics.totalProducts}</div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1">
              <span className="text-emerald-400 font-semibold">{metrics.totalStockUnits} un</span>
              <span>em estoque físico</span>
            </div>
          </div>
        </div>

        {/* Card 2: Valor de Estoque */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Valor do Estoque (Custo)
            </span>
            <div className="p-2 rounded-lg bg-slate-800 text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-400">
              R$ {metrics.totalStockCostValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1">
              <span>Projeção de Venda:</span>
              <span className="text-slate-200 font-semibold">
                R$ {metrics.totalStockRetailValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Produtos com Baixo Estoque */}
        <div
          onClick={() => setActiveTab('alerts')}
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 cursor-pointer space-y-3 transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider group-hover:text-amber-400 transition">
              Alertas de Estoque
            </span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-amber-400">{metrics.lowStockCount}</div>
            <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
              <span>{metrics.outOfStockCount} esgotados</span>
              <span className="text-amber-400/90 font-medium group-hover:underline">Resolver →</span>
            </div>
          </div>
        </div>

        {/* Card 4: Transferências Pendentes */}
        <div
          onClick={() => setActiveTab('transfers')}
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-rose-500/40 cursor-pointer space-y-3 transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider group-hover:text-rose-400 transition">
              Transferências Ativas
            </span>
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-white">{metrics.pendingTransfersCount}</div>
            <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
              <span>{transfers.length} registradas total</span>
              <span className="text-rose-400 font-medium group-hover:underline">Ver fluxo →</span>
            </div>
          </div>
        </div>
      </div>

      {/* CHARTS & ANALYTICS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Comparativo de Vendas & Faturamento entre Unidades */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Store className="w-4 h-4 text-rose-500" />
                Comparativo de Vendas Fictícias por Unidade
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Distribuição percentual e receita demonstrativa acumulada
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Total R$ {totalSalesAll.toFixed(2)}
            </span>
          </div>

          {/* Bar comparison visualization */}
          <div className="space-y-4">
            {/* Vila Buritis bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  Unidade 01 — Vila Buritis (24h)
                </span>
                <span className="font-mono text-slate-300">
                  R$ {salesBuritis.toFixed(2)} ({buritisSalesPct}%)
                </span>
              </div>
              <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-rose-600 to-rose-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(buritisSalesPct, 4)}%` }}
                />
              </div>
            </div>

            {/* Setor Tradicional bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  Unidade 02 — Setor Tradicional
                </span>
                <span className="font-mono text-slate-300">
                  R$ {salesTradicional.toFixed(2)} ({tradicionalSalesPct}%)
                </span>
              </div>
              <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(tradicionalSalesPct, 4)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Mini Insights Box */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-400 shrink-0" />
              <span>A Unidade Vila Buritis responde por {buritisSalesPct}% das vendas demonstrativas graças à operação 24 Horas.</span>
            </span>
            <button
              onClick={() => setActiveTab('sales')}
              className="text-rose-400 hover:text-rose-300 font-semibold shrink-0 ml-2"
            >
              Ver vendas →
            </button>
          </div>
        </div>

        {/* Chart 2: Distribuição do Estoque Físico por Unidade */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Boxes className="w-4 h-4 text-rose-500" />
              Distribuição de Estoque Físico
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Saldo de unidades nas duas lojas</p>
          </div>

          {/* Gauge / Donut summary */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center space-y-3">
            <div className="relative w-32 h-32 flex items-center justify-center">
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
                <span className="text-xl font-black text-white">{buritisTotalUnits + tradicionalTotalUnits}</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400">Total Un.</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-2 text-center text-xs pt-2 border-t border-slate-800/80">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-[11px] text-slate-400">Vila Buritis</div>
                <div className="font-bold text-rose-400">{buritisTotalUnits} un ({buritisPercentage}%)</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-[11px] text-slate-400">Setor Tradicional</div>
                <div className="font-bold text-amber-400">{tradicionalTotalUnits} un ({tradicionalPercentage}%)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LOWER SECTION: TOP PRODUTOS & ÚLTIMAS MOVIMENTAÇÕES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Produtos com Maior Saída / Destaque */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Produtos com Maior Volume de Estoque
            </h3>
            <button
              onClick={() => setActiveTab('inventory')}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold"
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
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-white">{prod.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {prod.sku} • {prod.category}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-emerald-400">{totalStock} {prod.unit}</div>
                      <div className="text-[10px] text-slate-400">
                        R$ {prod.sellingPrice.toFixed(2)} unitário
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Últimas Movimentações do Período */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-rose-500" />
              Últimas Movimentações Auditadas
            </h3>
            <button
              onClick={() => setActiveTab('movements')}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold"
            >
              Histórico completo →
            </button>
          </div>

          <div className="space-y-2.5">
            {movements.slice(0, 5).map((mov) => {
              const unit = units.find((u) => u.id === mov.unitId);
              const isPositive = mov.quantity > 0;

              return (
                <div
                  key={mov.id}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                        isPositive
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {isPositive ? '+' : '-'}
                    </div>
                    <div>
                      <div className="font-bold text-white line-clamp-1">{mov.productName}</div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-2">
                        <span className="font-mono text-slate-300">{mov.referenceCode}</span>
                        <span>•</span>
                        <span>{unit?.shortName}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`font-mono font-bold ${
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
