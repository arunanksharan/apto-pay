import QRCodeStyling from "qr-code-styling";
import { TransferRequestURLFields } from "./interfaces";
/**
 * Create a QR code from a Aptos Pay URL.
 *
 * @param fields - The transfer request object of interface `TransferRequestURLFields` to be encoded into a QR
 *
 * @returns QRCodeStyling object containin various methods to render the QR code.
 */
export declare const createQR: (fields: TransferRequestURLFields) => QRCodeStyling | null;
//# sourceMappingURL=createQR.d.ts.map