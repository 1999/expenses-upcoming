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
    upcomingPeriod: "week" | "fortnight" | "month",
  ): Promise<ExpenseOccurrence[]> {
    const expenses = await this.db.getOneStore<{
      id: string;
      title: string;
      amount: number;
      rrule: string;
    }>("expenses");

    const now = new Date();
    const end = new Date();
    if (upcomingPeriod === "week") {
      end.setDate(now.getDate() + 7);
    } else if (upcomingPeriod === "fortnight") {
      end.setDate(now.getDate() + 14);
    } else {
      end.setMonth(now.getMonth() + 1);
    }

    const occurrences: ExpenseOccurrence[] = [];

    for (const expense of expenses) {
      const rule = RRule.fromString(expense.rrule);
      const dates = rule.between(now, end, true);

      for (const date of dates) {
        occurrences.push({
          id: expense.id,
          title: expense.title,
          amount: expense.amount,
          date: date.toLocaleDateString("en-AU"),
        });
      }
    }

    return occurrences.sort((a, b) => a.date.localeCompare(b.date));
  }
}
