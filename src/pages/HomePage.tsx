import {
  Page,
  Navbar,
  List,
  ListItem,
  Block,
  BlockTitle,
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
  ];

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

      <BlockTitle>View Range</BlockTitle>
      <Block>
        <Segmented rounded outline>
          <SegmentedButton
            active={view === 'week'}
            onClick={() => setView('week')}
          >
            Week
          </SegmentedButton>
          <SegmentedButton
            active={view === '2weeks'}
            onClick={() => setView('2weeks')}
          >
            2 Weeks
          </SegmentedButton>
          <SegmentedButton
            active={view === 'month'}
            onClick={() => setView('month')}
          >
            Month
          </SegmentedButton>
        </Segmented>
      </Block>

      <BlockTitle>Upcoming</BlockTitle>
      <List strongIos outlineIos>
        {expenses.map((expense) => (
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
