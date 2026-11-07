import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { DashboardLayout } from './components/DashboardLayout';
import { BrandIdentityModal } from './components/BrandIdentityModal';

const AppContent: React.FC = () => {
  const { currentView, brandModalOpen, setBrandModalOpen } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-slate-100 font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content: Landing Page or Dashboard */}
      <div className="flex-1 flex flex-col">
        {currentView === 'landing' ? <LandingPage /> : <DashboardLayout />}
      </div>

      {/* Global Brand Identity Redesign Modal */}
      <BrandIdentityModal
        isOpen={brandModalOpen}
        onClose={() => setBrandModalOpen(false)}
      />

      {/* Footer with mandatory transparency disclaimer */}
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
