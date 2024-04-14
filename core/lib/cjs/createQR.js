"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQR = void 0;
const qr_code_styling_1 = __importDefault(require("qr-code-styling"));
const encodeUrl_1 = require("./encodeUrl");
/**
 * Create a QR code from a Aptos Pay URL.
 *
 * @param fields - The transfer request object of interface `TransferRequestURLFields` to be encoded into a QR
 *
 * @returns QRCodeStyling object containin various methods to render the QR code.
 */
const createQR = (fields) => {
    console.log(`Generated URL: ${fields}`);
    const url = (0, encodeUrl_1.encodeUrl)(Object.assign({}, fields));
    console.log({ url });
    return new qr_code_styling_1.default(createQROptions(url));
};
exports.createQR = createQR;
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