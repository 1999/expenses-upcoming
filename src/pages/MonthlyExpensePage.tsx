import {
  Page,
  Navbar,
  List,
  ListItem,
  Block,
  Button,
  Segmented,
  SegmentedButton,
} from 'konsta/react';
import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { initializeDatabase } from '../services/database';
import { StorageService, type ExpenseOccurrence } from '../services/storage';
import { 
  getSiblingMonth, 
  getMonthRanges,
  getCurrentRangeIndex,
} from '../utils/date';

const MonthlyExpensePage = () => {
  const navigate = useNavigate();
  const { year: yearParam, month: monthParam } = useParams<{ year: string; month: string }>();
  
  const year = parseInt(yearParam || '');
  const month = parseInt(monthParam || '');

  const isValid = !isNaN(year) && !isNaN(month) && month >= 1 && month <= 12;

  const ranges = useMemo(() => {
    if (!isValid) return [];
    return getMonthRanges(year, month);
  }, [year, month, isValid]);

  const [rangeIndex, setRangeIndex] = useState<number>(0);
  const [expenses, setExpenses] = useState<ExpenseOccurrence[]>([]);

  // Reset range index when month changes to current range if it's the current month, else 0
  useEffect(() => {
    if (isValid) {
      const now = new Date();
      if (now.getFullYear() === year && (now.getMonth() + 1) === month) {
        setRangeIndex(getCurrentRangeIndex(now));
      } else {
        setRangeIndex(0);
      }
    }
  }, [year, month, isValid]);

  const activeRange = ranges[rangeIndex];

  const onDeleteExpense = async (id: string) => {
    if (window.confirm("Do you want to delete this expense?")) {
      const db = await initializeDatabase();
      const storage = new StorageService(db);
      await storage.deleteExpense(id);
      setExpenses(expenses.filter((expense) => expense.id !== id));
    }
  };

  useEffect(() => {
    if (!isValid || !activeRange) return;

    const loadExpenses = async () => {
      const db = await initializeDatabase();
      const storage = new StorageService(db);
      
      const data = await storage.listExpenses(activeRange.start, activeRange.end);
      setExpenses(data);
    };

    loadExpenses();
  }, [activeRange, isValid]);

  if (!isValid) {
    return <Navigate to="/404" replace />;
  }

  const navigateToSibling = (offset: number) => {
    const { year: sYear, month: sMonth } = getSiblingMonth(year, month, offset);
    const monthStr = sMonth.toString().padStart(2, '0');
    navigate(`/${sYear}/${monthStr}`);
  };

  const total = expenses.reduce((acc, exp) => acc + exp.amount, 0);

  const navigateToYear = () => {
    navigate(`/${year}`);
  };

  // Custom title component with clickable year
  const CustomTitle = () => {
    const date = new Date(year, month - 1, 1);
    const monthName = date.toLocaleString("en-AU", { month: "long" });
    
    return (
      <div className="flex items-center justify-center gap-1">
        <span>{monthName}</span>
        <span 
          onClick={navigateToYear}
          className="cursor-pointer hover:underline"
        >
          {year}
        </span>
      </div>
    );
  };

  return (
    <Page>
      <Navbar
        title={<CustomTitle />}
        centerTitle
        left={
          <Button onClick={() => navigateToSibling(-1)} clear>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>
        }
        right={
          <Button onClick={() => navigateToSibling(1)} clear>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        }
      />

      <Block>
        <Segmented id="filter" rounded outline>
          {ranges.map((range, index) => (
            <SegmentedButton
              key={range.label}
              active={rangeIndex === index}
              onClick={() => setRangeIndex(index)}
            >
              {range.label}
            </SegmentedButton>
          ))}
        </Segmented>
      </Block>

      <Block className="py-4">
        <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            A$
            {total.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>{' '}
          scheduled for{' '}
          <span className="whitespace-nowrap underline decoration-blue-500 decoration-8 underline-offset-[12px]">
            {activeRange?.label}
          </span>
        </h1>
      </Block>

      <List>
        {expenses.map((expense, index) => (
          <ListItem
            key={`${expense.title}-${expense.date}-${index}`}
            title={expense.title}
            after={`A$${expense.amount}`}
            text={expense.date}
            onClick={() => onDeleteExpense(expense.id)}
          />
        ))}
        {expenses.length === 0 && (
          <ListItem title="No upcoming expenses" />
        )}
        <ListItem className="p-4">
          <Button 
            large 
            onClick={() => navigate('/add')}
          >
            Add expense
          </Button>
        </ListItem>
      </List>
    </Page>
  );
};

export default MonthlyExpensePage;
