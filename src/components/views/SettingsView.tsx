import React from 'react';
import {
  RotateCcw,
  Store,
  ShieldCheck,
  Phone,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../BrandLogo';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const SettingsView: React.FC = () => {
  const { units, resetToMockData, setBrandModalOpen } = useApp();

  const handleReset = () => {
    if (
      window.confirm(
        'Tem certeza que deseja restaurar todos os dados para o padrão de demonstração de fábrica? Isso recarregará todos os estoques, vendas e transferências originais.'
      )
    ) {
      resetToMockData();
      alert('Dados demonstrativos restaurados com sucesso para o estado original.');
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-white">Configurações & Parâmetros do Sistema</h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              TwoNine Manager v2.6
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Cadastros gerais das lojas, parâmetros de estoque e controle de dados locais.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-500/30 text-xs font-semibold transition"
        >
          <RotateCcw className="w-4 h-4 text-rose-400" />
          <span>Restaurar Dados Demo</span>
        </button>
      </div>

      {/* Business Meta Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <BrandLogo size="md" variant="full" subtitle="conveniencia" />
          </div>
          <button
            onClick={() => setBrandModalOpen(true)}
            className="text-xs font-semibold text-rose-400 hover:underline flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guia de Identidade Visual</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
              Instagram Oficial
            </span>
            <div className="flex items-center gap-2 font-bold text-white">
              <InstagramIcon className="w-4 h-4 text-rose-500" />
              <span>@twonineconveniencia</span>
            </div>
            <span className="text-[10px] text-slate-500 mt-0.5 block">Atuação desde 2017</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
              Contato Principal
            </span>
            <div className="flex items-center gap-2 font-bold text-white font-mono">
              <Phone className="w-4 h-4 text-rose-500" />
              <span>(61) 99912-3530</span>
            </div>
            <span className="text-[10px] text-slate-500 mt-0.5 block">Planaltina - DF</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
              Unidades Operacionais
            </span>
            <div className="flex items-center gap-2 font-bold text-white">
              <Store className="w-4 h-4 text-rose-500" />
              <span>2 Lojas Ativas</span>
            </div>
            <span className="text-[10px] text-slate-500 mt-0.5 block">Buritis & Tradicional</span>
          </div>
        </div>
      </div>

      {/* Units Operational Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {units.map((unit) => (
          <div
            key={unit.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: unit.color }} />
                {unit.name}
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-950 font-mono text-slate-400">
                {unit.tag}
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300">
              <p>
                <strong className="text-slate-400">Endereço:</strong> {unit.address}, {unit.neighborhood}, {unit.city}
              </p>
              <p>
                <strong className="text-slate-400">Horário de Atendimento:</strong> {unit.operatingHours}
              </p>
              <p>
                <strong className="text-slate-400">Gerência Responsável:</strong> {unit.manager}
              </p>
              <p>
                <strong className="text-slate-400">Canal Direto:</strong> {unit.phone}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Project Ownership & Compliance Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <h4 className="font-bold text-white text-sm flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          Ficha Técnica & Transparência do Projeto
        </h4>
        <p className="text-xs text-slate-400 leading-relaxed">
          Projeto demonstrativo desenvolvido por <strong className="text-white">Davi Anderson</strong>. Esta apresentação é conceitual e não representa um sistema oficial da TwoNine Conveniência.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <strong className="text-slate-300 block mb-1">Tecnologias</strong>
            React 19, TypeScript, Tailwind CSS v4, Lucide Icons, LocalStorage Engine
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <strong className="text-slate-300 block mb-1">Ambientes</strong>
            Landing Page Comercial + Dashboard Administrativo Multiunidade
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <strong className="text-slate-300 block mb-1">Dados Demonstrativos</strong>
            Produtos, fornecedores, custos e vendas simulados para fins de validação
          </div>
        </div>
      </div>
    </div>
  );
};
