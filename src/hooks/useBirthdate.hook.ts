import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import { IWeek } from "@/components/Week";

export const DECADE_LABELS = [
  "Childhood",
  "Teens",
  "20s",
  "30s",
  "40s",
  "50s",
  "60s",
  "70s",
  "80s",
  "90s",
];

// Generate a nested array of weeks grouped by decade
export function useBirthdate(bday: string | undefined) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [birthdate, setBirthdate] = React.useState(bday ?? "2000-06-12"); // TODO: Harcoding here

  function handleBirthdateChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newBday = event.target.value;
    setBirthdate(newBday);

    const newParams = new URLSearchParams(Array.from(searchParams.entries()));
    newParams.set("birthdate", newBday);
    router.push(`?${newParams.toString()}`);
  }

  // Generate a nested array of weeks grouped by decades
  // Only when we update the birthdate will we trigger a re-render
  const decades = React.useMemo(() => {
    // Compute each week in a century, grouped by decade
    const tenDecades = [];
    const birthdateUTC = new Date(`${birthdate}T00:00:00Z`);

    for (let decade = 0; decade < 10; decade++) {
      // Compute decade start date
      const decadeStart = new Date(birthdateUTC);
      decadeStart.setUTCFullYear(decadeStart.getUTCFullYear() + decade * 10);

      // Compute decade end date
      const decadeEnd = new Date(decadeStart);
      decadeEnd.setUTCFullYear(decadeEnd.getUTCFullYear() + 10);

      const sundayBeforeDecadeStart = new Date(decadeStart);
      sundayBeforeDecadeStart.setUTCDate(
        decadeStart.getUTCDate() - decadeStart.getUTCDay(),
      );

      // Generate weeks ahead
      const decadeWeeks: IWeek[] = [];
      const sunday = new Date(sundayBeforeDecadeStart);
      const saturday = new Date(sunday);
      const birthday = new Date(birthdateUTC);

      saturday.setUTCDate(saturday.getUTCDate() + 6);

      // Loop through all weeks in the decade, creating week objects
      // Each iteration creates one week from Sunday to Saturday
      while (saturday < decadeEnd) {
        const year = sunday.getUTCFullYear();
        birthday.setUTCFullYear(year);

        const isBirthdayWeek = birthday >= sunday && birthday <= saturday;
        // Fill the birthday event with age
        const birthdayEvent = isBirthdayWeek
          ? `${year - birthdateUTC.getUTCFullYear()} in ${year}`
          : "";

        // Fill the week events
        const weekKey = new Date(sunday).toISOString().split("T")[0];
        const weekEvent = searchParams.get(weekKey);
        const lifeEvent = weekEvent
          ? decodeURIComponent(weekEvent)
          : birthdayEvent;

        decadeWeeks.push({
          sunday: sunday.toUTCString(),
          saturday: saturday.toUTCString(),
          lifeEvent,
        });

        sunday.setUTCDate(sunday.getUTCDate() + 7);
        saturday.setUTCDate(saturday.getUTCDate() + 7);
      }

      tenDecades.push(decadeWeeks);
    }

    return tenDecades;
  }, [searchParams, birthdate]);

  return { birthdate, handleBirthdateChange, decades };
}
