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
import { useNavigate } from 'react-router-dom';
import { initializeDatabase } from '../services/database';
import { StorageService, type ExpenseOccurrence } from '../services/storage';

const HomePage = () => {
  const [view, setView] = useState<'week' | '2weeks' | 'month'>('2weeks');
  const [expenses, setExpenses] = useState<ExpenseOccurrence[]>([]);
  const navigate = useNavigate();

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
      
      const period = view === '2weeks' ? 'fortnight' : view;
      const data = await storage.listExpenses(period);
      setExpenses(data);
    };

    loadExpenses();
  }, [view]);

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
        <Segmented rounded outline>
          <SegmentedButton
            className="capitalize"
            active={view === 'week'}
            onClick={() => setView('week')}
          >
            Week
          </SegmentedButton>
          <SegmentedButton
            className="capitalize"
            active={view === '2weeks'}
            onClick={() => setView('2weeks')}
          >
            2 Weeks
          </SegmentedButton>
          <SegmentedButton
            className="capitalize"
            active={view === 'month'}
            onClick={() => setView('month')}
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
            {view === '2weeks' ? 'next 2 weeks' : `next ${view}`}
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
