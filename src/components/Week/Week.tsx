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
const Week = React.memo(function Week({ week }: { week: IWeek }) {
  const { sunday, saturday, lifeEvent } = week;

  // Reference a value that is not needed for rendering
  // Changing it does not trigger a re-render
  // Store information between re-renders
  const weekRef = React.useRef<HTMLDivElement>(null);

  // No way to set dynamic width for div
  // One ch unit is the size of a 0 char
  React.useEffect(() => {
    if (weekRef.current) {
      weekRef.current.style.width = `${Math.max(1, lifeEvent.length + 2)}ch`;
    }
  }, [lifeEvent]);

  return (
    <Tooltip
      trigger={
        <div
          ref={weekRef}
          className={styles.week}
          data-empty={!lifeEvent}
        >
          {lifeEvent}
        </div>
      }
    >
      <p>
        {formatDate(sunday)} to {formatDate(saturday, true)}
      </p>
    </Tooltip>
  );
});

export default Week;
