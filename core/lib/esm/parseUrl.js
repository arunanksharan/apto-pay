import { HTTPS_PROTOCOL, APTOS_PROTOCOL } from './constants';
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
export function parseURL(url) {
    if (typeof url === 'string') {
        if (url.length > 2048)
            throw new ParseURLError('length invalid');
        url = new URL(url);
    }
    if (url.protocol !== APTOS_PROTOCOL)
        throw new ParseURLError('protocol invalid');
    if (!url.pathname)
        throw new ParseURLError('pathname missing');
    return /[:%]/.test(url.pathname)
        ? parseTransactionRequestURL(url)
        : parseTransferRequestURL(url);
}
function parseTransactionRequestURL({ pathname, searchParams, }) {
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
function parseTransferRequestURL({ pathname, searchParams, }) {
    let recipient;
    try {
        recipient = AccountAddress.fromString(pathname);
    }
    catch (error) {
        throw new ParseURLError('recipient invalid');
    }
    let amount;
    const amountParam = searchParams.get('amount');
    if (amountParam != null) {
        if (!/^\d+(\.\d+)?$/.test(amountParam))
            throw new ParseURLError('amount invalid');
        amount = new BigNumber(amountParam);
        if (amount.isNaN())
            throw new ParseURLError('amount NaN');
        if (amount.isNegative())
            throw new ParseURLError('amount negative');
    }
    let coinType;
    const coinTypeParam = searchParams.get('coinType');
    if (coinTypeParam != null) {
        if (!/^[a-zA-Z0-9]{1,10}$/.test(coinTypeParam))
            throw new ParseURLError('coinType invalid');
        coinType = coinTypeParam;
    }
    let reference;
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
//# sourceMappingURL=parseUrl.js.map