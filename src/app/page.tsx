"use client";

import Heading from "@/components/Heading/Heading";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Suspense } from "react";
import styles from "./page.module.css";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { birthdate: bday, accent } = searchParams;

  return (
    <Suspense>
      <TooltipProvider>
        <main className={styles.main}>
          <Heading Tag="h1" urlKey="title">
            Our lives in weeks
          </Heading>
        </main>
      </TooltipProvider>
    </Suspense>
  );
}
