"use client";

import Heading from "@/components/Heading/Heading";
import Instructions from "@/components/Instructions";
import FutureWeek from "@/components/Week/FutureWeek";
import PastWeek from "@/components/Week/Week";
import { useAccentColor } from "@/hooks/useAccentColor.hook";
import { DECADE_LABELS, useEvent } from "@/hooks/useEvent.hook";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import yaml from "js-yaml";
import React, { Suspense, useEffect, useState } from 'react';
import styles from "./page.module.css";

export default function Home({
  searchParams,
}: Readonly<{
  searchParams: { [key: string]: string | undefined };
}>) {
  const { accent } = searchParams;
  const mergeDate = "2019-10-01"; // When lives became intertwined
  const [sharedEventsData, setSharedEventsData] = useState<any>({});

  // Load shared events data
  useEffect(() => {
    async function loadSharedEvents() {
      try {
        const response = await fetch('/our_events.yml');
        const yamlText = await response.text();
        const data = yaml.load(yamlText);
        setSharedEventsData(data);
      } catch (error) {
        console.error('Error loading shared events:', error);
      }
    }
    loadSharedEvents();
  }, []);

  const { decades: myDecades } = useEvent('/my_events.yml', mergeDate, sharedEventsData)
  const { decades: herDecades } = useEvent('/her_events.yml', mergeDate, sharedEventsData)
  const { accentColor, handleAccentColorChange } = useAccentColor(accent)

  // Helper function to check if a decade contains the merge date or is after it
  const isDecadeAfterMerge = (decade: any[]) => {
    if (decade.length === 0) return false;
    const lastWeek = new Date(decade[decade.length - 1].sunday);
    const merge = new Date(mergeDate);
    return lastWeek >= merge;
  }

  const isDecadeContainsMerge = (decade: any[]) => {
    if (decade.length === 0) return false;
    const firstWeek = new Date(decade[0].sunday);
    const lastWeek = new Date(decade[decade.length - 1].sunday);
    const merge = new Date(mergeDate);
    return firstWeek <= merge && lastWeek >= merge;
  }

  return (
    <Suspense>
      <TooltipProvider>
        <main className={styles.main}>
          <Heading Tag="h1" urlKey="title">
            Our lives in weeks
          </Heading>
          <Instructions
            accentColor={accentColor}
            handleAccentColorChange={handleAccentColorChange}
          />
          <div>
            {myDecades.map((myDecade, index) => {
              const herDecade = herDecades[index] || [];
              const decadeAfterMerge = isDecadeAfterMerge(myDecade);
              const decadeContainsMerge = isDecadeContainsMerge(myDecade);

              return (
                <React.Fragment key={`decade-${index}`}>
                  <Heading Tag="h2" urlKey={`decade-${index}`}>
                    {DECADE_LABELS[index]}
                  </Heading>

                  {decadeAfterMerge && !decadeContainsMerge ? (
                    // Show merged timeline for decades completely after merge
                    <div className={styles.mergedSection}>
                      <Heading Tag="h2" urlKey="merged-title">
                        Our lives intertwined
                      </Heading>
                      <section className={styles.decade}>
                        {myDecade.map((week) =>
                          new Date(week.sunday) < new Date() ? (
                            <PastWeek key={week.sunday} week={week} />
                          ) : (
                            <FutureWeek key={week.sunday} week={week} />
                          )
                        )}
                      </section>
                    </div>
                  ) : (
                    // Show separate timelines for decades before merge or containing merge
                    <div className={styles.peopleContainer}>
                      <div className={styles.personSection}>
                        <Heading Tag="h2" urlKey="me-title">
                          Me
                        </Heading>
                        <section className={styles.decade}>
                          {myDecade.map((week) =>
                            new Date(week.sunday) < new Date() ? (
                              <PastWeek key={week.sunday} week={week} />
                            ) : (
                              <FutureWeek key={week.sunday} week={week} />
                            )
                          )}
                        </section>
                      </div>
                      <div className={styles.personSection}>
                        <Heading Tag="h2" urlKey="her-title">
                          Her
                        </Heading>
                        <section className={styles.decade}>
                          {herDecade.map((week) =>
                            new Date(week.sunday) < new Date() ? (
                              <PastWeek key={week.sunday} week={week} />
                            ) : (
                              <FutureWeek key={week.sunday} week={week} />
                            )
                          )}
                        </section>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </main>
      </TooltipProvider>
    </Suspense>
  );
}
