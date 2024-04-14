import QRCodeStyling from "qr-code-styling";
import { encodeUrl } from "./encodeUrl";
/**
 * Create a QR code from a Aptos Pay URL.
 *
 * @param fields - The transfer request object of interface `TransferRequestURLFields` to be encoded into a QR
 *
 * @returns QRCodeStyling object containin various methods to render the QR code.
 */
export const createQR = (fields) => {
    console.log(`Generated URL: ${fields}`);
    const url = encodeUrl({
        ...fields,
    });
    console.log({ url });
    return new QRCodeStyling(createQROptions(url));
};
const createQROptions = (url, size = 512, background = "white", color = "black") => {
    return {
        type: "svg",
        width: size,
        height: size,
        data: String(url),
        margin: 16,
        qrOptions: {
            typeNumber: 0,
            mode: "Byte",
            errorCorrectionLevel: "Q",
        },
        backgroundOptions: { color: background },
        dotsOptions: { type: "extra-rounded", color },
        cornersSquareOptions: {
            type: "extra-rounded",
            color,
        },
        cornersDotOptions: { type: "square", color },
        imageOptions: { hideBackgroundDots: true, imageSize: 0.15, margin: 8 },
    };
};
//# sourceMappingURL=createQR.js.map