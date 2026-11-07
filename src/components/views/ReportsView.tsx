import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  Printer,
  TrendingUp,
  Boxes,
  Store,
  DollarSign,
  PieChart,
  Percent,
  CheckCircle2,
  FileSpreadsheet,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ReportsView: React.FC = () => {
  const { products, sales, purchases, transfers, movements, units, selectedUnitFilter } = useApp();

  const [activeReportTab, setActiveReportTab] = useState<'margins' | 'stores' | 'turnover'>('margins');

  // Calculations
  const buritisStockVal = products.reduce(
    (acc, p) => acc + (p.stock['unit-01'] || 0) * p.costPrice,
    0
  );
  const tradicionalStockVal = products.reduce(
    (acc, p) => acc + (p.stock['unit-02'] || 0) * p.costPrice,
    0
  );

  const buritisSalesVal = sales
    .filter((s) => s.unitId === 'unit-01')
    .reduce((acc, s) => acc + s.totalAmount, 0);

  const tradicionalSalesVal = sales
    .filter((s) => s.unitId === 'unit-02')
    .reduce((acc, s) => acc + s.totalAmount, 0);

  const totalSalesVal = buritisSalesVal + tradicionalSalesVal || 1;

  // Margin Calculation
  const productsWithMargin = products.map((p) => {
    const grossProfit = p.sellingPrice - p.costPrice;
    const marginPercent = p.costPrice > 0 ? (grossProfit / p.sellingPrice) * 100 : 0;
    const markupPercent = p.costPrice > 0 ? (grossProfit / p.costPrice) * 100 : 0;
    const totalQty = (p.stock['unit-01'] || 0) + (p.stock['unit-02'] || 0);

    return {
      ...p,
      grossProfit,
      marginPercent,
      markupPercent,
      totalQty,
      projectedProfit: grossProfit * totalQty,
    };
  });

  // CSV Export simulation
  const exportToCSV = () => {
    const headers = 'SKU,Produto,Categoria,Custo(R$),Venda(R$),Margem(%),Buritis,Tradicional,Total\n';
    const rows = productsWithMargin
      .map(
        (p) =>
          `"${p.sku}","${p.name}","${p.category}",${p.costPrice.toFixed(2)},${p.sellingPrice.toFixed(
            2
          )},${p.marginPercent.toFixed(1)},${p.stock['unit-01'] || 0},${
            p.stock['unit-02'] || 0
          },${p.totalQty}`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'relatorio_twonine_estoque.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-white">Relatórios Gerenciais Demonstrativos</h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Análise Conceitual
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Consolidação de indicadores financeiros ilustrativos, curva de margens estimadas e desempenho por loja.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir</span>
          </button>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-semibold text-white shadow-md shadow-rose-950/40 transition"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Exportar CSV</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-semibold max-w-fit">
        <button
          onClick={() => setActiveReportTab('margins')}
          className={`px-4 py-2 rounded-xl transition ${
            activeReportTab === 'margins'
              ? 'bg-rose-600 text-white shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Margem Estimada por Produto
        </button>
        <button
          onClick={() => setActiveReportTab('stores')}
          className={`px-4 py-2 rounded-xl transition ${
            activeReportTab === 'stores'
              ? 'bg-rose-600 text-white shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Comparativo de Lojas & Estoque
        </button>
        <button
          onClick={() => setActiveReportTab('turnover')}
          className={`px-4 py-2 rounded-xl transition ${
            activeReportTab === 'turnover'
              ? 'bg-rose-600 text-white shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Balanço de Movimentações
        </button>
      </div>

      {/* TAB 1: MARGENS POR PRODUTO */}
      {activeReportTab === 'margins' && (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl space-y-4 p-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Percent className="w-4 h-4 text-emerald-400" />
                Margens de Contribuição e Lucro Bruto Teórico
              </h3>
              <p className="text-xs text-slate-400">
                Cálculo baseado nos custos e preços de venda cadastrados (dados demonstrativos).
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              Margem Média: ~47.4%
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-3">SKU / Produto</th>
                  <th className="p-3">Categoria</th>
                  <th className="p-3 text-right">Custo</th>
                  <th className="p-3 text-right">Venda</th>
                  <th className="p-3 text-right">Lucro Unitário</th>
                  <th className="p-3 text-center">Margem Bruta</th>
                  <th className="p-3 text-right">Potencial em Estoque</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {productsWithMargin.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-3">
                      <div className="font-bold text-white">{p.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{p.sku}</div>
                    </td>
                    <td className="p-3 text-slate-300">
                      <span className="text-[10px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {p.category}
                      </span>
                    </td>
                    <td className="p-3 text-right font-mono text-slate-400">
                      R$ {p.costPrice.toFixed(2)}
                    </td>
                    <td className="p-3 text-right font-mono font-bold text-white">
                      R$ {p.sellingPrice.toFixed(2)}
                    </td>
                    <td className="p-3 text-right font-mono text-emerald-400 font-bold">
                      +R$ {p.grossProfit.toFixed(2)}
                    </td>
                    <td className="p-3 text-center">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-mono font-bold text-[11px]">
                        {p.marginPercent.toFixed(1)}%
                      </span>
                    </td>
                    <td className="p-3 text-right font-mono font-bold text-slate-200">
                      R$ {p.projectedProfit.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: COMPARATIVO DE LOJAS */}
      {activeReportTab === 'stores' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Store className="w-5 h-5 text-rose-500" />
              Unidade 01 — Vila Buritis (24 Horas)
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Patrimônio em Custo:</span>
                <strong className="text-white font-mono">R$ {buritisStockVal.toFixed(2)}</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Vendas Demonstrativas Acumuladas:</span>
                <strong className="text-emerald-400 font-mono">R$ {buritisSalesVal.toFixed(2)}</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Participação no Faturamento Total:</span>
                <strong className="text-rose-400 font-mono">
                  {Math.round((buritisSalesVal / totalSalesVal) * 100)}%
                </strong>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Store className="w-5 h-5 text-amber-500" />
              Unidade 02 — Setor Tradicional
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Patrimônio em Custo:</span>
                <strong className="text-white font-mono">R$ {tradicionalStockVal.toFixed(2)}</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Vendas Demonstrativas Acumuladas:</span>
                <strong className="text-emerald-400 font-mono">R$ {tradicionalSalesVal.toFixed(2)}</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Participação no Faturamento Total:</span>
                <strong className="text-amber-400 font-mono">
                  {Math.round((tradicionalSalesVal / totalSalesVal) * 100)}%
                </strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BALANÇO DE MOVIMENTAÇÕES */}
      {activeReportTab === 'turnover' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-400 uppercase">Entradas por Compras</span>
              <div className="text-2xl font-black text-emerald-400 mt-1">
                {purchases.length} NF-e
              </div>
              <span className="text-[11px] text-slate-500">
                R$ {purchases.reduce((a, b) => a + b.totalCost, 0).toFixed(2)} investidos
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-400 uppercase">Transferências Internas</span>
              <div className="text-2xl font-black text-rose-400 mt-1">
                {transfers.length} ordens
              </div>
              <span className="text-[11px] text-slate-500">
                {transfers.reduce((a, b) => a + b.quantity, 0)} unidades movimentadas
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-400 uppercase">Vendas Registradas</span>
              <div className="text-2xl font-black text-white mt-1">
                {sales.length} cupons
              </div>
              <span className="text-[11px] text-slate-500">
                R$ {sales.reduce((a, b) => a + b.totalAmount, 0).toFixed(2)} em caixa
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
