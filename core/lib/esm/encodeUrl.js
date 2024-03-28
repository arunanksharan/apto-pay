import { APTOS_PROTOCOL } from "./constants";
/**
 * Encode Aptos Pay URL.
 *
 * @param fields Fields to encode in the URL.
 */
export function encodeUrl(fields) {
    return "txUrl" in fields
        ? encodeTransactionRequestUrl(fields)
        : encodeTransferRequestUrl(fields);
}
export function encodeTransferRequestUrl({ recipient, amount, coinType, reference, label, message, }) {
    const pathname = recipient.toString();
    const url = new URL(APTOS_PROTOCOL + pathname);
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
export function encodeTransactionRequestUrl({ txUrl, label, message, }) {
    // Replace trailing slashes if any
    const pathname = txUrl.search
        ? encodeURIComponent(String(txUrl).replace(/\/\?/, '?'))
        : String(txUrl).replace(/\/$/, '');
    const url = new URL(APTOS_PROTOCOL + pathname);
    if (label) {
        url.searchParams.append("label", label);
    }
    if (message) {
        url.searchParams.append("message", message);
    }
    return url;
}
//# sourceMappingURL=encodeUrl.js.map