import React from 'react';
import {
  AlertTriangle,
  ArrowRightLeft,
  Truck,
  Boxes,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  Store,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UnitId } from '../../types';

export const AlertsView: React.FC = () => {
  const { alerts, units, selectedUnitFilter, setSelectedUnitFilter, setActiveTab } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-white">Alertas Inteligentes de Reposição</h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {alerts.length} itens requerem atenção
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Identificação automática de produtos que atingiram ou romperam o ponto de reposição em cada loja.
          </p>
        </div>

        {/* Unit Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setSelectedUnitFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition ${
              selectedUnitFilter === 'all'
                ? 'bg-rose-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Todas
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

      {/* Main Alert Cards */}
      {alerts.length === 0 ? (
        <div className="p-12 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Estoque em Nível Saudável</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Nenhum produto está abaixo da margem mínima de segurança no escopo selecionado.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {alerts.map((alert) => {
            const hasOtherStoreSurplus = alert.otherUnitStock > alert.minStock;

            return (
              <div
                key={`${alert.productId}-${alert.unitId}`}
                className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between space-y-4 shadow-xl ${
                  alert.severity === 'critico'
                    ? 'bg-slate-900 border-rose-500/40 shadow-rose-950/20'
                    : 'bg-slate-900 border-amber-500/30 shadow-amber-950/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded-full border ${
                        alert.severity === 'critico'
                          ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                          : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {alert.severity === 'critico' ? 'Ruptura: Esgotado' : 'Estoque Baixo'}
                    </span>

                    <span className="text-[11px] font-semibold text-slate-400">
                      {alert.unitName}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug">{alert.productName}</h3>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    {alert.sku} • {alert.category}
                  </div>

                  {/* Stock metrics in this unit */}
                  <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 uppercase block">Saldo Atual</span>
                      <span
                        className={`text-lg font-black font-mono ${
                          alert.currentStock === 0 ? 'text-rose-400' : 'text-amber-400'
                        }`}
                      >
                        {alert.currentStock} un
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 uppercase block">Estoque Mínimo</span>
                      <span className="text-lg font-black font-mono text-white">
                        {alert.minStock} un
                      </span>
                    </div>
                  </div>

                  {/* Smart suggestion & Cross-store availability */}
                  <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Sugestão de Reposição:</span>
                      <strong className="text-emerald-400 font-mono font-bold">
                        +{alert.suggestedQuantity} un
                      </strong>
                    </div>

                    <div className="flex items-center justify-between text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                      <span>Saldo em {alert.otherUnitName}:</span>
                      <strong
                        className={`font-mono ${
                          hasOtherStoreSurplus ? 'text-emerald-400' : 'text-slate-400'
                        }`}
                      >
                        {alert.otherUnitStock} un{' '}
                        {hasOtherStoreSurplus && '(Excedente)'}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Smart Action Buttons */}
                <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
                  {hasOtherStoreSurplus ? (
                    <button
                      onClick={() => setActiveTab('transfers')}
                      className="w-full py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5" />
                      <span>Transferir de {alert.otherUnitName}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveTab('purchases')}
                      className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition flex items-center justify-center gap-1.5"
                    >
                      <Truck className="w-3.5 h-3.5 text-rose-400" />
                      <span>Gerar Pedido de Compra</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
