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

const Scanner = dynamic(
  () => import("@yudiel/react-qr-scanner").then((mod) => mod.Scanner),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function ScanQRCode() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">S'émarger</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Veuillez scanner le QR code pour vous émarger
          </DialogTitle>
          <DialogDescription>
            Veillez à bien scanner le QR Code associé à cet émargement.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row items-center justify-center rounded-lg">
          <Scanner
            classNames={{
              container: "w-[100px] h-[100px] rounded-lg",
              video: "w-[100px] h-[100px] rounded-lg",
            }}
            onScan={(data) => console.log(data)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
