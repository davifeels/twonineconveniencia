import React from 'react';
import {
  RotateCcw,
  Store,
  ShieldCheck,
  Phone,
  Sparkles,
  Flame,
  MapPin,
  Clock,
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
        'Tem certeza que deseja restaurar todos os dados para o padrão de demonstração da TwoNine? Isso recarregará todos os estoques de tabacaria, bebidas, vendas e transferências originais.'
      )
    ) {
      resetToMockData();
      alert('Dados demonstrativos restaurados com sucesso.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <Flame className="w-6 h-6 text-rose-500" />
              Configurações & Parâmetros — TwoNine Tabacaria & Conveniência
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
              🔞 18+ Operacional
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Dados cadastrais das unidades em Planaltina-DF, parâmetros de estoque mínimo e restauração de dados.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-500/30 text-xs font-bold transition"
        >
          <RotateCcw className="w-4 h-4 text-rose-400" />
          <span>Restaurar Dados Padrão</span>
        </button>
      </div>

      {/* Business Real Profile Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <BrandLogo size="md" variant="full" subtitle="conveniencia" />
          </div>
          <button
            onClick={() => setBrandModalOpen(true)}
            className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800"
          >
            <Sparkles className="w-4 h-4" />
            <span>Guia de Identidade Visual Redesenhada</span>
          </button>
        </div>

        {/* Real Profile Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
              Perfil no Instagram
            </span>
            <a
              href="https://www.instagram.com/twonineconveniencia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-bold text-white hover:text-rose-400 transition"
            >
              <InstagramIcon className="w-4 h-4 text-rose-500" />
              <span>@twonineconveniencia</span>
            </a>
            <span className="text-[10px] text-slate-400 mt-1 block font-mono">
              21 posts • 339 seguidores
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
              Contato Principal
            </span>
            <div className="flex items-center gap-2 font-bold text-white font-mono">
              <Phone className="w-4 h-4 text-rose-500" />
              <span>(61) 99912-3530</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">Planaltina - DF</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
              Tempo de Atuação
            </span>
            <div className="flex items-center gap-2 font-bold text-white">
              <Flame className="w-4 h-4 text-rose-500" />
              <span>Somos a TwoNine! Desde 2017</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold mt-1 block">
              9 anos de tradição no DF
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
              Classificação Etária
            </span>
            <div className="flex items-center gap-2 font-bold text-amber-400">
              <span>🔞</span>
              <span>Para Maiores de 18 Anos</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Tabacaria, Lounge & Bebidas
            </span>
          </div>
        </div>
      </div>

      {/* Units Operational Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {units.map((unit) => (
          <div
            key={unit.id}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-bold text-white text-base flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: unit.color }} />
                {unit.name}
              </h4>
              <span className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-950 font-mono text-slate-300 border border-slate-800 font-bold">
                {unit.tag}
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span><strong className="text-white">Endereço:</strong> {unit.address}, {unit.city}</span>
              </p>
              <p className="text-rose-400 font-medium pl-6">
                📍 {unit.reference}
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-rose-400 shrink-0" />
                <span><strong className="text-white">Horário:</strong> {unit.operatingHours}</span>
              </p>
              <p className="pl-6">
                <strong className="text-slate-400">Gerente Responsável:</strong> {unit.manager}
              </p>
              <p className="pl-6 font-mono">
                <strong className="text-slate-400">Canal de Contato:</strong> {unit.phone}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Project Ownership & Compliance Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
        <h4 className="font-bold text-white text-base flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          Ficha Técnica & Transparência do Projeto
        </h4>
        <p className="text-xs text-slate-400 leading-relaxed">
          Projeto demonstrativo desenvolvido por <strong className="text-white">Davi Anderson</strong>. Esta apresentação é conceitual e não representa um sistema oficial da TwoNine Conveniência.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
            <strong className="text-slate-200 block mb-1">Tecnologias</strong>
            React 19, TypeScript, Tailwind CSS v4, Lucide Icons, LocalStorage Engine
          </div>
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
            <strong className="text-slate-200 block mb-1">Segmento Específico</strong>
            Tabacaria, Hookah Lounge & Conveniência Multiunidade (18+)
          </div>
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
            <strong className="text-slate-200 block mb-1">Dados Demonstrativos</strong>
            Essências, carvões, bebidas, custos e vendas simulados para validação
          </div>
        </div>
      </div>
    </div>
  );
};
