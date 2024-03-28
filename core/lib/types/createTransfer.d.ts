import { Aptos, AccountAddress } from "@aptos-labs/ts-sdk";
import { Transaction, TransferRequestURLFields } from "./interfaces";
/**
 * Send a transaction based on transafer request based on decoded URL
 *
 * @param TransferRequestURLFields
 */
export declare function createTransferAptos(sender: AccountAddress, aptos: Aptos, { recipient, amount, coinType, label, message }: TransferRequestURLFields): Promise<Transaction>;
//# sourceMappingURL=createTransfer.d.ts.map