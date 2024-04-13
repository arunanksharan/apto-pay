// https://api.devnet.aptoslabs.com/v1/spec#/operations/get_transaction_by_hash
import {
  Account,
  SimpleTransaction,
  RawTransaction,
  Deserializer,
} from '@aptos-labs/ts-sdk';
import { ValidateTransferError } from './errors';
import { ValidateTransactionResponse } from './interfaces';

interface ValidateTransactionFields {
  url: string | URL;
  txHash: string;
}

// curl --request GET \
//   --url https://api.devnet.aptoslabs.com/v1/transactions/by_hash/txn_hash \
//   --header 'Accept: application/json, application/x-bcs'

const DEVNET = 'devnet';
const MAINNET = 'mainnet';
const APTOS_DEVNET_URL = `https://api.${DEVNET}.aptoslabs.com/v1/transactions/by_hash`;
const APTOS_MAINNET_URL = `https://api.${MAINNET}.aptoslabs.com/v1/transactions/by_hash`;

export async function validateTransaction({
  url,
  txHash,
}: ValidateTransactionFields): Promise<ValidateTransactionResponse> {
  // CCreate Url with txHash at the end
  let aptosUrl = `${url}/${txHash}`;
  const response = await fetch(String(aptosUrl), {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  const json: ValidateTransactionResponse = await response.json();

  if (!json?.payload) throw new ValidateTransferError('missing payload');

  return json;
}
