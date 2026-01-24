import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AppLayout } from './layout/AppLayout'
import { Dashboard } from './pages/Dashboard'
import { MyCodes } from './pages/MyCodes'
import { Create } from './pages/Create'

type Page = 'dashboard' | 'mycodes' | 'create';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'mycodes':
        return <MyCodes />;
      case 'create':
        return <Create />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <AppLayout currentPage={currentPage} onNavigate={setCurrentPage} isFreeAccount={true}>
        {renderPage()}
      </AppLayout>
    </>
  )
} 

export default App
