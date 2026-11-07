import React, { useState } from 'react';
import {
  History,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRightLeft,
  SlidersHorizontal,
  ShoppingCart,
  Truck,
  Calendar,
  Store,
  User,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MovementType, UnitId } from '../../types';

export const MovementsView: React.FC = () => {
  const { movements, units, selectedUnitFilter } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredMovements = movements.filter((m) => {
    // Unit scope
    if (selectedUnitFilter !== 'all' && m.unitId !== selectedUnitFilter) {
      return false;
    }

    // Type filter
    if (selectedType !== 'all' && m.type !== selectedType) {
      return false;
    }

    // Search filter
    const matchesSearch =
      m.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.referenceCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.operator.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const getMovementMeta = (type: MovementType) => {
    switch (type) {
      case 'venda':
        return {
          label: 'Venda de Balcão',
          badge: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
          icon: ShoppingCart,
        };
      case 'compra_entrada':
        return {
          label: 'Entrada por Compra',
          badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
          icon: Truck,
        };
      case 'transferencia_saida':
        return {
          label: 'Transferência (Expedição)',
          badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
          icon: ArrowRightLeft,
        };
      case 'transferencia_entrada':
        return {
          label: 'Transferência (Recepção)',
          badge: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
          icon: ArrowRightLeft,
        };
      case 'ajuste_inventario':
        return {
          label: 'Ajuste Manual',
          badge: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
          icon: SlidersHorizontal,
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-white">Trilha de Auditoria de Movimentações</h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {filteredMovements.length} registros auditados
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Rastreabilidade contínua de entradas de mercadorias, saídas de caixa, remessas entre lojas e correções físicas.
          </p>
        </div>

        <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
          Escopo: {selectedUnitFilter === 'all' ? 'Toda a Rede' : units.find((u) => u.id === selectedUnitFilter)?.shortName}
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filtrar por produto, operador ou código..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-rose-500 cursor-pointer"
          >
            <option value="all">Todos os Tipos de Movimentação</option>
            <option value="venda">Vendas (Saídas)</option>
            <option value="compra_entrada">Compras (Entradas)</option>
            <option value="transferencia_saida">Transferência - Saída</option>
            <option value="transferencia_entrada">Transferência - Entrada</option>
            <option value="ajuste_inventario">Ajustes Manuais</option>
          </select>
        </div>
      </div>

      {/* Movements Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-3.5">Data & Hora</th>
                <th className="p-3.5">Unidade</th>
                <th className="p-3.5">Tipo / Código</th>
                <th className="p-3.5">Produto Movimentado</th>
                <th className="p-3.5 text-center">Variação</th>
                <th className="p-3.5 text-center">Saldo (Antes → Novo)</th>
                <th className="p-3.5">Operador / Detalhes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredMovements.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500 text-xs">
                    Nenhuma movimentação localizada para o critério selecionado.
                  </td>
                </tr>
              ) : (
                filteredMovements.map((m) => {
                  const unit = units.find((u) => u.id === m.unitId);
                  const meta = getMovementMeta(m.type);
                  const isPositive = m.quantity > 0;

                  return (
                    <tr key={m.id} className="hover:bg-slate-800/40 transition group">
                      <td className="p-3.5 font-mono text-slate-400">
                        {m.date}
                      </td>
                      <td className="p-3.5 font-semibold text-white">
                        {unit?.shortName}
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full border text-[10px] font-semibold ${meta.badge}`}
                        >
                          {meta.label}
                        </span>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                          {m.referenceCode}
                        </div>
                      </td>
                      <td className="p-3.5 font-bold text-white">
                        {m.productName}
                      </td>
                      <td className="p-3.5 text-center font-mono font-bold">
                        <span
                          className={`px-2 py-0.5 rounded ${
                            isPositive
                              ? 'bg-emerald-500/15 text-emerald-400'
                              : 'bg-rose-500/15 text-rose-400'
                          }`}
                        >
                          {isPositive ? `+${m.quantity}` : m.quantity} un
                        </span>
                      </td>
                      <td className="p-3.5 text-center font-mono text-slate-400">
                        <span>{m.previousStock} un</span>
                        <span className="mx-1.5 text-slate-600">→</span>
                        <strong className="text-white">{m.newStock} un</strong>
                      </td>
                      <td className="p-3.5 max-w-xs text-slate-400">
                        <div className="text-slate-300 font-medium">{m.operator}</div>
                        {m.notes && (
                          <div className="text-[10px] text-slate-500 truncate mt-0.5">
                            {m.notes}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
