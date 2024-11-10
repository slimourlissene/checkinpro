"use client";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import dynamic from "next/dynamic";
import LoadingSpinner from "../ui/loading-spinner";
import { onScan } from "@/utils/record/createRecord";
import { Scan } from "lucide-react";
import { IDetectedBarcode } from "@yudiel/react-qr-scanner";

const Scanner = dynamic(
  () => import("@yudiel/react-qr-scanner").then((mod) => mod.Scanner),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

export default function ScanQRCode() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"sm"}
          className="w-full rounded-md py-1.5 px-2 justify-start font-normal text-sm"
          variant={"ghost"}
        >
          <Scan size={16} className="mr-2" />
          Scanner un QR Code
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-lg">
        <div>
          <DialogHeader className="mb-5">
            <DialogTitle>Veuillez scanner le QR Code</DialogTitle>
            <DialogDescription>
              Scanner le QR Code pour vous émarger.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-row items-center justify-center rounded-lg">
            <Scanner
              styles={{
                container: {
                  overflow: "hidden",
                  width: "100%",
                  height: "100%",
                },
                video: {
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                },
              }}
              constraints={{ frameRate: 30, facingMode: "environment" }}
              onScan={(data: IDetectedBarcode[]) => onScan({ data })}
              scanDelay={4000}
              allowMultiple={true}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
