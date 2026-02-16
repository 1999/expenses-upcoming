import { RRule } from "rrule";
import { Sklad } from "../utils/sklad/sklad";

export interface ExpenseOccurrence {
  id: string;
  title: string;
  amount: number;
  date: string;
}

export class StorageService {
  private db: Sklad;

  constructor(db: Sklad) {
    this.db = db;
  }

  async addExpense(title: string, amount: number, rrule: RRule): Promise<void> {
    await this.db.insertIntoOneStore("expenses", [
      {
        value: {
          id: crypto.randomUUID(),
          title,
          amount,
          rrule: rrule.toString(),
        },
      },
    ]);
  }

  async deleteExpense(id: string): Promise<void> {
    await this.db.deleteFromStore("expenses", id);
  }

  async listExpenses(
    startDate: Date,
    endDate: Date,
  ): Promise<ExpenseOccurrence[]> {
    const expenses = await this.db.getOneStore<{
      id: string;
      title: string;
      amount: number;
      rrule: string;
    }>("expenses");

    const occurrences: ExpenseOccurrence[] = [];

    for (const expense of expenses) {
      const rule = RRule.fromString(expense.rrule);
      // Ensure we include both boundaries
      const dates = rule.between(startDate, endDate, true);

      for (const date of dates) {
        occurrences.push({
          id: expense.id,
          title: expense.title,
          amount: expense.amount,
          date: date.toLocaleDateString("en-AU"),
        });
      }
    }

    return occurrences.sort((a, b) => {
      const parseDate = (d: string) => {
        const [day, month, year] = d.split("/").map(Number);
        return new Date(year, month - 1, day).getTime();
      };
      return parseDate(a.date) - parseDate(b.date);
    });
  }
}
