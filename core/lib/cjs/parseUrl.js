"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseURL = void 0;
const constants_1 = require("./constants");
const errors_1 = require("./errors");
const ts_sdk_1 = require("@aptos-labs/ts-sdk");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
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
        amount = new bignumber_js_1.default(amountParam);
        if (amount.isNaN())
            throw new errors_1.ParseURLError('amount NaN');
        if (amount.isNegative())
            throw new errors_1.ParseURLError('amount negative');
    }
    let coinType;
    const coinTypeParam = searchParams.get('coinType');
    if (coinTypeParam != null) {
        if (!/^[a-zA-Z0-9]{1,10}$/.test(coinTypeParam))
            throw new errors_1.ParseURLError('coinType invalid');
        coinType = coinTypeParam;
    }
    let reference;
    const referenceParam = searchParams.get('reference');
    if (referenceParam != null) {
        if (!/^[a-zA-Z0-9]{1,10}$/.test(referenceParam))
            throw new errors_1.ParseURLError('coinType invalid');
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