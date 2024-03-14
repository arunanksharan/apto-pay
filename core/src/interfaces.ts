import type {
  Amount,
  CoinType,
  Label,
  Message,
  Recipient,
  TXUrl,
} from './types';

/** Fields of a Aptos Pay Transfer Request URL */
export interface TransferRequestURLFields {
  recipient: Recipient;
  amount?: Amount;
  coinType?: CoinType;
  label?: Label;
  message?: Message;
}

export interface TransactionRequestURLFields {
  txUrl: TXUrl;
  label?: Label;
  message?: Message;
}
