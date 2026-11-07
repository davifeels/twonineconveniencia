import React, { useState } from 'react';
import {
  ArrowRightLeft,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  Plus,
  AlertCircle,
  Store,
  Boxes,
  ShieldCheck,
  User,
  ArrowRight,
  FileText,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UnitId, TransferStatus } from '../../types';

export const TransfersView: React.FC = () => {
  const {
    transfers,
    products,
    units,
    executeTransfer,
    updateTransferStatus,
    selectedUnitFilter,
  } = useApp();

  // New Transfer Form State
  const [modalOpen, setModalOpen] = useState(false);
  const [fromUnitId, setFromUnitId] = useState<UnitId>('unit-01');
  const [toUnitId, setToUnitId] = useState<UnitId>('unit-02');
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');
  const [quantity, setQuantity] = useState<number>(5);
  const [status, setStatus] = useState<TransferStatus>('concluida');
  const [requester, setRequester] = useState<string>('Amanda Cristina (Gerente Tradicional)');
  const [notes, setNotes] = useState<string>('Reposição emergencial para o final de semana.');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successFeedback, setSuccessFeedback] = useState<string | null>(null);

  // Selected Product and Available Balance Calculation
  const selectedProduct = products.find((p) => p.id === selectedProductId);
  const availableOriginStock = selectedProduct?.stock[fromUnitId] || 0;
  const currentDestStock = selectedProduct?.stock[toUnitId] || 0;

  // Filter transfers if store filter is active
  const filteredTransfers = transfers.filter((t) => {
    if (selectedUnitFilter === 'all') return true;
    return t.fromUnitId === selectedUnitFilter || t.toUnitId === selectedUnitFilter;
  });

  const handleOpenModal = () => {
    setErrorMessage(null);
    setSuccessFeedback(null);
    setModalOpen(true);
  };

  const handleExecute = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (fromUnitId === toUnitId) {
      setErrorMessage('A unidade de origem e de destino não podem ser as mesmas.');
      return;
    }

    if (quantity <= 0) {
      setErrorMessage('Informe uma quantidade maior que zero.');
      return;
    }

    if (quantity > availableOriginStock) {
      setErrorMessage(
        `Saldo insuficiente em ${
          units.find((u) => u.id === fromUnitId)?.shortName
        }! Disponível: ${availableOriginStock} un, Solicitado: ${quantity} un.`
      );
      return;
    }

    const res = executeTransfer({
      fromUnitId,
      toUnitId,
      productId: selectedProductId,
      quantity: Number(quantity),
      status,
      requester,
      notes,
    });

    if (res.success) {
      setSuccessFeedback(res.message);
      setTimeout(() => {
        setModalOpen(false);
        setSuccessFeedback(null);
      }, 1400);
    } else {
      setErrorMessage(res.message);
    }
  };

  const getStatusBadge = (st: TransferStatus) => {
    switch (st) {
      case 'concluida':
        return {
          label: 'Concluída',
          color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
          icon: CheckCircle2,
        };
      case 'em_transito':
        return {
          label: 'Em Trânsito',
          color: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
          icon: Truck,
        };
      case 'pendente':
        return {
          label: 'Pendente',
          color: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
          icon: Clock,
        };
      case 'cancelada':
        return {
          label: 'Cancelada',
          color: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
          icon: XCircle,
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-white">Transferências entre Lojas</h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
              Módulo Crítico Multiunidade
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Mova estoques com segurança entre a Vila Buritis e o Setor Tradicional com validação de saldo e conciliação em tempo real.
          </p>
        </div>

        <button
          onClick={handleOpenModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-950/50 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Nova Transferência</span>
        </button>
      </div>

      {/* Instructional Example Banner */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Store className="w-5 h-5" />
          </div>
          <div className="text-xs text-slate-300">
            <strong className="text-white block">Regra de Segurança de Estoque:</strong>
            O sistema não permite transferências superiores ao saldo real existente na loja de origem. Ao concluir a transferência, o estoque de origem é deduzido e o destino é acrescido automaticamente.
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 shrink-0">
          <span>Origem: -Qtd</span>
          <span>→</span>
          <span className="text-emerald-400">Destino: +Qtd</span>
        </div>
      </div>

      {/* Transfers List Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-3.5">Código / Data</th>
                <th className="p-3.5">Origem → Destino</th>
                <th className="p-3.5">Produto Transferido</th>
                <th className="p-3.5 text-center">Quantidade</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5">Responsável / Observações</th>
                <th className="p-3.5 text-right">Ação de Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredTransfers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500 text-xs">
                    Nenhuma transferência registrada para o filtro atual.
                  </td>
                </tr>
              ) : (
                filteredTransfers.map((t) => {
                  const fromUnit = units.find((u) => u.id === t.fromUnitId);
                  const toUnit = units.find((u) => u.id === t.toUnitId);
                  const badge = getStatusBadge(t.status);
                  const StatusIcon = badge.icon;

                  return (
                    <tr key={t.id} className="hover:bg-slate-800/40 transition group">
                      {/* Code & Date */}
                      <td className="p-3.5">
                        <div className="font-mono font-bold text-white group-hover:text-rose-400 transition">
                          {t.code}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">{t.date}</div>
                      </td>

                      {/* From -> To */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5 font-medium">
                          <span className="text-slate-200">{fromUnit?.shortName}</span>
                          <ArrowRight className="w-3 h-3 text-rose-500" />
                          <span className="text-slate-200">{toUnit?.shortName}</span>
                        </div>
                      </td>

                      {/* Product */}
                      <td className="p-3.5">
                        <div className="font-semibold text-white">{t.productName}</div>
                      </td>

                      {/* Quantity */}
                      <td className="p-3.5 text-center">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 font-mono font-bold text-white text-xs">
                          {t.quantity} un
                        </span>
                      </td>

                      {/* Status */}
                      <td className="p-3.5 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[10px] font-semibold ${badge.color}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          <span>{badge.label}</span>
                        </span>
                      </td>

                      {/* Notes / Operator */}
                      <td className="p-3.5 text-slate-400 max-w-xs">
                        <div className="text-slate-300 font-medium">{t.requester}</div>
                        {t.driverNotes && (
                          <div className="text-[11px] text-slate-500 truncate mt-0.5">
                            {t.driverNotes}
                          </div>
                        )}
                      </td>

                      {/* Quick Status Transition Actions */}
                      <td className="p-3.5 text-right">
                        {t.status === 'pendente' && (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => updateTransferStatus(t.id, 'em_transito')}
                              className="px-2 py-1 rounded bg-blue-600/20 text-blue-300 border border-blue-500/30 hover:bg-blue-600/30 text-[10px] font-semibold transition"
                            >
                              Despachar
                            </button>
                            <button
                              onClick={() => updateTransferStatus(t.id, 'concluida')}
                              className="px-2 py-1 rounded bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 text-[10px] font-semibold transition"
                            >
                              Concluir
                            </button>
                          </div>
                        )}

                        {t.status === 'em_transito' && (
                          <button
                            onClick={() => updateTransferStatus(t.id, 'concluida')}
                            className="px-2.5 py-1 rounded bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/40 text-[10px] font-semibold transition flex items-center gap-1 ml-auto"
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Confirmar Entrega</span>
                          </button>
                        )}

                        {t.status === 'concluida' && (
                          <span className="text-[11px] text-slate-500 font-mono">
                            {t.completedAt?.split(' ')[1] || 'Concluído'}
                          </span>
                        )}

                        {t.status === 'cancelada' && (
                          <span className="text-[11px] text-slate-600 font-mono">Cancelada</span>
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

      {/* NEW TRANSFER MODAL WITH REAL-TIME BALANCE CHECK */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  <ArrowRightLeft className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Registrar Transferência entre Lojas</h3>
                  <p className="text-[11px] text-slate-400">TwoNine Conveniência • Fluxo Validador</p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                ✕ Fechar
              </button>
            </div>

            {/* Error or Success notification */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}
            {successFeedback && (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{successFeedback}</span>
              </div>
            )}

            <form onSubmit={handleExecute} className="space-y-4 text-xs">
              {/* Step 1 & 2: Stores Origin and Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">
                    1. Unidade de Origem (Saída)
                  </label>
                  <select
                    value={fromUnitId}
                    onChange={(e) => {
                      const u = e.target.value as UnitId;
                      setFromUnitId(u);
                      if (u === toUnitId) {
                        setToUnitId(u === 'unit-01' ? 'unit-02' : 'unit-01');
                      }
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-500 cursor-pointer"
                  >
                    {units.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">
                    2. Unidade de Destino (Entrada)
                  </label>
                  <select
                    value={toUnitId}
                    onChange={(e) => {
                      const u = e.target.value as UnitId;
                      setToUnitId(u);
                      if (u === fromUnitId) {
                        setFromUnitId(u === 'unit-01' ? 'unit-02' : 'unit-01');
                      }
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-500 cursor-pointer"
                  >
                    {units.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Step 3: Product Select */}
              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  3. Selecionar Produto do Catálogo
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-500 cursor-pointer"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {p.sku} (Origem: {p.stock[fromUnitId] || 0} {p.unit})
                    </option>
                  ))}
                </select>
              </div>

              {/* Step 4 & 5: Real-time Balance Box */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">
                    Saldo Disponível na Origem ({units.find((u) => u.id === fromUnitId)?.shortName})
                  </span>
                  <div
                    className={`text-lg font-black font-mono ${
                      availableOriginStock > 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {availableOriginStock} {selectedProduct?.unit || 'un'}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">
                    Saldo Atual no Destino ({units.find((u) => u.id === toUnitId)?.shortName})
                  </span>
                  <div className="text-lg font-black font-mono text-white">
                    {currentDestStock} {selectedProduct?.unit || 'un'}
                  </div>
                </div>
              </div>

              {/* Step 4: Inform Quantity & Status */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">
                    4. Quantidade a Transferir
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={availableOriginStock}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono text-sm focus:outline-none focus:border-rose-500"
                  />
                  {quantity > availableOriginStock && (
                    <span className="text-[10px] text-rose-400 mt-1 block">
                      Excede o saldo disponível de {availableOriginStock} un!
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">
                    Status Inicial da Transferência
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as TransferStatus)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="concluida">Concluída (Aplica baixa e entrada imediata)</option>
                    <option value="em_transito">Em Trânsito (Baixa origem, aguarda entrega)</option>
                    <option value="pendente">Pendente (Reserva para separação)</option>
                  </select>
                </div>
              </div>

              {/* Requester & Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Solicitante</label>
                  <input
                    type="text"
                    value={requester}
                    onChange={(e) => setRequester(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Observações de Rota</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ex: Veículo próprio TwoNine, motorista..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={availableOriginStock <= 0 || quantity > availableOriginStock}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold shadow-lg shadow-rose-950/40 transition"
                >
                  Confirmar Transferência
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
