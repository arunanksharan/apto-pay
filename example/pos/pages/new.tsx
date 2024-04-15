import NumberPad from "@/components/NumberPad";
import dynamic, { LoaderComponent } from "next/dynamic";
import { useEffect, useRef, useState } from "react";
const QRCodeGenerator = dynamic(() => import("@/components/QRDisplay"), {
  ssr: false,
});

export default function NewOrder() {
  const [value, setValue] = useState(0);
  const [showQR, setShowQR] = useState(false);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <main>
      {!showQR && (
        <NumberPad
          onChange={(value) => {}}
          onNext={() => {
            setShowQR(true);
          }}
        />
      )}
      {showQR && (
        <div className="flex h-full justify-center px-5">
          <QRCodeGenerator />
        </div>
      )}
    </main>
  );
}
