import { TransactionResponse } from './types';

declare module 'flutterwave-node-v3' {
  export default class FlutterWave {
    constructor(public_key: string, private_key: string): void {}
    Transaction: { verify({ id: string }): TransactionResponse };
  }
}
