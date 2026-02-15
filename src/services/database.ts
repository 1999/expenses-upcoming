import { open, type Migration } from "../utils/sklad/open-database";
import type { Sklad } from "../utils/sklad/sklad";

// Define migration
const databaseMigrations: Migration[] = [
  ({ db }) => {
    // object stores
    db.createObjectStore("expenses", {
      keyPath: "id",
    });
  },
];

export const initializeDatabase = async (): Promise<Sklad> => {
  return await open("expenses", databaseMigrations);
};
