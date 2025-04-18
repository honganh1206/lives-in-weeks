import debounce from "lodash.debounce";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import Tooltip from "../Tooltip";

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
  // Object destructuring with aliasing, we bind the lifeEvent with a local var
  const { sunday, saturday, lifeEvent: existingLifeEvent } = week;

  const router = useRouter();
  const searchParams = useSearchParams();

  const [lifeEvent, setLifeEvent] = React.useState(existingLifeEvent);

  const handleUrlUpdate = debounce((newEvent: string) => {
    const newParams = new URLSearchParams(Array.from(searchParams.entries()));
  });

  return (
    <Tooltip trigger={<input></input>}>
      <p>
        {formatDate(sunday)} to {formatDate(saturday, true)}
      </p>
    </Tooltip>
  );
});

export default MemoizedWeek;
