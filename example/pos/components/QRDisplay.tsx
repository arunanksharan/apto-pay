import { APTOS_COIN, AccountAddress } from "@aptos-labs/ts-sdk";
import { TransferRequestURLFields, createQR, encodeUrl } from "apto-pay";
import { useEffect, useRef } from "react";

type QRDisplayProps = {
  amount: number;
  receiverAddress: AccountAddress;
};

const QRDisplay = ({ amount, receiverAddress }: QRDisplayProps) => {
  const mintQrRef = useRef<HTMLDivElement | null>(null);
  const initQR = () => {
    const mintUrlFields: TransferRequestURLFields = {
      recipient: receiverAddress,
      amount: amount,
      coinType: APTOS_COIN,
      label: "Sample",
    };

    const mintQr = createQR(mintUrlFields);

    // Set the generated QR code on the QR ref element
    if (mintQrRef?.current) {
      mintQrRef.current.innerHTML = "";
      mintQr.append(mintQrRef?.current);
    }
  };

  useEffect(() => {
    initQR();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-3xl">Scan QR code to pay {amount} APT </h1>
        <div>{mintQrRef && <div className="p-8" ref={mintQrRef} />}</div>
      </div>
    </>
  );
};

export default QRDisplay;
