import { createRecord } from "@/services/record";
import { IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { toast } from "sonner";
import { sleep } from "../other/sleep";

export async function onScan({ data }: { data: IDetectedBarcode[] }) {
  try {
    await createRecord({ token: data[0].rawValue });
    alert(JSON.stringify(data));
    toast.success("Vous avez été émargé avec succès.");
  } catch (error: unknown) {
    console.error(error);
    toast.error("Une erreur s'est produite lors de l'émargement.");
  }
}
