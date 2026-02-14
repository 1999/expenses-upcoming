import {
  Page,
  Navbar,
  NavbarBackLink,
  List,
  ListInput,
  Button,
} from 'konsta/react';
import { useNavigate } from 'react-router-dom';

const AddExpensePage = () => {
  const navigate = useNavigate();

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
        />
        <ListInput
          label="Amount"
          type="number"
          placeholder="0.00"
        />
        <ListInput
          label="Date"
          type="date"
          defaultValue={new Date().toISOString().split('T')[0]}
        />
        <ListInput
          label="Recurrence"
          type="select"
          defaultValue="monthly"
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </ListInput>
      </List>

      <div className="p-4">
        <Button large onClick={() => navigate('/')}>
          Save Expense
        </Button>
      </div>
    </Page>
  );
};

export default AddExpensePage;
