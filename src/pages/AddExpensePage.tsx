import { useState } from 'react';
import {
  Page,
  Navbar,
  NavbarBackLink,
  List,
  ListInput,
  Button,
} from 'konsta/react';
import { useNavigate } from 'react-router-dom';
import { initializeDatabase } from '../services/database';
import { StorageService } from '../services/storage';
import { RRule } from 'rrule';

const AddExpensePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [recurrence, setRecurrence] = useState('monthly');

  const handleSave = async () => {
    const db = await initializeDatabase();
    const storage = new StorageService(db);

    const rrule = new RRule({
      freq:
        recurrence === 'weekly' || recurrence === 'fortnightly'
          ? RRule.WEEKLY
          : recurrence === 'monthly'
          ? RRule.MONTHLY
          : RRule.YEARLY,
      interval: recurrence === 'fortnightly' ? 2 : 1,
      dtstart: new Date(date),
    });

    await storage.addExpense(title, parseFloat(amount), rrule);
    navigate('/?filter=month');
  };

  return (
    <Page>
      <Navbar
        title="Add Expense"
        left={<NavbarBackLink onClick={() => navigate(-1)} />}
      />

      <List>
        <ListInput
          label="Title"
          type="text"
          placeholder="e.g. Netflix"
          value={title}
          onInput={(e) => setTitle(e.target.value)}
        />
        <ListInput
          label="Amount"
          type="number"
          placeholder="0.00"
          value={amount}
          onInput={(e) => setAmount(e.target.value)}
        />
        <ListInput
          label="Date"
          type="date"
          value={date}
          onInput={(e) => setDate(e.target.value)}
        />
        <ListInput
          label="Recurrence"
          type="select"
          value={recurrence}
          onChange={(e) => setRecurrence(e.target.value)}
        >
          <option value="weekly">Weekly</option>
          <option value="fortnightly">Fortnightly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </ListInput>
      </List>

      <div className="p-4">
        <Button large onClick={handleSave}>
          Save Expense
        </Button>
      </div>
    </Page>
  );
};

export default AddExpensePage;
