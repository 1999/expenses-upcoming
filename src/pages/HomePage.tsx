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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [view, setView] = useState('2weeks');
  const navigate = useNavigate();

  // Mock data for skeleton
  const expenses = [
    { id: 1, title: 'Netflix', amount: 15.99, date: '2026-02-20' },
    { id: 2, title: 'Rent', amount: 1200, date: '2026-03-01' },
    { id: 3, title: 'Gym', amount: 45, date: '2026-02-25' },
    { id: 4, title: 'Car Loan', amount: 450, date: '2026-02-22' },
    { id: 5, title: 'Groceries', amount: 200, date: '2026-02-18' },
    { id: 6, title: 'Insurance', amount: 180, date: '2026-02-28' },
    { id: 7, title: 'Electricity', amount: 350, date: '2026-03-05' },
  ];

  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const today = new Date('2026-02-15');
    const diffTime = expenseDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (view === 'week') return diffDays <= 7;
    if (view === '2weeks') return diffDays <= 14;
    return diffDays <= 30;
  });

  const total = filteredExpenses.reduce((acc, exp) => acc + exp.amount, 0);

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
        {filteredExpenses.map((expense) => (
          <ListItem
            key={expense.id}
            title={expense.title}
            after={`$${expense.amount}`}
            text={expense.date}
          />
        ))}
      </List>
    </Page>
  );
};

export default HomePage;
