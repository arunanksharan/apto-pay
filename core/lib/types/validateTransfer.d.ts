import { ValidateTransactionResponse } from './interfaces';
interface ValidateTransactionFields {
    url: string | URL;
    txHash: string;
}
export declare function validateTransaction({ url, txHash, }: ValidateTransactionFields): Promise<ValidateTransactionResponse>;
export {};
//# sourceMappingURL=validateTransfer.d.ts.map