import { ValidateTransactionResponse } from './interfaces';
interface ValidateTransactionFields {
    url: string | URL;
    txHash: string;
}
export declare const APTOS_DEVNET_URL = "https://api.devnet.aptoslabs.com/v1/transactions/wait_by_hash";
export declare const APTOS_MAINNET_URL = "https://api.mainnet.aptoslabs.com/v1/transactions/wait_by_hash";
export declare function validateTransaction({ url, txHash, }: ValidateTransactionFields): Promise<ValidateTransactionResponse>;
export {};
//# sourceMappingURL=validateTransfer.d.ts.map