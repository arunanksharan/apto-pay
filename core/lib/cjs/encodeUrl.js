"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeTransactionRequestUrl = exports.encodeTransferRequestUrl = exports.encodeUrl = void 0;
const constants_1 = require("./constants");
/**
 * Encode Aptos Pay URL.
 *
 * @param fields Fields to encode in the URL.
 */
function encodeUrl(fields) {
    return "txUrl" in fields
        ? encodeTransactionRequestUrl(fields)
        : encodeTransferRequestUrl(fields);
}
exports.encodeUrl = encodeUrl;
function encodeTransferRequestUrl({ recipient, amount, coinType, reference, label, message, }) {
    const pathname = recipient.toString();
    const url = new URL(constants_1.APTOS_PROTOCOL + pathname);
    if (amount) {
        url.searchParams.append("amount", amount.toString());
    }
    if (coinType) {
        url.searchParams.append("coinType", coinType);
    }
    if (reference) {
        url.searchParams.append('reference', reference);
    }
    if (label) {
        url.searchParams.append("label", label);
    }
    if (message) {
        url.searchParams.append("message", message);
    }
    return url;
}
exports.encodeTransferRequestUrl = encodeTransferRequestUrl;
function encodeTransactionRequestUrl({ txUrl, label, message, }) {
    // Replace trailing slashes if any
    const pathname = txUrl.search
        ? encodeURIComponent(String(txUrl).replace(/\/\?/, '?'))
        : String(txUrl).replace(/\/$/, '');
    const url = new URL(constants_1.APTOS_PROTOCOL + pathname);
    if (label) {
        url.searchParams.append("label", label);
    }
    if (message) {
        url.searchParams.append("message", message);
    }
    return url;
}
exports.encodeTransactionRequestUrl = encodeTransactionRequestUrl;
//# sourceMappingURL=encodeUrl.js.map