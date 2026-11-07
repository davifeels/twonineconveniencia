import React, { useState } from 'react';
import {
  Users,
  Plus,
  Phone,
  Mail,
  Clock,
  Star,
  FileText,
  Search,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Supplier } from '../../types';

export const SuppliersView: React.FC = () => {
  const { suppliers, purchases, createSupplier, setActiveTab } = useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    cnpj: '',
    contactName: '',
    phone: '',
    email: '',
    category: 'Bebidas & Energéticos',
    leadTimeDays: 2,
    rating: 4.8,
  });

  const filteredSuppliers = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.cnpj.includes(searchTerm) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    createSupplier({
      name: formData.name,
      cnpj: formData.cnpj || '00.000.000/0001-00',
      contactName: formData.contactName || 'Representante Comercial',
      phone: formData.phone || '(61) 3389-0000',
      email: formData.email || 'comercial@fornecedor.com.br',
      category: formData.category,
      leadTimeDays: Number(formData.leadTimeDays),
      rating: Number(formData.rating),
    });

    setModalOpen(false);
    setFormData({
      name: '',
      cnpj: '',
      contactName: '',
      phone: '',
      email: '',
      category: 'Bebidas & Energéticos',
      leadTimeDays: 2,
      rating: 4.8,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-white">Gestão de Fornecedores</h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {suppliers.length} parceiros homologados
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Controle de fornecedores com prazos médios de entrega, canais de pedidos e histórico.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-950/40 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Fornecedor</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Buscar fornecedor por nome, CNPJ ou categoria..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
        />
      </div>

      {/* Suppliers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map((supplier) => {
          const supplierOrders = purchases.filter((p) => p.supplierId === supplier.id);
          const totalSpent = supplierOrders.reduce((acc, curr) => acc + curr.totalCost, 0);

          return (
            <div
              key={supplier.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800">
                    {supplier.category}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{supplier.rating.toFixed(1)}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">{supplier.name}</h3>
                <span className="text-[11px] font-mono text-slate-500 block mt-0.5">
                  CNPJ: {supplier.cnpj}
                </span>

                <div className="space-y-1.5 text-xs text-slate-400 mt-4 border-t border-slate-800/80 pt-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-slate-500" />
                    <span>Contato: <strong className="text-slate-300">{supplier.contactName}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    <span className="font-mono">{supplier.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 truncate">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span className="truncate">{supplier.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>Prazo de Entrega: <strong className="text-slate-300">{supplier.leadTimeDays} dia(s)</strong></span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  {supplierOrders.length} ordens de compra
                </span>
                <span className="font-mono font-bold text-emerald-400">
                  R$ {totalSpent.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Novo Fornecedor Homologado</h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                ✕ Fechar
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Razão Social / Nome</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Bebidas Planalto Central Distribuidora"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">CNPJ</label>
                  <input
                    type="text"
                    value={formData.cnpj}
                    onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                    placeholder="00.000.000/0001-00"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Categoria Principal</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Nome do Contato</label>
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Telefone / WhatsApp</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(61) 99999-9999"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">E-mail</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Prazo Médio (Dias)</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.leadTimeDays}
                    onChange={(e) => setFormData({ ...formData, leadTimeDays: parseInt(e.target.value) || 1 })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
              </div>
            </div>

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
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
              >
                Salvar Fornecedor
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
