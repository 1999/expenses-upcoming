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
import { useNavigate } from 'react-router-dom';
import { initializeDatabase } from '../services/database';
import { StorageService, type ExpenseOccurrence } from '../services/storage';
import { getMonthName, getMonthRanges, getCurrentRangeIndex } from '../utils/date';

const HomePage = () => {
  const navigate = useNavigate();
  const now = useMemo(() => new Date(), []);
  const ranges = useMemo(() => getMonthRanges(now), [now]);
  
  const [rangeIndex, setRangeIndex] = useState<number>(getCurrentRangeIndex(now));
  const [expenses, setExpenses] = useState<ExpenseOccurrence[]>([]);

  const activeRange = ranges[rangeIndex];
  const monthName = getMonthName(now);

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
      
      const data = await storage.listExpenses(activeRange.start, activeRange.end);
      setExpenses(data);
    };

    loadExpenses();
  }, [activeRange]);

  const total = expenses.reduce((acc, exp) => acc + exp.amount, 0);

  return (
    <Page>
      <Navbar
        title={monthName}
        centerTitle
        right={
          <Button onClick={() => navigate('/add')} clear>
            Add
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
            {activeRange.label}
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
