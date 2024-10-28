import Papa, { ParseResult } from "papaparse";
import { RefObject } from "react";

export function onFileChange({
  event,
  append,
  remove,
}: {
  event: React.ChangeEvent<HTMLInputElement>;
  append: (
    workers: { firstname: string; lastname: string; email: string }[]
  ) => void;
  remove: (index: number) => void;
}) {
  const file = event.target.files?.[0];
  if (file) {
    Papa.parse(file, {
      complete: (result: ParseResult<string[]>) => {
        const content = result.data
          .slice(1)
          .filter((row) => row.some((cell) => cell.trim() !== ""));
        const workers = content.map((worker: string[]) => ({
          firstname: worker[0],
          lastname: worker[1],
          email: worker[2],
        }));
        remove(0);
        append(workers);
      },
    });
  }
}

export function onClick({
  fileInputRef,
}: {
  fileInputRef: RefObject<HTMLInputElement>;
}) {
  if (fileInputRef.current) {
    fileInputRef.current.click();
  }
}
