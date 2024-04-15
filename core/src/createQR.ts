import QRCodeStyling, {
  CornerDotType,
  CornerSquareType,
  DotType,
  DrawType,
  ErrorCorrectionLevel,
  Mode,
  Options,
  TypeNumber,
} from "qr-code-styling";

import { TransferRequestURLFields } from "./interfaces";

import { encodeUrl } from "./encodeUrl";

/**
 * Create a QR code from a Aptos Pay URL.
 *
 * @param fields - The transfer request object of interface `TransferRequestURLFields` to be encoded into a QR
 *
 * @returns QRCodeStyling object containin various methods to render the QR code.
 */
export const createQR = (
  fields: TransferRequestURLFields
): QRCodeStyling => {
  console.log(`Generated URL: ${fields}`);

  const url = encodeUrl({
    ...fields,
  });

  console.log({ url });

  return new QRCodeStyling(createQROptions(url));
};

const createQROptions = (
  url: string | URL,
  size = 512,
  background = "white",
  color = "black"
): Options => {
  return {
    type: "svg" as DrawType,
    width: size,
    height: size,
    data: String(url),
    margin: 16,
    qrOptions: {
      typeNumber: 0 as TypeNumber,
      mode: "Byte" as Mode,
      errorCorrectionLevel: "Q" as ErrorCorrectionLevel,
    },
    backgroundOptions: { color: background },
    dotsOptions: { type: "extra-rounded" as DotType, color },
    cornersSquareOptions: {
      type: "extra-rounded" as CornerSquareType,
      color,
    },
    cornersDotOptions: { type: "square" as CornerDotType, color },
    imageOptions: { hideBackgroundDots: true, imageSize: 0.15, margin: 8 },
  };
};
