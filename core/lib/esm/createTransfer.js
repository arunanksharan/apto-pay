import { APTOS_COIN } from "@aptos-labs/ts-sdk";
import { CreateTransferError } from "./errors";
/**
 * Send a transaction based on transafer request based on decoded URL
 *
 * @param TransferRequestURLFields
 */
export async function createTransferAptos(sender, aptos, { recipient, amount, coinType, label, message }) {
    const senderInfo = await aptos.getAccountInfo({
        accountAddress: sender,
    });
    if (!senderInfo)
        throw new CreateTransferError("Invalid Sender Account");
    const recipientInfo = await aptos.getAccountInfo({
        accountAddress: recipient,
    });
    if (!recipientInfo)
        throw new CreateTransferError("Invalid Recipient Account");
    const amountParam = Number(amount);
    const transaction = await aptos.transaction.build.simple({
        sender: sender,
        data: {
            function: "0x1::coin::transfer",
            typeArguments: [coinType ?? APTOS_COIN],
            functionArguments: [recipient, amountParam],
        },
    });
    const txBytes = transaction.rawTransaction.bcsToBytes();
    return {
        feePayerAddress: sender,
        rawTransaction: txBytes,
    };
}
//# sourceMappingURL=createTransfer.js.map