import NumberPad from "@/components/NumberPad";
import dynamic, { LoaderComponent } from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { recipientAddress } from "./aptos";
const QRCodeGenerator = dynamic(() => import("@/components/QRDisplay"), {
  ssr: false,
});

export default function NewOrder() {
  const [value, setValue] = useState<number | string>(0);
  const [showQR, setShowQR] = useState(false);

  const handleChange = (newValue: number | string) => {
    setValue(newValue);
  };

  return (
    <div className="">
      {!showQR && (
        <NumberPad
          onChange={(v) => handleChange(v)}
          onNext={() => {
            setShowQR(true);
          }}
        />
      )}
      {showQR && (
        <div className="">
          <QRCodeGenerator
            amount={Number(value)}
            receiverAddress={recipientAddress}
          />
        </div>
      )}
    </div>
  );
}
