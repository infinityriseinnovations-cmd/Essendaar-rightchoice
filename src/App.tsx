import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ProductView } from './views/ProductView';
import { ContactView } from './views/ContactView';
import { CheckoutView } from './views/CheckoutView';
import { OrderConfirmationView } from './views/OrderConfirmationView';
import { FacilityManagementView } from './views/FacilityManagementView';
import { ManpowerSupportView } from './views/ManpowerSupportView';
import { InstitutionalSuppliesView } from './views/InstitutionalSuppliesView';
import { HomeCareCleaningView } from './views/HomeCareCleaningView';
import { AboutUsView } from './views/AboutUsView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { CustomerDashboardView } from './views/CustomerDashboardView';
import { AuthModal } from './components/AuthModal';
import { PolicyModal } from './components/PolicyModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

const AppContent: React.FC = () => {
  const { currentRoute } = useStore();

  const renderActiveView = () => {
    switch (currentRoute) {
      case 'home':
        return <HomeView />;
      case 'admin':
        return <AdminDashboardView />;
      case 'customer-dashboard':
        return <CustomerDashboardView />;
      case 'shop':
        return <ShopView />;
      case 'product':
        return <ProductView />;
      case 'contact':
        return <ContactView />;
      case 'checkout':
        return <CheckoutView />;
      case 'order-confirmation':
        return <OrderConfirmationView />;
      case 'home-care-cleaning':
        return <HomeCareCleaningView />;
      case 'facility-management':
        return <FacilityManagementView />;
      case 'manpower-support':
        return <ManpowerSupportView />;
      case 'institutional-supplies':
        return <InstitutionalSuppliesView />;
      case 'about-us':
        return <AboutUsView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-stone-900 font-sans selection:bg-[#00355f] selection:text-white">
      <Header />
      <main className="flex-1">
        {renderActiveView()}
      </main>
      <Footer />

      {/* Global Overlays */}
      <CartDrawer />
      <QuickViewModal />
      <SearchModal />
      <AuthModal />
      <PolicyModal />
      <FloatingWhatsApp />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
