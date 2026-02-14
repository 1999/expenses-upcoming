import { SkladClear } from "./clear";
import { SkladDelete, type DeleteKeyRange } from "./delete";
import { SkladSave, type ObjectStoreKeyValueRecord } from "./save";
import { SkladCount, type CountOptions } from "./count";
import { SkladGet, type GetOptions } from "./get";

export class Sklad {
  private readonly database: IDBDatabase;
  private readonly clear: SkladClear;
  private readonly delete: SkladDelete;
  private readonly insert: SkladSave;
  private readonly upsert: SkladSave;
  private readonly count: SkladCount;
  private readonly get: SkladGet;

  constructor(database: IDBDatabase) {
    this.database = database;
    this.clear = new SkladClear(database);
    this.delete = new SkladDelete(database);
    this.insert = new SkladSave(database, "insert");
    this.upsert = new SkladSave(database, "upsert");
    this.count = new SkladCount(database);
    this.get = new SkladGet(database);
  }

  getDatabaseVersion(): number {
    return this.database.version;
  }

  async deleteFromStore(storeName: string, key: DeleteKeyRange): Promise<void> {
    return await this.delete.deleteFromStore(storeName, key);
  }

  async deleteFromStores(arg: {
    [storeName: string]: DeleteKeyRange;
  }): Promise<void> {
    return await this.delete.deleteFromStores(arg);
  }

  async clearStore(storeName: string): Promise<void> {
    return await this.clear.clearOne(storeName);
  }

  async clearStores(storeNames: string[]): Promise<void> {
    return await this.clear.clearMultiple(storeNames);
  }

  async insertIntoOneStore(
    storeName: string,
    records: ObjectStoreKeyValueRecord[],
  ): Promise<IDBValidKey[]> {
    return await this.insert.saveIntoOneStore(storeName, records);
  }

  async insertIntoMultiple(arg: {
    [storeName: string]: ObjectStoreKeyValueRecord[];
  }): Promise<{ [storeName: string]: IDBValidKey[] }> {
    return await this.insert.saveIntoMultipleStores(arg);
  }

  async upsertIntoOneStore(
    storeName: string,
    records: ObjectStoreKeyValueRecord[],
  ): Promise<IDBValidKey[]> {
    return await this.upsert.saveIntoOneStore(storeName, records);
  }

  async upsertIntoMultiple(arg: {
    [storeName: string]: ObjectStoreKeyValueRecord[];
  }): Promise<{ [storeName: string]: IDBValidKey[] }> {
    return await this.upsert.saveIntoMultipleStores(arg);
  }

  async countOneStore(
    storeName: string,
    options?: CountOptions,
  ): Promise<number> {
    return await this.count.countOneStore(storeName, options || {});
  }

  async countMultipleStores(arg: {
    [storeName: string]: CountOptions;
  }): Promise<{ [storeName: string]: number }> {
    return await this.count.countMultipleStores(arg);
  }

  public async getOneStore<TReturnType extends object>(
    storeName: string,
    options?: GetOptions,
  ): Promise<TReturnType[]> {
    return await this.get.getOneStore(storeName, options || {});
  }

  public async getMultipleStores<
    TStoreRecords extends Record<string, object>,
  >(arg: {
    [StoreName in keyof TStoreRecords]: GetOptions;
  }): Promise<{
    [StoreName in keyof TStoreRecords]: TStoreRecords[StoreName][];
  }> {
    return await this.get.getMultipleStores(arg);
  }

  close(): void {
    this.database.close();
  }
}
