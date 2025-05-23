import debounce from "lodash.debounce";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import Tooltip from "../Tooltip";
import styles from "./week.module.css";

function formatDate(date: string, showYear?: boolean) {
  return new Date(date).toLocaleDateString("en-US", {
    year: showYear ? "numeric" : undefined,
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export interface IWeek {
  sunday: string;
  saturday: string;
  lifeEvent: string;
}

// Skip re-rendering when props are unchanged with memo
const MemoizedWeek = React.memo(function Week({ week }: { week: IWeek }) {
  // Object de-structuring with aliasing, we bind the lifeEvent with a local var
  const { sunday, saturday, lifeEvent: existingLifeEvent } = week;

  const router = useRouter();
  const searchParams = useSearchParams();

  const [lifeEvent, setLifeEvent] = React.useState(existingLifeEvent);

  // Update the URL based on a newEvent
  // 100ms to prevent excessive calls to router.push e.g., during rapid typing
  const handleUrlUpdate = debounce((newEvent: string) => {
    const newParams = new URLSearchParams(Array.from(searchParams.entries()));
    const sundayKey = new Date(sunday).toISOString().split("T")[0];

    newEvent
      ? newParams.set(sundayKey, encodeURIComponent(newEvent))
      : newParams.delete(sundayKey);

    router.push(`?${newParams.toString()}`);
  }, 100);

  function handleLifeEventChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newEvent = e.target.value;
    setLifeEvent(newEvent);
    handleUrlUpdate(newEvent);
  }

  // Reference a value that is not needed for rendering
  // Changing it does not trigger a re-render
  // Store information between re-renders
  const inputRef = React.useRef<HTMLInputElement>(null);

  // No way to set dynamic width for input
  // One ch unit is the size of a 0 char
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.width = `${Math.max(1, lifeEvent.length + 2)}ch`;
    }
  }, [lifeEvent]);

  return (
    <Tooltip
      trigger={
        <input
          ref={inputRef}
          type="text"
          className={styles.week}
          value={lifeEvent}
          data-empty={!lifeEvent}
          onChange={handleLifeEventChange}
          maxLength={100}
        ></input>
      }
    >
      <p>
        {formatDate(sunday)} to {formatDate(saturday, true)}
      </p>
    </Tooltip>
  );
});

export default MemoizedWeek;
