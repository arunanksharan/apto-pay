import { APTOS_COIN, Account } from "@aptos-labs/ts-sdk";
import { TransferRequestURLFields, createQR } from "apto-pay";
import { useEffect, useRef, useState } from "react";

const QRDisplay = () => {
  const mintQrRef = useRef<HTMLDivElement | null>(null);
  const initQR = () => {
    const sampleAccount = Account.generate();
    const address = sampleAccount.accountAddress;

    const mintUrlFields: TransferRequestURLFields = {
      recipient: address,
      amount: 1000,
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
