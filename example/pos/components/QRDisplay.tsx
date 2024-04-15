import { APTOS_COIN, AccountAddress } from "@aptos-labs/ts-sdk";
import { TransferRequestURLFields, createQR } from "apto-pay";
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
      <div className="flex flex-col justify-center items-center">
        <h1 className=" text-3xl">Scan QR code</h1>
        <div>{mintQrRef && <div className="p-3" ref={mintQrRef} />}</div>
      </div>
    </>
  );
};

export default QRDisplay;
