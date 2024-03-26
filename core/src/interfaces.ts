import type {
  Amount,
  CoinType,
  Reference,
  Label,
  Message,
  Recipient,
  TXUrl,
  Address,
} from './types';

/** Fields of a Aptos Pay Transfer Request URL */
export interface TransferRequestURLFields {
  recipient: Recipient;
  amount?: Amount;
  coinType?: CoinType;
  reference?: Reference;
  label?: Label;
  message?: Message;
}

export interface TransactionRequestURLFields {
  txUrl: TXUrl;
  label?: Label;
  message?: Message;
}

export interface CreateTransferFields {
  recipient: Recipient;
  amount: Amount;
  coinType?: CoinType;
  reference?: Reference;
}

export interface TransactionRequestURL {
  txUrl: TXUrl;
  label: Label | undefined;
  message: Message | undefined;
}

export interface TransferRequestURL {
  recipient: Recipient;
  amount: Amount | undefined;
  coinType: CoinType | undefined;
  reference: Reference | undefined;
  label: Label | undefined;
  message: Message | undefined;
}

export interface ValidateTransferFields {
  recipient: Recipient;
  amount: Amount;
  coinType?: CoinType;
  reference?: Reference;
}

export interface Transaction {
  feePayerAddress: Address;
  rawTransaction: Uint8Array;
}
