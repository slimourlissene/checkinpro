"use client";
import { useTheme } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import { useEffect, useState } from "react";

export default function LoadingBar() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <NextTopLoader
      color={theme === "light" ? "#000" : "#fff"}
      height={3}
      showSpinner={false}
    />
  );
}
