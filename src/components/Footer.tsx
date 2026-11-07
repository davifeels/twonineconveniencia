import React from 'react';
import { ShieldCheck, MapPin, Phone } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
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

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <BrandLogo size="md" variant="full" subtitle="manager" />
            <p className="text-slate-400 text-xs leading-relaxed max-w-lg mt-2">
              Proposta de modernização e centralização de gestão operacional multiunidade para a TwoNine Conveniência. Projetado para integrar estoque, transferências rápidas, compras e vendas das unidades Vila Buritis e Setor Tradicional em Planaltina-DF.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5 text-slate-300">
                <InstagramIcon className="w-3.5 h-3.5 text-rose-500" />
                @twonineconveniencia
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-rose-500" />
                (61) 99912-3530
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                Planaltina - Distrito Federal
              </span>
            </div>
          </div>

          {/* Units Summary */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-bold uppercase tracking-wider text-[11px]">
              Unidades Contempladas
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="p-2 rounded-lg bg-slate-900 border border-slate-800/80">
                <strong className="text-white block">Unidade 01 — Vila Buritis</strong>
                <span className="text-slate-500 text-[11px]">Quadra 04, Planaltina-DF • Operação 24h</span>
              </li>
              <li className="p-2 rounded-lg bg-slate-900 border border-slate-800/80">
                <strong className="text-white block">Unidade 02 — Setor Tradicional</strong>
                <span className="text-slate-500 text-[11px]">Av. Marechal Deodoro, Planaltina-DF • 06h às 02h</span>
              </li>
            </ul>
          </div>

          {/* Legal / Project Notice */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-rose-500" />
              Transparência & Escopo
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Todos os produtos, quantidades em estoque, fornecedores, custos unitários, preços e vendas apresentados neste sistema são dados fictícios e ilustrativos para validação de fluxos de software.
            </p>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Conforme diretrizes de governança, o catálogo demonstrativo utiliza itens de consumo cotidiano (snacks, bebidas não alcoólicas, doces e mercearia), sem promoção ou publicidade de itens sujeitos a restrições de idade.
            </p>
          </div>
        </div>

        {/* Mandatory Footer Banner */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-slate-400 font-medium">
            Projeto demonstrativo desenvolvido por <strong className="text-white font-semibold">Davi Anderson</strong>. Esta apresentação é conceitual e não representa um sistema oficial da TwoNine Conveniência.
          </p>
          <div className="text-[11px] text-slate-500 flex items-center gap-2">
            <span>TwoNine Manager • Edição Multiunidade</span>
            <span>•</span>
            <span>v2.6 SaaS Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
