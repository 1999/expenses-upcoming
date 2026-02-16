import { Routes, Route, Navigate } from 'react-router-dom';
import { App as KonstaApp } from 'konsta/react';
import MonthlyExpensePage from './pages/MonthlyExpensePage';
import AddExpensePage from './pages/AddExpensePage';
import NotFoundPage from './pages/NotFoundPage';
import { getCurrentMonthContext } from './utils/date';

function RootRedirect() {
  const { year, month } = getCurrentMonthContext();
  const monthStr = month.toString().padStart(2, '0');
  return <Navigate to={`/${year}/${monthStr}`} replace />;
}

function App() {
  return (
    <KonstaApp theme="material">
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/:year/:month" element={<MonthlyExpensePage />} />
        <Route path="/add" element={<AddExpensePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </KonstaApp>
  );
}

export default App;
