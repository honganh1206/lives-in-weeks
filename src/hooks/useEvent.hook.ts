import React from "react";
import { IWeek } from "@/components/Week";
import yaml from "js-yaml";

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

interface EventData {
  headline: string;
  description: string;
  based?: string;
  doing?: string;
  association?: string;
}

interface EventsData {
  [date: string]: EventData[];
}

// Generate a nested array of weeks grouped by decade
export function useEvent() {
  const [eventsData, setEventsData] = React.useState<EventsData>({});
  const [birthdate, setBirthdate] = React.useState<string>("");

  // Load events from YAML file
  React.useEffect(() => {
    async function loadEvents() {
      try {
        const response = await fetch('/data/events.yml');
        const yamlText = await response.text();
        const data = yaml.load(yamlText) as EventsData;
        setEventsData(data);

        // Get the first date as birthdate
        const dates = Object.keys(data).sort();
        if (dates.length > 0) {
          setBirthdate(dates[0]);
        }
      } catch (error) {
        console.error('Error loading events:', error);
        // Fallback to default birthdate
        setBirthdate("2000-06-12");
      }
    }

    loadEvents();
  }, []);

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

        // Fill the week events from YAML data only
        const weekKey = new Date(sunday).toISOString().split("T")[0];

        // Check if there's an event from YAML for this date
        const yamlEvent = eventsData[weekKey];
        const yamlEventText = yamlEvent && yamlEvent.length > 0
          ? yamlEvent[0].headline
          : "";

        const lifeEvent = yamlEventText || birthdayEvent;

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
  }, [birthdate, eventsData]);

  return { birthdate, decades, eventsData };
}
