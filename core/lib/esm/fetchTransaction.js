import { RawTransaction, Deserializer, } from "@aptos-labs/ts-sdk";
import { FetchTransactionError } from "./errors";
export async function fetchTransaction(account, link) {
    const response = await fetch(String(link), {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "omit",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ account }),
    });
    const json = await response.json();
    if (!json?.transaction)
        throw new FetchTransactionError("missing transaction");
    if (typeof json.transaction !== "string")
        throw new FetchTransactionError("invalid transaction");
    const transaction = JSON.parse(json?.transaction);
    if (transaction.rawTransaction == null || transaction.feePayerAddress == null)
        throw new FetchTransactionError("Error parsing fetch transaction");
    const deserializer = new Deserializer(transaction.rawTransaction);
    const rawTransaction = RawTransaction.deserialize(deserializer);
    const simpleTransaction = {
        rawTransaction,
        feePayerAddress: transaction.feePayerAddress,
    };
    return simpleTransaction;
}
//# sourceMappingURL=fetchTransaction.js.map