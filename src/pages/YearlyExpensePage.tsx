import {
  Page,
  Navbar,
  List,
  ListItem,
  Button,
} from 'konsta/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { initializeDatabase } from '../services/database';
import { StorageService } from '../services/storage';
import { getAllMonthsForYear } from '../utils/date';

interface MonthTotal {
  month: number;
  name: string;
  total: number;
}

const YearlyExpensePage = () => {
  const navigate = useNavigate();
  const { year: yearParam } = useParams<{ year: string }>();
  
  const year = parseInt(yearParam || '');
  const isValid = !isNaN(year);

  const [monthTotals, setMonthTotals] = useState<MonthTotal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isValid) return;

    const loadYearlyExpenses = async () => {
      setLoading(true);
      const db = await initializeDatabase();
      const storage = new StorageService(db);
      
      const months = getAllMonthsForYear(year);
      const totals: MonthTotal[] = [];

      for (const monthInfo of months) {
        const expenses = await storage.listExpenses(monthInfo.start, monthInfo.end);
        const total = expenses.reduce((acc, exp) => acc + exp.amount, 0);
        
        totals.push({
          month: monthInfo.month,
          name: monthInfo.name,
          total,
        });
      }

      setMonthTotals(totals);
      setLoading(false);
    };

    loadYearlyExpenses();
  }, [year, isValid]);

  if (!isValid) {
    return <Navigate to="/404" replace />;
  }

  const handleMonthClick = (month: number) => {
    const monthStr = month.toString().padStart(2, '0');
    navigate(`/${year}/${monthStr}`);
  };

  return (
    <Page>
      <Navbar
        title={year.toString()}
        centerTitle
        left={
          <Button onClick={() => navigate(-1)} clear>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>
        }
      />

      <List>
        {loading ? (
          <ListItem title="Loading..." />
        ) : (
          monthTotals.map((monthTotal) => (
            <ListItem
              key={monthTotal.month}
              title={monthTotal.name}
              after={`A$${monthTotal.total.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}`}
              onClick={() => handleMonthClick(monthTotal.month)}
            />
          ))
        )}
      </List>
    </Page>
  );
};

export default YearlyExpensePage;
