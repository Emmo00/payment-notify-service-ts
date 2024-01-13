const fs = require('fs');
import { dbInterface } from 'src/types/types';

export class Transactions {
  MAX_RECORDS: number;
  db: dbInterface;

  constructor() {
    this.db = require('../../db.json');
    this.MAX_RECORDS = 100;
  }
  save(transactionId: number | null = null) {
    if (!transactionId) {
      fs.writeFileSync('./db.json', JSON.stringify(this.db));
      return;
    }
    this.db.transactions.push(transactionId);
    if (this.db.transactions.length > this.MAX_RECORDS) {
      this.db.transactions.slice(
        this.db.transactions.length - this.MAX_RECORDS
      );
    }
    this.save();
  }
  exists(transactionId: number) {
    return this.db.transactions.includes(transactionId);
  }
}
