import { HTTPS_PROTOCOL, APTOS_PROTOCOL } from './constants';
import { ParseURLError } from './errors';
import { AccountAddress } from '@aptos-labs/ts-sdk';
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
        amount = Number(amountParam);
        if (Number.isNaN(amount))
            throw new ParseURLError('amount NaN');
        if (amount < 0)
            throw new ParseURLError('amount negative');
    }
    // let coinAddress: CoinAddress | undefined;
    // const coinAddressParam = searchParams.get('coinType');
    // if (coinAddressParam != null) {
    //   if (!/^[a-zA-Z0-9]{1,10}$/.test(coinAddressParam))
    //     throw new ParseURLError('coinAddress invalid');
    //   coinAddress = coinAddressParam;
    // }
    const coinType = searchParams.get('coinType') || undefined;
    const reference = searchParams.get('reference') || undefined;
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