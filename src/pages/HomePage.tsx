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
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { initializeDatabase } from '../services/database';
import { StorageService, type ExpenseOccurrence } from '../services/storage';

type ViewType = 'week' | 'fortnight' | 'month';

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const getInitialView = (): ViewType => {
    const filter = searchParams.get('filter');
    if (filter === 'week' || filter === 'fortnight' || filter === 'month') {
      return filter as ViewType;
    }
    return 'month';
  };

  const [view, setView] = useState<ViewType>(getInitialView());
  const [expenses, setExpenses] = useState<ExpenseOccurrence[]>([]);

  const handleViewChange = (newView: ViewType) => {
    setView(newView);
    setSearchParams({ filter: newView }, { replace: true });
  };

  const onDeleteExpense = async (id: string) => {
    if (window.confirm("Do you want to delete this expense?")) {
      const db = await initializeDatabase();
      const storage = new StorageService(db);
      await storage.deleteExpense(id);
      setExpenses(expenses.filter((expense) => expense.id !== id));
    }
  };

  useEffect(() => {
    const loadExpenses = async () => {
      const db = await initializeDatabase();
      const storage = new StorageService(db);
      
      const data = await storage.listExpenses(view);
      setExpenses(data);
    };

    loadExpenses();
  }, [view]);

  // Sync state if URL changes (e.g. back button or manual edit)
  useEffect(() => {
    const initialView = getInitialView();
    if (initialView !== view) {
      setView(initialView);
    }
  }, [searchParams]);

  const total = expenses.reduce((acc, exp) => acc + exp.amount, 0);

  return (
    <Page>
      <Navbar
        title="Upcoming Expenses"
        centerTitle
        right={
          <Button onClick={() => navigate('/add')} clear>
            Add
          </Button>
        }
      />

      <Block>
        <Segmented id="filter" rounded outline>
          <SegmentedButton
            className="capitalize"
            active={view === 'week'}
            onClick={() => handleViewChange('week')}
          >
            Week
          </SegmentedButton>
          <SegmentedButton
            className="capitalize"
            active={view === 'fortnight'}
            onClick={() => handleViewChange('fortnight')}
          >
            2 Weeks
          </SegmentedButton>
          <SegmentedButton
            className="capitalize"
            active={view === 'month'}
            onClick={() => handleViewChange('month')}
          >
            Month
          </SegmentedButton>
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
          scheduled for the{' '}
          <span className="whitespace-nowrap underline decoration-blue-500 decoration-8 underline-offset-[12px]">
            {view === 'fortnight' ? 'next 2 weeks' : `next ${view}`}
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
      </List>
    </Page>
  );
};

export default HomePage;
