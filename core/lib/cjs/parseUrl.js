"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseURL = void 0;
const constants_1 = require("./constants");
const errors_1 = require("./errors");
const ts_sdk_1 = require("@aptos-labs/ts-sdk");
/**
 * Parse Aptos Pay URL.
 *
 * @param url - URL to parse.
 *
 * @throws {ParseURLError}
 */
function parseURL(url) {
    if (typeof url === 'string') {
        if (url.length > 2048)
            throw new errors_1.ParseURLError('length invalid');
        url = new URL(url);
    }
    if (url.protocol !== constants_1.APTOS_PROTOCOL)
        throw new errors_1.ParseURLError('protocol invalid');
    if (!url.pathname)
        throw new errors_1.ParseURLError('pathname missing');
    return /[:%]/.test(url.pathname)
        ? parseTransactionRequestURL(url)
        : parseTransferRequestURL(url);
}
exports.parseURL = parseURL;
function parseTransactionRequestURL({ pathname, searchParams, }) {
    const txUrl = new URL(decodeURIComponent(pathname));
    if (txUrl.protocol !== constants_1.HTTPS_PROTOCOL)
        throw new errors_1.ParseURLError('link invalid');
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
        recipient = ts_sdk_1.AccountAddress.fromString(pathname);
    }
    catch (error) {
        throw new errors_1.ParseURLError('recipient invalid');
    }
    let amount;
    const amountParam = searchParams.get('amount');
    if (amountParam != null) {
        if (!/^\d+(\.\d+)?$/.test(amountParam))
            throw new errors_1.ParseURLError('amount invalid');
        amount = Number(amountParam);
        if (Number.isNaN(amount))
            throw new errors_1.ParseURLError('amount NaN');
        if (amount < 0)
            throw new errors_1.ParseURLError('amount negative');
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