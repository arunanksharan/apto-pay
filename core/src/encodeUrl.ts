import { APTOS_PROTOCOL } from './constants';
import {
  TransferRequestURLFields,
  TransactionRequestURLFields,
} from './interfaces';

/**
 * Encode Aptos Pay URL.
 *
 * @param fields Fields to encode in the URL.
 */
export function encodeUrl(
  fields: TransferRequestURLFields | TransactionRequestURLFields
): URL {
  return 'txUrl' in fields
    ? encodeTransactionRequestUrl(fields)
    : encodeTransferRequestUrl(fields);
}

export function encodeTransferRequestUrl(
  fields: TransferRequestURLFields
): URL {
  return new URL('');
}

export function encodeTransactionRequestUrl(
  fields: TransactionRequestURLFields
): URL {
  return new URL('');
}
