import { TransferRequestURLFields, TransactionRequestURLFields } from "./interfaces";
/**
 * Encode Aptos Pay URL.
 *
 * @param fields Fields to encode in the URL.
 */
export declare function encodeUrl(fields: TransferRequestURLFields | TransactionRequestURLFields): URL;
export declare function encodeTransferRequestUrl({ recipient, amount, coinType, reference, label, message, }: TransferRequestURLFields): URL;
export declare function encodeTransactionRequestUrl({ txUrl, label, message, }: TransactionRequestURLFields): URL;
//# sourceMappingURL=encodeUrl.d.ts.map