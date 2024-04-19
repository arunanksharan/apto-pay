import type {
  Amount,
  CoinType,
  Reference,
  Label,
  Message,
  Recipient,
  TXUrl,
  Address,
} from "./types";

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

export interface ValidateTransactionResponse {
  type: string;
  hash: string;
  sender: string;
  sequence_number: string;
  max_gas_amount: string;
  gas_unit_price: string;
  expiration_timestamp_secs: string;
  payload: EntryFunctionPayload;
  signature: TransactionSignature;
}

export interface EntryFunctionPayload {
  type: string;
  function: string;
  type_arguments: string[];
  arguments: (string | null)[];
}

export interface TransactionSignature {
  type: string;
  public_key: string;
  signature: string;
}
