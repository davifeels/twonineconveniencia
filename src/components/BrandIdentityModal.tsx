import React, { useState } from 'react';
import { X, Check, Copy, Sparkles, Layers, ShieldCheck, ArrowRight, Eye } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface BrandIdentityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandIdentityModal: React.FC<BrandIdentityModalProps> = ({ isOpen, onClose }) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'comparison' | 'palette' | 'typography' | 'applications'>('comparison');

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const palette = [
    { name: 'TwoNine Crimson', hex: '#E11D48', rgb: '225, 29, 72', role: 'Acento Primário de Energia & Ação', text: 'text-white' },
    { name: 'Crimson Electric', hex: '#F43F5E', rgb: '244, 63, 94', role: 'Destaques, Hovers & Gradientes', text: 'text-white' },
    { name: 'Obsidian Black', hex: '#0B0F19', rgb: '11, 15, 25', role: 'Fundo Master do Sistema & Cards', text: 'text-slate-300' },
    { name: 'Slate Surface', hex: '#1E293B', rgb: '30, 41, 59', role: 'Bordas, Containers & Cards Interativos', text: 'text-slate-200' },
    { name: 'Amber Gold', hex: '#F59E0B', rgb: '245, 158, 11', role: 'Alertas de Reposição & Setor Tradicional', text: 'text-slate-900' },
    { name: 'Pure Ice White', hex: '#F8FAFC', rgb: '248, 250, 252', role: 'Tipografia de Alto Contraste', text: 'text-slate-900' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Redesign da Identidade Visual TwoNine"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Redesign da Identidade Visual — TwoNine
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                  Conceito Proposto
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Diretrizes de modernização, análise da logo original e padronização do Design System.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-800 bg-slate-950/30">
          <button
            onClick={() => setActiveTab('comparison')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 transition ${
              activeTab === 'comparison'
                ? 'border-rose-500 text-rose-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Análise & Comparativo (Original vs Proposta)
          </button>
          <button
            onClick={() => setActiveTab('palette')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 transition ${
              activeTab === 'palette'
                ? 'border-rose-500 text-rose-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Paleta de Cores do Sistema
          </button>
          <button
            onClick={() => setActiveTab('typography')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 transition ${
              activeTab === 'typography'
                ? 'border-rose-500 text-rose-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Tipografia & Grid
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 transition ${
              activeTab === 'applications'
                ? 'border-rose-500 text-rose-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Versões & Aplicações
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-300 text-sm">
          {activeTab === 'comparison' && (
            <div className="space-y-6">
              {/* Comparative Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Original Logo Card */}
                <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                        Logo Original (@twonineconveniencia)
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">Desde 2017</span>
                    </div>

                    <div className="h-44 bg-black rounded-lg border border-slate-800 flex items-center justify-center p-4 mb-4 relative overflow-hidden">
                      <img
                        src="./original-logo.png"
                        alt="Logo Original TwoNine"
                        className="max-h-36 max-w-36 object-contain rounded-full shadow-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (!target.src.endsWith('original-logo.png')) {
                            target.style.display = 'none';
                          }
                        }}
                      />
                    </div>

                    <div className="space-y-2 text-xs text-slate-400">
                      <p>
                        <strong className="text-slate-200">Símbolo:</strong> Silhueta circular de narguile com duas mangueiras em diagonal e fumaça vermelha sobre fundo preto.
                      </p>
                      <p>
                        <strong className="text-slate-200">Tipografia:</strong> Ausente no avatar oficial, dependendo de texto complementar externo.
                      </p>
                      <p>
                        <strong className="text-slate-200">Limitações observadas:</strong> Foco exclusivo em narguile/tabacaria, o que restringe o posicionamento comercial para uma ampla rede de conveniência/empório e gera entraves com políticas de compliance e publicidade digital.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Proposed Modernization Card */}
                <div className="bg-slate-950 border border-rose-500/30 rounded-xl p-5 flex flex-col justify-between relative overflow-hidden shadow-rose-950/20 shadow-lg">
                  <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                    Proposta Antigravity
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                        Redesign Conceitual Modernizado
                      </span>
                    </div>

                    <div className="h-44 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-center p-4 mb-4 relative">
                      <BrandLogo size="lg" variant="full" subtitle="conveniencia" />
                    </div>

                    <div className="space-y-2 text-xs text-slate-300">
                      <p>
                        <strong className="text-white">Conceito do Monograma:</strong> Integração fluida dos numerais <strong>"2"</strong> e <strong>"9"</strong> em um escudo tecnológico, simbolizando as <strong>2 unidades operando em sinergia</strong> contínua.
                      </p>
                      <p>
                        <strong className="text-white">Evolução da Paleta:</strong> Preservação do preto e vermelho originais da TwoNine, elevados para Obsidian Black e Crimson Energy com contraste perfeito para SaaS.
                      </p>
                      <p>
                        <strong className="text-white">Posicionamento Ampliado:</strong> Comunica conveniência ágil, empório moderno, bebidas geladas, snacks e tecnologia de ponta para gestão de lojas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rationale Checklist */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Ganhos Estratégicos com a Nova Identidade
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                    <strong className="text-slate-200 block mb-1">1. Legibilidade Imediata</strong>
                    Nome TwoNine explícito e marcante com tipografia em peso 900 e hierarquia clara para placas e telas.
                  </div>
                  <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                    <strong className="text-slate-200 block mb-1">2. Compliance & Escala</strong>
                    Adequação para anúncios em redes sociais e sistemas institucionais, sem travas de produtos restritos.
                  </div>
                  <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                    <strong className="text-slate-200 block mb-1">3. Identidade Multiunidade</strong>
                    O símbolo "2" + "9" traduz diretamente a realidade das duas unidades (Buritis + Tradicional).
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'palette' && (
            <div className="space-y-6">
              <p className="text-xs text-slate-400">
                Paleta desenvolvida com foco em interfaces de alto desempenho (SaaS Dark Mode Premium), garantindo contraste WCAG AAA para leitura de métricas, estoque e relatórios. Clique para copiar o código HEX.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {palette.map((color) => (
                  <div
                    key={color.hex}
                    onClick={() => copyToClipboard(color.hex)}
                    className="p-4 rounded-xl border border-slate-800 bg-slate-950 hover:border-slate-700 cursor-pointer transition group relative"
                  >
                    <div
                      className="w-full h-16 rounded-lg mb-3 shadow-inner flex items-center justify-center font-mono font-bold text-xs"
                      style={{ backgroundColor: color.hex }}
                    >
                      <span className={color.text}>{color.hex}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-bold text-white text-xs">{color.name}</h5>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">RGB: {color.rgb}</p>
                      </div>
                      <button className="text-slate-500 group-hover:text-rose-400 transition p-1.5 rounded-lg bg-slate-900">
                        {copiedHex === color.hex ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2 border-t border-slate-800/80 pt-2">
                      {color.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'typography' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 block mb-1">
                    Tipografia Display & Logotipo
                  </span>
                  <div className="text-3xl font-black text-white tracking-tight">
                    TWONINE CONVENIÊNCIA & MANAGER
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Família Sans Geométrica contemporânea em pesos 800/900 com kerning ajustado para solidez e impacto.
                  </p>
                </div>

                <div className="border-t border-slate-800 pt-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                    Tipografia da Interface & Tabelas de Dados
                  </span>
                  <div className="text-base font-medium text-slate-200">
                    Inter & Roboto UI com numerais monoespaçados (Tabular Figures)
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Alinhamento milimétrico em tabelas de estoque, códigos SKU, valores em R$ e quantidades de movimentações.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                  <span className="text-2xl font-black text-white block">Aa</span>
                  <span className="text-[10px] text-slate-400">Headings (900)</span>
                </div>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                  <span className="text-2xl font-bold text-white block">Aa</span>
                  <span className="text-[10px] text-slate-400">Subtítulos (700)</span>
                </div>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                  <span className="text-2xl font-medium text-white block">Aa</span>
                  <span className="text-[10px] text-slate-400">Interface UI (500)</span>
                </div>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                  <span className="text-2xl font-mono text-rose-400 block">R$ 00</span>
                  <span className="text-[10px] text-slate-400">Tabular Numbers</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'applications' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Dark Background Application */}
                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center gap-3">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Aplicação Principal (Fundo Escuro)</span>
                  <BrandLogo size="lg" variant="full" subtitle="manager" />
                </div>

                {/* Light Background Application */}
                <div className="p-5 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-center gap-3">
                  <span className="text-[10px] font-mono uppercase text-slate-500">Aplicação em Fundo Claro</span>
                  <div className="p-2 rounded-lg bg-slate-900 inline-block">
                    <BrandLogo size="lg" variant="full" subtitle="manager" />
                  </div>
                </div>

                {/* Monochromatic Version */}
                <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center gap-3">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Versão Monocromática (Carimbos / Uniformes)</span>
                  <BrandLogo size="lg" variant="full" subtitle="conveniencia" monochrome={true} />
                </div>

                {/* App Favicon / Compact Icon */}
                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center gap-3">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Ícone Reduzido / Favicon (32x32px & Mobile)</span>
                  <div className="flex items-center gap-4">
                    <BrandLogo size="sm" variant="icon-only" />
                    <BrandLogo size="md" variant="icon-only" />
                    <BrandLogo size="lg" variant="icon-only" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Legal / Transparency Disclaimer */}
          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
            <strong className="text-slate-300 block mb-1">Nota de Isenção e Autoria Criativa:</strong>
            Esta proposta de redesign visual é um trabalho conceitual e independente desenvolvido por Davi Anderson como parte da demonstração da plataforma TWONINE MANAGER. Não constitui aprovação oficial prévia ou registro formal pela TwoNine Conveniência, funcionando como uma recomendação de modernização para expansão multiunidade.
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Design System TwoNine v1.0 • Desenvolvido por Davi Anderson
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition shadow-lg shadow-rose-950/30"
          >
            Fechar Guia Visual
          </button>
        </div>
      </div>
    </div>
  );
};
