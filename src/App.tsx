import { Routes, Route } from 'react-router-dom';
import { App as KonstaApp } from 'konsta/react';
import HomePage from './pages/HomePage';
import AddExpensePage from './pages/AddExpensePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <KonstaApp theme="material">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddExpensePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </KonstaApp>
  );
}

export default App;
