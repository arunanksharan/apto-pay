import NumberPad from "@/components/NumberPad";
import { useEffect, useRef, useState } from "react";

import {
  TransferRequestURLFields,
  recipientFromAccountAddress,
  createQR,
} from "apto-pay";
import { APTOS_COIN, Account } from "@aptos-labs/ts-sdk";

export default function NewOrder() {
  const [value, setValue] = useState(0);
  const [showQR, setShowQR] = useState(false);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <main>
      {/* <NumberPad onChange={(value) => {}} onNext={() => {}} /> */}

      <QRDisplay />
    </main>
  );
}

const QRDisplay = async () => {
  const mintQrRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initQR = async () => {
      const sampleAccount = Account.generate();
      const address = recipientFromAccountAddress(sampleAccount.accountAddress);

      const mintUrlFields: TransferRequestURLFields = {
        recipient: address,
        amount: 1000,
        coinType: APTOS_COIN,
        label: "Sample",
      };

      const mintQr = createQR(mintUrlFields);

      // Set the generated QR code on the QR ref element
      if (mintQrRef.current) {
        mintQrRef.current.innerHTML = "";
        mintQr.append(mintQrRef.current);
      }
    };

    initQR();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl">Or scan QR code</h1>
      <div ref={mintQrRef} />
    </div>
  );
};
