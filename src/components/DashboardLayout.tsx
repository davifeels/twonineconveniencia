import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DashboardSidebar } from './DashboardSidebar';
import { OverviewView } from './views/OverviewView';
import { UnitsView } from './views/UnitsView';
import { InventoryView } from './views/InventoryView';
import { TransfersView } from './views/TransfersView';
import { SalesView } from './views/SalesView';
import { PurchasesView } from './views/PurchasesView';
import { SuppliersView } from './views/SuppliersView';
import { MovementsView } from './views/MovementsView';
import { AlertsView } from './views/AlertsView';
import { ReportsView } from './views/ReportsView';
import { SettingsView } from './views/SettingsView';
import { Menu, X, ArrowLeft, Globe } from 'lucide-react';

export const DashboardLayout: React.FC = () => {
  const { activeTab, setActiveTab, setCurrentView } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewView />;
      case 'units':
        return <UnitsView />;
      case 'inventory':
      case 'products':
        return <InventoryView />;
      case 'transfers':
        return <TransfersView />;
      case 'sales':
        return <SalesView />;
      case 'purchases':
        return <PurchasesView />;
      case 'suppliers':
        return <SuppliersView />;
      case 'movements':
        return <MovementsView />;
      case 'alerts':
        return <AlertsView />;
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="flex-1 flex w-full overflow-hidden bg-[#0B0F19]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex shrink-0">
        <DashboardSidebar />
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-64 h-full bg-slate-950 flex flex-col">
            <div className="p-3 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-white">Menu TWONINE MANAGER</span>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div
              className="flex-1 overflow-y-auto"
              onClick={() => setMobileSidebarOpen(false)}
            >
              <DashboardSidebar />
            </div>
          </div>
        </div>
      )}

      {/* Main View Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Mobile menu trigger bar */}
        <div className="lg:hidden flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 mb-4">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="flex items-center gap-2 text-xs font-bold text-slate-200"
          >
            <Menu className="w-4 h-4 text-rose-500" />
            <span>Navegação do Painel</span>
          </button>

          <button
            onClick={() => setCurrentView('landing')}
            className="text-xs text-rose-400 font-semibold flex items-center gap-1"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Ver Apresentação</span>
          </button>
        </div>

        {/* View Component */}
        {renderActiveView()}
      </main>
    </div>
  );
};
