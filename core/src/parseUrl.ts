import { HTTPS_PROTOCOL, APTOS_PROTOCOL } from './constants';
import type {
  Amount,
  // CoinAddress,
  CoinType,
  Label,
  Message,
  Recipient,
  Reference,
  TXUrl,
} from './types.js';

import { TransactionRequestURL, TransferRequestURL } from './interfaces.js';
import { ParseURLError } from './errors';
import { AccountAddress } from '@aptos-labs/ts-sdk';
import BigNumber from 'bignumber.js';

/**
 * Parse Aptos Pay URL.
 *
 * @param url - URL to parse.
 *
 * @throws {ParseURLError}
 */

export function parseURL(
  url: string | URL
): TransactionRequestURL | TransferRequestURL {
  if (typeof url === 'string') {
    if (url.length > 2048) throw new ParseURLError('length invalid');
    url = new URL(url);
  }

  if (url.protocol !== APTOS_PROTOCOL)
    throw new ParseURLError('protocol invalid');

  if (!url.pathname) throw new ParseURLError('pathname missing');

  return /[:%]/.test(url.pathname)
    ? parseTransactionRequestURL(url)
    : parseTransferRequestURL(url);
}

function parseTransactionRequestURL({
  pathname,
  searchParams,
}: URL): TransactionRequestURL {
  const txUrl = new URL(decodeURIComponent(pathname));
  if (txUrl.protocol !== HTTPS_PROTOCOL)
    throw new ParseURLError('link invalid');

  const label = searchParams.get('label') || undefined;
  const message = searchParams.get('message') || undefined;

  return {
    txUrl,
    label,
    message,
  };
}

function parseTransferRequestURL({
  pathname,
  searchParams,
}: URL): TransferRequestURL {
  let recipient: Recipient;
  try {
    recipient = AccountAddress.fromString(pathname);
  } catch (error: any) {
    throw new ParseURLError('recipient invalid');
  }

  let amount: Amount | undefined;
  const amountParam = searchParams.get('amount');
  if (amountParam != null) {
    if (!/^\d+(\.\d+)?$/.test(amountParam))
      throw new ParseURLError('amount invalid');

    amount = Number(amountParam);
    if (Number.isNaN(amount)) throw new ParseURLError('amount NaN');
    if (amount < 0) throw new ParseURLError('amount negative');
  }

  // let coinAddress: CoinAddress | undefined;
  // const coinAddressParam = searchParams.get('coinType');
  // if (coinAddressParam != null) {
  //   if (!/^[a-zA-Z0-9]{1,10}$/.test(coinAddressParam))
  //     throw new ParseURLError('coinAddress invalid');

  //   coinAddress = coinAddressParam;
  // }

  let coinType: CoinType | undefined;
  const coinTypeParam = searchParams.get('coinType');
  if (coinTypeParam != null) {
    if (!/^[a-zA-Z0-9]{1,10}$/.test(coinTypeParam))
      throw new ParseURLError('coinType invalid');

    coinType = coinTypeParam;
  }

  let reference: Reference | undefined;
  const referenceParam = searchParams.get('reference');
  if (referenceParam != null) {
    if (!/^[a-zA-Z0-9]{1,10}$/.test(referenceParam))
      throw new ParseURLError('coinType invalid');

    reference = referenceParam;
  }

  const label = searchParams.get('label') || undefined;
  const message = searchParams.get('message') || undefined;

  return {
    recipient,
    amount,
    coinType,
    reference,
    label,
    message,
  };
}
