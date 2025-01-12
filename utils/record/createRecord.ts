import { createRecord } from "@/services/record";
import { IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { toast } from "sonner";
import { resolveActionResult } from "../next-safe-action/resolveActionResult";

export async function onScan({ data }: { data: IDetectedBarcode[] }) {
  try {
    await resolveActionResult(createRecord({ token: data[0].rawValue }));
    toast.success("Vous avez été émargé avec succès.");
  } catch (error: any) {
    console.error(error);
    toast.error(error);
  }
}
