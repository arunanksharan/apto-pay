import { Aptos, Account, APTOS_COIN } from "@aptos-labs/ts-sdk";
import { Transaction, TransferRequestURLFields } from "./interfaces";
import { CreateTransferError } from "./errors";

/**
 * Send a transaction based on transafer request based on decoded URL
 *
 * @param TransferRequestURLFields
 */
export async function createTransferAptos(
  sender: Account,
  aptos: Aptos,
  { recipient, amount, coinType, label, message }: TransferRequestURLFields
): Promise<Transaction> {
  const senderInfo = await aptos.getAccountInfo({
    accountAddress: sender.accountAddress,
  });

  if (!senderInfo) throw new CreateTransferError("Invalid Sender Account");

  const recipientInfo = await aptos.getAccountInfo({
    accountAddress: recipient.accountAddress,
  });

  if (!recipientInfo)
    throw new CreateTransferError("Invalid Recipient Account");

  const transaction = await aptos.transaction.build.simple({
    sender: sender.accountAddress,
    data: {
      function: "0x1::coin::transfer",
      typeArguments: [coinType ?? APTOS_COIN],
      functionArguments: [recipient.accountAddress, amount],
    },
  });
  const txBytes = transaction.rawTransaction.bcsToBytes();

  return {
    feePayerAddress: sender.accountAddress,
    rawTransaction: txBytes,
  };
}
