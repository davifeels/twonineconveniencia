import React, { useState } from 'react';
import {
  ArrowRight,
  Store,
  Boxes,
  ArrowRightLeft,
  ShieldCheck,
  CheckCircle2,
  BarChart3,
  Sparkles,
  Truck,
  ShoppingCart,
  Users,
  AlertTriangle,
  History,
  ChevronRight,
  Flame,
  MapPin,
  Clock,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './BrandLogo';

export const LandingPage: React.FC = () => {
  const { setCurrentView, setActiveTab, setBrandModalOpen, metrics, units } = useApp();
  const [activePreviewTab, setActivePreviewTab] = useState<'kpis' | 'transfers' | 'stores'>('kpis');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col selection:bg-rose-500 selection:text-white">
      {/* HERO SECTION - 94% SCREEN WIDTH */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 border-b border-slate-800/60">
        {/* Glow ambient background elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-rose-600/12 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-[94%] max-w-[1800px] mx-auto relative z-10 space-y-10">
          <div className="text-center max-w-5xl mx-auto space-y-6">
            {/* Real Instagram Bio Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 font-bold text-xs">
                <span>🔞</span>
                <span>Para Maiores de 18 Anos</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold">
                <Flame className="w-3.5 h-3.5 text-rose-500" />
                <span>Somos a TwoNine! Desde 2017</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-medium">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>Vila Buritis (na rua da Escola Paraná) & Setor Tradicional</span>
              </span>
            </div>

            {/* EXACT REQUIRED TITLE */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
              Suas duas unidades.{' '}
              <span className="bg-gradient-to-r from-rose-500 via-rose-400 to-amber-400 bg-clip-text text-transparent">
                Uma gestão muito mais inteligente.
              </span>
            </h1>

            {/* EXACT REQUIRED SUBTITLE */}
            <p className="text-base sm:text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto font-normal leading-relaxed">
              Centralize o controle de estoque, acompanhe as operações e tenha uma visão completa das suas unidades em um único sistema.
            </p>

            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
              Projetado sob medida para a operação real de <strong className="text-white">Tabacaria, Hookah Lounge & Conveniência</strong>: essências premium, carvões de coco, sedas, gelos saborizados, energéticos e mercearia noturna.
            </p>

            {/* EXACT REQUIRED BUTTONS */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setCurrentView('dashboard')}
                className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-sm sm:text-base transition-all duration-200 shadow-xl shadow-rose-900/40 hover:scale-105"
              >
                <span>Explorar demonstração</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => scrollToSection('gestao-centralizada')}
                className="flex items-center gap-2 px-7 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold text-sm sm:text-base transition"
              >
                <span>Conhecer a plataforma</span>
              </button>
            </div>
          </div>

          {/* Enterprise Widescreen Live Mockup (Spans 94% Width) */}
          <div className="w-full rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
            {/* Window bar */}
            <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="ml-3 text-xs font-mono text-slate-400 flex items-center gap-2">
                  <span className="text-slate-500 font-bold">twonine.manager.enterprise</span>
                  <span className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded font-mono">
                    Tabacaria & Conveniência Multi-Store
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActivePreviewTab('kpis')}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition ${
                    activePreviewTab === 'kpis'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Visão Consolidada
                </button>
                <button
                  onClick={() => setActivePreviewTab('transfers')}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition ${
                    activePreviewTab === 'transfers'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Transferência em Tempo Real
                </button>
                <button
                  onClick={() => setActivePreviewTab('stores')}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition ${
                    activePreviewTab === 'stores'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Unidades Físicas
                </button>
              </div>
            </div>

            {/* Window Content */}
            <div className="p-6 lg:p-8 bg-slate-950/60">
              {activePreviewTab === 'kpis' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                      <span className="text-xs font-medium text-slate-400 block mb-1">
                        Catálogo Tabacaria & Bebidas
                      </span>
                      <div className="text-3xl font-black text-white">{metrics.totalProducts} SKUs</div>
                      <span className="text-xs text-rose-400 font-semibold mt-1 inline-block">
                        Essências, carvões, energéticos & gelo
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                      <span className="text-xs font-medium text-slate-400 block mb-1">
                        Estoque Físico Total
                      </span>
                      <div className="text-3xl font-black text-rose-400">{metrics.totalStockUnits} un</div>
                      <span className="text-xs text-slate-400 mt-1 inline-block">
                        Integrados nas 2 unidades do DF
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                      <span className="text-xs font-medium text-slate-400 block mb-1">
                        Capital em Estoque
                      </span>
                      <div className="text-3xl font-black text-emerald-400">
                        R$ {metrics.totalStockCostValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                      <span className="text-xs text-slate-400 mt-1 inline-block">
                        Preço de custo dos lotes
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                      <span className="text-xs font-medium text-slate-400 block mb-1">
                        Alertas de Ruptura
                      </span>
                      <div className="text-3xl font-black text-amber-400">{metrics.lowStockCount} alertas</div>
                      <span className="text-xs text-amber-500/90 font-medium mt-1 inline-block">
                        Reposição preventiva de final de semana
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
                        <ArrowRightLeft className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">
                          Conexão Direta: Vila Buritis (Escola Paraná) ↔ Setor Tradicional
                        </div>
                        <div className="text-xs text-slate-400">
                          Equilíbrio de cargas de essências, caixas de carvão e sacos de gelo em poucos segundos.
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setCurrentView('dashboard');
                        setActiveTab('transfers');
                      }}
                      className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 transition shrink-0"
                    >
                      Abrir Tela de Transferências →
                    </button>
                  </div>
                </div>
              )}

              {activePreviewTab === 'transfers' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                      <span className="text-slate-400 font-mono text-[10px] uppercase">Origem</span>
                      <div className="font-bold text-white text-sm">Unidade 01 — Vila Buritis (24h)</div>
                      <div className="text-emerald-400 font-medium">Saldo: 48 caixas (Carvão Art Coco 1kg)</div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 flex flex-col items-center justify-center text-center space-y-1">
                      <ArrowRightLeft className="w-6 h-6 text-rose-400" />
                      <div className="font-bold text-white">Transferência de 12 caixas</div>
                      <div className="text-slate-400 text-[11px]">TRF-2026-001 • Concluída</div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                      <span className="text-slate-400 font-mono text-[10px] uppercase">Destino</span>
                      <div className="font-bold text-white text-sm">Unidade 02 — Setor Tradicional</div>
                      <div className="text-amber-400 font-medium">Estoque Abastecido: +12 caixas</div>
                    </div>
                  </div>
                </div>
              )}

              {activePreviewTab === 'stores' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {units.map((u) => (
                    <div key={u.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white flex items-center gap-2">
                          <Store className="w-4 h-4 text-rose-500" />
                          {u.name}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                          {u.tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">{u.address}</p>
                      <span className="text-[11px] text-rose-400 font-medium block">
                        📍 {u.reference}
                      </span>
                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                        <span className="text-slate-400">Horário: <strong className="text-white">{u.operatingHours}</strong></span>
                        <span className="text-slate-400">Gerência: <strong className="text-white">{u.manager.split(' ')[0]}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO: GESTÃO CENTRALIZADA */}
      <section id="gestao-centralizada" className="py-20 border-b border-slate-800/60 bg-slate-950/40">
        <div className="w-[94%] max-w-[1800px] mx-auto space-y-12">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-500 font-mono flex items-center justify-center gap-1.5">
              <Flame className="w-4 h-4 text-rose-500" />
              Controle Unificado Tabacaria & Conveniência
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Gestão Centralizada para Duas Unidades
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Administrar duas lojas não precisa significar duplicar planilhas, desencontros de saldo ou telefonemas constantes para saber se determinado produto está disponível. O TwoNine Manager unifica a visão do proprietário em um único painel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition space-y-3">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Alternância Ágil de Unidades</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Filtre todo o sistema com um clique: consulte a visão consolidada de toda a rede ou isole as operações da Vila Buritis e do Setor Tradicional individualmente.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <ArrowRightLeft className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Sinergia entre Lojas</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Equilibre excessos e faltas. Se um produto tem alta procura no Setor Tradicional e sobra na Vila Buritis, a transferência interna é solicitada e validada em segundos.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Auditoria Completa & Segurança</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Cada entrada de compra, cada venda de balcão e cada movimentação entre lojas gera registro com operador, horário, saldo anterior e novo saldo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO: CONTROLE DE ESTOQUE */}
      <section className="py-20 border-b border-slate-800/60">
        <div className="w-[94%] max-w-[1800px] mx-auto space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-500 font-mono">
                Estoque em Tempo Real
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Controle de Estoque Preciso por Loja
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Elimine rupturas de balcão e compras desnecessárias. O sistema mantém o saldo individual de cada unidade com cálculo automático de estoque mínimo.
              </p>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <Boxes className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm">Estoque por Unidade</strong>
                    Visualize instantaneamente quanto cada unidade possui de cada SKU sem precisar ligar para a outra loja.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm">Produtos com Baixo Estoque</strong>
                    Identificação visual imediata (Normal, Estoque Baixo e Sem Estoque) com quantidade sugerida de reposição.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <History className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm">Histórico e Rastreabilidade</strong>
                    Linha do tempo auditável de todas as movimentações, entradas por notas de compras e saídas de vendas.
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={() => {
                    setCurrentView('dashboard');
                    setActiveTab('inventory');
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition"
                >
                  <span>Ver tabela de estoque no sistema</span>
                  <ArrowRight className="w-4 h-4 text-rose-400" />
                </button>
              </div>
            </div>

            {/* Visual Inventory Graphic Card */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Flame className="w-4 h-4 text-rose-500" />
                  Amostra de Estoque Tabacaria & Bebidas
                </div>
                <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Sincronizado
                </span>
              </div>

              <div className="space-y-3 text-xs">
                {/* Item 1 */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Carvão de Coco Hexagonal 1kg (60 peças)</div>
                    <div className="text-[11px] text-slate-400 font-mono">CRV-COC-005 • Carvões & Insumos</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-white">48 cx (Buritis) | 16 cx (Trad.)</div>
                    <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                      Estoque Baixo na Tradicional
                    </span>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Essência Nay Fresh Peach 50g</div>
                    <div className="text-[11px] text-slate-400 font-mono">TAB-ESS-001 • Tabacaria & Hookah</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-white">54 un (Buritis) | 8 un (Trad.)</div>
                    <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                      Estoque Baixo na Tradicional
                    </span>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Gelo Saborizado Coco c/ Maracujá 200ml</div>
                    <div className="text-[11px] text-slate-400 font-mono">GEL-SAB-008 • Gelo & Copos</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-white">110 un (Buritis) | 32 un (Trad.)</div>
                    <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      Normal
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-400 shrink-0" />
                <span>O sistema sugere a transferência preventiva de 15 un de essência da Vila Buritis para o Setor Tradicional.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO: CONTROLE OPERACIONAL */}
      <section className="py-20 border-b border-slate-800/60 bg-slate-950/40">
        <div className="w-[94%] max-w-[1800px] mx-auto space-y-12">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-500 font-mono">
              Fluxos de Negócio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Controle Operacional Completo
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Integração entre o que entra de mercadoria dos fornecedores e o que sai nos caixas das lojas, com conciliação automática.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Registro de Compras</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Entrada de notas fiscais com custo unitário e destinação para Unidade 01 ou Unidade 02, alimentando o saldo instantaneamente.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Gestão de Fornecedores</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Base centralizada de fornecedores de essências, carvões de coco, bebidas, energéticos e gelo com prazos de entrega e telefones.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Vendas Demonstrativas</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                PDV ágil para registro de vendas por unidade com baixa imediata de estoque, cálculo automático do total e formas de pagamento.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Comparação de Resultados</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Acompanhe o faturamento demonstrativo de cada unidade, ticket médio e produtos de maior giro para decisões precisas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO: DASHBOARD */}
      <section className="py-20 border-b border-slate-800/60">
        <div className="w-[94%] max-w-[1800px] mx-auto space-y-10">
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-500 font-mono">
              Interface SaaS Premium
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Uma Prévia do Dashboard Administrativo
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Design escuro sofisticado (Dark Mode), cards limpos, gráficos funcionais e tabelas organizadas para alta produtividade no dia a dia.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h4 className="font-bold text-white text-lg flex items-center gap-2">
                  <Flame className="w-5 h-5 text-rose-500" />
                  Painel TWONINE MANAGER • Tabacaria & Conveniência
                </h4>
                <p className="text-xs text-slate-400">Navegue pelas 11 áreas gerenciais do sistema</p>
              </div>
              <button
                onClick={() => setCurrentView('dashboard')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition"
              >
                <span>Acessar Dashboard Completo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center text-xs">
              {[
                { name: 'Visão Geral', tab: 'overview', icon: BarChart3 },
                { name: 'Unidades', tab: 'units', icon: Store },
                { name: 'Estoque & Insumos', tab: 'inventory', icon: Boxes },
                { name: 'Transferências', tab: 'transfers', icon: ArrowRightLeft },
                { name: 'PDV Balcão', tab: 'sales', icon: ShoppingCart },
                { name: 'Alertas', tab: 'alerts', icon: AlertTriangle },
              ].map((item) => (
                <button
                  key={item.tab}
                  onClick={() => {
                    setCurrentView('dashboard');
                    setActiveTab(item.tab);
                  }}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-rose-500/50 hover:bg-slate-900 transition flex flex-col items-center gap-2 group"
                >
                  <item.icon className="w-5 h-5 text-slate-400 group-hover:text-rose-400 transition" />
                  <span className="font-semibold text-slate-300 group-hover:text-white transition">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO: BENEFÍCIOS */}
      <section className="py-20 border-b border-slate-800/60 bg-slate-950/40">
        <div className="w-[94%] max-w-[1800px] mx-auto space-y-12">
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-500 font-mono">
              Vantagens Reais
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Por que Modernizar com o TWONINE MANAGER?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Mais visibilidade das operações',
                desc: 'Acompanhe as duas lojas simultaneamente em tempo real, onde quer que você esteja.',
              },
              {
                title: 'Controle individual de cada unidade',
                desc: 'Identifique o padrão de consumo específico da Vila Buritis e do Setor Tradicional.',
              },
              {
                title: 'Menos dependência de planilhas dispersas',
                desc: 'Acabe com arquivos desatualizados no WhatsApp ou anotações em papel no balcão.',
              },
              {
                title: 'Melhor organização das movimentações',
                desc: 'Rastreie tudo o que entra por compra, tudo o que é vendido e cada produto transferido.',
              },
              {
                title: 'Reposição mais organizada',
                desc: 'Alertas preventivos evitam que produtos campeões de venda fiquem em falta no final de semana.',
              },
              {
                title: 'Decisões baseadas em dados',
                desc: 'Saiba exatamente quais itens trazem mais margem e onde focar o capital de compras.',
              },
            ].map((benefit, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition space-y-2.5"
              >
                <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-400 font-mono font-bold text-xs flex items-center justify-center">
                  0{i + 1}
                </div>
                <h3 className="font-bold text-white text-base">{benefit.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-950/20 to-transparent pointer-events-none"></div>
        <div className="w-[94%] max-w-[1800px] mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex p-3 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg mb-2">
            <BrandLogo size="lg" variant="badge" />
          </div>

          {/* EXACT REQUIRED CTA TITLE */}
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Tenha o controle das suas unidades em um só lugar.
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Experimente agora a demonstração interativa do TwoNine Manager com dados ilustrativos das unidades Vila Buritis e Setor Tradicional.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            {/* EXACT REQUIRED CTA BUTTON */}
            <button
              onClick={() => setCurrentView('dashboard')}
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-base transition-all duration-200 shadow-xl shadow-rose-900/40 hover:scale-105"
            >
              <span>Explorar demonstração</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => setBrandModalOpen(true)}
              className="flex items-center gap-2 px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 font-semibold text-sm transition"
            >
              <Sparkles className="w-4 h-4 text-rose-400" />
              <span>Ver Redesign da Marca</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
