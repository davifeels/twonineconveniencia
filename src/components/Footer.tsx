import React from 'react';
import { ShieldCheck, MapPin, Phone, Flame } from 'lucide-react';
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
      {/* 94% Widescreen container */}
      <div className="w-[94%] max-w-[1800px] mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <BrandLogo size="md" variant="full" subtitle="manager" />
            <p className="text-slate-400 text-xs leading-relaxed max-w-2xl mt-2">
              Plataforma de gestão comercial centralizada para a <strong className="text-white">TwoNine Conveniência & Tabacaria</strong>. Integrando controle de essências, carvões de coco, sedas, bebidas, gelo saborizado e snacks entre a Vila Buritis e o Setor Tradicional em Planaltina-DF.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2">
              <a
                href="https://www.instagram.com/twonineconveniencia"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 transition font-mono"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-rose-500" />
                @twonineconveniencia (339 seguidores)
              </a>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-rose-500" />
                (61) 99912-3530
              </span>
              <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                <span>🔞</span>
                <span>Operação para Maiores de 18 Anos</span>
              </span>
            </div>
          </div>

          {/* Units Summary with Street References */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              Unidades em Planaltina - DF
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80">
                <div className="flex items-center justify-between">
                  <strong className="text-white">Unidade 01 — Vila Buritis</strong>
                  <span className="text-[10px] text-rose-400 font-bold font-mono">24 HORAS</span>
                </div>
                <span className="text-slate-400 text-[11px] block mt-0.5">
                  📍 Na rua da Escola Paraná • Quadra 04
                </span>
              </li>
              <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80">
                <div className="flex items-center justify-between">
                  <strong className="text-white">Unidade 02 — Setor Tradicional</strong>
                  <span className="text-[10px] text-amber-400 font-bold font-mono">06h às 02h</span>
                </div>
                <span className="text-slate-400 text-[11px] block mt-0.5">
                  📍 Av. Marechal Deodoro • Conveniência & Lounge
                </span>
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
              O foco da plataforma é estritamente <strong className="text-slate-400">gestão operacional de estoque multiunidade, controle de caixas e inteligência logística</strong> interna para comércio restrito a maiores de 18 anos.
            </p>
          </div>
        </div>

        {/* Mandatory Footer Banner */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-slate-400 font-medium">
            Projeto demonstrativo desenvolvido por <strong className="text-white font-semibold">Davi Anderson</strong>. Esta apresentação é conceitual e não representa um sistema oficial da TwoNine Conveniência.
          </p>
          <div className="text-[11px] text-slate-500 flex items-center gap-2">
            <span>TwoNine Manager • Edição Tabacaria & Conveniência</span>
            <span>•</span>
            <span>v2.8 Enterprise Widescreen</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
