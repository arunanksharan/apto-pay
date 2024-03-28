import { Aptos, Account, APTOS_COIN, AccountAddress } from "@aptos-labs/ts-sdk";
import { Transaction, TransferRequestURLFields } from "./interfaces";
import { CreateTransferError } from "./errors";

/**
 * Send a transaction based on transafer request based on decoded URL
 *
 * @param TransferRequestURLFields
 */
export async function createTransferAptos(
  sender: AccountAddress,
  aptos: Aptos,
  { recipient, amount, coinType, label, message }: TransferRequestURLFields
): Promise<Transaction> {
  const senderInfo = await aptos.getAccountInfo({
    accountAddress: sender,
  });

  if (!senderInfo) throw new CreateTransferError("Invalid Sender Account");

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
